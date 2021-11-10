package lora.ns.objenious;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
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
	public List<EndDevice> getDevices() {
		List<EndDevice> result = new ArrayList<>();
		try {
			retrofit2.Response<List<Device>> response = objeniousService.getDevices().execute();
			List<Device> devices = response.body();
			if (devices != null) {
				result = devices.stream()
						.map(device -> new EndDevice(device.getProperties().getDeveui(), device.getLabel(), ""))
						.collect(Collectors.toList());
			}
		} catch (Exception e) {
			e.printStackTrace();
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
	public Optional<EndDevice> getDevice(String devEui) {
		EndDevice result = null;
		try {
			retrofit2.Response<Device> response = objeniousService.getDevice(devEui).execute();
			if (response.isSuccessful()) {
				Device device = response.body();
				result = new EndDevice(devEui, device.getLabel(), "A");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Optional.ofNullable(result);
	}

	@Override
	public String sendDownlink(DownlinkData operation) {
		String result = null;
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
				result = response.body().getCommandId().toString();
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}

		return result;
	}

	@Override
	public boolean provisionDevice(DeviceProvisioning deviceProvisioning) {
		boolean result = false;
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
				result = response.isSuccessful();
				if (!result) {
					logger.error(response.errorBody().string());
				}
			} catch (Exception e1) {
				e1.printStackTrace();
			}
		} else {
			if (!device.isEnabled()) {
				try {
					retrofit2.Response<Device> response = objeniousService
							.reactivateDevice(deviceProvisioning.getDevEUI()).execute();
					result = response.isSuccessful();
					if (!result) {
						logger.error(response.errorBody().string());
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return result;
	}

	public void configureRouting(String url, String tenant, String login, String password, String name,
			MessageTypeEnum messageType) {
		assert objeniousService != null : "objeniousService is not initialized";

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
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void configureRoutings(String url, String tenant, String login, String password) {
		logger.info("Configuring routings to: {} with credentials: {}:{}", url, login, password);
		configureRouting(url + "/downlink", tenant, login, password, tenant + "-" + this.getId() + "-downlink",
				MessageTypeEnum.DOWNLINK);
		configureRouting(url + "/uplink", tenant, login, password, tenant + "-" + this.getId() + "-uplink",
				MessageTypeEnum.UPLINK);
	}

	private void removeRouting(String name) {
		try {
			List<ScenarioRoutingReader> routings = objeniousService.getRouting().execute().body();
			if (routings != null) {
				routings.stream().filter(routing -> routing.getName().equals(name)).forEach(routing -> {
					try {
						objeniousService.deleteRouting(routing.getId()).execute();
					} catch (Exception e) {
						e.printStackTrace();
					}
				});
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}
	}

	@Override
	public void removeRoutings(String tenant) {
		removeRouting(tenant + "-" + this.getId() + "-uplink");
		removeRouting(tenant + "-" + this.getId() + "-downlink");
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
	public boolean deprovisionDevice(String deveui) {
		boolean result = false;
		try {
			result = objeniousService.deprovisionDevice(deveui).execute().isSuccessful();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public List<Gateway> getGateways() {
		logger.info("Getting list of gateways with connector {}...", this.getName());
		List<Gateway> result = new ArrayList<>();
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
					Gateway gateway = new Gateway(g.getGatewayId(), g.getGatewayName(), BigDecimal.valueOf(g.getLat()), BigDecimal.valueOf(g.getLng()), g.getGatewayType(), state, data);
					result.add(gateway);
				});
			} else {
				logger.error("Couldn't retrieve gateways with connector {}", this.getName());
			}
		} catch (Exception e) {
			e.printStackTrace();
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
}
