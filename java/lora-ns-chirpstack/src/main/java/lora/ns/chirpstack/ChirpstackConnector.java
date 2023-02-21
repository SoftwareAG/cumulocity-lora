package lora.ns.chirpstack;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Properties;

import javax.net.ssl.SSLException;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.google.protobuf.ByteString;

import c8y.ConnectionState;
import io.chirpstack.api.ApplicationListItem;
import io.chirpstack.api.ApplicationServiceGrpc;
import io.chirpstack.api.ApplicationServiceGrpc.ApplicationServiceBlockingStub;
import io.chirpstack.api.CreateDeviceKeysRequest;
import io.chirpstack.api.CreateDeviceRequest;
import io.chirpstack.api.CreateGatewayRequest;
import io.chirpstack.api.CreateHttpIntegrationRequest;
import io.chirpstack.api.DeleteDeviceRequest;
import io.chirpstack.api.DeleteGatewayRequest;
import io.chirpstack.api.DeleteHttpIntegrationRequest;
import io.chirpstack.api.Device;
import io.chirpstack.api.DeviceKeys;
import io.chirpstack.api.DeviceProfileListItem;
import io.chirpstack.api.DeviceProfileServiceGrpc;
import io.chirpstack.api.DeviceQueueItem;
import io.chirpstack.api.DeviceServiceGrpc;
import io.chirpstack.api.DeviceServiceGrpc.DeviceServiceBlockingStub;
import io.chirpstack.api.EnqueueDeviceQueueItemRequest;
import io.chirpstack.api.GatewayListItem;
import io.chirpstack.api.GatewayServiceGrpc;
import io.chirpstack.api.GetDeviceRequest;
import io.chirpstack.api.HttpIntegration;
import io.chirpstack.api.ListApplicationsRequest;
import io.chirpstack.api.ListDeviceProfilesRequest;
import io.chirpstack.api.ListGatewaysRequest;
import io.grpc.ManagedChannel;
import io.grpc.StatusRuntimeException;
import io.grpc.netty.shaded.io.grpc.netty.GrpcSslContexts;
import io.grpc.netty.shaded.io.grpc.netty.NettyChannelBuilder;
import lombok.extern.slf4j.Slf4j;
import lora.codec.downlink.DownlinkData;
import lora.codec.uplink.C8YData;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.connector.LNSResponse;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.gateway.Gateway;
import lora.ns.gateway.GatewayProvisioning;

@Slf4j
public class ChirpstackConnector extends LNSAbstractConnector {

	private ManagedChannel managedChannel;

	private BearerToken token;

	public ChirpstackConnector(Properties properties) {
		super(properties);
	}

	public ChirpstackConnector(ManagedObjectRepresentation instance) {
		super(instance);
	}

	@Override
	protected void init() {
		if (Boolean.parseBoolean(properties.getProperty("ssl"))) {
			try {
				managedChannel = NettyChannelBuilder
						.forAddress(properties.getProperty("address"), Integer.parseInt(properties.getProperty("port")))
						.sslContext(GrpcSslContexts.forClient().ciphers(null).build()).build();
			} catch (SSLException e) {
				e.printStackTrace();
				log.error("Can't initiate TLS connection.", e);
			}
		} else {
			managedChannel = NettyChannelBuilder
					.forAddress(properties.getProperty("address"), Integer.parseInt(properties.getProperty("port")))
					.usePlaintext()
					.build();
		}
		token = new BearerToken(properties.getProperty("apikey"));
	}

	@Override
	public LNSResponse<List<EndDevice>> getDevices() {
		return new LNSResponse<List<EndDevice>>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<EndDevice> getDevice(String devEui) {
		DeviceServiceBlockingStub stub = DeviceServiceGrpc.newBlockingStub(managedChannel).withCallCredentials(token);
		Device device = stub.get(GetDeviceRequest.newBuilder().setDevEui(devEui).build()).getDevice();
		EndDevice endDevice = new EndDevice(devEui, device.getName(), "A");
		return new LNSResponse<EndDevice>().withOk(true).withResult(endDevice);
	}

	@Override
	public LNSResponse<String> sendDownlink(DownlinkData operation) {
		LNSResponse<String> result = new LNSResponse<String>().withOk(true);
		DeviceServiceBlockingStub stub = DeviceServiceGrpc.newBlockingStub(managedChannel).withCallCredentials(token);
		String id = stub.enqueue(
				EnqueueDeviceQueueItemRequest.newBuilder()
						.setQueueItem(DeviceQueueItem.newBuilder().setDevEui(operation.getDevEui()).setConfirmed(true)
								.setFPort(operation.getFport()).setData(ByteString.fromHex(operation.getPayload())))
						.build())
				.getId();

		result.setResult(id);
		return result;
	}

	@Override
	public LNSResponse<Void> provisionDevice(DeviceProvisioning deviceProvisioning) {
		LNSResponse<Void> response = new LNSResponse<Void>().withOk(true);
		DeviceServiceBlockingStub stub = DeviceServiceGrpc.newBlockingStub(managedChannel).withCallCredentials(token);
		stub.create(CreateDeviceRequest.newBuilder()
				.setDevice(Device.newBuilder()
						.setApplicationId("urn:uuid:" + properties.getProperty("application"))
						.setDevEui(deviceProvisioning.getDevEUI())
						.setDeviceProfileId(
								deviceProvisioning.getAdditionalProperties().getProperty("deviceprofile"))
						.setName(deviceProvisioning.getName())
						.build())
				.build());
		stub.createKeys(CreateDeviceKeysRequest.newBuilder()
				.setDeviceKeys(DeviceKeys.newBuilder().setDevEui(deviceProvisioning.getDevEUI())
						.setNwkKey(deviceProvisioning.getAppKey()).build())
				.build());
		return response;
	}

	@Override
	public LNSResponse<Void> configureRoutings(String url, String tenant, String login, String password) {
		LNSResponse<Void> response = new LNSResponse<Void>().withOk(true);
		ApplicationServiceBlockingStub stub = ApplicationServiceGrpc.newBlockingStub(managedChannel)
				.withCallCredentials(token);
		try {
			stub.deleteHttpIntegration(DeleteHttpIntegrationRequest.newBuilder()
					.setApplicationId("urn:uuid:" + properties.getProperty("application")).build());
		} catch (StatusRuntimeException e) {
			e.printStackTrace();
		}
		stub
				.createHttpIntegration(CreateHttpIntegrationRequest.newBuilder()
						.setIntegration(HttpIntegration.newBuilder()
								.setApplicationId("urn:uuid:" + properties.getProperty("application"))
								.setEventEndpointUrl(url + "/uplink")
								.putHeaders("Authorization",
										"Basic " + Base64.getEncoder()
												.encodeToString((tenant + "/" + login + ":" + password).getBytes()))
								.build())
						.build());
		return response;
	}

	@Override
	public LNSResponse<Void> removeRoutings() {
		final LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);
		ApplicationServiceBlockingStub stub = ApplicationServiceGrpc.newBlockingStub(managedChannel)
				.withCallCredentials(token);
		try {
			stub.deleteHttpIntegration(DeleteHttpIntegrationRequest.newBuilder()
					.setApplicationId("urn:uuid:" + properties.getProperty("application")).build());
		} catch (StatusRuntimeException e) {
		}
		return result;
	}

	@Override
	public LNSResponse<Void> deprovisionDevice(String deveui) {
		DeviceServiceBlockingStub stub = DeviceServiceGrpc.newBlockingStub(managedChannel).withCallCredentials(token);
		stub.delete(DeleteDeviceRequest.newBuilder().setDevEui(deveui).build());
		return new LNSResponse<Void>().withOk(true);
	}

	@Override
	public LNSResponse<List<Gateway>> getGateways() {
		List<GatewayListItem> gateways = GatewayServiceGrpc.newBlockingStub(managedChannel).withCallCredentials(token)
				.list(ListGatewaysRequest.newBuilder().setTenantId("urn:uuid:" + properties.getProperty("tenantid"))
						.setLimit(100)
						.build())
				.getResultList();
		List<Gateway> gws = new ArrayList<>();
		for (GatewayListItem gateway : gateways) {
			ConnectionState state = ConnectionState.AVAILABLE;
			switch (gateway.getState()) {
				case NEVER_SEEN:
					break;
				case OFFLINE:
				case UNRECOGNIZED:
					state = ConnectionState.UNAVAILABLE;
					break;
				case ONLINE:
					state = ConnectionState.CONNECTED;
					break;
			}
			gws.add(Gateway.builder().gwEUI(gateway.getGatewayId()).name(gateway.getName())
					.lat(BigDecimal.valueOf(gateway.getLocation().getLatitude()))
					.lng(BigDecimal.valueOf(gateway.getLocation().getLongitude())).status(state).data(new C8YData())
					.build());
		}
		return new LNSResponse<List<Gateway>>().withOk(true).withResult(gws);
	}

	@Override
	public LNSResponse<Void> provisionGateway(GatewayProvisioning gatewayProvisioning) {
		GatewayServiceGrpc.newBlockingStub(managedChannel).withCallCredentials(token)
				.create(CreateGatewayRequest.newBuilder()
						.setGateway(io.chirpstack.api.Gateway.newBuilder().setGatewayId(gatewayProvisioning.getGwEUI())
								.setName(gatewayProvisioning.getName())
								.setTenantId("urn:uuid:" + properties.getProperty("tenantid"))
								.build())
						.build());
		return new LNSResponse<Void>().withOk(true);
	}

	@Override
	public LNSResponse<Void> deprovisionGateway(String id) {
		GatewayServiceGrpc.newBlockingStub(managedChannel).withCallCredentials(token)
				.delete(DeleteGatewayRequest.newBuilder().setGatewayId(id).build());
		return new LNSResponse<Void>().withOk(true);
	}

	public boolean hasGatewayManagementCapability() {
		return true;
	}

	public List<DeviceProfileListItem> getDeviceProfiles() {
		return DeviceProfileServiceGrpc.newBlockingStub(managedChannel).withCallCredentials(token)
				.list(ListDeviceProfilesRequest.newBuilder().setLimit(100)
						.setTenantId("urn:uuid:" + properties.getProperty("tenantid")).build())
				.getResultList();
	}

	public List<ApplicationListItem> getApplications() {
		return ApplicationServiceGrpc.newBlockingStub(managedChannel).withCallCredentials(token)
				.list(ListApplicationsRequest.newBuilder().setLimit(100)
						.setTenantId("urn:uuid:" + properties.getProperty("tenantid"))
						.build())
				.getResultList();
	}
}
