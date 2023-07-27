package lora.ns.ttn;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Properties;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.net.ssl.SSLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.google.common.io.BaseEncoding;
import com.google.protobuf.ByteString;
import com.google.protobuf.FieldMask;

import c8y.ConnectionState;
import io.grpc.ManagedChannel;
import io.grpc.StatusRuntimeException;
import io.grpc.netty.shaded.io.grpc.netty.GrpcSslContexts;
import io.grpc.netty.shaded.io.grpc.netty.NettyChannelBuilder;
import lora.codec.downlink.DownlinkData;
import lora.codec.uplink.C8YData;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.connector.LNSResponse;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.gateway.Gateway;
import ttn.lorawan.v3.AppAsGrpc;
import ttn.lorawan.v3.AppAsGrpc.AppAsBlockingStub;
import ttn.lorawan.v3.ApplicationAccessGrpc;
import ttn.lorawan.v3.ApplicationAccessGrpc.ApplicationAccessBlockingStub;
import ttn.lorawan.v3.ApplicationOuterClass.Application;
import ttn.lorawan.v3.ApplicationOuterClass.Applications;
import ttn.lorawan.v3.ApplicationOuterClass.ListApplicationCollaboratorsRequest;
import ttn.lorawan.v3.ApplicationOuterClass.ListApplicationsRequest;
import ttn.lorawan.v3.ApplicationRegistryGrpc;
import ttn.lorawan.v3.ApplicationRegistryGrpc.ApplicationRegistryBlockingStub;
import ttn.lorawan.v3.ApplicationWebhookRegistryGrpc;
import ttn.lorawan.v3.ApplicationWebhookRegistryGrpc.ApplicationWebhookRegistryBlockingStub;
import ttn.lorawan.v3.ApplicationserverWeb.ApplicationWebhook;
import ttn.lorawan.v3.ApplicationserverWeb.ApplicationWebhook.Message;
import ttn.lorawan.v3.ApplicationserverWeb.ApplicationWebhookIdentifiers;
import ttn.lorawan.v3.ApplicationserverWeb.SetApplicationWebhookRequest;
import ttn.lorawan.v3.AsEndDeviceRegistryGrpc;
import ttn.lorawan.v3.AsEndDeviceRegistryGrpc.AsEndDeviceRegistryBlockingStub;
import ttn.lorawan.v3.ConfigurationGrpc;
import ttn.lorawan.v3.ConfigurationGrpc.ConfigurationBlockingStub;
import ttn.lorawan.v3.ConfigurationServices.FrequencyPlanDescription;
import ttn.lorawan.v3.ConfigurationServices.ListFrequencyPlansRequest;
import ttn.lorawan.v3.ConfigurationServices.ListFrequencyPlansResponse;
import ttn.lorawan.v3.EndDeviceOuterClass.CreateEndDeviceRequest;
import ttn.lorawan.v3.EndDeviceOuterClass.GetEndDeviceIdentifiersForEUIsRequest;
import ttn.lorawan.v3.EndDeviceOuterClass.GetEndDeviceRequest;
import ttn.lorawan.v3.EndDeviceOuterClass.SetEndDeviceRequest;
import ttn.lorawan.v3.EndDeviceRegistryGrpc;
import ttn.lorawan.v3.EndDeviceRegistryGrpc.EndDeviceRegistryBlockingStub;
import ttn.lorawan.v3.GatewayOuterClass;
import ttn.lorawan.v3.GatewayOuterClass.CreateGatewayRequest;
import ttn.lorawan.v3.GatewayOuterClass.GatewayConnectionStats;
import ttn.lorawan.v3.GatewayOuterClass.Gateways;
import ttn.lorawan.v3.GatewayOuterClass.ListGatewaysRequest;
import ttn.lorawan.v3.GatewayRegistryGrpc;
import ttn.lorawan.v3.GatewayRegistryGrpc.GatewayRegistryBlockingStub;
import ttn.lorawan.v3.GsGrpc;
import ttn.lorawan.v3.GsGrpc.GsBlockingStub;
import ttn.lorawan.v3.Identifiers.ApplicationIdentifiers;
import ttn.lorawan.v3.Identifiers.EndDeviceIdentifiers;
import ttn.lorawan.v3.Identifiers.GatewayIdentifiers;
import ttn.lorawan.v3.Identifiers.OrganizationOrUserIdentifiers;
import ttn.lorawan.v3.JsEndDeviceRegistryGrpc;
import ttn.lorawan.v3.JsEndDeviceRegistryGrpc.JsEndDeviceRegistryBlockingStub;
import ttn.lorawan.v3.Keys.KeyEnvelope;
import ttn.lorawan.v3.Keys.RootKeys;
import ttn.lorawan.v3.Lorawan.MACVersion;
import ttn.lorawan.v3.Lorawan.PHYVersion;
import ttn.lorawan.v3.Messages.ApplicationDownlink;
import ttn.lorawan.v3.Messages.DownlinkQueueRequest;
import ttn.lorawan.v3.NsEndDeviceRegistryGrpc;
import ttn.lorawan.v3.NsEndDeviceRegistryGrpc.NsEndDeviceRegistryBlockingStub;
import ttn.lorawan.v3.OrganizationAccessGrpc;
import ttn.lorawan.v3.OrganizationAccessGrpc.OrganizationAccessBlockingStub;
import ttn.lorawan.v3.OrganizationOuterClass.GetOrganizationAPIKeyRequest;
import ttn.lorawan.v3.RightsOuterClass.APIKey;
import ttn.lorawan.v3.RightsOuterClass.Collaborators;

public class TTNConnector extends LNSAbstractConnector {

        /**
         *
         */
        private static final String APPID = "appid";

        private ManagedChannel managedChannel;

        private BearerToken token;

        private final Logger logger = LoggerFactory.getLogger(TTNConnector.class);

        public TTNConnector(Properties properties) {
                super(properties);
        }

        public TTNConnector(ManagedObjectRepresentation instance) {
                super(instance);
        }

        @Override
        protected void init() {
                try {
                        managedChannel = NettyChannelBuilder.forAddress(properties.getProperty("address"), 8884)
                                        .sslContext(GrpcSslContexts.forClient().ciphers(null).build()).build();
                } catch (SSLException e) {
                        e.printStackTrace();
                        logger.error("Can't initiate TLS connection, falling back to plain text", e);
                        managedChannel = NettyChannelBuilder.forAddress(properties.getProperty("address"), 1884)
                                        .usePlaintext()
                                        .build();
                }
                token = new BearerToken(properties.getProperty("apikey"));
        }

        @Override
        public LNSResponse<List<EndDevice>> getDevices() {
                return new LNSResponse<List<EndDevice>>().withResult(new ArrayList<>());
        }

        private EndDeviceIdentifiers getDeviceIds(String devEui) {
                EndDeviceRegistryBlockingStub service = EndDeviceRegistryGrpc.newBlockingStub(managedChannel)
                                .withCallCredentials(token);
                GetEndDeviceIdentifiersForEUIsRequest request = GetEndDeviceIdentifiersForEUIsRequest.newBuilder()
                                .setDevEui(ByteString.copyFrom(BaseEncoding.base16().decode(devEui.toUpperCase())))
                                .build();

                return service.getIdentifiersForEUIs(request);
        }

        @Override
        public LNSResponse<EndDevice> getDevice(String devEui) {
                LNSResponse<EndDevice> result = new LNSResponse<>();

                try {
                        EndDeviceRegistryBlockingStub service = EndDeviceRegistryGrpc.newBlockingStub(managedChannel)
                                        .withCallCredentials(token);

                        ttn.lorawan.v3.EndDeviceOuterClass.EndDevice device = service
                                        .get(GetEndDeviceRequest.newBuilder().setEndDeviceIds(getDeviceIds(devEui))
                                                        .setFieldMask(FieldMask.newBuilder().addPaths("name").build())
                                                        .build());

                        EndDevice endDevice = new EndDevice(devEui, device.getName(),
                                        device.getSupportsClassC() ? "C" : device.getSupportsClassB() ? "B" : "A");

                        result.setOk(true);
                        result.setResult(endDevice);

                } catch (Exception e) {
                        e.printStackTrace();
                        result.setOk(false);
                        result.setMessage(e.getMessage());
                }

                return result;
        }

        @Override
        public LNSResponse<String> sendDownlink(DownlinkData operation) {
                LNSResponse<String> result = new LNSResponse<>();
                logger.info("Will send {} to TTN.", operation);

                String downlinkCorrelationId = UUID.randomUUID().toString();
                logger.info("Will send a downlink with correlation Id: {}", downlinkCorrelationId);
                try {
                        ApplicationDownlink downlink = ApplicationDownlink.newBuilder().setFPort(operation.getFport())
                                        .setConfirmed(true)
                                        .setFrmPayload(ByteString.copyFrom(
                                                        BaseEncoding.base16()
                                                                        .decode(operation.getPayload().toUpperCase())))
                                        .addCorrelationIds("c8y:" + downlinkCorrelationId).build();

                        AppAsBlockingStub asService = AppAsGrpc.newBlockingStub(managedChannel)
                                        .withCallCredentials(token);

                        asService.downlinkQueuePush(DownlinkQueueRequest.newBuilder().addDownlinks(downlink)
                                        .setEndDeviceIds(getDeviceIds(operation.getDevEui())).build());
                        result.setOk(true);
                        result.setResult(downlinkCorrelationId);
                } catch (Exception e) {
                        e.printStackTrace();
                        result.setOk(false);
                        result.setMessage(e.getMessage());
                }

                return result;
        }

        public List<FrequencyPlanDescription> getFrequencyPlans() {
                ConfigurationBlockingStub config = ConfigurationGrpc.newBlockingStub(managedChannel)
                                .withCallCredentials(token);
                ListFrequencyPlansResponse frequencyPlans = config
                                .listFrequencyPlans(ListFrequencyPlansRequest.newBuilder().build());
                return frequencyPlans.getFrequencyPlansList();
        }

        @Override
        public LNSResponse<Void> provisionDevice(DeviceProvisioning deviceProvisioning) {
                logger.info("Will provision device with following parameters: {}", deviceProvisioning);
                LNSResponse<Void> result = new LNSResponse<>();
                try {

                        JsEndDeviceRegistryBlockingStub joinServerService = JsEndDeviceRegistryGrpc
                                        .newBlockingStub(managedChannel)
                                        .withCallCredentials(token);
                        AsEndDeviceRegistryBlockingStub applicationServerService = AsEndDeviceRegistryGrpc
                                        .newBlockingStub(managedChannel).withCallCredentials(token);
                        NsEndDeviceRegistryBlockingStub networkServerService = NsEndDeviceRegistryGrpc
                                        .newBlockingStub(managedChannel)
                                        .withCallCredentials(token);
                        EndDeviceRegistryBlockingStub endDeviceRegistryService = EndDeviceRegistryGrpc
                                        .newBlockingStub(managedChannel)
                                        .withCallCredentials(token);
                        ttn.lorawan.v3.EndDeviceOuterClass.EndDevice device = ttn.lorawan.v3.EndDeviceOuterClass.EndDevice
                                        .newBuilder()
                                        .setName(deviceProvisioning.getName())
                                        .setDescription("New device created by Cumulocity")
                                        .setJoinServerAddress(properties.getProperty("address"))
                                        .setApplicationServerAddress(properties.getProperty("address"))
                                        .setNetworkServerAddress(properties.getProperty("address"))
                                        .setSupportsJoin(true)
                                        .setLorawanVersion(MACVersion.valueOf(
                                                        deviceProvisioning.getAdditionalProperties()
                                                                        .getProperty("MACVersion")))
                                        .setLorawanPhyVersion(PHYVersion.valueOf(
                                                        deviceProvisioning.getAdditionalProperties()
                                                                        .getProperty("PHYVersion")))
                                        .setFrequencyPlanId(deviceProvisioning.getAdditionalProperties()
                                                        .getProperty("frequencyPlan"))
                                        .setIds(EndDeviceIdentifiers.newBuilder()
                                                        .setDeviceId(deviceProvisioning.getDevEUI().toLowerCase())
                                                        .setApplicationIds(ApplicationIdentifiers.newBuilder()
                                                                        .setApplicationId(properties.getProperty(APPID))
                                                                        .build())
                                                        .setDevEui(ByteString
                                                                        .copyFrom(BaseEncoding.base16()
                                                                                        .decode(deviceProvisioning
                                                                                                        .getDevEUI()
                                                                                                        .toUpperCase())))
                                                        .setJoinEui(ByteString
                                                                        .copyFrom(BaseEncoding.base16()
                                                                                        .decode(deviceProvisioning
                                                                                                        .getAppEUI()
                                                                                                        .toUpperCase())))
                                                        .build())
                                        .setRootKeys(RootKeys.newBuilder()
                                                        .setAppKey(KeyEnvelope.newBuilder()
                                                                        .setKey(ByteString.copyFrom(
                                                                                        BaseEncoding.base16().decode(
                                                                                                        deviceProvisioning
                                                                                                                        .getAppKey()
                                                                                                                        .toUpperCase())))
                                                                        .build())
                                                        .build())
                                        .build();
                        CreateEndDeviceRequest request = CreateEndDeviceRequest.newBuilder().setEndDevice(device)
                                        .build();
                        endDeviceRegistryService.create(request);
                        SetEndDeviceRequest request2 = SetEndDeviceRequest.newBuilder().setEndDevice(device)
                                        .setFieldMask(FieldMask.newBuilder().addPaths("root_keys.app_key.key").build())
                                        .build();
                        joinServerService.set(request2);
                        request2 = SetEndDeviceRequest.newBuilder().setEndDevice(device)
                                        .setFieldMask(FieldMask.newBuilder()
                                                        .addPaths("supports_join")
                                                        .addPaths("lorawan_version")
                                                        .addPaths("lorawan_phy_version")
                                                        .addPaths("frequency_plan_id")
                                                        .build())
                                        .build();
                        networkServerService.set(request2);
                        request2 = SetEndDeviceRequest.newBuilder().setEndDevice(device)
                                        .build();
                        applicationServerService.set(request2);
                        result.setOk(true);
                } catch (Exception e) {
                        e.printStackTrace();
                        result.setOk(false);
                        result.setMessage(e.getMessage());
                }

                return result;
        }

        @Autowired
        private MicroserviceSubscriptionsService subscriptionsService;

        @Override
        public LNSResponse<Void> configureRoutings(String url, String tenant, String login, String password) {
                logger.info("Configuring routings to: {} with credentials: {}:{} on TTN app {}", url, login, password,
                                properties.getProperty(APPID));
                LNSResponse<Void> result = new LNSResponse<>();
                try {

                        ApplicationWebhookRegistryBlockingStub app = ApplicationWebhookRegistryGrpc
                                        .newBlockingStub(managedChannel)
                                        .withCallCredentials(token);
                        ApplicationWebhook webhook = ApplicationWebhook.newBuilder()
                                        .setIds(ApplicationWebhookIdentifiers.newBuilder()
                                                        .setWebhookId(tenant + "-" + this.getId())
                                                        .setApplicationIds(ApplicationIdentifiers.newBuilder()
                                                                        .setApplicationId(properties.getProperty(APPID))
                                                                        .build())
                                                        .build())
                                        .setBaseUrl(url)
                                        .setUplinkMessage(Message.newBuilder().setPath("/uplink").build())
                                        .setDownlinkAck(Message.newBuilder().setPath("/downlink").build())
                                        .setDownlinkNack(Message.newBuilder().setPath("/downlink").build())
                                        .setDownlinkSent(Message.newBuilder().setPath("/downlink").build())
                                        .setDownlinkFailed(Message.newBuilder().setPath("/downlink").build())
                                        .setDownlinkQueued(Message.newBuilder().setPath("/downlink").build())
                                        .setFormat("json")
                                        .putHeaders("Authorization", "Basic "
                                                        + Base64.getEncoder().encodeToString(
                                                                        (tenant + "/" + login + ":" + password)
                                                                                        .getBytes()))
                                        .build();
                        app.set(SetApplicationWebhookRequest.newBuilder().setWebhook(webhook)
                                        .setFieldMask(FieldMask.newBuilder().addPaths("base_url")
                                                        .addPaths("downlink_ack")
                                                        .addPaths("downlink_api_key").addPaths("downlink_failed")
                                                        .addPaths("downlink_nack")
                                                        .addPaths("downlink_queued").addPaths("downlink_sent")
                                                        .addPaths("format").addPaths("headers")
                                                        .addPaths("ids").addPaths("ids.application_ids")
                                                        .addPaths("ids.application_ids.application_id")
                                                        .addPaths("ids.webhook_id").addPaths("join_accept")
                                                        .addPaths("location_solved")
                                                        .addPaths("service_data").addPaths("uplink_message").build())
                                        .build());
                        result.setOk(true);
                } catch (Exception e) {
                        e.printStackTrace();
                        result.setOk(false);
                        result.setMessage(e.getMessage());
                }

                return result;
        }

        @Override
        public LNSResponse<Void> removeRoutings() {
                LNSResponse<Void> result = new LNSResponse<>();
                try {
                        ApplicationWebhookRegistryBlockingStub app = ApplicationWebhookRegistryGrpc
                                        .newBlockingStub(managedChannel)
                                        .withCallCredentials(token);

                        app.delete(ApplicationWebhookIdentifiers.newBuilder()
                                        .setApplicationIds(ApplicationIdentifiers.newBuilder()
                                                        .setApplicationId(properties.getProperty(APPID))
                                                        .build())
                                        .setWebhookId(subscriptionsService.getTenant() + "-" + this.getId())
                                        .build());
                        result.setOk(true);
                } catch (Exception e) {
                        e.printStackTrace();
                        result.setOk(false);
                        result.setMessage(e.getMessage());
                }

                return result;
        }

        @Override
        public LNSResponse<Void> deprovisionDevice(String deveui) {
                LNSResponse<Void> result = new LNSResponse<>();
                try {
                        JsEndDeviceRegistryBlockingStub service1 = JsEndDeviceRegistryGrpc
                                        .newBlockingStub(managedChannel)
                                        .withCallCredentials(token);
                        AsEndDeviceRegistryBlockingStub service2 = AsEndDeviceRegistryGrpc
                                        .newBlockingStub(managedChannel)
                                        .withCallCredentials(token);
                        NsEndDeviceRegistryBlockingStub service3 = NsEndDeviceRegistryGrpc
                                        .newBlockingStub(managedChannel)
                                        .withCallCredentials(token);
                        EndDeviceRegistryBlockingStub service4 = EndDeviceRegistryGrpc.newBlockingStub(managedChannel)
                                        .withCallCredentials(token);

                        EndDeviceIdentifiers ids = getDeviceIds(deveui);

                        service2.delete(ids);
                        service3.delete(ids);
                        service1.delete(ids);
                        service4.delete(ids);
                        result.setOk(true);
                } catch (Exception e) {
                        e.printStackTrace();
                        result.setOk(false);
                        result.setMessage(e.getMessage());
                }

                return result;
        }

        @Override
        public LNSResponse<List<Gateway>> getGateways() {
                LNSResponse<List<Gateway>> result = new LNSResponse<>();
                try {
                        GatewayRegistryBlockingStub gatewayRegistry = ttn.lorawan.v3.GatewayRegistryGrpc
                                        .newBlockingStub(managedChannel).withCallCredentials(token);
                        ListGatewaysRequest request = ListGatewaysRequest.newBuilder()
                                        .setFieldMask(FieldMask.newBuilder()
                                                        .addPaths("name")
                                                        .build())
                                        .build();
                        Gateways gateways = gatewayRegistry.list(request);
                        final GsBlockingStub gatewayServer = GsGrpc.newBlockingStub(managedChannel)
                                        .withCallCredentials(token);
                        result.setOk(true);
                        result.setResult(gateways.getGatewaysList().stream().map(g -> {
                                // logger.info("Retrieved gateway: {}", g.toString());
                                boolean connected = true;
                                try {
                                        GatewayConnectionStats stats = gatewayServer
                                                        .getGatewayConnectionStats(g.getIds());
                                        // logger.info("Gateway status: {}", stats.toString());
                                } catch (StatusRuntimeException e) {
                                        // e.printStackTrace();
                                        connected = false;
                                }
                                return new Gateway(g.getIds().getGatewayId(), g.getIds().getGatewayId(),
                                                g.getName(),
                                                null, null, g.getVersionIds().getBrandId(),
                                                connected ? ConnectionState.AVAILABLE
                                                                : ConnectionState.UNAVAILABLE,
                                                new C8YData());
                        }).collect(Collectors.toList()));
                } catch (Exception e) {
                        e.printStackTrace();
                        result.setOk(false);
                        result.setMessage(e.getMessage());
                }

                return result;
        }

        public List<Application> getApplications() {
                logger.info("Fetching list of available applications from TTN...");
                ApplicationRegistryBlockingStub service = ApplicationRegistryGrpc.newBlockingStub(managedChannel)
                                .withCallCredentials(token);
                Applications apps = service.list(ListApplicationsRequest.newBuilder()
                                .setFieldMask(FieldMask.newBuilder()
                                                .addPaths("name")
                                                .build())
                                .build());
                return apps.getApplicationsList();
        }

        private OrganizationOrUserIdentifiers getCurrentUserOrOrganization() {
                String keyId = properties.getProperty("apikey").split("\\.")[1];
                final OrganizationOrUserIdentifiers[] result = new OrganizationOrUserIdentifiers[1];
                result[0] = null;
                ApplicationAccessBlockingStub applicationAccess = ApplicationAccessGrpc.newBlockingStub(managedChannel)
                                .withCallCredentials(token);
                Collaborators collaborators = applicationAccess.listCollaborators(ListApplicationCollaboratorsRequest
                                .newBuilder()
                                .setApplicationIds(ApplicationIdentifiers.newBuilder()
                                                .setApplicationId(properties.getProperty(APPID)).build())
                                .build());
                final OrganizationAccessBlockingStub organizationAccess = OrganizationAccessGrpc
                                .newBlockingStub(managedChannel).withCallCredentials(token);
                collaborators.getCollaboratorsList().forEach(collaborator -> {
                        logger.info("Checking API Keys of collaborator {}", collaborator.getIds());
                        if (collaborator.getIds().hasOrganizationIds()) {
                                try {
                                        APIKey apiKey = organizationAccess.getAPIKey(GetOrganizationAPIKeyRequest
                                                        .newBuilder()
                                                        .setKeyId(keyId)
                                                        .setOrganizationIds(collaborator.getIds().getOrganizationIds())
                                                        .build());
                                        if (apiKey != null) {
                                                logger.info("Collaborator {} matches current API Key", collaborator);
                                                result[0] = OrganizationOrUserIdentifiers.newBuilder()
                                                                .setOrganizationIds(collaborator.getIds()
                                                                                .getOrganizationIds())
                                                                .build();
                                        }
                                } catch (StatusRuntimeException e) {
                                        logger.info("Wrong collaborator (no right to get API Keys)");
                                }
                        }
                });

                return result[0];
        }

        public LNSResponse<Void> provisionGateway(lora.ns.gateway.GatewayProvisioning gatewayProvisioning) {
                LNSResponse<Void> result = new LNSResponse<>();

                OrganizationOrUserIdentifiers collaborator = getCurrentUserOrOrganization();

                if (collaborator == null) {
                        result.setOk(false);
                        result.setMessage("no user with gateway creation rights was found.");
                } else {
                        logger.info("Will user collaborator {}", collaborator);
                        GatewayRegistryBlockingStub gatewayRegistry = GatewayRegistryGrpc
                                        .newBlockingStub(managedChannel).withCallCredentials(token);
                        GatewayOuterClass.Gateway gateway = GatewayOuterClass.Gateway.newBuilder()
                                        .setIds(GatewayIdentifiers.newBuilder()
                                                        .setGatewayId(gatewayProvisioning.getGwEUI())
                                                        .setEui(ByteString
                                                                        .copyFrom(BaseEncoding.base16()
                                                                                        .decode(gatewayProvisioning
                                                                                                        .getGwEUI()
                                                                                                        .toUpperCase())))
                                                        .build())
                                        .setGatewayServerAddress(properties.getProperty("address"))
                                        .setStatusPublic(Boolean.parseBoolean(gatewayProvisioning
                                                        .getAdditionalProperties().getProperty("public")))
                                        .setFrequencyPlanId(gatewayProvisioning.getAdditionalProperties()
                                                        .getProperty("frequencyPlan"))
                                        .setName(gatewayProvisioning.getName())
                                        .build();
                        CreateGatewayRequest request = CreateGatewayRequest.newBuilder()
                                        .setGateway(gateway)
                                        .setCollaborator(collaborator).build();
                        try {
                                result.setOk(gatewayRegistry.create(request) != null);
                        } catch (Exception e) {
                                result.setOk(false);
                                result.setMessage(e.getMessage());
                        }
                }
                return result;
        }

        public LNSResponse<Void> deprovisionGateway(String id) {
                LNSResponse<Void> result = new LNSResponse<>();
                try {
                        GatewayRegistryBlockingStub gatewayRegistry = GatewayRegistryGrpc
                                        .newBlockingStub(managedChannel)
                                        .withCallCredentials(token);
                        gatewayRegistry.delete(GatewayIdentifiers.newBuilder()
                                        .setGatewayId(id)
                                        .build());

                        result.setOk(true);
                } catch (Exception e) {
                        e.printStackTrace();
                        result.setOk(false);
                        result.setMessage(e.getMessage());
                }
                return result;
        }

        public boolean hasGatewayManagementCapability() {
                return true;
        }
}
