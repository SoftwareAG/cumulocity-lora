package lora.ns.device;

import java.util.Optional;

import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
import com.cumulocity.model.event.CumulocitySeverities;
import com.cumulocity.model.idtype.GId;
import com.cumulocity.model.operation.OperationStatus;
import com.cumulocity.rest.representation.alarm.AlarmRepresentation;
import com.cumulocity.rest.representation.event.EventRepresentation;
import com.cumulocity.rest.representation.identity.ExternalIDRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.cumulocity.rest.representation.operation.OperationRepresentation;
import com.cumulocity.sdk.client.SDKException;
import com.cumulocity.sdk.client.alarm.AlarmApi;
import com.cumulocity.sdk.client.devicecontrol.DeviceControlApi;
import com.cumulocity.sdk.client.devicecontrol.OperationCollection;
import com.cumulocity.sdk.client.devicecontrol.OperationFilter;
import com.cumulocity.sdk.client.event.EventApi;
import com.cumulocity.sdk.client.identity.ExternalIDCollection;
import com.cumulocity.sdk.client.identity.IdentityApi;
import com.cumulocity.sdk.client.inventory.InventoryApi;
import com.cumulocity.sdk.client.inventory.ManagedObject;
import com.cumulocity.sdk.client.measurement.MeasurementApi;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import c8y.Command;
import c8y.Configuration;
import c8y.Hardware;
import c8y.IsDevice;
import c8y.Position;
import c8y.SupportedOperations;
import lora.codec.DeviceCodecRepresentation;
import lora.codec.ms.CodecManager;
import lora.codec.ms.CodecProxy;
import lora.common.C8YUtils;
import lora.common.ValidationResult;
import lora.ns.DeviceData;
import lora.ns.agent.AgentService;
import lora.ns.connector.LNSConnector;
import lora.ns.connector.LNSConnectorManager;
import lora.ns.integration.LNSIntegrationService;

@Component
public class LNSDeviceManager {

	/**
	 *
	 */
	private static final String PROVISIONED = "provisioned";

	/**
	 *
	 */
	private static final String CODEC_PROPERTY = "codec";

	/**
	 *
	 */
	private static final String GET_CONFIG_COMMAND = "get config";

	final Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	protected C8YUtils c8yUtils;

	@Autowired
	protected IdentityApi identityApi;

	@Autowired
	protected InventoryApi inventoryApi;

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
	private LNSConnectorManager lnsConnectorManager;

	@Autowired
	private AgentService agentService;

	private ManagedObjectRepresentation createDeviceWithName(String lnsInstanceId, DeviceData event,
			ManagedObjectRepresentation agent) {
		String name = event.getDevEui();
		Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsInstanceId);
		if (connector.isPresent()) {
			Optional<EndDevice> device = connector.get().getDevice(event.getDevEui());
			if (device.isPresent()) {
				name = device.get().getName();
			}
		}
		return createDevice(lnsInstanceId, name, event.getDevEui().toLowerCase(), agent);
	}

	public void upsertDevice(String lnsInstanceId, DeviceData event, ManagedObjectRepresentation agent) {
		try {
			logger.info("Upsert device with devEui {} with Payload {} from fPort {}", event.getDevEui(),
					event.getPayload(), event.getfPort());
			ManagedObjectRepresentation mor = getOrCreateDevice(lnsInstanceId, event, agent);
			boolean useGatewayPosition = mor.hasProperty("useGatewayPosition") ? (Boolean)mor.get("useGatewayPosition") : true;
			if (event.getModel() == null && mor.get(Hardware.class) != null) {
				event.setModel(mor.get(Hardware.class).getModel());
			}
			for (MeasurementRepresentation m : event.getMeasurements()) {
				m.setSource(mor);
				measurementApi.create(m);
			}
			if (useGatewayPosition && event.getLat() != null && event.getLng() != null) {
				logger.info("Using gateway position to locate device: {}, {}", event.getLat(), event.getLng());
				updateLocation(event, mor);
			}
			if (!mor.hasProperty(LNSIntegrationService.LNS_CONNECTOR_REF)
					|| !mor.getProperty(LNSIntegrationService.LNS_CONNECTOR_REF).toString().equals(lnsInstanceId)) {
				mor.setProperty(LNSIntegrationService.LNS_CONNECTOR_REF, lnsInstanceId);
				updateDevice(event.getDevEui(), mor);
			}
			DeviceCodecRepresentation codec = mor.get(DeviceCodecRepresentation.class);
			if (mor.getProperty(CODEC_PROPERTY) != null
					&& (codec == null || !codec.getId().equals(mor.getProperty(CODEC_PROPERTY)))) {
				CodecProxy codecProxy = codecManager.getCodec(mor.getProperty(CODEC_PROPERTY).toString());
				if (codecProxy != null) {
					mor.set(new DeviceCodecRepresentation(codecProxy));
					updateDevice(event.getDevEui(), mor);
				}
			}
			if (!mor.hasProperty(PROVISIONED) || !Boolean.valueOf(mor.getProperty(PROVISIONED).toString())) {
				mor.setProperty(PROVISIONED, true);
				updateDevice(event.getDevEui(), mor);
			}
			addDeviceToAgent(agent, mor);
			if (mor.get(Configuration.class) == null) {
				getDeviceConfig(mor);
			}
			if (event.getPayload() != null && event.getPayload().length > 0) {
				codecManager.decode(mor, event);
			}
		} catch (SDKException e) {
			e.printStackTrace();
			logger.info("Error on upserting Device", e);
			// Case where device was deleted but is still in cache
			if (e.getHttpStatus() == 422) {
				logger.info("Device was deleted, trying to recreate it...");
				createDeviceWithName(lnsInstanceId, event, agent);
				getOrCreateDevice(lnsInstanceId, event, agent);
			}
		}
	}

	private ManagedObjectRepresentation getOrCreateDevice(String lnsInstanceId, DeviceData event,
			ManagedObjectRepresentation agent) {
		ManagedObjectRepresentation mor = getDevice(event.getDevEui().toLowerCase());
		if (mor == null) {
			synchronized (event.getDevEui().intern()) {
				mor = getDevice(event.getDevEui().toLowerCase());
				if (mor == null) {
					mor = createDeviceWithName(lnsInstanceId, event, agent);
				}
			}
		}
		mor.setLastUpdatedDateTime(null);
		return mor;
	}

	private void updateLocation(DeviceData event, ManagedObjectRepresentation mor) {
		Position p = new Position();
		p.setLat(event.getLat());
		p.setLng(event.getLng());
		mor.set(p);
		updateDevice(event.getDevEui(), mor);
		EventRepresentation locationUpdate = new EventRepresentation();
		locationUpdate.setSource(mor);
		locationUpdate.setType("c8y_LocationUpdate");
		locationUpdate.set(p);
		locationUpdate.setText("Location updated");
		locationUpdate.setDateTime(new DateTime());
		eventApi.create(locationUpdate);
	}

	public void addDeviceToAgent(ManagedObjectRepresentation agent, ManagedObjectRepresentation mor) {
		ManagedObject agentApi = inventoryApi.getManagedObjectApi(agent.getId());
		try {
			agentApi.getChildDevice(mor.getId());
		} catch (Exception e) {
			agentApi.addChildDevice(mor.getId());
		}
	}

	public ManagedObjectRepresentation createDevice(String devEUI, ManagedObjectRepresentation mor) {
		if (mor == null) {
			mor = new ManagedObjectRepresentation();
		}
		//mor.setType("c8y_LoRaDevice");
		mor.set(new LoRaDevice());
		mor.set(new IsDevice());
		SupportedOperations supportedOperations = new SupportedOperations();
		supportedOperations.add("c8y_Command");
		supportedOperations.add("c8y_Configuration");
		mor.set(supportedOperations);
		if (mor.getId() == null) {
			mor = inventoryApi.create(mor);
		} else {
			mor.setLastUpdatedDateTime(null);
			mor = inventoryApi.update(mor);
		}
		/*
		 * if (!deviceCache.containsKey(subscriptionsService.getTenant())) {
		 * deviceCache.put(subscriptionsService.getTenant(), new
		 * ConcurrentReferenceHashMap<>()); }
		 */
		c8yUtils.createExternalId(mor, devEUI, C8YUtils.DEVEUI_TYPE);
		// deviceCache.get(subscriptionsService.getTenant()).put(devEUI, mor);

		return mor;
	}

	public ManagedObjectRepresentation createDevice(String lnsConnectorId, String name, String devEUI,
			ManagedObjectRepresentation agent) {
		ManagedObjectRepresentation mor = null;
		if (lnsConnectorId != null && devEUI != null) {
			mor = createDevice(devEUI, mor);
			mor.setName(name);
			mor.setProperty(LNSIntegrationService.LNS_CONNECTOR_REF, lnsConnectorId);
			mor.setLastUpdatedDateTime(null);
			mor = inventoryApi.update(mor);
			ManagedObject agentApi = inventoryApi.getManagedObjectApi(agent.getId());
			agentApi.addChildDevice(mor.getId());
			c8yUtils.createExternalId(mor, devEUI, C8YUtils.DEVEUI_TYPE);
		} else {
			if (lnsConnectorId == null) {
				AlarmRepresentation alarm = new AlarmRepresentation();
				alarm.setSeverity(CumulocitySeverities.CRITICAL.name());
				alarm.setType("Device provisioning error");
				alarm.setText("Connector ID cannot be null");
				alarm.setSource(agent);
				alarmApi.create(alarm);
			}
			if (devEUI == null) {
				AlarmRepresentation alarm = new AlarmRepresentation();
				alarm.setSeverity(CumulocitySeverities.CRITICAL.name());
				alarm.setType("Device provisioning error");
				alarm.setText("devEUI cannot be null");
				alarm.setSource(agent);
				alarmApi.create(alarm);
			}
		}
		/*
		 * if (!deviceCache.containsKey(subscriptionsService.getTenant())) {
		 * deviceCache.put(subscriptionsService.getTenant(), new
		 * ConcurrentReferenceHashMap<>()); }
		 * deviceCache.get(subscriptionsService.getTenant()).put(devEUI, mor);
		 */
		return mor;
	}

	public String getDeviceEui(GId id) {
		String result = null;
		ExternalIDCollection extIds = identityApi.getExternalIdsOfGlobalId(id);
		if (extIds != null) {
			for (ExternalIDRepresentation extId : extIds.get().allPages()) {
				if (extId.getType().equals(C8YUtils.DEVEUI_TYPE)) {
					result = extId.getExternalId();
					logger.info("Device {} matches devEUI {}", id, result);
					break;
				}
			}
			if (result == null) {
				logger.info("Device {} has no external Ids or does not exist in tenant {}.", id,
						subscriptionsService.getTenant());
			}
		} else {
			logger.info("Device {} has no external Ids or does not exist in tenant {}.", id,
					subscriptionsService.getTenant());
		}
		return result;
	}

	// Keep it for later use, at it requires huge changes in the framework and the
	// UI...
	// Map<String, ConcurrentReferenceHashMap<String, ManagedObjectRepresentation>>
	// deviceCache = new HashMap<>();

	public void updateDevice(String devEui, ManagedObjectRepresentation device) {
		/*
		 * if (!deviceCache.containsKey(subscriptionsService.getTenant())) {
		 * deviceCache.put(subscriptionsService.getTenant(), new
		 * ConcurrentReferenceHashMap<>()); }
		 * deviceCache.get(subscriptionsService.getTenant()).put(devEui,
		 * inventoryApi.update(device));
		 */
		inventoryApi.update(device);
	}

	public ManagedObjectRepresentation getDevice(String devEui) {
		ManagedObjectRepresentation result = null;
		/*
		 * if (!deviceCache.containsKey(subscriptionsService.getTenant())) {
		 * deviceCache.put(subscriptionsService.getTenant(), new
		 * ConcurrentReferenceHashMap<>()); } ManagedObjectRepresentation result =
		 * deviceCache.get(subscriptionsService.getTenant()).get(devEui); if (result ==
		 * null) {
		 */
		Optional<ExternalIDRepresentation> extId = c8yUtils.findExternalId(devEui, C8YUtils.DEVEUI_TYPE);
		if (extId.isPresent()) {
			result = inventoryApi.get(extId.get().getManagedObject().getId());
			result.setLastUpdatedDateTime(null);
			// deviceCache.get(subscriptionsService.getTenant()).put(devEui, result);
		}
		// }
		return result;
	}

	public void getDeviceConfig(ManagedObjectRepresentation mor) {
		if (codecManager.getAvailableOperations(mor) != null
				&& codecManager.getAvailableOperations(mor).containsKey(GET_CONFIG_COMMAND)) {
			OperationCollection oc = deviceControlApi.getOperationsByFilter(
					new OperationFilter().byDevice(mor.getId().getValue()).byStatus(OperationStatus.EXECUTING));
			for (OperationRepresentation o : oc.get(2000).allPages()) {
				if (o.get(Command.class) != null && o.get(Command.class).getText().contains(GET_CONFIG_COMMAND)) {
					return;
				}
			}
			OperationRepresentation operation = new OperationRepresentation();
			Command command = new Command(GET_CONFIG_COMMAND);
			operation.set(command);
			operation.setDeviceId(mor.getId());
			deviceControlApi.create(operation);
		}
	}

	private ManagedObjectRepresentation upsertDevice(String lnsInstanceId, DeviceProvisioning deviceProvisioning) {
		ManagedObjectRepresentation mor;
		mor = getDevice(deviceProvisioning.getDevEUI().toLowerCase());
		if (mor == null) {
			mor = createDevice(deviceProvisioning.getDevEUI(), null);
		}
		mor.setProperty(LNSIntegrationService.LNS_CONNECTOR_REF, lnsInstanceId);
		addDeviceToAgent(agentService.getAgent(), mor);
		if (deviceProvisioning.getCodec() != null) {
			mor.setProperty("codec", deviceProvisioning.getCodec());
		}
		if (deviceProvisioning.getModel() != null) {
			Hardware hardware = new Hardware();
			hardware.setModel(deviceProvisioning.getModel());
			mor.set(hardware);
		}
		if (deviceProvisioning.getType() != null) {
			mor.setType(deviceProvisioning.getType());
		}
		mor.setProperty("provisioned", true);
		mor.setLastUpdatedDateTime(null);
		mor.setName(deviceProvisioning.getName());
		updateDevice(deviceProvisioning.getDevEUI(), mor);
		return mor;
	}
	
	public DeviceProvisioningResponse provisionDevice(String lnsConnectorId, DeviceProvisioning deviceProvisioning) {
		logger.info("Will provision device on LNS connector {}: {}", lnsConnectorId, deviceProvisioning);
		DeviceProvisioningResponse response = new DeviceProvisioningResponse();
		ManagedObjectRepresentation mor = null;
		String errorMessage = null;
		Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsConnectorId);
		ValidationResult validationResult = deviceProvisioning.validate();
		if (validationResult.isOk() && connector.isPresent() && connector.get().provisionDevice(deviceProvisioning)) {
			mor = upsertDevice(lnsConnectorId, deviceProvisioning);
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
						+ lnsConnectorId;
				if (!validationResult.isOk()) {
					errorMessage += validationResult.getReason();
				}
			} else {
				errorMessage = "LNS connector Id '" + lnsConnectorId
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

	public boolean deprovisionDevice(String lnsInstanceId, String deveui) {
		boolean result = false;
		Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsInstanceId);
		if (connector.isPresent() && connector.get().deprovisionDevice(deveui)) {
			ManagedObjectRepresentation mor = getDevice(deveui);
			mor.removeProperty("c8y_RequiredInterval");
			mor.setProperty("provisioned", false);
			mor.setLastUpdatedDateTime(null);
			updateDevice(deveui, mor);
			result = true;
		}
		return result;
	}
}
