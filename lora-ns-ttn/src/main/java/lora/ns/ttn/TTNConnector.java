package lora.ns.ttn;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Properties;
import java.util.UUID;

import javax.net.ssl.SSLException;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.google.common.io.BaseEncoding;
import com.google.protobuf.ByteString;
import com.google.protobuf.Empty;
import com.google.protobuf.FieldMask;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.grpc.ManagedChannel;
import io.grpc.netty.shaded.io.grpc.netty.GrpcSslContexts;
import io.grpc.netty.shaded.io.grpc.netty.NettyChannelBuilder;
import lora.codec.DownlinkData;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.gateway.Gateway;
import ttn.lorawan.v3.AppAsGrpc;
import ttn.lorawan.v3.AppAsGrpc.AppAsBlockingStub;
import ttn.lorawan.v3.ApplicationOuterClass.Application;
import ttn.lorawan.v3.ApplicationOuterClass.Applications;
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
import ttn.lorawan.v3.Identifiers.ApplicationIdentifiers;
import ttn.lorawan.v3.Identifiers.EndDeviceIdentifiers;
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
			managedChannel = NettyChannelBuilder.forAddress(properties.getProperty("address"), 1884).usePlaintext()
					.build();
		}
		token = new BearerToken(properties.getProperty("apikey"));
	}

	@Override
	public List<EndDevice> getDevices() {
		return new ArrayList<>();
	}

	private EndDeviceIdentifiers getDeviceIds(String devEui) {
		EndDeviceRegistryBlockingStub service = EndDeviceRegistryGrpc.newBlockingStub(managedChannel)
				.withCallCredentials(token);
		GetEndDeviceIdentifiersForEUIsRequest request = GetEndDeviceIdentifiersForEUIsRequest.newBuilder()
				.setDevEui(ByteString.copyFrom(BaseEncoding.base16().decode(devEui.toUpperCase()))).build();

		return service.getIdentifiersForEUIs(request);
	}

	@Override
	public Optional<EndDevice> getDevice(String devEui) {

		EndDeviceRegistryBlockingStub service = EndDeviceRegistryGrpc.newBlockingStub(managedChannel)
				.withCallCredentials(token);

		ttn.lorawan.v3.EndDeviceOuterClass.EndDevice device = service
				.get(GetEndDeviceRequest.newBuilder().setEndDeviceIds(getDeviceIds(devEui))
						.setFieldMask(FieldMask.newBuilder().addPaths("name").build()).build());

		EndDevice result = new EndDevice(devEui, device.getName(),
				device.getSupportsClassC() ? "C" : device.getSupportsClassB() ? "B" : "A");

		return Optional.ofNullable(result);
	}

	@Override
	public String sendDownlink(DownlinkData operation) {
		logger.info("Will send {} to TTN.", operation);

		String downlinkCorrelationId = UUID.randomUUID().toString();
		logger.info("Will send a downlink with correlation Id: {}", downlinkCorrelationId);
		ApplicationDownlink downlink = ApplicationDownlink.newBuilder().setFPort(operation.getFport())
				.setConfirmed(true)
				.setFrmPayload(ByteString.copyFrom(BaseEncoding.base16().decode(operation.getPayload().toUpperCase())))
				.addCorrelationIds("c8y:" + downlinkCorrelationId).build();

		AppAsBlockingStub asService = AppAsGrpc.newBlockingStub(managedChannel).withCallCredentials(token);

		asService.downlinkQueuePush(DownlinkQueueRequest.newBuilder().addDownlinks(downlink)
				.setEndDeviceIds(getDeviceIds(operation.getDevEui())).build());

		return downlinkCorrelationId;
	}

	public List<FrequencyPlanDescription> getFrequencyPlans() {
		ConfigurationBlockingStub config = ConfigurationGrpc.newBlockingStub(managedChannel).withCallCredentials(token);
		ListFrequencyPlansResponse frequencyPlans = config.listFrequencyPlans(ListFrequencyPlansRequest.newBuilder().build());
		return frequencyPlans.getFrequencyPlansList();
	}

	@Override
	public boolean provisionDevice(DeviceProvisioning deviceProvisioning) {
		logger.info("Will provision device with following parameters: {}", deviceProvisioning);
		JsEndDeviceRegistryBlockingStub joinServerService = JsEndDeviceRegistryGrpc.newBlockingStub(managedChannel)
				.withCallCredentials(token);
		AsEndDeviceRegistryBlockingStub applicationServerService = AsEndDeviceRegistryGrpc
				.newBlockingStub(managedChannel).withCallCredentials(token);
		NsEndDeviceRegistryBlockingStub networkServerService = NsEndDeviceRegistryGrpc.newBlockingStub(managedChannel)
				.withCallCredentials(token);
		EndDeviceRegistryBlockingStub endDeviceRegistryService = EndDeviceRegistryGrpc.newBlockingStub(managedChannel)
				.withCallCredentials(token);
		ttn.lorawan.v3.EndDeviceOuterClass.EndDevice device = ttn.lorawan.v3.EndDeviceOuterClass.EndDevice.newBuilder()
				.setName(deviceProvisioning.getName()).setDescription("New device created by Cumulocity")
				.setJoinServerAddress(properties.getProperty("address"))
				.setApplicationServerAddress(properties.getProperty("address"))
				.setNetworkServerAddress(properties.getProperty("address"))
				.setSupportsJoin(true)
				.setLorawanVersion(MACVersion.valueOf(deviceProvisioning.getAdditionalProperties().getProperty("MACVersion")))
				.setLorawanPhyVersion(PHYVersion.valueOf(deviceProvisioning.getAdditionalProperties().getProperty("PHYVersion")))
				.setFrequencyPlanId(deviceProvisioning.getAdditionalProperties().getProperty("frequencyPlan"))
				.setIds(EndDeviceIdentifiers.newBuilder().setDeviceId(deviceProvisioning.getDevEUI().toLowerCase())
						.setApplicationIds(ApplicationIdentifiers.newBuilder()
								.setApplicationId(properties.getProperty(APPID)).build())
						.setDevEui(ByteString
								.copyFrom(BaseEncoding.base16().decode(deviceProvisioning.getDevEUI().toUpperCase())))
						.setJoinEui(ByteString
								.copyFrom(BaseEncoding.base16().decode(deviceProvisioning.getAppEUI().toUpperCase())))
						.build())
				.setRootKeys(RootKeys.newBuilder()
						.setAppKey(KeyEnvelope.newBuilder()
								.setKey(ByteString.copyFrom(
										BaseEncoding.base16().decode(deviceProvisioning.getAppKey().toUpperCase())))
								.build())
						.build())
				.build();
		CreateEndDeviceRequest request = CreateEndDeviceRequest.newBuilder().setEndDevice(device)
			.build();
		/*device = */endDeviceRegistryService.create(request);
		if (device != null) {
			logger.info(device.toString());
			SetEndDeviceRequest request2 = SetEndDeviceRequest.newBuilder().setEndDevice(device)
				.setFieldMask(FieldMask.newBuilder().addPaths("root_keys.app_key.key").build())
				.build();
			/*device = */joinServerService.set(request2);
			logger.info(device.toString());
			request2 = SetEndDeviceRequest.newBuilder().setEndDevice(device)
				.setFieldMask(FieldMask.newBuilder()
					.addPaths("supports_join")
					.addPaths("lorawan_version")
					.addPaths("lorawan_phy_version")
					.addPaths("frequency_plan_id")
					.build())
				//.setFieldMask(FieldMask.newBuilder().addPaths("join_server_address").build())
				.build();
			/*device = */networkServerService.set(request2);
			logger.info(device.toString());
			request2 = SetEndDeviceRequest.newBuilder().setEndDevice(device)
				//.setFieldMask(FieldMask.newBuilder().addPaths("supports_join").build())
				.build();
			/*device = */applicationServerService.set(request2);
			logger.info(device.toString());
		} else {
			logger.error("Impossible to provision device in TTN.");
		}

		return device != null;
	}

	@Override
	public void configureRoutings(String url, String tenant, String login, String password) {
		logger.info("Configuring routings to: {} with credentials: {}:{} on TTN app {}", url, login, password,
				properties.getProperty(APPID));
		ApplicationWebhookRegistryBlockingStub app = ApplicationWebhookRegistryGrpc.newBlockingStub(managedChannel)
				.withCallCredentials(token);
		ApplicationWebhook webhook = ApplicationWebhook.newBuilder()
				.setIds(ApplicationWebhookIdentifiers.newBuilder().setWebhookId(tenant + "-" + this.getId())
						.setApplicationIds(ApplicationIdentifiers.newBuilder()
								.setApplicationId(properties.getProperty(APPID)).build())
						.build())
				.setBaseUrl(url).setUplinkMessage(Message.newBuilder().setPath("/uplink").build())
				.setDownlinkAck(Message.newBuilder().setPath("/downlink").build())
				.setDownlinkNack(Message.newBuilder().setPath("/downlink").build())
				.setDownlinkSent(Message.newBuilder().setPath("/downlink").build())
				.setDownlinkFailed(Message.newBuilder().setPath("/downlink").build())
				.setDownlinkQueued(Message.newBuilder().setPath("/downlink").build()).setFormat("json")
				.putHeaders("Authorization", "Basic "
						+ Base64.getEncoder().encodeToString((tenant + "/" + login + ":" + password).getBytes()))
				.build();
		app.set(SetApplicationWebhookRequest.newBuilder().setWebhook(webhook)
				.setFieldMask(FieldMask.newBuilder().addPaths("base_url").addPaths("downlink_ack")
						.addPaths("downlink_api_key").addPaths("downlink_failed").addPaths("downlink_nack")
						.addPaths("downlink_queued").addPaths("downlink_sent").addPaths("format").addPaths("headers")
						.addPaths("ids").addPaths("ids.application_ids").addPaths("ids.application_ids.application_id")
						.addPaths("ids.webhook_id").addPaths("join_accept").addPaths("location_solved")
						.addPaths("service_data").addPaths("uplink_message").build())
				.build());
	}

	@Override
	public void removeRoutings(String tenant) {
		ApplicationWebhookRegistryBlockingStub app = ApplicationWebhookRegistryGrpc.newBlockingStub(managedChannel)
				.withCallCredentials(token);

		app.delete(ApplicationWebhookIdentifiers.newBuilder().setWebhookId(tenant + "-" + this.getId()).build());
	}

	@Override
	public boolean deprovisionDevice(String deveui) {
		JsEndDeviceRegistryBlockingStub service1 = JsEndDeviceRegistryGrpc.newBlockingStub(managedChannel)
				.withCallCredentials(token);
		AsEndDeviceRegistryBlockingStub service2 = AsEndDeviceRegistryGrpc.newBlockingStub(managedChannel)
				.withCallCredentials(token);
		NsEndDeviceRegistryBlockingStub service3 = NsEndDeviceRegistryGrpc.newBlockingStub(managedChannel)
				.withCallCredentials(token);
		EndDeviceRegistryBlockingStub service4 = EndDeviceRegistryGrpc.newBlockingStub(managedChannel)
				.withCallCredentials(token);

		EndDeviceIdentifiers ids = getDeviceIds(deveui);

		service2.delete(ids);
		service3.delete(ids);
		service1.delete(ids);
		Empty r = service4.delete(ids);

		return r != null;
	}

	@Override
	public List<Gateway> getGateways() {
		return new ArrayList<>();
	}

	public List<Application> getApplications() {
		logger.info("Fetching list of available applications from TTN...");
		ApplicationRegistryBlockingStub service = ApplicationRegistryGrpc.newBlockingStub(managedChannel)
				.withCallCredentials(token);
		Applications apps = service.list(ListApplicationsRequest.newBuilder().build());
		return apps.getApplicationsList();
	}
}
