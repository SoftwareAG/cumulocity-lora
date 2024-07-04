package lora.ns.integration;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.TriggerContext;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import com.cumulocity.microservice.context.credentials.MicroserviceCredentials;
import com.cumulocity.microservice.subscription.model.MicroserviceSubscriptionAddedEvent;
import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
import com.cumulocity.model.Agent;
import com.cumulocity.model.idtype.GId;
import com.cumulocity.model.operation.OperationStatus;
import com.cumulocity.rest.representation.event.EventRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.cumulocity.rest.representation.operation.OperationCollectionRepresentation;
import com.cumulocity.rest.representation.operation.OperationRepresentation;
import com.cumulocity.rest.representation.tenant.OptionRepresentation;
import com.cumulocity.sdk.client.QueryParam;
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

import c8y.IsDevice;
import lombok.extern.slf4j.Slf4j;
import lora.codec.uplink.C8YData;
import lora.common.C8YUtils;
import lora.ns.DeviceData;
import lora.ns.agent.AgentService;
import lora.ns.connector.LNSConnector;
import lora.ns.connector.LNSConnectorRepresentation;
import lora.ns.connector.LNSConnectorService;
import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.connector.PropertyDescription;
import lora.ns.device.EndDevice;
import lora.ns.device.LNSDeviceService;
import lora.ns.exception.CannotCreateRouteException;
import lora.ns.exception.DownlinkProcessingException;
import lora.ns.exception.UplinkProcessingException;
import lora.ns.gateway.LNSGatewayService;
import lora.ns.operation.LNSOperationService;
import lora.ns.operation.OperationData;
import lora.rest.LoraContextService;

@EnableScheduling
@Slf4j
public abstract class LNSIntegrationService<I extends LNSConnector> {
	public static final String LNS_EXT_ID = "LoRa Network Server type";

	public static final String LNS_MO_TYPE = "LoRa Network Server agent";

	public static final String LNS_TYPE = "lnsType";

	public static final String LNS_CONNECTOR_REF = "lnsConnectorId";

	public static final String DEVEUI_TYPE = "LoRa devEUI";

	public static final String LNS_CONNECTOR_TYPE = "LNS Connector";

	@Autowired
	protected C8YUtils c8yUtils;

	@Autowired
	protected InventoryApi inventoryApi;

	@Autowired
	private MeasurementApi measurementApi;

	@Autowired
	private DeviceControlApi deviceControlApi;

	@Autowired
	private MicroserviceSubscriptionsService subscriptionsService;

	@Autowired
	private TenantOptionApi tenantOptionApi;

	@Autowired
	private LNSDeviceService lnsDeviceManager;

	@Autowired
	private AgentService agentService;

	@Autowired
	private LNSOperationService lnsOperationManager;

	@Autowired
	private LNSConnectorService lnsConnectorManager;

	@Autowired
	private LNSGatewayService lnsGatewayManager;

	@Autowired
	protected SpringTemplateEngine mMessageTemplateEngine;

	@Autowired
	protected LoraContextService loraContextService;

	@Autowired
	private ApplicationContext applicationContext;

	@Autowired
	private EventApi eventApi;

	protected LinkedList<LNSConnectorWizardStep> wizard = new LinkedList<>();

	protected LinkedList<PropertyDescription> deviceProvisioningAdditionalProperties = new LinkedList<>();

	protected LinkedList<PropertyDescription> gatewayProvisioningAdditionalProperties = new LinkedList<>();

	protected LinkedList<PropertyDescription> payloadSimulationFields = new LinkedList<>();

	public abstract String getType();

	public abstract String getName();

	public abstract String getVersion();

	public abstract DeviceData processUplinkEvent(String eventString) throws IOException;

	public abstract OperationData processDownlinkEvent(String eventString) throws IOException;

	public abstract boolean isOperationUpdate(String eventString);

	public String getSimulatedPayload(Map<String, Object> fields) {
		final Context context = new Context();
		context.setVariables(fields);
		loraContextService.log(context.toString());
		return mMessageTemplateEngine.process("payload.json", context);
	}

	protected I getInstance(ManagedObjectRepresentation instance) {
		@SuppressWarnings("unchecked")
		Class<I> instanceType = (Class<I>) ((ParameterizedType) getClass().getGenericSuperclass())
						.getActualTypeArguments()[0];
		I result = null;
		AutowireCapableBeanFactory beanFactory = applicationContext.getAutowireCapableBeanFactory();
		try {
			result = instanceType.getConstructor(instance.getClass()).newInstance(instance);
			beanFactory.autowireBean(result);
			beanFactory.initializeBean(result, "connector-" + result.getId());
		} catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException
						| NoSuchMethodException | SecurityException e) {
			e.printStackTrace();
		}

		return result;
	}

	public Map<String, LNSConnectorRepresentation> getConnectors() {
		return lnsConnectorManager.getConnectorRepresentations();
	}

	@EventListener
	private void init(MicroserviceSubscriptionAddedEvent event) {
		log.info("Looking for LNS Connectors in tenant {}", subscriptionsService.getTenant());
		InventoryFilter filter = new InventoryFilter().byType(LNS_CONNECTOR_TYPE);
		ManagedObjectCollection col = inventoryApi.getManagedObjectsByFilter(filter);
		QueryParam queryParam = new QueryParam(() -> "query", URLEncoder.encode(
							LNS_TYPE + " eq " + this.getType() + " and type eq '" + LNS_CONNECTOR_TYPE + "'", StandardCharsets.UTF_8));
		for (ManagedObjectRepresentation mor : col.get(queryParam).allPages()) {
			try {
				initializeConnector(mor, event.getCredentials());
			} catch (Exception e) {
				log.warn("Could not initialize connector {}", mor.getName(), e);
			}
		}
		agentService.registerAgent(this);
	}

	private void initializeConnector(ManagedObjectRepresentation mor,
			MicroserviceCredentials credentials) {
		log.info("Retrieved connector: {} of type {}", mor.getName(), mor.getProperty(LNS_TYPE));
		LNSConnector instance = getInstance(mor);
		lnsConnectorManager.addConnector(instance);
		lnsGatewayManager.upsertGateways(instance);
		configureRoutings(instance.getId(), credentials);
	}

	public void mapEventToC8Y(String eventString, String lnsInstanceId) {
		loraContextService.log("Following message was received from the LNS: {}", eventString);
		EventRepresentation event = new EventRepresentation();
		ManagedObjectRepresentation mor = new ManagedObjectRepresentation();
		mor.setId(GId.asGId(lnsInstanceId));
		event.setSource(mor);
		event.setProperty("event", eventString);
		event.setType("raw LNS event");
		event.setText("raw LNS event");
		event.setDateTime(DateTime.now());

		if (isOperationUpdate(eventString)) {
			event.setType("raw LNS down event");
			event.setText("raw LNS down event");
			updateOperation(eventString, lnsInstanceId);
		} else {
			event.setType("raw LNS up event");
			event.setText("raw LNS up event");
			try {
				DeviceData data = processUplinkEvent(eventString);
				if (data != null) {
					lnsDeviceManager.upsertDevice(lnsInstanceId, data);
				}
			} catch (Exception e) {
				throw new UplinkProcessingException("Could not process uplink " + event, e);
			}
		}
		eventApi.create(event);
	}

	public void updateOperation(String event, String lnsInstanceId) {
		try {
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
					loraContextService.log("Unknown operation {} from LNS", data.getCommandId());
				}
			} else {
				if (data.getCommandId() != null) {
					OperationRepresentation operation = lnsOperationManager.retrieveOperation(lnsInstanceId,
									data.getCommandId());
					if (operation != null) {
						operation.setStatus(OperationStatus.FAILED.toString());
						operation.setFailureReason(data.getErrorMessage());
						deviceControlApi.update(operation);
						lnsOperationManager.removeOperation(lnsInstanceId, data.getCommandId());
					}
				} else {
					loraContextService.log("Unknown operation");
				}
			}
		} catch (Exception e) {
			throw new DownlinkProcessingException("Could not process downlink update " + event, e);
		}
	}

	public List<EndDevice> getDevices(String lnsInstanceId) {
		return lnsConnectorManager.getConnector(lnsInstanceId).getDevices();
	}

	private void configureRoutings(String lnsInstanceId, MicroserviceCredentials credentials) {
		var connector = lnsConnectorManager.getConnector(lnsInstanceId);
		String url = getRoutingUrl(connector);
		loraContextService.log("Connector URL is {}", url);
		try {
			connector.removeRoutings();
			connector.configureRoutings(url, subscriptionsService.getTenant(), credentials.getUsername(),
							credentials.getPassword());
		} catch (Exception e) {
			throw new CannotCreateRouteException("Cannot create route for url " + url, e);
		}
	}

	private String getRoutingUrl(LNSConnector connector) {
		String routingBaseUrl = connector.getCustomRoutingBaseUrl()
				.orElse("https://" + c8yUtils.getTenantDomain());
		return routingBaseUrl + "/service/lora-ns-" + this.getType() + "/" + connector.getId();
	}

	public ManagedObjectRepresentation addLnsConnector(LNSConnectorRepresentation connectorRepresentation) {
		loraContextService.log("Adding LNS connector {} with properties {}", connectorRepresentation.getName(),
				connectorRepresentation.getProperties());
		ManagedObjectRepresentation mor = new ManagedObjectRepresentation();
		mor.setType(LNS_CONNECTOR_TYPE);
		mor.setName(connectorRepresentation.getName());
		mor.setProperty(LNS_TYPE, this.getType());
		mor.set(new IsDevice());
		mor.set(new Agent());
		mor = inventoryApi.create(mor);

		ManagedObject agentApi = inventoryApi.getManagedObjectApi(agentService.getAgent().getId());
		agentApi.addChildDevice(mor.getId());

		LNSConnector instance = getInstance(mor);

        Properties allProperties = new Properties();
		allProperties.putAll(instance.getInitProperties());
		allProperties.putAll(connectorRepresentation.getProperties());
		instance.setProperties(allProperties);

		String category = mor.getId().getValue();
		allProperties.forEach((k, v) -> {
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

		lnsConnectorManager.addConnector(instance);
		Optional<MicroserviceCredentials> credentials = subscriptionsService
						.getCredentials(subscriptionsService.getTenant());
        credentials.ifPresent(microserviceCredentials ->
				configureRoutings(instance.getId(), microserviceCredentials));

		lnsGatewayManager.upsertGateways(instance);

		loraContextService.log("Added connector [id={}, name={}, type={}, properties={}]",
				instance.getId(), instance.getName(), instance.getType(), instance.getProperties());

		return mor;
	}

	public void removeLnsConnector(String lnsConnectorId) {
		lnsConnectorManager.getConnector(lnsConnectorId).removeRoutings();
		inventoryApi.delete(new GId(lnsConnectorId));
		lnsConnectorManager.removeConnector(lnsConnectorId);
		AutowireCapableBeanFactory beanFactory = applicationContext.getAutowireCapableBeanFactory();
		beanFactory.destroyBean(beanFactory.getBean("connector-" + lnsConnectorId));
	}

	public void updateLnsConnector(String lnsConnectorId, Properties properties) {
		var c = lnsConnectorManager.getConnector(lnsConnectorId);
		c.setProperties(c.mergeProperties(properties));
		c.getProperties().forEach((k, v) -> {
			OptionRepresentation option = new OptionRepresentation();
			option.setCategory(lnsConnectorId);
			if (isPropertyEncrypted(k.toString())) {
				option.setKey("credentials." + k.toString());
			} else {
				option.setKey(k.toString());
			}
			option.setValue(v.toString());
			tenantOptionApi.save(option);
		});
	}

	private boolean isPropertyEncrypted(String key) {
		boolean[] result = { false };

		wizard.forEach(step -> step.getPropertyDescriptions().forEach(p -> {
			if (p.getName().equals(key)) {
				result[0] = p.isEncrypted();
			}
		}));

		return result[0];
	}

	@Scheduled(initialDelay = 10000, fixedDelay = 300000)
	private void scanGateways() {
		subscriptionsService.runForEachTenant(() -> {
			Map<String, LNSConnector> connectors = lnsConnectorManager.getConnectors();
			if (connectors != null) {
				connectors.values().forEach(c -> {
					if (c.hasGatewayManagementCapability()) {
						loraContextService.log("Scanning gateways in tenant {} with connector {}",
										subscriptionsService.getTenant(), c.getName());
						lnsGatewayManager.upsertGateways(c);
					}
				});
			}
		});
	}

	@Scheduled(initialDelay = 10000, fixedDelay = 10000)
	private void processPendingOperations() {
		subscriptionsService.runForEachTenant(() -> {
			String currentTenant = subscriptionsService.getTenant();
			lnsConnectorManager.getConnectors().values().forEach(connector -> {
				log.info("Checking pending operations in tenant {} for connector {}", subscriptionsService.getTenant(),
								connector.getName());
				OperationCollection oc = deviceControlApi.getOperationsByFilter(
								new OperationFilter().byStatus(OperationStatus.PENDING).byAgent(connector.getId()));
				if (oc != null) {
					for (OperationCollectionRepresentation opCollectionRepresentation = oc
									.get(); opCollectionRepresentation != null
													&& !opCollectionRepresentation.getOperations()
																	.isEmpty(); opCollectionRepresentation = oc
																					.getNextPage(opCollectionRepresentation)) {
						loraContextService.log("Processing pending operations on tenant {} - page {}", currentTenant,
										oc.get().getPageStatistics().getCurrentPage());
						for (OperationRepresentation op : opCollectionRepresentation.getOperations()) {
							lnsOperationManager.executePending(op);
						}
					}
				}
			});
		});
	}

	@Scheduled(initialDelay = 10000, fixedDelay = 300000)
	private void sendMetrics() {
		subscriptionsService.runForEachTenant(() -> {
			C8YData c8yData = new C8YData();
			DateTime now = new DateTime();
			String memoryFragment = "Memory";
			String bytesUnit = "bytes";
			c8yData.addMeasurement(agentService.getAgent(), memoryFragment, "Max Memory", bytesUnit,
							BigDecimal.valueOf(Runtime.getRuntime().maxMemory()), now);
			c8yData.addMeasurement(agentService.getAgent(), memoryFragment, "Free Memory", bytesUnit,
							BigDecimal.valueOf(Runtime.getRuntime().freeMemory()), now);
			c8yData.addMeasurement(agentService.getAgent(), memoryFragment, "Total Memory", bytesUnit,
							BigDecimal.valueOf(Runtime.getRuntime().totalMemory()), now);
			for (MeasurementRepresentation m : c8yData.getMeasurements()) {
				measurementApi.create(m);
			}
		});
	}

	private Integer gatewayScanRate = 300000;
	private Integer gatewayScanStartDelay = 10000;

	public Integer getGatewayScanRate() {
		return gatewayScanRate;
	}

	public void setGatewayScanRate(Integer gatewayScanRate) {
		this.gatewayScanRate = gatewayScanRate;
	}

	public Integer getGatewayScanStartDelay() {
		return gatewayScanStartDelay;
	}

	public void setGatewayScanStartDelay(Integer gatewayScanStartDelay) {
		this.gatewayScanStartDelay = gatewayScanStartDelay;
	}

	@Bean
	public ThreadPoolTaskScheduler taskScheduler() {
		ThreadPoolTaskScheduler taskScheduler = new ThreadPoolTaskScheduler();
		taskScheduler.initialize();
		taskScheduler.setPoolSize(20);
		taskScheduler.schedule(this::scanGateways, new Trigger() {
			@Override
			public Date nextExecutionTime(TriggerContext triggerContext) {
				Calendar nextExecutionTime = new GregorianCalendar();
				Date lastActualExecutionTime = triggerContext.lastActualExecutionTime();
				if (lastActualExecutionTime != null) {
					nextExecutionTime.setTime(lastActualExecutionTime);
					nextExecutionTime.add(Calendar.MILLISECOND, gatewayScanRate);
				} else {
					nextExecutionTime.setTime(new Date());
					nextExecutionTime.add(Calendar.MILLISECOND, gatewayScanStartDelay);
				}
				return nextExecutionTime.getTime();
			}
		});
		return taskScheduler;
	}

	public List<LNSConnectorWizardStep> getInstanceWizard() {
		return wizard;
	}

	public List<PropertyDescription> getDeviceProvisioningAdditionalProperties() {
		return deviceProvisioningAdditionalProperties;
	}

	public List<PropertyDescription> getGatewayProvisioningAdditionalProperties() {
		return gatewayProvisioningAdditionalProperties;
	}

	public List<PropertyDescription> getPayloadSimulationFields() {
		return payloadSimulationFields;
	}
}
