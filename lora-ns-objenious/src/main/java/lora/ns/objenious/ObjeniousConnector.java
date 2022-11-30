package lora.ns.objenious;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;

import c8y.ConnectionState;
import lora.codec.downlink.DownlinkData;
import lora.codec.uplink.C8YData;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.connector.LNSResponse;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.gateway.Gateway;
import lora.ns.objenious.rest.Device;
import lora.ns.objenious.rest.DeviceCreate;
import lora.ns.objenious.rest.DownlinkCreate;
import lora.ns.objenious.rest.DownlinkCreate.ValidUntilEnum;
import lora.ns.objenious.rest.DownlinkCreateProtocolData;
import lora.ns.objenious.rest.DownlinkResponse;
import lora.ns.objenious.rest.Group;
import lora.ns.objenious.rest.Headers;
import lora.ns.objenious.rest.ObjectDeleted;
import lora.ns.objenious.rest.ObjeniousService;
import lora.ns.objenious.rest.Profile;
import lora.ns.objenious.rest.RoutingHttp;
import lora.ns.objenious.rest.ScenarioRouting;
import lora.ns.objenious.rest.ScenarioRoutingCreateUpdate;
import lora.ns.objenious.rest.ScenarioRoutingCreateUpdate.FormatTypeEnum;
import lora.ns.objenious.rest.ScenarioRoutingCreateUpdate.MessageTypeEnum;
import lora.ns.objenious.rest.ScenarioRoutingReader;
import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

public class ObjeniousConnector extends LNSAbstractConnector {

	private ObjeniousService objeniousService;

	private final Logger logger = LoggerFactory.getLogger(ObjeniousConnector.class);

	class APIKeyInterceptor implements Interceptor {

		@Override
		public Response intercept(Chain chain) throws IOException {
			Request request = chain.request();

			request = request.newBuilder().header("apikey", properties.getProperty("apikey"))
					.header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
					.header("Accept", MediaType.APPLICATION_JSON_VALUE).build();

			Response response = chain.proceed(request);

			logger.info("Response code from {} {}: {}", request.method(), request.url(), response.code());

			if (!response.isSuccessful()) {
				logger.error("Error message from Objenious: {}", response.message());
				logger.error("Request was: {}", request);
			}

			return response;
		}

	}

	public ObjeniousConnector(Properties properties) {
		super(properties);
	}

	public ObjeniousConnector(ManagedObjectRepresentation instance) {
		super(instance);
	}

	@Override
	protected void init() {
		String host = properties.getProperty("proxy-host");
		String port = properties.getProperty("proxy-port");

		if (host != null && !host.trim().isEmpty() && port != null && !port.trim().isEmpty()) {
			System.setProperty("http.proxyHost", host);
			System.setProperty("https.proxyHost", host);
			System.setProperty("http.proxyPort", port);
			System.setProperty("https.proxyPort", port);
			System.setProperty("http.nonProxyHosts", "cumulocity");
			System.setProperty("https.nonProxyHosts", "cumulocity");
		}

		OkHttpClient okHttpClient = new OkHttpClient.Builder().addInterceptor(new APIKeyInterceptor()).build();

		Retrofit retrofit = new Retrofit.Builder().client(okHttpClient).baseUrl("https://api.objenious.com/v1/")
				.addConverterFactory(JacksonConverterFactory.create()).build();
		objeniousService = retrofit.create(ObjeniousService.class);
	}

	@Override
	public LNSResponse<List<EndDevice>> getDevices() {
		LNSResponse<List<EndDevice>> result = new LNSResponse<List<EndDevice>>().withOk(true).withResult(new ArrayList<>());
		try {
			retrofit2.Response<List<Device>> response = objeniousService.getDevices().execute();
			if (response.isSuccessful()) {
				List<Device> devices = response.body();
				if (devices != null) {
					result.setResult(devices.stream()
							.map(device -> new EndDevice(device.getProperties().getDeveui(), device.getLabel(), ""))
							.collect(Collectors.toList()));
				}
			} else {
				result.withOk(false).withMessage(response.errorBody().string());
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.withOk(false).withMessage(e.getMessage());
		}

		return result;
	}

	public Profile getProfile(int id) {
		Profile result = null;

		retrofit2.Response<Profile> response;
		try {
			response = objeniousService.getProfile(id).execute();
			result = response.body();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}

	@Override
	public LNSResponse<EndDevice> getDevice(String devEui) {
		LNSResponse<EndDevice> result = new LNSResponse<EndDevice>().withOk(true);
		try {
			retrofit2.Response<Device> response = objeniousService.getDevice(devEui).execute();
			if (response.isSuccessful()) {
				Device device = response.body();
				result.setResult(new EndDevice(devEui, device.getLabel(), "A"));
			} else {
				result.withOk(false).withMessage(response.errorBody().string());
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.withOk(false).withMessage(e.getMessage());
		}
		return result;
	}

	@Override
	public LNSResponse<String> sendDownlink(DownlinkData operation) {
		LNSResponse<String> result = new LNSResponse<String>().withOk(true);
		logger.info("Will send {} to Objenious.", operation.toString());
		DownlinkCreateProtocolData protocolData = new DownlinkCreateProtocolData();
		protocolData.setPort(operation.getFport());
		DownlinkCreate downlinkCreate = new DownlinkCreate();
		downlinkCreate.setProtocolData(protocolData);
		downlinkCreate.setCleartext(operation.getPayload());
		downlinkCreate.setValidUntil(ValidUntilEnum.NEXT_JOIN);
		downlinkCreate.setConfirmed(true);

		try {
			retrofit2.Response<DownlinkResponse> response = objeniousService
					.sendCommand(operation.getDevEui(), downlinkCreate).execute();
			if (response.isSuccessful()) {
				result.setResult(response.body().getCommandId().toString());
			} else {
				result.withOk(false).withMessage(response.errorBody().string());
			}
		} catch (Exception e1) {
			e1.printStackTrace();
			result.withOk(false).withMessage(e1.getMessage());
		}

		return result;
	}

	@Override
	public LNSResponse<Void> provisionDevice(DeviceProvisioning deviceProvisioning) {
		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);
		Device device = null;
		try {
			device = objeniousService.getDevice(deviceProvisioning.getDevEUI()).execute().body();
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		if (device == null) {
			try {
				DeviceCreate deviceCreate = new DeviceCreate();
				deviceCreate.setLabel(deviceProvisioning.getName());
				deviceCreate.setDeveui(deviceProvisioning.getDevEUI());
				deviceCreate.setAppeui(deviceProvisioning.getAppEUI());
				deviceCreate.setAppkey(deviceProvisioning.getAppKey());
				deviceCreate.setLat(deviceProvisioning.getLat());
				deviceCreate.setLng(deviceProvisioning.getLng());
				deviceCreate.setGroupId(Integer.parseInt(properties.getProperty("groupId")));
				deviceCreate.setProfileId(Integer.valueOf(deviceProvisioning.getAdditionalProperties().getProperty("deviceProfile")));
				retrofit2.Response<Device> response = objeniousService.createDevice(deviceCreate).execute();
				if (!response.isSuccessful()) {
					logger.error(response.errorBody().string());
					result.withOk(false).withMessage(response.errorBody().string());
				}
			} catch (Exception e1) {
				e1.printStackTrace();
				result.withOk(false).withMessage(e1.getMessage());
			}
		} else {
			if (!device.isEnabled()) {
				try {
					retrofit2.Response<Device> response = objeniousService
							.reactivateDevice(deviceProvisioning.getDevEUI()).execute();
					if (!response.isSuccessful()) {
						logger.error(response.errorBody().string());
						result.withOk(false).withMessage(response.errorBody().string());
					}
				} catch (Exception e) {
					e.printStackTrace();
					result.withOk(false).withMessage(e.getMessage());
				}
			}
		}
		return result;
	}

	public LNSResponse<Void> configureRouting(String url, String tenant, String login, String password, String name,
			MessageTypeEnum messageType) {
		assert objeniousService != null : "objeniousService is not initialized";

		LNSResponse<Void> result = new LNSResponse<Void>().withOk(false);

		removeRouting(name);

		RoutingHttp routingHttp = new RoutingHttp();
		routingHttp.setUrl(url);
		routingHttp.setMethod(RoutingHttp.MethodEnum.POST);
		Headers headers = new Headers();
		headers.put("Authorization",
				"Basic " + Base64.getEncoder().encodeToString((tenant + "/" + login + ":" + password).getBytes()));
		routingHttp.setHeaders(headers);
		ScenarioRoutingCreateUpdate scenarioRoutingCreateUpdate = new ScenarioRoutingCreateUpdate();
		scenarioRoutingCreateUpdate.setHttp(routingHttp);
		scenarioRoutingCreateUpdate.setName(name);
		scenarioRoutingCreateUpdate.setMessageType(messageType);
		scenarioRoutingCreateUpdate.setFormatType(FormatTypeEnum.MESSAGES);
		scenarioRoutingCreateUpdate.setEnabled(true);
		scenarioRoutingCreateUpdate.setGroupId(Integer.parseInt(properties.getProperty("groupId")));

		try {
			retrofit2.Response<ScenarioRouting> response = objeniousService
					.createHttpRouting(scenarioRoutingCreateUpdate).execute();
			if (!response.isSuccessful()) {
				logger.error("Error from Objenious: {}", response.errorBody().string());
				result.withOk(false).withMessage(response.errorBody().string());
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.withOk(false).withMessage(e.getMessage());
		}

		return result;
	}

	@Override
	public LNSResponse<List<String>> configureRoutings(String url, String tenant, String login, String password) {
		logger.info("Configuring routings to: {} with credentials: {}:{}", url, login, password);
		LNSResponse<List<String>> result = new LNSResponse<>();
		LNSResponse<Void> resultDownlink = configureRouting(url + "/downlink", tenant, login, password, tenant + "-" + this.getId() + "-downlink",
				MessageTypeEnum.DOWNLINK);
		LNSResponse<Void> resultUplink = configureRouting(url + "/uplink", tenant, login, password, tenant + "-" + this.getId() + "-uplink",
				MessageTypeEnum.UPLINK);

		result.setOk(resultDownlink.isOk() && resultUplink.isOk());
		if (!result.isOk()) {
			result.setMessage("");
			if (!resultDownlink.isOk()) {
				result.setMessage(resultDownlink.getMessage());
			}
			if (!resultUplink.isOk()) {
				result.setMessage(result.getMessage() + "\n" + resultUplink.getMessage());
			}
		}

		return result;
	}

	private LNSResponse<Void> removeRouting(String name) {
		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);
		try {
			retrofit2.Response<List<ScenarioRoutingReader>> response = objeniousService.getRouting().execute();
			if (response.isSuccessful()) {
				List<ScenarioRoutingReader> routings = response.body();
				if (routings != null) {
					routings.stream().filter(routing -> routing.getName().equals(name)).forEach(routing -> {
						try {
							objeniousService.deleteRouting(routing.getId()).execute();
						} catch (Exception e) {
							e.printStackTrace();
						}
					});
				}
			} else {
				result.withOk(false).withMessage(response.errorBody().string());
			}
		} catch (Exception e1) {
			e1.printStackTrace();
			result.withOk(false).withMessage(e1.getMessage());
		}
		return result;
	}

	@Override
	public LNSResponse<Void> removeRoutings(String tenant, List<String> routeIds) {
		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);
		var resultUplink = removeRouting(tenant + "-" + this.getId() + "-uplink");
		var resultDownlink = removeRouting(tenant + "-" + this.getId() + "-downlink");
		result.setOk(resultUplink.isOk() && resultDownlink.isOk());
		if (!result.isOk()) {
			result.setMessage("");
			if (!resultDownlink.isOk()) {
				result.setMessage(resultDownlink.getMessage());
			}
			if (!resultUplink.isOk()) {
				result.setMessage(result.getMessage() + "\n" + resultUplink.getMessage());
			}
		}
		return result;
	}

	public List<Group> getGroups() {
		List<Group> result = new ArrayList<>();

		try {
			result = objeniousService.getGroups().execute().body();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}

	@Override
	public LNSResponse<Void> deprovisionDevice(String deveui) {
		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);
		try {
			retrofit2.Response<ObjectDeleted> response = objeniousService.deprovisionDevice(deveui).execute();
			if (!response.isSuccessful()) {
				result.withOk(false).withMessage(response.errorBody().string());
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.withOk(false).withMessage(e.getMessage());
		}
		return result;
	}

	@Override
	public LNSResponse<List<Gateway>> getGateways() {
		logger.info("Getting list of gateways with connector {}...", this.getName());
		LNSResponse<List<Gateway>> result = new LNSResponse<List<Gateway>>().withOk(true).withResult(new ArrayList<>());
		try {
			retrofit2.Response<List<lora.ns.objenious.rest.Gateway>> response = objeniousService.getGateways().execute();
			if (response.isSuccessful()) {
				response.body().forEach(g -> {
					logger.info("Got gateway {}", g.getGatewayName());
					C8YData data = new C8YData();
					ConnectionState state = ConnectionState.AVAILABLE;
					switch(g.getStatus()) {
						case ACTIVE:
							state = ConnectionState.AVAILABLE;
							break;
						case ALERT:
							state = ConnectionState.AVAILABLE;
							break;
						case INACTIVE:
							state = ConnectionState.UNAVAILABLE;
							break;
						default:
							break;
					}
					Gateway gateway = new Gateway(g.getGatewayId(), g.getSerialNumber(), g.getGatewayName(), BigDecimal.valueOf(g.getLat()), BigDecimal.valueOf(g.getLng()), g.getGatewayType(), state, data);
					result.getResult().add(gateway);
				});
			} else {
				logger.error("Couldn't retrieve gateways with connector {}", this.getName());
				result.withOk(false).withMessage(response.errorBody().string());
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.withOk(false).withMessage(e.getMessage());
		}
		return result;
	}

	public List<Profile> getDeviceProfiles() {
		List<Profile> result = null;
		try {
			retrofit2.Response<List<Profile>> response = objeniousService.getProfiles().execute();
			if (response.isSuccessful()) {
				result = response.body();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public LNSResponse<Void> provisionGateway(lora.ns.gateway.GatewayProvisioning gatewayProvisioning) {
		return new LNSResponse<Void>().withOk(false).withMessage("Not supported");
	}

	public LNSResponse<Void> deprovisionGateway(String id) {
		return new LNSResponse<Void>().withOk(false).withMessage("Not supported");
	}
}
