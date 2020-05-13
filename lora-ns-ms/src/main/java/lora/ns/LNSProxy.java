package lora.ns;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.cumulocity.microservice.context.credentials.MicroserviceCredentials;
import com.cumulocity.microservice.subscription.model.MicroserviceSubscriptionAddedEvent;
import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
import com.cumulocity.model.Agent;
import com.cumulocity.model.event.CumulocitySeverities;
import com.cumulocity.model.idtype.GId;
import com.cumulocity.model.operation.OperationStatus;
import com.cumulocity.rest.representation.alarm.AlarmRepresentation;
import com.cumulocity.rest.representation.event.EventRepresentation;
import com.cumulocity.rest.representation.identity.ExternalIDRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.cumulocity.rest.representation.operation.OperationCollectionRepresentation;
import com.cumulocity.rest.representation.operation.OperationRepresentation;
import com.cumulocity.rest.representation.tenant.OptionRepresentation;
import com.cumulocity.sdk.client.Param;
import com.cumulocity.sdk.client.QueryParam;
import com.cumulocity.sdk.client.SDKException;
import com.cumulocity.sdk.client.alarm.AlarmApi;
import com.cumulocity.sdk.client.devicecontrol.DeviceControlApi;
import com.cumulocity.sdk.client.devicecontrol.OperationCollection;
import com.cumulocity.sdk.client.devicecontrol.OperationFilter;
import com.cumulocity.sdk.client.event.EventApi;
import com.cumulocity.sdk.client.identity.ExternalIDCollection;
import com.cumulocity.sdk.client.identity.IdentityApi;
import com.cumulocity.sdk.client.inventory.InventoryApi;
import com.cumulocity.sdk.client.inventory.InventoryFilter;
import com.cumulocity.sdk.client.inventory.ManagedObject;
import com.cumulocity.sdk.client.inventory.ManagedObjectCollection;
import com.cumulocity.sdk.client.measurement.MeasurementApi;
import com.cumulocity.sdk.client.notification.Subscription;
import com.cumulocity.sdk.client.notification.SubscriptionListener;
import com.cumulocity.sdk.client.option.TenantOptionApi;
import com.fasterxml.jackson.databind.ObjectMapper;

import c8y.Command;
import c8y.Configuration;
import c8y.Hardware;
import c8y.IsDevice;
import c8y.LpwanDevice;
import c8y.Position;
import c8y.RequiredAvailability;
import c8y.SupportedOperations;
import lora.codec.C8YData;
import lora.codec.DeviceCodecRepresentation;
import lora.codec.DownlinkData;
import lora.codec.ms.CodecManager;
import lora.common.C8YUtils;
import lora.common.Component;

@EnableScheduling
public abstract class LNSProxy<I extends LNSInstance> implements Component {
	private static final String LNS_EXT_ID = "LoRa Network Server type ID";

	private static final String LNS_TYPE = "LoRa Network Server type";

	public static final String LNS_ID = "lnsId";

	private static final String LNS_INSTANCE_REF = "lnsInstanceId";

	private static final String DEVEUI_TYPE = "LoRa devEUI";

	private static final String LNS_INSTANCE_TYPE = "LNS Instance";

	@Autowired
	protected C8YUtils c8yUtils;

	@Autowired
	protected InventoryApi inventoryApi;

	@Autowired
	protected IdentityApi identityApi;

	@Autowired
	protected MeasurementApi measurementApi;

	@Autowired
	protected EventApi eventApi;

	@Autowired
	protected AlarmApi alarmApi;

	@Autowired
	protected DeviceControlApi deviceControlApi;

	@Autowired
	protected MicroserviceSubscriptionsService subscriptionsService;

	@Autowired
	private CodecManager codecManager;

	@Autowired
	private TenantOptionApi tenantOptionApi;

	private Map<String, ManagedObjectRepresentation> agents = new HashMap<String, ManagedObjectRepresentation>();

	protected Map<String, Map<String, LNSInstance>> instances = new HashMap<>();

	protected Map<String, OperationRepresentation> operations = new HashMap<>();

	final Logger logger = LoggerFactory.getLogger(getClass());

	public abstract LinkedList<LNSInstanceWizardStep> getInstanceWizard();

	public abstract DeviceData extractLNSInfo(String eventString, String lnsInstanceId);

	protected abstract OperationRepresentation getOperation(String eventString);

	public abstract boolean isOperationUpdate(String eventString);

	protected I getInstance(ManagedObjectRepresentation instance) {
		@SuppressWarnings("unchecked")
		Class<I> instanceType = (Class<I>) ((ParameterizedType) getClass().getGenericSuperclass())
				.getActualTypeArguments()[0];
		I result = null;
		try {
			result = instanceType.getConstructor(instance.getClass()).newInstance(instance);
		} catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException
				| NoSuchMethodException | SecurityException e) {
			e.printStackTrace();
		}
		return result;
	}

	public Map<String, Map<String, LNSInstance>> getInstances() {
		return instances;
	}

	@EventListener
	private void init(MicroserviceSubscriptionAddedEvent event) {
		getAllLNSInstances(event);
		registerLNSProxy();
	}

	private void getAllLNSInstances(MicroserviceSubscriptionAddedEvent event) {
		logger.info("Looking for LNS Instances in tenant {}", subscriptionsService.getTenant());
		InventoryFilter filter = new InventoryFilter().byType(LNS_INSTANCE_TYPE);
		ManagedObjectCollection col = inventoryApi.getManagedObjectsByFilter(filter);
		QueryParam queryParam = null;
		try {
			queryParam = new QueryParam(new Param() {
				@Override
				public String getName() {
					return "query";
				}
			}, URLEncoder.encode(LNS_ID + " eq " + this.getId() + " and type eq '" + LNS_INSTANCE_TYPE + "'", "utf8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		for (ManagedObjectRepresentation mor : col.get(queryParam).allPages()) {
			logger.info("Retrieved instance: {} of type {}", mor.getName(), mor.getProperty(LNS_ID));
			LNSInstance instance = getInstance(mor);
			Properties properties = new Properties();
			for (OptionRepresentation option : tenantOptionApi.getAllOptionsForCategory(instance.getId())) {
				properties.setProperty(option.getKey(), option.getValue());
			}
			instance.setProperties(properties);
			if (!instances.containsKey(subscriptionsService.getTenant())) {
				instances.put(subscriptionsService.getTenant(), new HashMap<String, LNSInstance>());
			}
			instances.get(subscriptionsService.getTenant()).put(instance.getId(), instance);
			configureRoutings(instance.getId(), event.getCredentials());
		}
	}

	private void registerLNSProxy() {
		ExternalIDRepresentation id = c8yUtils.findExternalId(this.getId(), LNS_EXT_ID);
		ManagedObjectRepresentation agent = null;
		if (id == null) {
			agent = new ManagedObjectRepresentation();
			agent.setType(LNS_TYPE);
			agent.setName(getName());
			agent.setProperty("version", getVersion());
			agent.setProperty(LNS_ID, this.getId());
			agent.set(new RequiredAvailability(5));
			agent.set(new Agent());
			agent.set(new IsDevice());
			agent = inventoryApi.create(agent);

			id = new ExternalIDRepresentation();
			id.setExternalId(this.getId());
			id.setType(LNS_EXT_ID);
			id.setManagedObject(agent);
			identityApi.create(id);
		} else {
			agent = inventoryApi.get(id.getManagedObject().getId());
			agent.setLastUpdatedDateTime(null);
			agent.setName(getName());
			agent.setProperty("version", getVersion());
			agent.setProperty(LNS_ID, this.getId());
			agent.set(new RequiredAvailability(5));
			if (agent.get(Agent.class) == null) {
				agent.set(new Agent());
			}
			if (agent.get(IsDevice.class) == null) {
				agent.set(new IsDevice());
			}
			inventoryApi.update(agent);
		}
		agents.put(subscriptionsService.getTenant(), agent);
		deviceControlApi.getNotificationsSubscriber().subscribe(agent.getId(),
				new OperationDispatcherSubscriptionListener(subscriptionsService.getTenant()));
	}

	public void mapEventToC8Y(String eventString, String lnsInstanceId) {
		DeviceData event = extractLNSInfo(eventString, lnsInstanceId);
		if (instances.containsKey(subscriptionsService.getTenant())
				&& instances.get(subscriptionsService.getTenant()).containsKey(lnsInstanceId)) {
			event.setDeviceName(instances.get(subscriptionsService.getTenant()).get(lnsInstanceId)
					.getDevice(event.getDevEui()).getName());
			upsertDevice(lnsInstanceId, event);
		}
	}

	private void upsertDevice(String lnsInstanceId, DeviceData event) {
		try {
			logger.info("Upsert device with devEui {} with Payload {} from fPort {}", event.getDevEui(),
					event.getPayload(), event.getfPort());
			ManagedObjectRepresentation mor = getDevice(event.getDevEui());
			if (mor == null) {
				mor = createDevice(lnsInstanceId, event.getDeviceName(), event.getDevEui());
			}
			mor.setLastUpdatedDateTime(null);
			if (event.getModel() == null && mor.get(Hardware.class) != null) {
				event.setModel(mor.get(Hardware.class).getModel());
			}
			for (MeasurementRepresentation m : event.getMeasurements()) {
				m.setSource(mor);
				measurementApi.create(m);
			}
			if (event.getLat() != null && event.getLng() != null) {
				Position p = new Position();
				p.setLat(event.getLat());
				p.setLng(event.getLng());
				mor.set(p);
				inventoryApi.update(mor);
				EventRepresentation locationUpdate = new EventRepresentation();
				locationUpdate.setSource(mor);
				locationUpdate.setType("c8y_LocationUpdate");
				locationUpdate.set(p);
				locationUpdate.setText("Location updated");
				locationUpdate.setDateTime(new DateTime());
				eventApi.create(locationUpdate);
			}
			if (!mor.hasProperty(LNS_INSTANCE_REF)) {
				mor.setProperty(LNS_INSTANCE_REF, lnsInstanceId);
				inventoryApi.update(mor);
			}
			DeviceCodecRepresentation codec = mor.get(DeviceCodecRepresentation.class);
			if (mor.getProperty("codec") != null
					&& (codec == null || !codec.getId().equals(mor.getProperty("codec")))) {
				mor.set(new DeviceCodecRepresentation(codecManager.getCodec(mor.getProperty("codec").toString())));
				inventoryApi.update(mor);
			}
			if (mor.get(LpwanDevice.class) == null || !mor.get(LpwanDevice.class).isProvisioned()) {
				mor.set(new LpwanDevice().provisioned(true));
				inventoryApi.update(mor);
			}
			ManagedObject agentApi = inventoryApi
					.getManagedObjectApi(agents.get(subscriptionsService.getTenant()).getId());
			try {
				agentApi.getChildDevice(mor.getId());
			} catch (Exception e) {
				agentApi.addChildDevice(mor.getId());
			}
			if (mor.get(Configuration.class) == null) {
				getDeviceConfig(mor);
			}
			codecManager.decode(mor, event);
		} catch (SDKException e) {
			logger.info("Error on upserting Device", e);
		}
	}

	private ManagedObjectRepresentation createDevice(String lnsInstanceId, String name, String devEUI) {
		ManagedObjectRepresentation mor;
		mor = new ManagedObjectRepresentation();
		mor.setType("c8y_LoRaDevice");
		mor.setName(name);
		mor.setProperty(LNS_INSTANCE_REF, lnsInstanceId);
		mor.set(new IsDevice());
		SupportedOperations supportedOperations = new SupportedOperations();
		supportedOperations.add("c8y_Command");
		mor.setLastUpdatedDateTime(null);
		mor.set(supportedOperations);
		mor = inventoryApi.create(mor);
		ManagedObject agentApi = inventoryApi.getManagedObjectApi(agents.get(subscriptionsService.getTenant()).getId());
		agentApi.addChildDevice(mor.getId());
		c8yUtils.createExternalId(mor, devEUI, DEVEUI_TYPE);
		return mor;
	}

	public String getDeviceEui(GId id) {
		String result = null;
		ExternalIDCollection extIds = identityApi.getExternalIdsOfGlobalId(id);
		if (extIds != null) {
			for (ExternalIDRepresentation extId : extIds.get().allPages()) {
				if (extId.getType().equals(DEVEUI_TYPE)) {
					result = extId.getExternalId();
					logger.info("Device {} matches devEUI {}", id.toString(), result);
					break;
				}
			}
			if (result == null) {
				logger.info("Device {} has no external Ids or does not exist in tenant {}.", id.toString(),
						subscriptionsService.getTenant());
			}
		} else {
			logger.info("Device {} has no external Ids or does not exist in tenant {}.", id.toString(),
					subscriptionsService.getTenant());
		}
		return result;
	}

	private class OperationDispatcherSubscriptionListener
			implements SubscriptionListener<GId, OperationRepresentation> {

		public OperationDispatcherSubscriptionListener(String tenant) {
			this.tenant = tenant;
		}

		private String tenant;

		@Override
		public void onError(Subscription<GId> sub, Throwable e) {
			logger.error("OperationDispatcher error!", e);
		}

		@Override
		public void onNotification(Subscription<GId> sub, OperationRepresentation operation) {
			try {
				subscriptionsService.runForTenant(tenant, () -> {
					executePending(operation);
				});
			} catch (SDKException e) {
				logger.error("OperationDispatcher error!", e);
			}
		}
	}

	public void updateOperation(String event, String lnsInstanceId) {
		if (instances.containsKey(subscriptionsService.getTenant())
				&& instances.get(subscriptionsService.getTenant()).containsKey(lnsInstanceId)) {
			logger.info("LNS instance {} of type {} is known", lnsInstanceId, getId());
			OperationRepresentation operation = getOperation(event);
			if (operation != null) {
				deviceControlApi.update(operation);
			} else {
				logger.error("Could not process incoming event for tenant {}", subscriptionsService.getTenant());
			}
		}
	}

	@Async
	private void executePending(OperationRepresentation operation) {
		logger.info("Will execute operation {}", operation.toJSON());
		if (getDeviceEui(operation.getDeviceId()) != null) {
			logger.info("Processing operation {}", operation);
			DownlinkData encodedData = codecManager.encode(getDeviceEui(operation.getDeviceId()), operation);
			if (encodedData != null && encodedData.getFport() != null && encodedData.getPayload() != null) {
				operation.setStatus(OperationStatus.EXECUTING.toString());
				String lnsInstanceId = inventoryApi.get(operation.getDeviceId()).getProperty(LNS_INSTANCE_REF)
						.toString();
				processOperation(lnsInstanceId, encodedData, operation);
			} else {
				operation.setStatus(OperationStatus.FAILED.toString());
				Command command = operation.get(Command.class);
				command.setResult("Operation not supported.");
				operation.set(command);
			}
			deviceControlApi.update(operation);
		} else {
			logger.info("Operation {} will be ignored", operation);
		}
	}

	public ManagedObjectRepresentation provisionDevice(String lnsInstanceId, DeviceProvisioning deviceProvisioning) {
		ManagedObjectRepresentation mor = null;
		if (instances.get(subscriptionsService.getTenant()).get(lnsInstanceId).provisionDevice(deviceProvisioning)) {
			ExternalIDRepresentation extId = c8yUtils.findExternalId(deviceProvisioning.getDevEUI(), DEVEUI_TYPE);
			if (extId == null) {
				mor = createDevice(lnsInstanceId, deviceProvisioning.getName(), deviceProvisioning.getDevEUI());
			} else {
				mor = extId.getManagedObject();
				ManagedObject agentApi = inventoryApi
						.getManagedObjectApi(agents.get(subscriptionsService.getTenant()).getId());
				agentApi.addChildDevice(mor.getId());
			}
			mor.set(new LpwanDevice().provisioned(true));
			mor.setLastUpdatedDateTime(null);
			if (!mor.hasProperty("codec")) {
				mor.setProperty("codec", deviceProvisioning.getDeviceModel());
			}
			inventoryApi.update(mor);
			EventRepresentation event = new EventRepresentation();
			event.setType("Device provisioned");
			event.setText("Device has been provisioned");
			event.setDateTime(new DateTime());
			event.setSource(mor);
			eventApi.create(event);
			getDeviceConfig(mor);
		} else {
			AlarmRepresentation alarm = new AlarmRepresentation();
			alarm.setType("Device provisioning error");
			alarm.setText("Couldn't provision device " + deviceProvisioning.getDevEUI() + " in LNS instance "
					+ lnsInstanceId);
			alarm.setDateTime(new DateTime());
			alarm.setSeverity(CumulocitySeverities.CRITICAL.name());
			mor = getDevice(deviceProvisioning.getDevEUI());
			if (mor != null) {
				alarm.setSource(mor);
			} else {
				alarm.setSource(agents.get(lnsInstanceId));
			}
			alarmApi.create(alarm);
		}
		return mor;
	}

	private void getDeviceConfig(ManagedObjectRepresentation mor) {
		if (codecManager.getAvailableOperations(mor) != null
				&& codecManager.getAvailableOperations(mor).containsKey("get config")) {
			OperationRepresentation operation = new OperationRepresentation();
			Command command = new Command("get config");
			operation.set(command);
			operation.setDeviceId(mor.getId());
			deviceControlApi.create(operation);
		}
	}

	public List<EndDevice> getDevices(String lnsInstanceId) {
		return instances.get(subscriptionsService.getTenant()).get(lnsInstanceId).getDevices();
	}

	private String getTenantDomain() {
		String result = null;
		RestTemplate restTemplate = new RestTemplate();
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", subscriptionsService.getCredentials(subscriptionsService.getTenant()).get()
					.toCumulocityCredentials().getAuthenticationString());
			headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
			result = restTemplate.exchange(System.getenv("C8Y_BASEURL") + "/tenant/currentTenant", HttpMethod.GET,
					new HttpEntity<String>("", headers), String.class).getBody();
			ObjectMapper mapper = new ObjectMapper();
			result = mapper.readTree(result).get("domainName").asText();
		} catch (HttpClientErrorException e) {
			e.printStackTrace();
			logger.error(e.getResponseBodyAsString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}

	private void configureRoutings(String lnsInstanceId, MicroserviceCredentials credentials) {
		String url = "https://" + getTenantDomain() + "/service/lora-ns-" + this.getId() + "/" + lnsInstanceId;
		instances.get(subscriptionsService.getTenant()).get(lnsInstanceId).configureRoutings(url,
				subscriptionsService.getTenant(), credentials.getUsername(), credentials.getPassword());
	}

	public ManagedObjectRepresentation addLNSInstance(LNSInstanceRepresentation instanceRepresentation) {
		ManagedObjectRepresentation mor = new ManagedObjectRepresentation();
		mor.setType(LNS_INSTANCE_TYPE);
		mor.setName(instanceRepresentation.getName());
		mor.setProperty(LNS_ID, this.getId());
		mor = inventoryApi.create(mor);

		String category = mor.getId().getValue();
		instanceRepresentation.getProperties().forEach((k, v) -> {
			OptionRepresentation option = new OptionRepresentation();
			option.setCategory(category);
			option.setKey(k.toString());
			option.setValue(v.toString());
			tenantOptionApi.save(option);
		});

		LNSInstance instance = getInstance(mor);
		instance.setProperties(instanceRepresentation.getProperties());

		if (!instances.containsKey(subscriptionsService.getTenant())) {
			instances.put(subscriptionsService.getTenant(), new HashMap<String, LNSInstance>());
		}
		instances.get(subscriptionsService.getTenant()).put(instance.getId(), instance);
		configureRoutings(instance.getId(),
				subscriptionsService.getCredentials(subscriptionsService.getTenant()).get());

		return mor;
	}

	protected void processOperation(String lnsId, DownlinkData operation, OperationRepresentation c8yOperation) {
		LNSInstance instance = instances.get(subscriptionsService.getTenant()).get(lnsId);
		if (instance != null) {
			String commandId = instance.processOperation(operation, c8yOperation);
			operations.put(commandId, c8yOperation);
			c8yOperation.set(new LoraCommand(commandId));
			deviceControlApi.update(c8yOperation);
		} else {
			logger.error("LNS instance {} of type {} could not be found on tenant {}", lnsId, getName(),
					subscriptionsService.getTenant());
		}
	}

	@Scheduled(initialDelay = 10000, fixedDelay = 10000)
	private void processPendingOperations() {
		subscriptionsService.runForEachTenant(() -> {
			OperationFilter filter = new OperationFilter();
			filter.byStatus(OperationStatus.PENDING)
					.byAgent(agents.get(subscriptionsService.getTenant()).getId().getValue());
			OperationCollectionRepresentation opCollectionRepresentation;
			OperationCollection oc = deviceControlApi.getOperationsByFilter(filter);
			if (oc != null) {
				for (opCollectionRepresentation = oc
						.get(); opCollectionRepresentation != null; opCollectionRepresentation = oc
								.getNextPage(opCollectionRepresentation)) {
					for (OperationRepresentation op : opCollectionRepresentation.getOperations()) {
						System.out.println(op.getStatus());
						executePending(op);
					}
				}
			}
		});
	}

	@Scheduled(initialDelay = 10000, fixedDelay = 300000)
	private void sendMetrics() {
		subscriptionsService.runForEachTenant(() -> {
			C8YData c8yData = new C8YData();
			DateTime now = new DateTime();
			c8yData.addMeasurement(agents.get(subscriptionsService.getTenant()), "Memory", "Max Memory", "bytes",
					BigDecimal.valueOf(Runtime.getRuntime().maxMemory()), now);
			c8yData.addMeasurement(agents.get(subscriptionsService.getTenant()), "Memory", "Free Memory", "bytes",
					BigDecimal.valueOf(Runtime.getRuntime().freeMemory()), now);
			c8yData.addMeasurement(agents.get(subscriptionsService.getTenant()), "Memory", "Total Memory", "bytes",
					BigDecimal.valueOf(Runtime.getRuntime().totalMemory()), now);
			for (MeasurementRepresentation m : c8yData.getMeasurements()) {
				measurementApi.create(m);
			}
		});
	}

	@Bean
	public ThreadPoolTaskScheduler taskScheduler() {
		ThreadPoolTaskScheduler taskScheduler = new ThreadPoolTaskScheduler();
		taskScheduler.setPoolSize(20);
		return taskScheduler;
	}

	public void removeLNSInstance(String lnsInstanceId) {
		instances.get(subscriptionsService.getTenant()).get(lnsInstanceId).removeRoutings();
		inventoryApi.delete(new GId(lnsInstanceId));
	}

	public ManagedObjectRepresentation getDevice(String devEui) {
		ManagedObjectRepresentation result = null;
		ExternalIDRepresentation extId = c8yUtils.findExternalId(devEui, DEVEUI_TYPE);
		if (extId != null) {
			result = inventoryApi.get(extId.getManagedObject().getId());
			result.setLastUpdatedDateTime(null);
		}
		return result;
	}

	public boolean deprovisionDevice(String lnsInstanceId, String deveui) {
		boolean result = false;
		if (instances.get(subscriptionsService.getTenant()).get(lnsInstanceId).deprovisionDevice(deveui)) {
			ExternalIDRepresentation extId = c8yUtils.findExternalId(deveui, DEVEUI_TYPE);
			if (extId != null) {
				ManagedObjectRepresentation mor = inventoryApi.get(extId.getManagedObject().getId());
				mor.removeProperty("c8y_RequiredInterval");
				mor.set(new LpwanDevice().provisioned(false));
				mor.setLastUpdatedDateTime(null);
				inventoryApi.update(mor);
			}
			result = true;
		}
		return result;
	}
}