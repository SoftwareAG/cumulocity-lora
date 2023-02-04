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
import lora.ns.connector.LNSConnector;
import lora.ns.connector.LNSConnectorManager;
import lora.ns.connector.LNSResponse;
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

	private ManagedObjectRepresentation createDeviceWithName(String lnsInstanceId, DeviceData event) {
		String name = event.getDevEui();
		Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsInstanceId);
		if (connector.isPresent()) {
			LNSResponse<EndDevice> device = connector.get().getDevice(event.getDevEui());
			if (device.isOk()) {
				name = device.getResult().getName();
			}
		}
		return createDevice(lnsInstanceId, name, event.getDevEui().toLowerCase());
	}

	public void upsertDevice(String lnsConnectorId, DeviceData event) {
		try {
			logger.info("Upsert device with devEui {} with Payload {} from fPort {}", event.getDevEui(),
					event.getPayload(), event.getfPort());
			ManagedObjectRepresentation mor = getOrCreateDevice(lnsConnectorId, event);
			boolean useGatewayPosition = mor.hasProperty("useGatewayPosition") ? (Boolean) mor.get("useGatewayPosition")
					: true;
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
					|| !mor.getProperty(LNSIntegrationService.LNS_CONNECTOR_REF).toString().equals(lnsConnectorId)) {
				mor.setProperty(LNSIntegrationService.LNS_CONNECTOR_REF, lnsConnectorId);
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
			addDeviceToLNSConnector(lnsConnectorId, mor);
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
				createDeviceWithName(lnsConnectorId, event);
				getOrCreateDevice(lnsConnectorId, event);
			}
		}
	}

	private ManagedObjectRepresentation getOrCreateDevice(String lnsInstanceId, DeviceData event) {
		ManagedObjectRepresentation mor = getDevice(event.getDevEui().toLowerCase());
		if (mor == null) {
			synchronized (event.getDevEui().intern()) {
				mor = getDevice(event.getDevEui().toLowerCase());
				if (mor == null) {
					mor = createDeviceWithName(lnsInstanceId, event);
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

	public void addDeviceToLNSConnector(String lnsConnectorId, ManagedObjectRepresentation mor) {
		ManagedObject connectorApi = inventoryApi.getManagedObjectApi(GId.asGId(lnsConnectorId));
		try {
			connectorApi.getChildDevice(mor.getId());
		} catch (Exception e) {
			connectorApi.addChildDevice(mor.getId());
		}
	}

	public ManagedObjectRepresentation createDevice(String devEUI, ManagedObjectRepresentation mor) {
		if (mor == null) {
			mor = new ManagedObjectRepresentation();
		}
		// mor.setType("c8y_LoRaDevice");
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
		c8yUtils.createExternalId(mor, devEUI, "c8y_Serial");
		// deviceCache.get(subscriptionsService.getTenant()).put(devEUI, mor);

		return mor;
	}

	public ManagedObjectRepresentation createDevice(String lnsConnectorId, String name, String devEUI) {
		ManagedObjectRepresentation mor = null;
		mor = createDevice(devEUI, mor);
		mor.setName(name);
		mor.setProperty(LNSIntegrationService.LNS_CONNECTOR_REF, lnsConnectorId);
		mor.setLastUpdatedDateTime(null);
		mor = inventoryApi.update(mor);
		addDeviceToLNSConnector(lnsConnectorId, mor);
		c8yUtils.createExternalId(mor, devEUI, C8YUtils.DEVEUI_TYPE);
		c8yUtils.createExternalId(mor, devEUI, "c8y_Serial");
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

	private ManagedObjectRepresentation upsertDevice(String lnsConnectorId, DeviceProvisioning deviceProvisioning) {
		ManagedObjectRepresentation mor;
		mor = getDevice(deviceProvisioning.getDevEUI().toLowerCase());
		if (mor == null) {
			mor = createDevice(deviceProvisioning.getDevEUI(), null);
		}
		mor.setProperty(LNSIntegrationService.LNS_CONNECTOR_REF, lnsConnectorId);
		addDeviceToLNSConnector(lnsConnectorId, mor);
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

	public LNSResponse<ManagedObjectRepresentation> provisionDevice(String lnsConnectorId,
			DeviceProvisioning deviceProvisioning) {
		logger.info("Will provision device on LNS connector {}: {}", lnsConnectorId, deviceProvisioning);
		LNSResponse<ManagedObjectRepresentation> response = new LNSResponse<ManagedObjectRepresentation>().withOk(true);
		ManagedObjectRepresentation mor = null;
		Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsConnectorId);
		ValidationResult validationResult = deviceProvisioning.validate();
		if (validationResult.isOk() && connector.isPresent()) {
			LNSResponse<Void> result = connector.get().provisionDevice(deviceProvisioning);
			if (result.isOk() || result.getMessage().equals("Not implemented.")) {
				mor = upsertDevice(lnsConnectorId, deviceProvisioning);
				EventRepresentation event = new EventRepresentation();
				event.setType("Device provisioned");
				event.setText("Device has been provisioned");
				event.setDateTime(new DateTime());
				event.setSource(mor);
				eventApi.create(event);
				getDeviceConfig(mor);
				response.setResult(mor);
				if (result.getMessage() != null && result.getMessage().equals("Not implemented.")) {
					OperationRepresentation op = new OperationRepresentation();
					op.setDeviceId(GId.asGId(lnsConnectorId));
					op.set(new Command("{'provision':{'deveui':'" + deviceProvisioning.getDevEUI() + "', 'appeui': '"
							+ deviceProvisioning.getAppEUI() + "', 'appkey': '" + deviceProvisioning.getAppKey()
							+ "'}}"));
					deviceControlApi.create(op);
					ManagedObjectRepresentation updateOwner = new ManagedObjectRepresentation();
					updateOwner.setId(mor.getId());
					updateOwner.setOwner(inventoryApi.get(GId.asGId(lnsConnectorId)).getOwner());
					inventoryApi.update(updateOwner);
				}
			} else {
				response.setOk(false);
				response.setMessage(result.getMessage());
			}
		} else {
			response.setOk(false);
			AlarmRepresentation alarm = new AlarmRepresentation();
			alarm.setType("Device provisioning error");
			if (connector.isPresent()) {
				response.setMessage("Couldn't provision device " + deviceProvisioning.getDevEUI() + " in LNS connector "
						+ lnsConnectorId);
				if (!validationResult.isOk()) {
					response.setMessage(response.getMessage() + validationResult.getReason());
				}
			} else {
				response.setMessage("LNS connector Id '" + lnsConnectorId
						+ "' doesn't exist. Please use a valid managed object Id.");
			}
			alarm.setText(response.getMessage());
			alarm.setDateTime(new DateTime());
			alarm.setSeverity(CumulocitySeverities.CRITICAL.name());
			mor = getDevice(deviceProvisioning.getDevEUI().toLowerCase());
			if (mor != null) {
				alarm.setSource(mor);
			} else {
				ManagedObjectRepresentation connectorMor = new ManagedObjectRepresentation();
				connectorMor.setId(GId.asGId(lnsConnectorId));
				alarm.setSource(connectorMor);
			}
			alarmApi.create(alarm);
		}
		return response;
	}

	public LNSResponse<Void> deprovisionDevice(String lnsInstanceId, String deveui) {
		Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsInstanceId);
		LNSResponse<Void> result = new LNSResponse<>();
		if (connector.isPresent()) {
			result = connector.get().deprovisionDevice(deveui);
			if (result.isOk() || result.getMessage().equals("Not implemented.")) {
				ManagedObjectRepresentation mor = getDevice(deveui);
				mor.removeProperty("c8y_RequiredInterval");
				mor.setProperty("provisioned", false);
				mor.setLastUpdatedDateTime(null);
				try {
					updateDevice(deveui, mor);
				} catch (Exception e) {
					e.printStackTrace();
					result.setOk(false);
					result.setMessage(e.getMessage());
				}
				if (result.getMessage() != null && result.getMessage().equals("Not implemented.")) {
					OperationRepresentation op = new OperationRepresentation();
					op.setDeviceId(GId.asGId(lnsInstanceId));
					op.set(new Command("{'deprovision':{'deveui':'" + deveui + "'}}"));
					deviceControlApi.create(op);
				}
			}
		} else {
			result.withMessage("No connector found with id " + lnsInstanceId).withOk(false);
		}
		return result;
	}
}
