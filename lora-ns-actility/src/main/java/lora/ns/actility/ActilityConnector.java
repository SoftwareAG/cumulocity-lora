package lora.ns.actility;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Properties;
import java.util.Random;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import org.joda.time.DateTime;

import c8y.ConnectionState;
import lombok.extern.slf4j.Slf4j;
import lora.codec.downlink.DownlinkData;
import lora.codec.uplink.C8YData;
import lora.ns.actility.rest.ActilityAdminService;
import lora.ns.actility.rest.ActilityCoreService;
import lora.ns.actility.rest.JwtInterceptor;
import lora.ns.actility.rest.model.BaseStation;
import lora.ns.actility.rest.model.BaseStationProfile;
import lora.ns.actility.rest.model.BaseStationStatistics.ConnectionStateEnum;
import lora.ns.actility.rest.model.BaseStationStatistics.HealthStateEnum;
import lora.ns.actility.rest.model.Connection;
import lora.ns.actility.rest.model.ConnectionHttpConfig;
import lora.ns.actility.rest.model.ConnectionRequest;
import lora.ns.actility.rest.model.DeviceCreate;
import lora.ns.actility.rest.model.DeviceProfile;
import lora.ns.actility.rest.model.DownlinkMessage;
import lora.ns.actility.rest.model.MessageSecurityParams;
import lora.ns.actility.rest.model.RFRegion;
import lora.ns.actility.rest.model.Route;
import lora.ns.actility.rest.model.Token;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.connector.LNSResponse;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.DeviceProvisioning.ProvisioningMode;
import lora.ns.device.EndDevice;
import lora.ns.gateway.Gateway;
import lora.ns.gateway.GatewayProvisioning;
import okhttp3.OkHttpClient;
import okhttp3.ResponseBody;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

@Slf4j
public class ActilityConnector extends LNSAbstractConnector {

	private ActilityCoreService actilityCoreService;
	private ActilityAdminService actilityAdminService;

	private String downlinkAsKey = "4e0ff46472fa1840f25368c066e94769";
	private String routeRef;

	class DXAdminJWTInterceptor extends JwtInterceptor {

		public DXAdminJWTInterceptor(String clientId, String clientSecret) {
			super(clientId, clientSecret);
		}

		@Override
		protected String getToken() {
			String token = null;
			try {
				Response<Token> response;
				response = actilityAdminService.getToken("client_credentials", this.clientId, this.clientSecret)
						.execute();
				if (response.isSuccessful() && response.body() != null) {
					token = response.body().getAccessToken();
					log.info("Successfully received a JWT: {}", token);
				} else {
					log.error("Can't obtain a JWT with the following reponse: {}", response.errorBody().string());
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			return token;
		}
	}

	public ActilityConnector(Properties properties) {
		super(properties);
	}

	public ActilityConnector(ManagedObjectRepresentation instance) {
		super(instance);
	}

	@Override
	protected void init() {
		HttpLoggingInterceptor interceptor = new HttpLoggingInterceptor();
		interceptor.setLevel(HttpLoggingInterceptor.Level.BODY);
		OkHttpClient dxClient = new OkHttpClient.Builder().addInterceptor(
				new DXAdminJWTInterceptor(properties.getProperty("username"), properties.getProperty("password")))
				.addInterceptor(interceptor)
				.build();

		String url = properties.getProperty("url");

		OkHttpClient client = new OkHttpClient.Builder().addInterceptor(interceptor).build();

		Retrofit core = new Retrofit.Builder().client(dxClient)
				.baseUrl(url + "/thingpark/dx/core/latest/api/")
				.addConverterFactory(JacksonConverterFactory.create()).build();
		Retrofit admin = new Retrofit.Builder().baseUrl(url + "/iot-flow/v1/")
				.client(client).addConverterFactory(JacksonConverterFactory.create()).build();
		actilityCoreService = core.create(ActilityCoreService.class);
		actilityAdminService = admin.create(ActilityAdminService.class);
	}

	@Override
	public LNSResponse<List<EndDevice>> getDevices() {
		LNSResponse<List<EndDevice>> result = new LNSResponse<List<EndDevice>>().withOk(true).withResult(new ArrayList<EndDevice>());

		return result;
	}

	@Override
	public LNSResponse<EndDevice> getDevice(String devEui) {
		LNSResponse<EndDevice> result = new LNSResponse<>();
		try {
			Response<List<DeviceCreate>> devs = actilityCoreService.getDeviceByEUI(devEui).execute();
			if (devs.isSuccessful() && !devs.body().isEmpty()) {
				DeviceCreate dev = devs.body().get(0);
				log.info("Device {} is named {}", devEui, dev.getName());
				result.withOk(true).withResult(new EndDevice(devEui, dev.getName(), null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.withOk(false).withMessage(e.getMessage());
		}
		return result;
	}

	@Override
	public LNSResponse<String> sendDownlink(DownlinkData operation) {
		LNSResponse<String> result = new LNSResponse<>();
		Random r = new Random(DateTime.now().getMillis());
		int downlinkCounter = r.nextInt();
		log.info("Will send {} to Thingpark.", operation.toString());
		try {
			DownlinkMessage message = new DownlinkMessage();
			message.setPayloadHex(operation.getPayload());
			message.setTargetPorts(operation.getFport().toString());
			MessageSecurityParams securityParams = new MessageSecurityParams();
			securityParams.setAsId("cumulocity");
			securityParams.setAsKey(downlinkAsKey);
			message.setSecurityParams(securityParams);
			Response<DownlinkMessage> response = actilityCoreService.sendDownlink(operation.getDevEui(), message).execute();
			log.info("Response from Thingpark was {}", response.code());
			result.withOk(true).withResult(String.valueOf(downlinkCounter));
		} catch (Exception e) {
			e.printStackTrace();
			result.withOk(false).withMessage(e.getMessage());
		}
		return result;
	}

	@Override
	public LNSResponse<Void> provisionDevice(DeviceProvisioning deviceProvisioning) {
		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);
		DeviceCreate device = new DeviceCreate();
		device.setEUI(deviceProvisioning.getDevEUI());
		device.setName(deviceProvisioning.getName());
		device.setProcessingStrategyId("ROUTE");
		device.getRouteRefs().add(routeRef);
		device.setDeviceProfileId(deviceProvisioning.getAdditionalProperties().getProperty("deviceProfile"));
		if (deviceProvisioning.getProvisioningMode() == ProvisioningMode.OTAA) {
			device.setActivationType("OTAA");
			device.setApplicationEUI(deviceProvisioning.getAppEUI());
			device.setApplicationKey(deviceProvisioning.getAppKey());
		} else {
			device.setActivationType("ABP");
		}

		try {
			Response<DeviceCreate> response = actilityCoreService.createDevice(device).execute();
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
	public LNSResponse<List<String>> configureRoutings(String url, String tenant, String login, String password) {
		LNSResponse<List<String>> result = new LNSResponse<List<String>>().withOk(true);
		log.info("Configuring routings to: {} with credentials: {}:{}", url, login, password);
		String connectionId = null;

		try {
			for (Route route : actilityCoreService.getRoutes().execute().body()) {
				if (route.getName().equals(tenant + "-" + getId())) {
					routeRef = route.getRef();
				}
			}
			for (Connection c : actilityCoreService.getConnections().execute().body()) {
				if (c.getName().equals(tenant + "-" + getId())) {
					connectionId = c.getId();
				}
			}
		} catch (Exception e1) {
			e1.printStackTrace();
			return result.withOk(false).withMessage(e1.getMessage());
		}
		ConnectionRequest connectionRequest = new ConnectionRequest();
		ConnectionHttpConfig configuration = new ConnectionHttpConfig();
		configuration.setDestinationURL(url + "/uplink");
		configuration.getHeaders().put("Authorization",
				"Basic " + Base64.getEncoder().encodeToString((tenant + "/" + login + ":" + password).getBytes()));
		configuration.setDownlinkAsId("cumulocity");
		configuration.setDownlinkAsKey(downlinkAsKey);
		connectionRequest.setConfiguration(configuration);
		connectionRequest.setName(tenant + "-" + this.getId());

		if (routeRef == null) {
			try {
				Response<Connection> response = actilityCoreService.createConnection(connectionRequest).execute();
				if (response.isSuccessful()) {
					for (Route route : actilityCoreService.getRoutes().execute().body()) {
						if (route.getName().equals(tenant + "-" + this.getId())) {
							routeRef = route.getRef();
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
				return result.withOk(false).withMessage(e.getMessage());
			}
		} else {
			try {
				actilityCoreService.updateConnection(connectionId, connectionRequest).execute();
			} catch (Exception e) {
				e.printStackTrace();
				return result.withOk(false).withMessage(e.getMessage());
			}
		}
		try {
			Response<List<DeviceCreate>> response = actilityCoreService.getDevices().execute();
			if (response.isSuccessful()) {
				response.body().forEach(d -> {
					if (!d.getRouteRefs().contains(routeRef)) {
						d.getRouteRefs().add(routeRef);
						try {
							actilityCoreService.updateDevice(d.getRef(), d).execute();
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				});
			} else {
				log.error("Error while retrieving the list of devices: {}", response.errorBody().string());
				result.withOk(false).withMessage(response.errorBody().string());
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.withOk(false).withMessage(e.getMessage());
		}

		return result;
	}

	@Override
	public LNSResponse<Void> removeRoutings(String tenant, List<String> routeIds) {
		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);
		try {
			Response<List<DeviceCreate>> response = actilityCoreService.getDevices().execute();
			if (response.isSuccessful()) {
				response.body().forEach(d -> {
					if (d.getRouteRefs().contains(routeRef)) {
						d.getRouteRefs().remove(routeRef);
						try {
							actilityCoreService.updateDevice(d.getRef(), d).execute();
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				});
			}
		} catch (Exception e) {
			e.printStackTrace();
			return result.withOk(false).withMessage(e.getMessage());
		}
		try {
			Response<List<Connection>> response = actilityCoreService.getConnections().execute();
			if (response.isSuccessful()) {
				response.body().forEach(connection -> {
					log.info("Found Connection {}", connection.getName());
					if (connection.getName().equals(tenant + "-" + this.getId())) {
						try {
							actilityCoreService.deleteConnection(connection.getId()).execute();
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				});
			}
		} catch (IOException e) {
			e.printStackTrace();
			return result.withOk(false).withMessage(e.getMessage());
		}
		return result;
	}

	@Override
	public LNSResponse<Void> deprovisionDevice(String deveui) {
		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);
		try {
			Response<List<DeviceCreate>> devs = actilityCoreService.getDeviceByEUI(deveui).execute();
			if (devs.isSuccessful() && !devs.body().isEmpty()) {
				Response<ResponseBody> r = actilityCoreService.deleteDevice(devs.body().get(0).getRef()).execute();
				if (!r.isSuccessful()) {
					result.withOk(false).withMessage(r.message());
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
			return result.withOk(false).withMessage(e.getMessage());
		}
		return result;
	}

	@Override
	public LNSResponse<List<Gateway>> getGateways() {
		LNSResponse<List<Gateway>> result = new LNSResponse<List<Gateway>>().withOk(true).withResult(new ArrayList<>());

		try {
			Response<List<BaseStation>> response = actilityCoreService.getBaseStations().execute();
			if (response.isSuccessful()) {
				for (BaseStation baseStation: response.body()) {
					Response<BaseStation> r = actilityCoreService.getBaseStation(baseStation.getRef()).execute();
					if (r.isSuccessful()) {
						baseStation = r.body();
						Gateway g = new Gateway();
						g.setGwEUI(baseStation.getUuid());
						if (baseStation.getSMN() != null) {
							g.setSerial(baseStation.getSMN());
						}
						g.setName(baseStation.getName());
						if (baseStation.getGeoLatitude() != null) {
							g.setLat(BigDecimal.valueOf(baseStation.getGeoLatitude()));
						}
						if (baseStation.getGeoLongitude() != null) {
							g.setLng(BigDecimal.valueOf(baseStation.getGeoLongitude()));
						}
						if (baseStation.getStatistics() != null) {
							C8YData data = new C8YData();
							if (baseStation.getStatistics().getConnectionState() == ConnectionStateEnum.CNX && baseStation.getStatistics().getHealthState() == HealthStateEnum.ACTIVE) {
								g.setStatus(ConnectionState.AVAILABLE);
							} else {
								g.setStatus(ConnectionState.UNAVAILABLE);
							}
							if (baseStation.getStatistics().getTemperature() != null) {
								data.addMeasurement(null, "Temperature", "T", "°C", BigDecimal.valueOf(baseStation.getStatistics().getTemperature()), new DateTime());
							}
							if (baseStation.getStatistics().getCpUUsage() != null) {
								data.addMeasurement(null, "CPU", "Usage", "%", BigDecimal.valueOf(baseStation.getStatistics().getCpUUsage()), new DateTime());
							}
							if (baseStation.getStatistics().getRaMUsage() != null) {
								data.addMeasurement(null, "RAM", "Usage", "%", BigDecimal.valueOf(baseStation.getStatistics().getRaMUsage()), new DateTime());
							}
							if (baseStation.getStatistics().getBatteryLevel() != null) {
								data.addMeasurement(null, "Battery", "level", "%", BigDecimal.valueOf(baseStation.getStatistics().getBatteryLevel()), new DateTime());
							}
							g.setData(data);
						}
						result.getResult().add(g);
					}
				}
			} else {
				log.error("Error while retrieving the list of gateways: {}", response.errorBody().string());
				result.withOk(false).withMessage(response.errorBody().string());
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.withOk(false).withMessage(e.getMessage());
		}

		return result;
	}

	public List<DeviceProfile> getDeviceProfiles() {
		List<DeviceProfile> result = null;
		try {
			Response<List<DeviceProfile>> response = actilityCoreService.getDeviceProfiles().execute();
			if (response.isSuccessful()) {
				result = response.body();
			} else {
				log.error("Error while retrieving the list of device profiles: {}", response.errorBody().string());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public LNSResponse<Void> provisionGateway(GatewayProvisioning gatewayProvisioning) {
		BaseStation baseStation = new BaseStation();
		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);

		try {
			baseStation.setName(gatewayProvisioning.getName());
			baseStation.setUuid(gatewayProvisioning.getGwEUI());
			baseStation.setSMN(gatewayProvisioning.getAdditionalProperties().getProperty("SMN"));
			if (gatewayProvisioning.getLat() != null) {
				baseStation.setGeoLatitude(gatewayProvisioning.getLat().floatValue());
			}
			if (gatewayProvisioning.getLng() != null) {
				baseStation.setGeoLongitude(gatewayProvisioning.getLng().floatValue());
			}
			baseStation.setBaseStationProfileId(gatewayProvisioning.getAdditionalProperties().getProperty("gatewayProfile"));
			baseStation.setRfRegionId(gatewayProvisioning.getAdditionalProperties().getProperty("rfRegion"));
			Response<BaseStation> response = actilityCoreService.createBaseStation(baseStation).execute();
			if (!response.isSuccessful()) {
				result.withOk(false).withMessage(response.errorBody().string());
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.withOk(false).withMessage(e.getMessage());
		}

		return result;
	}

	public LNSResponse<Void> deprovisionGateway(String id) {
		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);

		try {
			Response<ResponseBody> response = actilityCoreService.deleteBaseStation(id).execute();
			if (!response.isSuccessful()) {
				result.withOk(false).withMessage(response.errorBody().string());
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.withOk(false).withMessage(e.getMessage());
		}

		return result;
	}

	public List<BaseStationProfile> getBaseStationProfiles() {
		List<BaseStationProfile> result = null;
		try {
			Response<List<BaseStationProfile>> response = actilityCoreService.getBaseStationProfiles().execute();
			if (response.isSuccessful()) {
				result = response.body();
			} else {
				log.error("Error while retrieving the list of base station profiles: {}", response.errorBody().string());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public List<RFRegion> getRFRegions() {
		List<RFRegion> result = null;
		try {
			Response<List<RFRegion>> response = actilityCoreService.getRFRegions().execute();
			if (response.isSuccessful()) {
				result = response.body();
			} else {
				log.error("Error while retrieving the list of RF regions: {}", response.errorBody().string());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
}
