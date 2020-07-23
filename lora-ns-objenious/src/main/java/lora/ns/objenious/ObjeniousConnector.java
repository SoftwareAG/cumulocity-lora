package lora.ns.objenious;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Properties;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import lora.codec.DownlinkData;
import lora.ns.DeviceProvisioning;
import lora.ns.EndDevice;
import lora.ns.connector.LNSAbstractConnector;
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
import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

public class ObjeniousConnector extends LNSAbstractConnector {

	private ObjeniousService objeniousService;

	private final Logger logger = LoggerFactory.getLogger(getClass());

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
		//logger.info("Initializing Retrofit client to Objenious API");
		OkHttpClient okHttpClient = new OkHttpClient.Builder().addInterceptor(new APIKeyInterceptor()).build();

		Retrofit retrofit = new Retrofit.Builder().client(okHttpClient).baseUrl("https://api.objenious.com/v1/")
				.addConverterFactory(JacksonConverterFactory.create()).build();
		objeniousService = retrofit.create(ObjeniousService.class);
	}

	@Override
	public List<EndDevice> getDevices() {
		List<EndDevice> result = new ArrayList<EndDevice>();
		try {
			retrofit2.Response<List<Device>> response = objeniousService.getDevices().execute();
			List<Device> devices = response.body();
			if (devices != null) {
				result = devices.stream().map(
						device -> new EndDevice(device.getProperties().get("deveui"), device.getLabel(), "", "", ""))
						.collect(Collectors.toList());
			}
		} catch (IOException e) {
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
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return result;
	}

	@Override
	public Optional<EndDevice> getDevice(String devEui) {
		EndDevice result = null;
		try {
			Device device = objeniousService.getDevice(devEui).execute().body();
			result = new EndDevice(devEui, device.getLabel(), "", "", "");
		} catch (IOException e) {
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
			retrofit2.Response<DownlinkResponse> response = objeniousService.sendCommand(operation.getDevEui(), downlinkCreate).execute();
			if (response.isSuccessful()) {
				result = response.body().getCommandId().toString();
			}
		} catch (IOException e1) {
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
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		if (device == null) {
			DeviceCreate deviceCreate = new DeviceCreate();
			deviceCreate.setLabel(deviceProvisioning.getName());
			deviceCreate.setDeveui(deviceProvisioning.getDevEUI());
			deviceCreate.setAppeui(deviceProvisioning.getAppEUI());
			deviceCreate.setAppkey(deviceProvisioning.getAppKey());
			deviceCreate.setLat(deviceProvisioning.getLat());
			deviceCreate.setLng(deviceProvisioning.getLng());
			deviceCreate.setGroupId(Integer.parseInt(properties.getProperty("groupId")));
			deviceCreate.setProfileId(1);
	
			try {
				retrofit2.Response<Device> response = objeniousService.createDevice(deviceCreate).execute();
				result = response.isSuccessful();
				if (!result) {
					logger.error(response.errorBody().string());
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			if (!device.isEnabled()) {
				try {
					retrofit2.Response<Device> response = objeniousService.reactivateDevice(deviceProvisioning.getDevEUI()).execute();
					result = response.isSuccessful();
					if (!result) {
						logger.error(response.errorBody().string());
					}
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return result;
	}

	public void configureRouting(String url, String tenant, String login, String password, String name,
			MessageTypeEnum messageType) {
		assert objeniousService != null : "objeniousService is not initialized";
		try {
			List<ScenarioRouting> routings = objeniousService.getRouting().execute().body();
			if (routings != null) {
				routings.stream().filter(routing -> routing.getName().equals(name))
						.forEach(routing -> {
							try {
								objeniousService.deleteRouting(routing.getId()).execute();
							} catch (IOException e) {
								e.printStackTrace();
							}
						});
			}
		} catch (IOException e1) {
			e1.printStackTrace();
		}

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
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void configureRoutings(String url, String tenant, String login, String password) {
		logger.info("Configuring routings to: {} with credentials: {}:{}", url, login, password);
		configureRouting(url + "/downlink", tenant, login, password, tenant + "-" + this.getId() + "-downlink", MessageTypeEnum.DOWNLINK);
		configureRouting(url + "/uplink", tenant, login, password, tenant + "-" + this.getId() + "-uplink", MessageTypeEnum.UPLINK);
	}
	
	private void removeRouting(String name) {
		try {
			List<ScenarioRouting> routings = objeniousService.getRouting().execute().body();
			if (routings != null) {
				routings.stream().filter(routing -> routing.getName().equals(name))
						.forEach(routing -> {
							try {
								objeniousService.deleteRouting(routing.getId()).execute();
							} catch (IOException e) {
								e.printStackTrace();
							}
						});
			}
		} catch (IOException e1) {
			e1.printStackTrace();
		}
	}

	@Override
	public void removeRoutings() {
		removeRouting(this.getId() + "-uplink");
		removeRouting(this.getId() + "-downlink");
	}
	
	public List<Group> getGroups() {
		List<Group> result = new ArrayList<Group>();
		
		try {
			result = objeniousService.getGroups().execute().body();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return result;
	}

	@Override
	public boolean deprovisionDevice(String deveui) {
		boolean result = false;
		try {
			result = objeniousService.deprovisionDevice(deveui).execute().isSuccessful();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}
}
