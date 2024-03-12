package lora.ns.objenious;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.joda.JodaModule;

import c8y.ConnectionState;
import feign.Feign;
import feign.Logger.Level;
import feign.jackson.JacksonDecoder;
import feign.jackson.JacksonEncoder;
import feign.slf4j.Slf4jLogger;
import lora.codec.downlink.DownlinkData;
import lora.codec.uplink.C8YData;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.gateway.Gateway;
import lora.ns.objenious.rest.DeviceCreate;
import lora.ns.objenious.rest.DownlinkCreate;
import lora.ns.objenious.rest.DownlinkCreate.ValidUntilEnum;
import lora.ns.objenious.rest.DownlinkCreateProtocolData;
import lora.ns.objenious.rest.Group;
import lora.ns.objenious.rest.Headers;
import lora.ns.objenious.rest.ObjeniousService;
import lora.ns.objenious.rest.Profile;
import lora.ns.objenious.rest.RoutingHttp;
import lora.ns.objenious.rest.ScenarioRoutingCreateUpdate;
import lora.ns.objenious.rest.ScenarioRoutingCreateUpdate.FormatTypeEnum;
import lora.ns.objenious.rest.ScenarioRoutingCreateUpdate.MessageTypeEnum;

public class ObjeniousConnector extends LNSAbstractConnector {

	private ObjeniousService objeniousService;

	private final Logger logger = LoggerFactory.getLogger(ObjeniousConnector.class);

	public ObjeniousConnector(Properties properties) {
		super(properties);
	}

	public ObjeniousConnector(ManagedObjectRepresentation instance) {
		super(instance);
	}

	private static final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JodaModule())
					.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
					.configure(SerializationFeature.INDENT_OUTPUT, true).setSerializationInclusion(Include.NON_NULL);

	@Override
	protected void init() {
		final ch.qos.logback.classic.Logger serviceLogger = (ch.qos.logback.classic.Logger) LoggerFactory
						.getLogger("lora.ns.objenious");
		serviceLogger.setLevel(ch.qos.logback.classic.Level.DEBUG);
		var feignBuilder = Feign.builder().decoder(new JacksonDecoder(objectMapper))
						.encoder(new JacksonEncoder(objectMapper)).logger(new Slf4jLogger("lora.ns.objenious"))
						.logLevel(Level.FULL)
						.requestInterceptor(template -> template.headers(
										Map.of("apikey", List.of(properties.getProperty("apikey")), "Content-Type",
														List.of(properties.getProperty("application/json")), "Accept",
														List.of(properties.getProperty("application/json")))));

		objeniousService = feignBuilder.target(ObjeniousService.class, "https://api.objenious.com/v1/");
	}

	@Override
	public List<EndDevice> getDevices() {
		var devices = objeniousService.getDevices();
		return devices.stream().map(device -> new EndDevice(device.getProperties().getDeveui(), device.getLabel(), ""))
						.collect(Collectors.toList());
	}

	public Profile getProfile(int id) {
		return objeniousService.getProfile(id);
	}

	@Override
	public EndDevice getDevice(String devEui) {
		var device = objeniousService.getDevice(devEui);
		return new EndDevice(devEui, device.getLabel(), "A");
	}

	@Override
	public String sendDownlink(DownlinkData operation) {
		logger.info("Will send {} to Objenious.", operation.toString());
		DownlinkCreateProtocolData protocolData = new DownlinkCreateProtocolData();
		protocolData.setPort(operation.getFport());
		DownlinkCreate downlinkCreate = new DownlinkCreate();
		downlinkCreate.setProtocolData(protocolData);
		downlinkCreate.setCleartext(operation.getPayload());
		downlinkCreate.setValidUntil(ValidUntilEnum.NEXT_JOIN);
		downlinkCreate.setConfirmed(true);

		return objeniousService.sendCommand(operation.getDevEui(), downlinkCreate).getCommandId().toString();
	}

	@Override
	public void provisionDevice(DeviceProvisioning deviceProvisioning) {
		DeviceCreate deviceCreate = new DeviceCreate();
		deviceCreate.setLabel(deviceProvisioning.getName());
		deviceCreate.setDeveui(deviceProvisioning.getDevEUI());
		deviceCreate.setAppeui(deviceProvisioning.getAppEUI());
		deviceCreate.setAppkey(deviceProvisioning.getAppKey());
		deviceCreate.setLat(deviceProvisioning.getLat());
		deviceCreate.setLng(deviceProvisioning.getLng());
		deviceCreate.setGroupId(Integer.parseInt(properties.getProperty("groupId")));
		deviceCreate.setProfileId(
						Integer.valueOf(deviceProvisioning.getAdditionalProperties().getProperty("deviceProfile")));
		objeniousService.createDevice(deviceCreate);
	}

	public void configureRouting(String url, String tenant, String login, String password, String name,
					MessageTypeEnum messageType) {
		RoutingHttp routingHttp = new RoutingHttp();
		routingHttp.setUrl(url);
		routingHttp.setMethod(RoutingHttp.MethodEnum.POST);
		Headers headers = new Headers();
		headers.put("Authorization", "Basic "
						+ Base64.getEncoder().encodeToString((tenant + "/" + login + ":" + password).getBytes()));
		routingHttp.setHeaders(headers);
		ScenarioRoutingCreateUpdate scenarioRoutingCreateUpdate = new ScenarioRoutingCreateUpdate();
		scenarioRoutingCreateUpdate.setHttp(routingHttp);
		scenarioRoutingCreateUpdate.setName(name);
		scenarioRoutingCreateUpdate.setMessageType(messageType);
		scenarioRoutingCreateUpdate.setFormatType(FormatTypeEnum.MESSAGES);
		scenarioRoutingCreateUpdate.setEnabled(true);
		scenarioRoutingCreateUpdate.setGroupId(Integer.parseInt(properties.getProperty("groupId")));

		var route = objeniousService.createHttpRouting(scenarioRoutingCreateUpdate);
		if (name.endsWith("downlink")) {
			this.setProperty("downlinkRouteId", route.getId());
		} else {
			this.setProperty("uplinkRouteId", route.getId());
		}
	}

	@Override
	public void configureRoutings(String url, String tenant, String login, String password) {
		logger.info("Configuring routings to: {} with credentials: {}:{}", url, login, password);

		this.objeniousService.getRouting().forEach(routing -> {
			if (routing.getName().contains(tenant)) {
				try {
					this.objeniousService.deleteRouting(routing.getId());
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});

		configureRouting(url + "/downlink", tenant, login, password, tenant + "-" + this.getId() + "-downlink",
						MessageTypeEnum.DOWNLINK);
		configureRouting(url + "/uplink", tenant, login, password, tenant + "-" + this.getId() + "-uplink",
						MessageTypeEnum.UPLINK);
	}

	private void removeRouting(String id) {
		objeniousService.deleteRouting(Integer.parseInt(id));
	}

	@Override
	public void removeRoutings() {
		Optional<Object> uplinkRouteId = getProperty("uplinkRouteId");
		Optional<Object> downlinkRouteId = getProperty("downlinkRouteId");
		uplinkRouteId.ifPresent(id -> {
			removeRouting(id.toString());
		});
		downlinkRouteId.ifPresent(id -> {
			removeRouting(id.toString());
		});
	}

	public List<Group> getGroups() {
		return objeniousService.getGroups();
	}

	@Override
	public void deprovisionDevice(String deveui) {
		objeniousService.deprovisionDevice(deveui);
	}

	@Override
	public List<Gateway> getGateways() {
		logger.info("Getting list of gateways with connector {}...", this.getName());
		List<Gateway> result = new ArrayList<>();
		var gateways = objeniousService.getGateways();
		gateways.forEach(g -> {
			logger.info("Got gateway {}", g.getGatewayName());
			C8YData data = new C8YData();
			ConnectionState state = ConnectionState.AVAILABLE;
			switch (g.getStatus()) {
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
			Gateway gateway = new Gateway(g.getGatewayId(), g.getSerialNumber(), g.getGatewayName(),
							BigDecimal.valueOf(g.getLat()), BigDecimal.valueOf(g.getLng()), g.getGatewayType(), state,
							data);
			result.add(gateway);
		});
		return result;
	}

	public List<Profile> getDeviceProfiles() {
		return objeniousService.getProfiles();
	}

	public void provisionGateway(lora.ns.gateway.GatewayProvisioning gatewayProvisioning) {
		// Not implemented;
	}

	public void deprovisionGateway(String id) {
		// Not implemented
	}

	public boolean hasGatewayManagementCapability() {
		return false;
	}
}
