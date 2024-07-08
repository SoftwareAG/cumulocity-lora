package lora.ns.actility;

import static org.apache.commons.lang3.StringUtils.*;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.joda.time.DateTime;
import org.slf4j.LoggerFactory;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.joda.JodaModule;

import c8y.ConnectionState;
import feign.Client;
import feign.Feign;
import feign.FeignException.FeignClientException;
import feign.Logger.Level;
import feign.form.FormEncoder;
import feign.jackson.JacksonDecoder;
import feign.jackson.JacksonEncoder;
import feign.slf4j.Slf4jLogger;
import lombok.extern.slf4j.Slf4j;
import lora.codec.downlink.DownlinkData;
import lora.codec.uplink.C8YData;
import lora.ns.actility.api.AppServerApi;
import lora.ns.actility.api.BaseStationApi;
import lora.ns.actility.api.DeviceApi;
import lora.ns.actility.api.DownlinkApi;
import lora.ns.actility.api.model.appserver.AppServer;
import lora.ns.actility.api.model.appserver.AppServer.ContentTypeEnum;
import lora.ns.actility.api.model.appserver.AppServerCustomHttpHeadersInner;
import lora.ns.actility.api.model.appserver.AppServerHttpLorawanDestination;
import lora.ns.actility.api.model.appserver.AppServerStrategy;
import lora.ns.actility.api.model.appserver.AppServerUpdate;
import lora.ns.actility.api.model.appserver.DownlinkSecurity;
import lora.ns.actility.api.model.basestation.Bs;
import lora.ns.actility.api.model.basestation.BsAppServersInner;
import lora.ns.actility.api.model.basestation.BsBrief;
import lora.ns.actility.api.model.basestation.BsHealthState;
import lora.ns.actility.api.model.basestation.BsModel;
import lora.ns.actility.api.model.basestation.BsProfiles;
import lora.ns.actility.api.model.basestation.BsProfilesBriefsInner;
import lora.ns.actility.api.model.basestation.Bss;
import lora.ns.actility.api.model.common.Domain;
import lora.ns.actility.api.model.common.DomainGroup;
import lora.ns.actility.api.model.common.Token;
import lora.ns.actility.api.model.device.Device;
import lora.ns.actility.api.model.device.Device.ActivationEnum;
import lora.ns.actility.api.model.device.DeviceLorawanAppServer;
import lora.ns.actility.api.model.device.DeviceModel;
import lora.ns.actility.api.model.device.DeviceProfiles;
import lora.ns.actility.api.model.device.DeviceProfilesBriefsInner;
import lora.ns.actility.common.RandomUtils;
import lora.ns.actility.rest.ActilityServiceAccountService;
import lora.ns.actility.rest.JwtInterceptor;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.exception.LoraException;
import lora.ns.gateway.Gateway;
import lora.ns.gateway.GatewayProvisioning;

@Slf4j
public class ActilityConnector extends LNSAbstractConnector {

	private static final String THINGPARK_WIRELESS_REST = "/thingpark/wireless/rest";
	private static final String AS_ID_PROPERTY = "asId";
	private static final String AS_KEY_PROPERTY = "asKey";
	private static final String AS_ID_PREFIX = "cumulocity-";
	private static final String DEFAULT_AS_ID = "cumulocity";
	private static final String DEFAULT_AS_KEY = "4e0ff46472fa1840f25368c066e94769";

	private ActilityServiceAccountService actilityServiceAccountService;

	private DeviceApi deviceApi;
	private AppServerApi appServerApi;
	private BaseStationApi baseStationApi;
	private DownlinkApi downlinkV2Api;

	private String appServerId;

	private static final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JodaModule())
					.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
					.configure(SerializationFeature.INDENT_OUTPUT, true).setSerializationInclusion(Include.NON_NULL);

	class DXAdminJWTInterceptor extends JwtInterceptor {

		public DXAdminJWTInterceptor(String clientId, String clientSecret) {
			super(clientId, clientSecret);
		}

		@Override
		protected String getToken() {
			Token token = null;
			try {
				token = actilityServiceAccountService.getToken("client_credentials", this.clientId, this.clientSecret);
			} catch (Exception e) {
				throw new LoraException("Couldn't get JWT", e);
			}
			if (token == null) {
				throw new LoraException("Couldn't get JWT");
			}
			log.info("Successfully received a JWT: {}", token);
			return token.getAccessToken();
		}
	}

	public ActilityConnector(Properties properties) {
		super(properties);
	}

	public ActilityConnector(ManagedObjectRepresentation instance) {
		super(instance);
	}

	// SSLSocketFactory
	// Install the all-trusting trust manager
	private static SSLSocketFactory getSSLSocketFactory() {
		try {
			SSLContext sslContext = SSLContext.getInstance("SSL");
			sslContext.init(null, getTrustManager(), new SecureRandom());
			return sslContext.getSocketFactory();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	// TrustManager
	// trust manager that does not validate certificate chains
	private static TrustManager[] getTrustManager() {
		return new TrustManager[] { new X509TrustManager() {
			@Override
			public void checkClientTrusted(X509Certificate[] chain, String authType) {
				// Do nothing, we trust everything
			}

			@Override
			public void checkServerTrusted(X509Certificate[] chain, String authType) {
				// Do nothing, we trust everything
			}

			@Override
			public X509Certificate[] getAcceptedIssuers() {
				return new X509Certificate[] {};
			}
		} };
	}

	// HostnameVerifier
	private static HostnameVerifier getHostnameVerifier() {
		return (String s, SSLSession sslSession) -> true;
	}

	@Override
	protected void init() {
		final ch.qos.logback.classic.Logger serviceLogger = (ch.qos.logback.classic.Logger) LoggerFactory
						.getLogger("lora.ns.actility");
		serviceLogger.setLevel(ch.qos.logback.classic.Level.DEBUG);
		String url = properties.getProperty("url");
		var feignBuilder = Feign.builder().client(new Client.Default(getSSLSocketFactory(), getHostnameVerifier()))
						.decoder(new JacksonDecoder(objectMapper)).encoder(new FormEncoder())
						.logger(new Slf4jLogger("lora.ns.actility")).logLevel(Level.FULL)
						.requestInterceptor(template -> template.header("Content-Type",
										"application/x-www-form-urlencoded"));
		actilityServiceAccountService = feignBuilder.target(ActilityServiceAccountService.class,
						url + "/users-auth/protocol/");
		feignBuilder = Feign.builder().client(new Client.Default(getSSLSocketFactory(), getHostnameVerifier()))
						.decoder(new JacksonDecoder(objectMapper)).encoder(new JacksonEncoder(objectMapper))
						.logger(new Slf4jLogger("lora.ns.actility")).logLevel(Level.FULL)
						.requestInterceptor(template -> template.headers(Map.of("Content-Type",
										List.of("application/json"), "Accept", List.of("application/json"))));

		feignBuilder = feignBuilder.requestInterceptor(new DXAdminJWTInterceptor(properties.getProperty("username"),
						properties.getProperty("password")));

		deviceApi = feignBuilder.target(DeviceApi.class, url + THINGPARK_WIRELESS_REST);
		appServerApi = feignBuilder.target(AppServerApi.class, url + THINGPARK_WIRELESS_REST);
		baseStationApi = feignBuilder.target(BaseStationApi.class, url + THINGPARK_WIRELESS_REST);
		downlinkV2Api = feignBuilder.target(DownlinkApi.class, url + "/thingpark/lrc/rest");
	}

	@Override
	public List<EndDevice> getDevices() {
		return List.of();
	}

	@Override
	public EndDevice getDevice(String devEui) {
		var dev = deviceApi.getDevice("e" + devEui);
		log.info("Device {} is named {}", devEui, dev.getName());
		return new EndDevice(devEui, dev.getName(), dev.getCurrentClass().getValue());
	}

	@Override
	public String sendDownlink(DownlinkData operation) {
		log.info("Will send {} to Thingpark.", operation.toString());
		String correlationId = String.valueOf(DateTime.now().getMillis());
		downlinkV2Api.v2DownlinkPost(operation.getDevEui(), operation.getFport(), operation.getPayload(), null, null, 1,
						null, null, getAsId(), null, null, correlationId, null);
		return correlationId;
	}

	@Override
	public void provisionDevice(DeviceProvisioning deviceProvisioning) {
		var device = new Device();
		device.EUI(deviceProvisioning.getDevEUI()).name(deviceProvisioning.getName()).activation(ActivationEnum.OTAA)
						.appKey(deviceProvisioning.getAppKey()).appEUI(deviceProvisioning.getAppEUI())
						.addAppServersItem(new DeviceLorawanAppServer().ID(this.appServerId)).model(new DeviceModel()
										.ID(deviceProvisioning.getAdditionalProperties().getProperty("deviceProfile")));
		if (properties.containsKey("domain")) {
			device.addDomainsItem(new Domain().name(properties.getProperty("domain"))
							.group(new DomainGroup().name(properties.getProperty("group"))));
		} else {
			device.setDomains(null);
		}
		deviceApi.createDevice(device);
	}

	@Override
	public void configureRoutings(String url, String tenant, String login, String password) {
		String domain = properties.getProperty("domain");
		String group = properties.getProperty("group");
		var routeId = getProperty("routeId");
		log.info("Configuring routings to: {} with credentials: {}:{} and domain {}:{}", url, login, password, domain,
						group);
		if (routeId.isPresent()) {
			// Update appserver
			this.appServerId = routeId.get().toString();
			var currentAppServer = appServerApi.getAppServer(appServerId);
			String uid = currentAppServer.getID().split("\\.")[1];
			var appServer = new AppServerUpdate();
			appServer.setCustomHttpHeaders(new ArrayList<>());
			appServer.addCustomHttpHeadersItem(new AppServerCustomHttpHeadersInner().name("Authorization")
							.value("Basic " + Base64.getEncoder()
											.encodeToString((tenant + "/" + login + ":" + password).getBytes())));
			appServer.setDestinations(new ArrayList<>());
			appServer.addDestinationsItem(new AppServerHttpLorawanDestination().addAddressesItem(url + "/uplink")
							.strategy(AppServerStrategy.SEQUENTIAL).ports("*"));
			if (properties.containsKey("domain")) {
				appServer.addDomainsItem(new Domain().name(properties.getProperty("domain"))
								.group(new DomainGroup().name(properties.getProperty("group"))));
			}
			appServerApi.updateAppServer(uid, appServer);
		} else {
			// Create appserver
			var appServer = new AppServer().contentType(ContentTypeEnum.JSON)
							.addCustomHttpHeadersItem(new AppServerCustomHttpHeadersInner().name("Authorization")
											.value("Basic " + Base64.getEncoder().encodeToString(
															(tenant + "/" + login + ":" + password).getBytes())))
							.addDestinationsItem(new AppServerHttpLorawanDestination().addAddressesItem(url + "/uplink")
											.strategy(AppServerStrategy.SEQUENTIAL).ports("*"))
							.name(getName() + "-" + tenant + "-" + getId())
							.downlinkSecurity(new DownlinkSecurity(getAsId(), getAsKey()));
			if (properties.containsKey("domain")) {
				appServer.addDomainsItem(new Domain().name(properties.getProperty("domain"))
								.group(new DomainGroup().name(properties.getProperty("group"))));
			}
			this.appServerId = appServerApi.createAppServer(appServer).getID();
			setProperty("routeId", appServerId);
		}
	}

	@Override
	public Optional<String> getCustomRoutingBaseUrl() {
		return isNotBlank(properties.getProperty("webhook-url")) ? Optional.of(properties.getProperty("webhook-url"))
						: super.getCustomRoutingBaseUrl();
	}

	@Override
	public void removeRoutings() {
		// Don't remove the connections, update them
	}

	@Override
	public void deprovisionDevice(String deveui) {
		deviceApi.deleteDevice("e" + deveui.toUpperCase());
	}

	@Override
	public List<Gateway> getGateways() {
		final List<Gateway> result = new ArrayList<>();
		try {

			int i = 1;
			Bss baseStations;
			do {
				baseStations = baseStationApi.getBaseStations(i++);
				for (BsBrief b : baseStations.getBriefs()) {
					var baseStation = baseStationApi.getBaseStation(b.getHref());
					Gateway g = new Gateway();
					g.setGwEUI(baseStation.getLrrUUID());
					if (baseStation.getSmn() != null) {
						g.setSerial(baseStation.getSmn());
					}
					g.setName(baseStation.getName());
					if (baseStation.getLastGeoLat() != null) {
						g.setLat(BigDecimal.valueOf(baseStation.getLastGeoLat()));
					}
					if (baseStation.getLastGeoLon() != null) {
						g.setLng(BigDecimal.valueOf(baseStation.getLastGeoLon()));
					}
					if (baseStation.getHealthState() != null) {
						C8YData data = new C8YData();
						if (baseStation.getHealthState() == BsHealthState.ACTIVE) {
							g.setStatus(ConnectionState.AVAILABLE);
						} else {
							g.setStatus(ConnectionState.UNAVAILABLE);
						}
						if (baseStation.getTemp() != null) {
							data.addMeasurement(null, "Temperature", "T", "°C",
											BigDecimal.valueOf(baseStation.getTemp()), new DateTime());
						}
						if (baseStation.getCpu() != null) {
							data.addMeasurement(null, "CPU", "Usage", "%", BigDecimal.valueOf(baseStation.getCpu()),
											new DateTime());
						}
						if (baseStation.getRam() != null) {
							data.addMeasurement(null, "RAM", "Usage", "%", BigDecimal.valueOf(baseStation.getRam()),
											new DateTime());
						}
						g.setData(data);
					}
					result.add(g);
				}
			} while (baseStations.getMore());
		} catch (FeignClientException e) {
			if (e.status() == 401) {
				log.error("User can't access base stations API");
			} else {
				throw e;
			}
		}

		return result;
	}

	public List<DeviceProfilesBriefsInner> getDeviceProfiles() {
		List<DeviceProfilesBriefsInner> result = new ArrayList<>();
		DeviceProfiles deviceProfiles;
		int i = 1;
		do {
			deviceProfiles = deviceApi.getDeviceProfiles(i++);
			result.addAll(deviceProfiles.getBriefs());
		} while (deviceProfiles.getMore());
		return result;
	}

	public void provisionGateway(GatewayProvisioning gatewayProvisioning) {
		var baseStation = new Bs();
		baseStation.setName(gatewayProvisioning.getName());
		if (properties.containsKey("domain")) {
			baseStation.addDomainsItem(new Domain().name(properties.getProperty("domain"))
							.group(new DomainGroup().name(properties.getProperty("group"))));
		} else {
			baseStation.setDomains(null);
		}
		baseStation.setLrrUUID(gatewayProvisioning.getGwEUI());
		baseStation.setSmn(gatewayProvisioning.getAdditionalProperties().getProperty("SMN"));
		baseStation.setPublicKey(gatewayProvisioning.getAdditionalProperties().getProperty("publicKey"));
		baseStation.setModel(
						new BsModel().ID(gatewayProvisioning.getAdditionalProperties().getProperty("gatewayProfile")));
		baseStation.addAppServersItem(new BsAppServersInner().ID(this.appServerId));
		baseStationApi.createBaseStation(baseStation);
	}

	public void deprovisionGateway(String id) {
		baseStationApi.deleteBaseStation("u" + id);
	}

	@Override
	public Properties getInitProperties() {
		Properties initProperties = super.getInitProperties();
		initProperties.put(AS_ID_PROPERTY, AS_ID_PREFIX + RandomUtils.generateRandomHexString(16));
		initProperties.put(AS_KEY_PROPERTY, RandomUtils.generateRandomHexString(32));
		return initProperties;
	}

	public List<BsProfilesBriefsInner> getBaseStationProfiles() {
		List<BsProfilesBriefsInner> result = new ArrayList<>();
		BsProfiles bsProfiles;
		int i = 1;
		do {
			bsProfiles = baseStationApi.getBaseStationProfiles(i++);
			result.addAll(bsProfiles.getBriefs());
		} while (bsProfiles.getMore());
		return result;
	}

	public boolean hasGatewayManagementCapability() {
		return true;
	}

	private String getAsId() {
		return getProperty(AS_ID_PROPERTY).map(Object::toString).orElse(DEFAULT_AS_ID);
	}

	private String getAsKey() {
		return getProperty(AS_KEY_PROPERTY).map(Object::toString).orElse(DEFAULT_AS_KEY);
	}
}
