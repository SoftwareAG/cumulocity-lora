package lora.ns.orbiwise;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.joda.JodaModule;

import feign.Feign;
import feign.Logger.Level;
import feign.jackson.JacksonDecoder;
import feign.jackson.JacksonEncoder;
import feign.slf4j.Slf4jLogger;
import lora.codec.downlink.DownlinkData;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.gateway.Gateway;
import lora.ns.orbiwise.rest.OrbiwiseService;
import lora.ns.orbiwise.rest.model.DeviceCreate;
import lora.ns.orbiwise.rest.model.Pushmode;

public class OrbiwiseConnector extends LNSAbstractConnector {

	private OrbiwiseService orbiwiseService;

	private final Logger logger = LoggerFactory.getLogger(OrbiwiseConnector.class);

	private enum DeviceClass {
		A(0), B(1), C(2);

		private int loraClass;

		static final Map<Integer, DeviceClass> BY_VALUE = new HashMap<>();

		static {
			for (DeviceClass f : values()) {
				BY_VALUE.put(f.loraClass, f);
			}
		}

		private DeviceClass(int loraClass) {
			this.loraClass = loraClass;
		}
	}

	private static final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JodaModule())
					.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
					.configure(SerializationFeature.INDENT_OUTPUT, true).setSerializationInclusion(Include.NON_NULL);

	public OrbiwiseConnector(Properties properties) {
		super(properties);
	}

	public OrbiwiseConnector(ManagedObjectRepresentation instance) {
		super(instance);
	}

	@Override
	protected void init() {
		final ch.qos.logback.classic.Logger serviceLogger = (ch.qos.logback.classic.Logger) LoggerFactory
						.getLogger("lora.ns.orbiwise");
		serviceLogger.setLevel(ch.qos.logback.classic.Level.DEBUG);
		var feignBuilder = Feign.builder().decoder(new JacksonDecoder(objectMapper))
						.encoder(new JacksonEncoder(objectMapper)).logger(new Slf4jLogger("lora.ns.orbiwise"))
						.logLevel(Level.FULL)
						.requestInterceptor(template -> template
										.header("Authorization", "Basic " + Base64.getEncoder()
														.encodeToString((properties.getProperty("username") + ":"
																		+ properties.getProperty("password"))
																						.getBytes()))
										.header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
										.header("Accept", MediaType.APPLICATION_JSON_VALUE));
		orbiwiseService = feignBuilder.target(OrbiwiseService.class, "https://eu.saas.orbiwise.com/rest/");
	}

	@Override
	public List<EndDevice> getDevices() {
		return orbiwiseService.getDevices().stream()
						.map(device -> new EndDevice(device.getDeveui(), device.getDeveui(),
										DeviceClass.BY_VALUE.get(device.getLora_device_class()).name()))
						.collect(Collectors.toList());
	}

	@Override
	public EndDevice getDevice(String devEui) {
		var device = orbiwiseService.getDevice(devEui);
		return new EndDevice(devEui, devEui, DeviceClass.BY_VALUE.get(device.getLora_device_class()).name());
	}

	@Override
	public String sendDownlink(DownlinkData operation) {
		logger.info("Will send {} to Orbiwan.", operation.toString());

		return orbiwiseService.sendCommand(operation.getDevEui(), operation.getFport(), operation.getPayload()).getId()
						.toString();
	}

	@Override
	public void provisionDevice(DeviceProvisioning deviceProvisioning) {
		DeviceCreate deviceCreate = new DeviceCreate();
		deviceCreate.setDeveui(deviceProvisioning.getDevEUI());
		deviceCreate.setAppeui(deviceProvisioning.getAppEUI());
		deviceCreate.setAppkey(deviceProvisioning.getAppKey());
		if (deviceProvisioning.getLat() != null) {
			deviceCreate.setLatitude(deviceProvisioning.getLat());
		}
		if (deviceProvisioning.getLng() != null) {
			deviceCreate.setLongitude(deviceProvisioning.getLng());
		}

		orbiwiseService.createDevice(deviceCreate);
	}

	public void configureRouting(String url, String tenant, String login, String password, String subscriptions) {
		Pushmode pushmode = new Pushmode();
		pushmode.setAuth_string("Basic "
						+ Base64.getEncoder().encodeToString((tenant + "/" + login + ":" + password).getBytes()));
		pushmode.setData_format("hex");
		pushmode.setEnabled(true);
		URL urlObject = null;
		try {
			urlObject = new URL(url);
			pushmode.setHost(urlObject.getProtocol() + "://" + urlObject.getHost());
			pushmode.setPath_prefix(urlObject.getPath());
			pushmode.setPort(urlObject.getDefaultPort());
			pushmode.setPush_subscription(subscriptions);
			pushmode.setRetry_policy(1);

			orbiwiseService.createHttpRouting(pushmode);
		} catch (MalformedURLException e1) {
			e1.printStackTrace();
			throw new IllegalStateException(e1);
		}
	}

	@Override
	public void configureRoutings(String url, String tenant, String login, String password) {
		logger.info("Configuring routings to: {} with credentials: {}:{}", url, login, password);
		configureRouting(url, tenant, login, password, "payloads_dl,payloads_ul");
	}

	@Override
	public void removeRoutings() {
		orbiwiseService.stopRouting();
	}

	@Override
	public void deprovisionDevice(String deveui) {
		orbiwiseService.deprovisionDevice(deveui);
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

	@Override
	public boolean hasGatewayManagementCapability() {
		return false;
	}
}
