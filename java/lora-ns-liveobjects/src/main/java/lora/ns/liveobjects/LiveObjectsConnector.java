package lora.ns.liveobjects;

import static org.apache.commons.lang3.StringUtils.isNotBlank;
import static org.apache.commons.lang3.StringUtils.isNumeric;

import feign.Client.Proxied;
import feign.Feign.Builder;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.Proxy.Type;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;

import org.apache.commons.lang3.NotImplementedException;
import org.slf4j.LoggerFactory;

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
import lora.ns.gateway.GatewayProvisioning;
import lora.ns.liveobjects.rest.LiveObjectsService;
import lora.ns.liveobjects.rest.model.ActionPolicy;
import lora.ns.liveobjects.rest.model.ActionTriggers;
import lora.ns.liveobjects.rest.model.Actions;
import lora.ns.liveobjects.rest.model.Command;
import lora.ns.liveobjects.rest.model.CommandPolicy;
import lora.ns.liveobjects.rest.model.CommandStatusTrigger;
import lora.ns.liveobjects.rest.model.ConnectivityPlan;
import lora.ns.liveobjects.rest.model.CreateDevice;
import lora.ns.liveobjects.rest.model.DataMessageFilter;
import lora.ns.liveobjects.rest.model.DataMessageTrigger;
import lora.ns.liveobjects.rest.model.DeviceGroup;
import lora.ns.liveobjects.rest.model.DeviceInterface;
import lora.ns.liveobjects.rest.model.DeviceInterfaceDefinition;
import lora.ns.liveobjects.rest.model.Group;
import lora.ns.liveobjects.rest.model.GroupPath;
import lora.ns.liveobjects.rest.model.HttpPushAction;
import lora.ns.liveobjects.rest.model.RequestValue;

public class LiveObjectsConnector extends LNSAbstractConnector {

	private LiveObjectsService service;

	private static final String LORA_PREFIX = "urn:lo:nsid:lora:";

	private static final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JodaModule())
			.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
			.configure(SerializationFeature.INDENT_OUTPUT, true)
			.setSerializationInclusion(Include.NON_NULL);

	public LiveObjectsConnector(Properties properties) {
		super(properties);
	}

	public LiveObjectsConnector(ManagedObjectRepresentation instance) {
		super(instance);
	}

	@Override
	protected void init() {
		final ch.qos.logback.classic.Logger serviceLogger = (ch.qos.logback.classic.Logger) LoggerFactory
				.getLogger("lora.ns.liveobjects");
		serviceLogger.setLevel(ch.qos.logback.classic.Level.DEBUG);
		var feignBuilder = Feign.builder()
				.decoder(new JacksonDecoder(objectMapper))
				.encoder(new JacksonEncoder(objectMapper))
				.logger(new Slf4jLogger("lora.ns.liveobjects"))
				.logLevel(Level.FULL)
				.requestInterceptor(template -> template.header("X-API-KEY", properties.getProperty("apikey")));
		addProxyConfigIfPresent(feignBuilder);
		service = feignBuilder.target(LiveObjectsService.class, "https://liveobjects.orange-business.com/");
	}

	@Override
	public List<EndDevice> getDevices() {
		throw new NotImplementedException();
	}

	@Override
	public EndDevice getDevice(String devEui) {
		var device = service.getDevice(LORA_PREFIX + devEui);
		return new EndDevice(devEui, device.getName(), devEui);
	}

	@Override
	public String sendDownlink(DownlinkData operation) {
		return service
				.createCommand(LORA_PREFIX + operation.getDevEui(),
						new Command(new lora.ns.liveobjects.rest.model.Request()
								.withValue(new RequestValue(operation.getPayload(), operation.getFport())),
								new CommandPolicy()))
				.getId();
	}

	@Override
	public void provisionDevice(DeviceProvisioning deviceProvisioning) {
		service.createDevice(new CreateDevice()
				.withId(LORA_PREFIX + deviceProvisioning.getDevEUI().toLowerCase())
				.withName(deviceProvisioning.getName())
				.withGroup(new DeviceGroup(properties.getProperty("groupId")))
				.withInterfaces(List.of(new DeviceInterface()
						.withDefinition(new DeviceInterfaceDefinition().withAppEUI(deviceProvisioning.getAppEUI())
								.withAppKey(deviceProvisioning.getAppKey())
								.withDevEUI(deviceProvisioning.getDevEUI())
								.withConnectivityPlan(deviceProvisioning.getAdditionalProperties()
										.getProperty("connectivityPlan"))
								.withProfile(deviceProvisioning.getAdditionalProperties()
										.getProperty("profile"))))));
	}

	@Override
	public void configureRoutings(String url, String tenant, String login, String password) {
		String authorization = "Basic "
				+ Base64.getEncoder().encodeToString((tenant + "/" + login + ":" + password).getBytes());
		DataMessageFilter dataMessageFilter = new DataMessageFilter();
		dataMessageFilter.getGroupPaths().add(new GroupPath().withPath(properties.getProperty("groupId")));
		dataMessageFilter.getConnectors().add("lora");
		var uplinkActionPolicy = service.createActionPolicy(new ActionPolicy()
				.withId(null)
				.withName("Cumulocity webhook for tenant " + tenant)
				.withEnabled(true)
				.withActions(new Actions()
						.withHttpPush(List.of(new HttpPushAction()
								.withWebhookUrl(url + "/uplink")
								.withHeaders(Map.of("Authorization", List.of(authorization))))))
				.withTriggers(new ActionTriggers()
						.withDataMessage(new DataMessageTrigger()
								.withFilter(dataMessageFilter))));
		this.setProperty("uplinkRouteId", uplinkActionPolicy.getId());
		var downlinkActionPolicy = service.createActionPolicy(new ActionPolicy()
				.withId(null)
				.withName("Cumulocity webhook for tenant " + tenant)
				.withEnabled(true)
				.withActions(new Actions()
						.withHttpPush(List.of(new HttpPushAction()
								.withWebhookUrl(url + "/downlink")
								.withHeaders(Map.of("Authorization", List.of(authorization))))))
				.withTriggers(new ActionTriggers()
						.withCommandStatus(new CommandStatusTrigger())));
		this.setProperty("downlinkRouteId", downlinkActionPolicy.getId());
	}

	@Override
	public void removeRoutings() {
		getProperty("uplinkRouteId").ifPresent(id -> service.deleteActionPolicy(id.toString()));
		getProperty("downlinkRouteId").ifPresent(id -> service.deleteActionPolicy(id.toString()));
	}

	@Override
	public void deprovisionDevice(String deveui) {
		service.deleteDevice(LORA_PREFIX + deveui);
	}

	@Override
	public List<Gateway> getGateways() {
		return List.of();
	}

	@Override
	public void provisionGateway(GatewayProvisioning gatewayProvisioning) {
		// Not implemented for live objects
	}

	@Override
	public void deprovisionGateway(String id) {
		// Not implemented for live objects
	}

	public boolean hasGatewayManagementCapability() {
		return false;
	}

	public List<ConnectivityPlan> getConnectivityPlans() {
		return service.getConnectivityPlans();
	}

	public List<String> getProfiles() {
		return service.getProfiles();
	}

	public List<Group> getGroups() {
		return service.getGroups();
	}

	private void addProxyConfigIfPresent(Builder feignBuilder) {
		Optional<String> proxyHost = getProxyHost();
		Optional<Integer> proxyPost = getProxyPost();
		proxyHost.map(host -> new InetSocketAddress(host, proxyPost.orElse(80)))
				.map(address -> new Proxy(Type.HTTP, address))
				.ifPresent(proxy -> feignBuilder.client(new Proxied(null, null, proxy)));
	}

	private Optional<String> getProxyHost() {
		return isNotBlank(properties.getProperty("proxy-host")) ?
				Optional.of(properties.getProperty("proxy-host")) :
				Optional.empty();
	}

	private Optional<Integer> getProxyPost() {
		return isNumeric(properties.getProperty("proxy-port")) ?
				Optional.of(Integer.parseInt(properties.getProperty("proxy-port"))) :
				Optional.empty();
	}
}
