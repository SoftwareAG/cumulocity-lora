package lora.ns.loriot;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.joda.JodaModule;

import feign.Feign;
import feign.FeignException;
import feign.Logger.Level;
import feign.Response;
import feign.RetryableException;
import feign.Retryer;
import feign.jackson.JacksonDecoder;
import feign.jackson.JacksonEncoder;
import feign.slf4j.Slf4jLogger;
import lora.codec.downlink.DownlinkData;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.gateway.Gateway;
import lora.ns.loriot.rest.LoriotService;
import lora.ns.loriot.rest.model.AbpDeviceRegistration;
import lora.ns.loriot.rest.model.App;
import lora.ns.loriot.rest.model.Downlink;
import lora.ns.loriot.rest.model.DownlinkResponse;
import lora.ns.loriot.rest.model.HttpPush;
import lora.ns.loriot.rest.model.OtaaDeviceRegistration;
import lora.ns.loriot.rest.model.Output;
import lora.ns.loriot.rest.model.Session;

public class LoriotConnector extends LNSAbstractConnector {

	private LoriotService loriotService;
	private String sessionId;

	private final Logger logger = LoggerFactory.getLogger(LoriotConnector.class);

	private void login() {
		String user = getProperties().getProperty("user");
		String pwd = getProperties().getProperty("pwd");
		RestTemplate restTemplate = new RestTemplate();
		String request = String.format("{\"user\":\"%s\", \"pwd\":\"%s\"}", user, pwd);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		List<MediaType> mediaTypes = new ArrayList<>();
		mediaTypes.add(MediaType.APPLICATION_JSON);
		headers.setAccept(mediaTypes);
		Session session = restTemplate.postForObject(getProperties().getProperty("url") + "/1/pub/login",
						new HttpEntity<String>(request, headers), Session.class);
		if (session != null) {
			sessionId = session.getSession();
			logger.info("Received session: {}", sessionId);
		} else {
			throw new IllegalStateException("Cannot log into Loriot");
		}
	}

	public LoriotConnector(Properties properties) {
		super(properties);
	}

	public LoriotConnector(ManagedObjectRepresentation instance) {
		super(instance);
	}

	private static final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JodaModule())
					.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
					.configure(SerializationFeature.INDENT_OUTPUT, true).setSerializationInclusion(Include.NON_NULL);

	@Override
	protected void init() {
		login();
		final ch.qos.logback.classic.Logger serviceLogger = (ch.qos.logback.classic.Logger) LoggerFactory
						.getLogger("lora.ns.loriot");
		serviceLogger.setLevel(ch.qos.logback.classic.Level.DEBUG);
		var feignBuilder = Feign.builder().decoder(new JacksonDecoder(objectMapper))
						.encoder(new JacksonEncoder(objectMapper)).logger(new Slf4jLogger("lora.ns.loriot"))
						.logLevel(Level.FULL)
						.requestInterceptor(template -> template.headers(
										Map.of("Authorization", List.of("Session " + sessionId), "Content-Type",
														List.of(properties.getProperty("application/json")), "Accept",
														List.of(properties.getProperty("application/json")))))
						.errorDecoder((String methodKey, Response response) -> {
							FeignException exception = feign.FeignException.errorStatus(methodKey, response);
							int status = response.status();
							if (status == 403) {
								login();
								return new RetryableException(response.status(), exception.getMessage(),
												response.request().httpMethod(), exception, 1000L, response.request());
							}
							return exception;
						}).retryer(new Retryer.Default());
		loriotService = feignBuilder.target(LoriotService.class, getProperties().getProperty("url"));
	}

	@Override
	public List<EndDevice> getDevices() {
		return loriotService.getDevices(getProperties().getProperty("appid")).stream()
						.map(device -> new EndDevice(device.getDeveui(), device.getTitle(), device.getDevclass()))
						.collect(Collectors.toList());
	}

	@Override
	public EndDevice getDevice(String devEui) {
		var device = loriotService.getDevice(getProperties().getProperty("appid"), devEui);
		return new EndDevice(devEui, device.getTitle(), device.getDevclass());
	}

	@Override
	public String sendDownlink(DownlinkData operation) {
		String token = loriotService.getTokens(getProperties().getProperty("appid")).iterator().next();
		logger.info("Will send {} to Loriot.", operation.toString());
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		List<MediaType> mediaTypes = new ArrayList<>();
		mediaTypes.add(MediaType.APPLICATION_JSON);
		headers.setAccept(mediaTypes);
		headers.setBearerAuth(token);
		Downlink downlink = new Downlink(operation.getDevEui(), operation.getFport(), operation.getPayload(),
						getProperties().getProperty("appid"));
		logger.info("Will send {} to Loriot.", downlink.toJson());
		DownlinkResponse response = restTemplate.postForObject(getProperties().getProperty("url") + "/1/rest",
						new HttpEntity<String>(downlink.toJson(), headers), DownlinkResponse.class);
		return response.getSeqdn();
	}

	@Override
	public void provisionDevice(DeviceProvisioning deviceProvisioning) {
		OtaaDeviceRegistration deviceCreate = new OtaaDeviceRegistration();
		deviceCreate.setTitle(deviceProvisioning.getName());
		deviceCreate.setDeveui(deviceProvisioning.getDevEUI());
		switch (deviceProvisioning.getProvisioningMode()) {
		case ABP:
			provisionDeviceAbp(deviceProvisioning);
			break;
		case OTAA:
		default:
			provisionDeviceOtaa(deviceProvisioning);
			break;
		}
	}

	private void provisionDeviceOtaa(DeviceProvisioning deviceProvisioning) {
		OtaaDeviceRegistration deviceCreate = new OtaaDeviceRegistration();
		deviceCreate.setTitle(deviceProvisioning.getName());
		deviceCreate.setDeveui(deviceProvisioning.getDevEUI());
		deviceCreate.setAppeui(deviceProvisioning.getAppEUI());
		deviceCreate.setAppkey(deviceProvisioning.getAppKey());
		deviceCreate.setDescription("");
		deviceCreate.setDevclass(Optional.ofNullable(deviceProvisioning.getDeviceClass().name()).orElse("A"));

		loriotService.createDeviceOtaa(getProperties().getProperty("appid"), deviceCreate);
	}

	private void provisionDeviceAbp(DeviceProvisioning deviceProvisioning) {
		AbpDeviceRegistration deviceCreate = new AbpDeviceRegistration();
		deviceCreate.setTitle(deviceProvisioning.getName());
		deviceCreate.setDeveui(deviceProvisioning.getDevEUI());
		deviceCreate.setAppskey(deviceProvisioning.getAppSKey());
		deviceCreate.setNwkskey(deviceProvisioning.getNwkSKey());
		deviceCreate.setDevaddr(deviceProvisioning.getDevAddr());
		deviceCreate.setDescription("");
		deviceCreate.setDevclass(Optional.ofNullable(deviceProvisioning.getDeviceClass().name()).orElse("A"));

		loriotService.createDeviceAbp(getProperties().getProperty("appid"), deviceCreate);
	}

	@Override
	public void configureRoutings(String url, String tenant, String login, String password) {
		logger.info("Configuring routings to: {} with credentials: {}:{}", url, login, password);
		var outputs = loriotService.getOutputs(getProperties().getProperty("appid"));
		int i = 0;
		for (Output output : outputs) {
			logger.info("Detected {} output config", output.get_id());
			if (output.get_id().equals("httppush")) {
				logger.info("Deleting existing httppush output config");
				loriotService.deleteOutput(getProperties().getProperty("appid"), i);
			}
			i++;
		}
		HttpPush httpPush = new HttpPush(url + "/uplink", "Basic "
						+ Base64.getEncoder().encodeToString((tenant + "/" + login + ":" + password).getBytes()));
		loriotService.createHttpPush(getProperties().getProperty("appid"), httpPush);
	}

	@Override
	public void removeRoutings() {
		// Not implemented
	}

	public List<App> getApps() {
		return loriotService.getApps().getApps();
	}

	@Override
	public void deprovisionDevice(String deveui) {
		loriotService.removeDevice(getProperties().getProperty("appid"), deveui);
	}

	@Override
	public List<Gateway> getGateways() {
		return List.of();
	}

	public void provisionGateway(lora.ns.gateway.GatewayProvisioning gatewayProvisioning) {
		// Not implemented
	}

	public void deprovisionGateway(String id) {
		// Not implemented
	}

	public boolean hasGatewayManagementCapability() {
		return false;
	}
}
