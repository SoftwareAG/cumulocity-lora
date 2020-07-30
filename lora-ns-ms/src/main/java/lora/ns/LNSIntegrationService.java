package lora.ns;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import com.cumulocity.microservice.context.credentials.MicroserviceCredentials;
import com.cumulocity.microservice.subscription.model.MicroserviceSubscriptionAddedEvent;
import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
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
import com.cumulocity.sdk.client.alarm.AlarmApi;
import com.cumulocity.sdk.client.devicecontrol.DeviceControlApi;
import com.cumulocity.sdk.client.devicecontrol.OperationCollection;
import com.cumulocity.sdk.client.devicecontrol.OperationFilter;
import com.cumulocity.sdk.client.event.EventApi;
import com.cumulocity.sdk.client.inventory.InventoryApi;
import com.cumulocity.sdk.client.inventory.InventoryFilter;
import com.cumulocity.sdk.client.inventory.ManagedObject;
import com.cumulocity.sdk.client.inventory.ManagedObjectCollection;
import com.cumulocity.sdk.client.measurement.MeasurementApi;
import com.cumulocity.sdk.client.option.TenantOptionApi;

import c8y.Command;
import c8y.Hardware;
import c8y.LpwanDevice;
import lora.codec.C8YData;
import lora.codec.ms.CodecManager;
import lora.common.C8YUtils;
import lora.ns.connector.LNSConnector;
import lora.ns.connector.LNSConnectorManager;
import lora.ns.connector.LNSConnectorRepresentation;
import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.device.LNSDeviceManager;
import lora.ns.operation.LNSOperationManager;

@EnableScheduling
public abstract class LNSIntegrationService<I extends LNSConnector> {
	public static final String LNS_EXT_ID = "LoRa Network Server type";

	public static final String LNS_MO_TYPE = "LoRa Network Server agent";

	public static final String LNS_TYPE = "lnsType";

	public static final String LNS_CONNECTOR_REF = "lnsConnectorId";

	public static final String DEVEUI_TYPE = "LoRa devEUI";

	public static final String LNS_CONNECTOR_TYPE = "LNS Connector";

	@Autowired
	private C8YUtils c8yUtils;

	@Autowired
	private InventoryApi inventoryApi;

	@Autowired
	private MeasurementApi measurementApi;

	@Autowired
	private EventApi eventApi;

	@Autowired
	private AlarmApi alarmApi;

	@Autowired
	private DeviceControlApi deviceControlApi;

	@Autowired
	private MicroserviceSubscriptionsService subscriptionsService;

	@Autowired
	private CodecManager codecManager;

	@Autowired
	private TenantOptionApi tenantOptionApi;

	@Autowired
	private LNSDeviceManager lnsDeviceManager;

	@Autowired
	private AgentService agentService;

	@Autowired
	private LNSOperationManager lnsOperationManager;

	@Autowired
	private LNSConnectorManager lnsConnectorManager;

	protected LinkedList<LNSConnectorWizardStep> wizard = new LinkedList<LNSConnectorWizardStep>();

	final Logger logger = LoggerFactory.getLogger(getClass());

	public abstract String getType();

	public abstract String getName();

	public abstract String getVersion();

	public abstract DeviceData processUplinkEvent(String eventString);

	public abstract OperationData processDownlinkEvent(String eventString);

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

	public Map<String, LNSConnector> getConnectors() {
		return lnsConnectorManager.getConnectors();
	}

	@EventListener
	private void init(MicroserviceSubscriptionAddedEvent event) {
		getAllLNSInstances(event);
		agentService.registerAgent(this);
	}

	private void getAllLNSInstances(MicroserviceSubscriptionAddedEvent event) {
		logger.info("Looking for LNS Connectors in tenant {}", subscriptionsService.getTenant());
		InventoryFilter filter = new InventoryFilter().byType(LNS_CONNECTOR_TYPE);
		ManagedObjectCollection col = inventoryApi.getManagedObjectsByFilter(filter);
		QueryParam queryParam = null;
		try {
			queryParam = new QueryParam(new Param() {
				@Override
				public String getName() {
					return "query";
				}
			}, URLEncoder.encode(LNS_TYPE + " eq " + this.getType() + " and type eq '" + LNS_CONNECTOR_TYPE + "'",
					"utf8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		for (ManagedObjectRepresentation mor : col.get(queryParam).allPages()) {
			logger.info("Retrieved connector: {} of type {}", mor.getName(), mor.getProperty(LNS_TYPE));
			LNSConnector instance = getInstance(mor);
			Properties properties = new Properties();
			for (OptionRepresentation option : tenantOptionApi.getAllOptionsForCategory(instance.getId())) {
				properties.setProperty(option.getKey(), option.getValue());
			}
			instance.setProperties(properties);
			lnsConnectorManager.addConnector(instance.getId(), instance);
			configureRoutings(instance.getId(), event.getCredentials());
		}
	}

	public void mapEventToC8Y(String eventString, String lnsInstanceId) {
		if (isOperationUpdate(eventString)) {
			updateOperation(eventString, lnsInstanceId);
		} else {
			DeviceData event = processUplinkEvent(eventString);
			if (event != null) {
				Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsInstanceId);
				if (connector.isPresent()) {
					lnsDeviceManager.upsertDevice(lnsInstanceId, event, agentService.getAgent());
				}
			}
		}
	}

	public void updateOperation(String event, String lnsInstanceId) {
		Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsInstanceId);
		if (connector.isPresent()) {
			logger.info("LNS instance {} of type {} is known", lnsInstanceId, getType());
			OperationData data = processDownlinkEvent(event);
			if (data.getStatus() != OperationStatus.FAILED) {
				OperationRepresentation operation = lnsOperationManager.retrieveOperation(lnsInstanceId,
						data.getCommandId());
				if (operation != null) {
					operation.setStatus(data.getStatus().toString());
					deviceControlApi.update(operation);
					if (data.getStatus() == OperationStatus.SUCCESSFUL) {
						lnsOperationManager.removeOperation(lnsInstanceId, data.getCommandId());
					}
				} else {
					logger.error("Unknown operation {} from LNS", data.getCommandId());
				}
			} else {
				if (data.getCommandId() != null) {
					OperationRepresentation operation = lnsOperationManager.retrieveOperation(lnsInstanceId,
							data.getCommandId());
					operation.setStatus(OperationStatus.FAILED.toString());
					operation.setFailureReason(data.getErrorMessage());
					deviceControlApi.update(operation);
					lnsOperationManager.removeOperation(lnsInstanceId, data.getCommandId());
				} else {
					logger.error("Unknown operation");
				}
			}
		}
	}

	public DeviceProvisioningResponse provisionDevice(String lnsInstanceId, DeviceProvisioning deviceProvisioning) {
		DeviceProvisioningResponse response = new DeviceProvisioningResponse();
		ManagedObjectRepresentation mor = null;
		String errorMessage = null;
		Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsInstanceId);
		if (connector.isPresent() && connector.get().provisionDevice(deviceProvisioning)) {
			ExternalIDRepresentation extId = c8yUtils.findExternalId(deviceProvisioning.getDevEUI().toLowerCase(),
					DEVEUI_TYPE);
			if (extId == null) {
				mor = lnsDeviceManager.createDevice(lnsInstanceId, deviceProvisioning.getName(),
						deviceProvisioning.getDevEUI(), agentService.getAgent());
			} else {
				mor = extId.getManagedObject();
				mor.setProperty(LNSIntegrationService.LNS_CONNECTOR_REF, lnsInstanceId);
				ManagedObject agentApi = inventoryApi.getManagedObjectApi(agentService.getAgent().getId());
				agentApi.addChildDevice(mor.getId());
			}
			if (deviceProvisioning.getCodec() != null) {
				mor.setProperty("codec", deviceProvisioning.getCodec());
			}
			if (deviceProvisioning.getModel() != null) {
				Hardware hardware = new Hardware();
				hardware.setModel(deviceProvisioning.getModel());
				mor.set(hardware);
			}
			mor.set(new LpwanDevice().provisioned(true));
			mor.setLastUpdatedDateTime(null);
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
			if (connector.isPresent()) {
				errorMessage = "Couldn't provision device " + deviceProvisioning.getDevEUI() + " in LNS connector "
						+ lnsInstanceId;
			} else {
				errorMessage = "LNS connector Id '" + lnsInstanceId
						+ "' doesn't exist. Please use a valid managed object Id.";
			}
			alarm.setText(errorMessage);
			alarm.setDateTime(new DateTime());
			alarm.setSeverity(CumulocitySeverities.CRITICAL.name());
			mor = getDevice(deviceProvisioning.getDevEUI().toLowerCase());
			if (mor != null) {
				alarm.setSource(mor);
			} else {
				alarm.setSource(agentService.getAgent());
			}
			alarmApi.create(alarm);
		}
		response.setDevice(mor);
		response.setErrorMessage(errorMessage);
		return response;
	}

	private void getDeviceConfig(ManagedObjectRepresentation mor) {
		if (codecManager.getAvailableOperations(mor) != null
				&& codecManager.getAvailableOperations(mor).containsKey("get config") && !isWaitingConfig(mor)) {
			OperationRepresentation operation = new OperationRepresentation();
			Command command = new Command("get config");
			operation.set(command);
			operation.setDeviceId(mor.getId());
			deviceControlApi.create(operation);
		}
	}

	private boolean isWaitingConfig(ManagedObjectRepresentation mor) {
		boolean[] result = { false };

		deviceControlApi
				.getOperationsByFilter(new OperationFilter().byDevice(mor.getId().getValue())
						.byStatus(OperationStatus.EXECUTING).byFragmentType("c8y_Command"))
				.get(2000).allPages().forEach(o -> {
					result[0] |= o.get(Command.class).getText().contains("get config");
				});

		return result[0];
	}

	public List<EndDevice> getDevices(String lnsInstanceId) {
		return lnsConnectorManager.getConnector(lnsInstanceId).get().getDevices();
	}

	private void configureRoutings(String lnsInstanceId, MicroserviceCredentials credentials) {
		String url = "https://" + c8yUtils.getTenantDomain() + "/service/lora-ns-" + this.getType() + "/"
				+ lnsInstanceId;
		lnsConnectorManager.getConnector(lnsInstanceId).get().configureRoutings(url, subscriptionsService.getTenant(),
				credentials.getUsername(), credentials.getPassword());
	}

	public ManagedObjectRepresentation addLNSInstance(LNSConnectorRepresentation instanceRepresentation) {
		ManagedObjectRepresentation mor = new ManagedObjectRepresentation();
		mor.setType(LNS_CONNECTOR_TYPE);
		mor.setName(instanceRepresentation.getName());
		mor.setProperty(LNS_TYPE, this.getType());
		mor = inventoryApi.create(mor);

		String category = mor.getId().getValue();
		instanceRepresentation.getProperties().forEach((k, v) -> {
			OptionRepresentation option = new OptionRepresentation();
			option.setCategory(category);
			if (isPropertyEncrypted(k.toString())) {
				option.setKey("credentials." + k.toString());
			} else {
				option.setKey(k.toString());
			}
			option.setValue(v.toString());
			tenantOptionApi.save(option);
		});

		LNSConnector instance = getInstance(mor);
		instance.setProperties(instanceRepresentation.getProperties());

		lnsConnectorManager.addConnector(instance.getId(), instance);
		configureRoutings(instance.getId(),
				subscriptionsService.getCredentials(subscriptionsService.getTenant()).get());

		return mor;
	}

	private boolean isPropertyEncrypted(String key) {
		boolean[] result = { false };

		wizard.forEach(step -> {
			step.getPropertyDescriptions().forEach(p -> {
				if (p.getName().equals(key)) {
					result[0] = p.isEncrypted();
				}
			});
		});

		return result[0];
	}

	@Scheduled(initialDelay = 10000, fixedDelay = 10000)
	private void processPendingOperations() {
		subscriptionsService.runForEachTenant(() -> {
			OperationFilter filter = new OperationFilter();
			filter.byStatus(OperationStatus.PENDING).byAgent(agentService.getAgent().getId().getValue());
			OperationCollectionRepresentation opCollectionRepresentation;
			OperationCollection oc = deviceControlApi.getOperationsByFilter(filter);
			if (oc != null) {
				for (opCollectionRepresentation = oc
						.get(); opCollectionRepresentation != null; opCollectionRepresentation = oc
								.getNextPage(opCollectionRepresentation)) {
					for (OperationRepresentation op : opCollectionRepresentation.getOperations()) {
						System.out.println(op.getStatus());
						lnsOperationManager.executePending(op);
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
			c8yData.addMeasurement(agentService.getAgent(), "Memory", "Max Memory", "bytes",
					BigDecimal.valueOf(Runtime.getRuntime().maxMemory()), now);
			c8yData.addMeasurement(agentService.getAgent(), "Memory", "Free Memory", "bytes",
					BigDecimal.valueOf(Runtime.getRuntime().freeMemory()), now);
			c8yData.addMeasurement(agentService.getAgent(), "Memory", "Total Memory", "bytes",
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
		lnsConnectorManager.getConnector(lnsInstanceId).get().removeRoutings();
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
		Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsInstanceId);
		if (connector.isPresent() && connector.get().deprovisionDevice(deveui)) {
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

	public LinkedList<LNSConnectorWizardStep> getInstanceWizard() {
		return wizard;
	}
}