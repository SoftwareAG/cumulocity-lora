package lora.ns.ttn;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

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
import lora.ns.DeviceProvisioning;
import lora.ns.EndDevice;
import lora.ns.Gateway;
import lora.ns.connector.LNSAbstractConnector;
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
import ttn.lorawan.v3.DownlinkMessageProcessorGrpc;
import ttn.lorawan.v3.DownlinkMessageProcessorGrpc.DownlinkMessageProcessorBlockingStub;
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
import ttn.lorawan.v3.MessageServices.ProcessDownlinkMessageRequest;
import ttn.lorawan.v3.Messages.ApplicationDownlink;
import ttn.lorawan.v3.NsEndDeviceRegistryGrpc;
import ttn.lorawan.v3.NsEndDeviceRegistryGrpc.NsEndDeviceRegistryBlockingStub;

public class TTNConnector extends LNSAbstractConnector {

	/**
	 *
	 */
	private static final String APPID = "appid";

	private ManagedChannel managedChannel;

	private BearerToken token;

	private final Logger logger = LoggerFactory.getLogger(getClass());

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
				.usePlaintext().build();
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
                .setDevEui(ByteString.copyFrom(BaseEncoding.base16().decode(devEui.toUpperCase())))
                .build();

		return service.getIdentifiersForEUIs(request);
	}

	@Override
	public Optional<EndDevice> getDevice(String devEui) {
		
		EndDeviceRegistryBlockingStub service = EndDeviceRegistryGrpc.newBlockingStub(managedChannel)
                .withCallCredentials(token);
		
		ttn.lorawan.v3.EndDeviceOuterClass.EndDevice device = service.get(GetEndDeviceRequest.newBuilder()
			.setEndDeviceIds(getDeviceIds(devEui))
			.setFieldMask(FieldMask.newBuilder()
				.addPaths("name")
				.build())
			.build());
		
		EndDevice result = new EndDevice(devEui, device.getName(), device.getSupportsClassC() ? "C" : device.getSupportsClassB() ? "B" : "A");

		return Optional.ofNullable(result);
	}

	@Override
	public String sendDownlink(DownlinkData operation) {
		logger.info("Will send {} to TTN.", operation);
		
		DownlinkMessageProcessorBlockingStub service = DownlinkMessageProcessorGrpc.newBlockingStub(managedChannel)
				.withCallCredentials(token);
				
		ApplicationDownlink result = service.process(ProcessDownlinkMessageRequest.newBuilder().setIds(getDeviceIds(operation.getDevEui())).setMessage(ApplicationDownlink.newBuilder().setFPort(operation.getFport()).setFrmPayload(ByteString.copyFrom(BaseEncoding.base16().decode(operation.getPayload()))).build()).build());

		String downlinkCorrelationId = null;

		for (String correlationId: result.getCorrelationIdsList()) {
			if (correlationId.startsWith("as:downlink:")) {
				downlinkCorrelationId = correlationId.split(":")[2];
			}
		}
		
		return downlinkCorrelationId;
	}

	@Override
	public boolean provisionDevice(DeviceProvisioning deviceProvisioning) {
		JsEndDeviceRegistryBlockingStub service1 = JsEndDeviceRegistryGrpc.newBlockingStub(managedChannel).withCallCredentials(token);
		AsEndDeviceRegistryBlockingStub service2 = AsEndDeviceRegistryGrpc.newBlockingStub(managedChannel).withCallCredentials(token);
		NsEndDeviceRegistryBlockingStub service3 = NsEndDeviceRegistryGrpc.newBlockingStub(managedChannel).withCallCredentials(token);
		EndDeviceRegistryBlockingStub service4 = EndDeviceRegistryGrpc.newBlockingStub(managedChannel).withCallCredentials(token);
		ttn.lorawan.v3.EndDeviceOuterClass.EndDevice device = ttn.lorawan.v3.EndDeviceOuterClass.EndDevice.newBuilder()
			.setName(deviceProvisioning.getName())
			.setIds(EndDeviceIdentifiers.newBuilder()
				.setApplicationIds(ApplicationIdentifiers.newBuilder().setApplicationId(properties.getProperty(APPID)).build())
				.setDevEui(ByteString.copyFrom(BaseEncoding.base16().decode(deviceProvisioning.getDevEUI().toUpperCase())))
				.setJoinEui(ByteString.copyFrom(BaseEncoding.base16().decode(deviceProvisioning.getAppEUI().toUpperCase())))
				.build())
			.setRootKeys(RootKeys.newBuilder()
				.setAppKey(KeyEnvelope.newBuilder()
					.setKey(ByteString.copyFrom(BaseEncoding.base16().decode(deviceProvisioning.getAppKey().toUpperCase())))
					.build())
				.build())
			.build();
		CreateEndDeviceRequest request = CreateEndDeviceRequest.newBuilder()
			.setEndDevice(device)
			.build();
		device = service4.create(request);
		SetEndDeviceRequest request2 = SetEndDeviceRequest.newBuilder().setEndDevice(device).build();
		service1.set(request2);
		service3.set(request2);
		service2.set(request2);

		return device != null;
	}

	@Override
	public void configureRoutings(String url, String tenant, String login, String password) {
		logger.info("Configuring routings to: {} with credentials: {}:{} on TTN app {}", url, login, password, properties.getProperty(APPID));
		ApplicationWebhookRegistryBlockingStub app = ApplicationWebhookRegistryGrpc.newBlockingStub(managedChannel).withCallCredentials(token);
		ApplicationWebhook webhook = ApplicationWebhook.newBuilder()
			.setIds(ApplicationWebhookIdentifiers.newBuilder()
				.setWebhookId(tenant + "-" + this.getId())
				.setApplicationIds(ApplicationIdentifiers.newBuilder().setApplicationId(properties.getProperty(APPID)).build())
				.build())
			.setBaseUrl(url)
			.setUplinkMessage(Message.newBuilder().setPath("/uplink").build())
			.setDownlinkAck(Message.newBuilder().setPath("/downlink").build())
			.setDownlinkNack(Message.newBuilder().setPath("/downlink").build())
			.setDownlinkSent(Message.newBuilder().setPath("/downlink").build())
			.setDownlinkFailed(Message.newBuilder().setPath("/downlink").build())
			.setDownlinkQueued(Message.newBuilder().setPath("/downlink").build())
			.setFormat("json")
			.putHeaders("Authorization", "Basic " + Base64.getEncoder().encodeToString((tenant + "/" + login + ":" + password).getBytes()))
			.build();
		app.set(SetApplicationWebhookRequest.newBuilder()
			.setWebhook(webhook)
			.setFieldMask(FieldMask.newBuilder()
				.addPaths("base_url")
				.addPaths("downlink_ack")
				.addPaths("downlink_api_key")
				.addPaths("downlink_failed")
				.addPaths("downlink_nack")
				.addPaths("downlink_queued")
				.addPaths("downlink_sent")
				.addPaths("format")
				.addPaths("headers")
				.addPaths("ids")
				.addPaths("ids.application_ids")
				.addPaths("ids.application_ids.application_id")
				.addPaths("ids.webhook_id")
				.addPaths("join_accept")
				.addPaths("location_solved")
				.addPaths("service_data")
				.addPaths("uplink_message")
				.build())
			.build());
	}

	@Override
	public void removeRoutings(String tenant) {
		ApplicationWebhookRegistryBlockingStub app = ApplicationWebhookRegistryGrpc.newBlockingStub(managedChannel).withCallCredentials(token);

		app.delete(ApplicationWebhookIdentifiers.newBuilder().setWebhookId(tenant + "-" + this.getId()).build());
	}

	@Override
	public boolean deprovisionDevice(String deveui) {
		JsEndDeviceRegistryBlockingStub service1 = JsEndDeviceRegistryGrpc.newBlockingStub(managedChannel).withCallCredentials(token);
		AsEndDeviceRegistryBlockingStub service2 = AsEndDeviceRegistryGrpc.newBlockingStub(managedChannel).withCallCredentials(token);
		NsEndDeviceRegistryBlockingStub service3 = NsEndDeviceRegistryGrpc.newBlockingStub(managedChannel).withCallCredentials(token);
		EndDeviceRegistryBlockingStub service4 = EndDeviceRegistryGrpc.newBlockingStub(managedChannel).withCallCredentials(token);

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
		ApplicationRegistryBlockingStub service = ApplicationRegistryGrpc.newBlockingStub(managedChannel).withCallCredentials(token);
		Applications apps = service.list(ListApplicationsRequest.newBuilder().build());
		return apps.getApplicationsList();
	}
}
