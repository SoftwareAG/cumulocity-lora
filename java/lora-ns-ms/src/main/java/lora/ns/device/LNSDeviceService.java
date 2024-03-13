package lora.ns.device;

import java.util.Optional;

import org.joda.time.DateTime;
import org.springframework.stereotype.Service;

import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
import com.cumulocity.model.idtype.GId;
import com.cumulocity.model.operation.OperationStatus;
import com.cumulocity.rest.representation.event.EventRepresentation;
import com.cumulocity.rest.representation.identity.ExternalIDRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.cumulocity.rest.representation.operation.OperationRepresentation;
import com.cumulocity.sdk.client.devicecontrol.DeviceControlApi;
import com.cumulocity.sdk.client.devicecontrol.OperationCollection;
import com.cumulocity.sdk.client.devicecontrol.OperationFilter;
import com.cumulocity.sdk.client.event.EventApi;
import com.cumulocity.sdk.client.identity.ExternalIDCollection;
import com.cumulocity.sdk.client.identity.IdentityApi;
import com.cumulocity.sdk.client.inventory.InventoryApi;
import com.cumulocity.sdk.client.inventory.ManagedObject;
import com.cumulocity.sdk.client.measurement.MeasurementApi;

import c8y.Command;
import c8y.Configuration;
import c8y.Hardware;
import c8y.IsDevice;
import c8y.Position;
import c8y.SupportedOperations;
import lombok.RequiredArgsConstructor;
import lora.codec.DeviceCodecRepresentation;
import lora.codec.ms.CodecManager;
import lora.codec.ms.CodecProxy;
import lora.common.C8YUtils;
import lora.common.ValidationResult;
import lora.ns.DeviceData;
import lora.ns.connector.LNSConnector;
import lora.ns.connector.LNSConnectorService;
import lora.ns.exception.CannotDeprovisionDeviceException;
import lora.ns.exception.CannotProvisionDeviceException;
import lora.ns.exception.DeviceNotFoundException;
import lora.ns.integration.LNSIntegrationService;
import lora.rest.LoraContext;
import lora.rest.LoraContextService;

@Service
@RequiredArgsConstructor
public class LNSDeviceService {

	private static final String PROVISIONED = "provisioned";

	private static final String CODEC_PROPERTY = "codec";

	private static final String GET_CONFIG_COMMAND = "get config";

	private final C8YUtils c8yUtils;

	private final IdentityApi identityApi;

	private final InventoryApi inventoryApi;

	private final MeasurementApi measurementApi;

	private final EventApi eventApi;

	private final DeviceControlApi deviceControlApi;

	private final MicroserviceSubscriptionsService subscriptionsService;

	private final CodecManager codecManager;

	private final LNSConnectorService lnsConnectorManager;

	private final LoraContextService loraContextService;

	private final LoraContext loraContext;

	private ManagedObjectRepresentation createDeviceWithNameFromLns(String lnsInstanceId, String devEui) {
		LNSConnector connector = lnsConnectorManager.getConnector(lnsInstanceId);
		var device = connector.getDevice(devEui);
		return createDevice(lnsInstanceId, device.getName(), devEui.toLowerCase());
	}

	public void addDeviceProperty(ManagedObjectRepresentation mor, String key, Object value) {
		mor.setProperty(key, value);
		ManagedObjectRepresentation update = new ManagedObjectRepresentation();
		update.setId(mor.getId());
		update.setProperty(key, value);
		inventoryApi.update(update);
	}

	public void addDeviceProperty(ManagedObjectRepresentation mor, Object value) {
		mor.set(value);
		ManagedObjectRepresentation update = new ManagedObjectRepresentation();
		update.setId(mor.getId());
		update.set(value);
		inventoryApi.update(update);
	}

	public void upsertDevice(String lnsConnectorId, DeviceData event) {
		loraContextService.log("Upsert device with devEui {} with Payload {} from fPort {}", event.getDevEui(),
						event.getPayload(), event.getfPort());
		ManagedObjectRepresentation mor = getOrCreateDevice(lnsConnectorId, event.getDevEui());
		boolean useGatewayPosition = !mor.hasProperty("useGatewayPosition") || (Boolean) mor.get("useGatewayPosition");
		if (event.getModel() == null && mor.get(Hardware.class) != null) {
			event.setModel(mor.get(Hardware.class).getModel());
		}
		for (MeasurementRepresentation m : event.getMeasurements()) {
			m.setSource(mor);
			measurementApi.create(m);
		}
		if (useGatewayPosition && event.getLat() != null && event.getLng() != null) {
			loraContextService.log("Using gateway position to locate device: {}, {}", event.getLat(), event.getLng());
			updateLocation(event, mor);
		}
		if (!mor.hasProperty(LNSIntegrationService.LNS_CONNECTOR_REF) || !mor
						.getProperty(LNSIntegrationService.LNS_CONNECTOR_REF).toString().equals(lnsConnectorId)) {
			addDeviceProperty(mor, LNSIntegrationService.LNS_CONNECTOR_REF, lnsConnectorId);
		}
		updateCodec(mor);
		if (!mor.hasProperty(PROVISIONED) || !Boolean.valueOf(mor.getProperty(PROVISIONED).toString())) {
			addDeviceProperty(mor, PROVISIONED, true);
		}
		if (mor.get(Configuration.class) == null) {
			getDeviceConfig(mor);
		}
		if (event.getPayload() != null && event.getPayload().length > 0) {
			codecManager.decode(mor, event);
		}
	}

	private void updateCodec(ManagedObjectRepresentation mor) {
		DeviceCodecRepresentation codec = mor.get(DeviceCodecRepresentation.class);
		if (mor.getProperty(CODEC_PROPERTY) != null
						&& (codec == null || !codec.getId().equals(mor.getProperty(CODEC_PROPERTY)))) {
			CodecProxy codecProxy = codecManager.getCodec(mor.getProperty(CODEC_PROPERTY).toString());
			if (codecProxy != null) {
				addDeviceProperty(mor, codecProxy);
			}
		}
	}

	private static Object lock = new Object();

	private ManagedObjectRepresentation getOrCreateDevice(String lnsInstanceId, String devEui) {
		var mor = getDevice(devEui.toLowerCase());
		ManagedObjectRepresentation result = mor.get();
		if (mor.isEmpty()) {
			synchronized (lock) {
				mor = getDevice(devEui.toLowerCase());
				if (mor.isEmpty()) {
					result = createDeviceWithNameFromLns(lnsInstanceId, devEui);
				}
			}
		} else {
			addDeviceToLNSConnector(lnsInstanceId, result);
		}
		loraContext.setDevice(result);
		return result;
	}

	private void updateLocation(DeviceData event, ManagedObjectRepresentation mor) {
		Position p = new Position();
		p.setLat(event.getLat());
		p.setLng(event.getLng());
		mor.set(p);
		addDeviceProperty(mor, p);
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

	public ManagedObjectRepresentation createDevice(String lnsConnectorId, String name, String devEUI) {
		ManagedObjectRepresentation mor = new ManagedObjectRepresentation();
		mor.setName(name);
		mor.setProperty(LNSIntegrationService.LNS_CONNECTOR_REF, lnsConnectorId);
		mor.set(new LoRaDevice());
		mor.set(new IsDevice());
		SupportedOperations supportedOperations = new SupportedOperations();
		supportedOperations.add("c8y_Command");
		supportedOperations.add("c8y_Configuration");
		mor.set(supportedOperations);
		mor = inventoryApi.create(mor);
		loraContext.setDevice(mor);
		c8yUtils.createExternalId(mor, devEUI, C8YUtils.DEVEUI_TYPE);
		c8yUtils.createExternalId(mor, devEUI, "c8y_Serial");
		addDeviceToLNSConnector(lnsConnectorId, mor);
		return mor;
	}

	public String getDeviceEui(GId id) {
		String result = null;
		ExternalIDCollection extIds = identityApi.getExternalIdsOfGlobalId(id);
		if (extIds != null) {
			for (ExternalIDRepresentation extId : extIds.get().allPages()) {
				if (extId.getType().equals(C8YUtils.DEVEUI_TYPE)) {
					result = extId.getExternalId();
					loraContextService.log("Device {} matches devEUI {}", id, result);
					break;
				}
			}
			if (result == null) {
				loraContextService.log("Device {} has no external Ids or does not exist in tenant {}.", id,
								subscriptionsService.getTenant());
			}
		} else {
			loraContextService.log("Device {} has no external Ids or does not exist in tenant {}.", id,
							subscriptionsService.getTenant());
		}
		return result;
	}

	public Optional<ManagedObjectRepresentation> getDevice(String devEui) {
		return c8yUtils.findExternalId(devEui, C8YUtils.DEVEUI_TYPE)
						.map(extId -> Optional.of(inventoryApi.get(extId.getManagedObject().getId())))
						.orElse(Optional.empty());
	}

	public ManagedObjectRepresentation mustGetDevice(String devEui) {
		return c8yUtils.findExternalId(devEui, C8YUtils.DEVEUI_TYPE)
						.map(extId -> inventoryApi.get(extId.getManagedObject().getId()))
						.orElseThrow(() -> new DeviceNotFoundException(devEui));
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

	private ManagedObjectRepresentation initDevice(ManagedObjectRepresentation device,
					DeviceProvisioning deviceProvisioning) {
		var update = new ManagedObjectRepresentation();
		update.setId(device.getId());
		if (deviceProvisioning.getCodec() != null) {
			update.setProperty(CODEC_PROPERTY, deviceProvisioning.getCodec());
		}
		if (deviceProvisioning.getModel() != null) {
			Hardware hardware = new Hardware();
			hardware.setModel(deviceProvisioning.getModel());
			update.set(hardware);
		}
		if (deviceProvisioning.getType() != null) {
			update.setType(deviceProvisioning.getType());
		}
		update.setProperty(PROVISIONED, true);
		return inventoryApi.update(update);
	}

	public ManagedObjectRepresentation provisionDevice(String lnsConnectorId, DeviceProvisioning deviceProvisioning) {
		loraContextService.log("Will provision device on LNS connector {}: {}", lnsConnectorId, deviceProvisioning);
		ManagedObjectRepresentation mor = null;
		LNSConnector connector = lnsConnectorManager.getConnector(lnsConnectorId);
		ValidationResult validationResult = deviceProvisioning.validate();
		if (validationResult.isOk()) {
			try {
				connector.provisionDevice(deviceProvisioning);
				mor = createDevice(lnsConnectorId, deviceProvisioning.getName(), deviceProvisioning.getDevEUI());
				mor = initDevice(mor, deviceProvisioning);
			} catch (Exception e) {
				throw new CannotProvisionDeviceException(deviceProvisioning.getDevEUI(), e);
			}
			EventRepresentation event = new EventRepresentation();
			event.setType("Device provisioned");
			event.setText("Device has been provisioned");
			event.setDateTime(new DateTime());
			event.setSource(mor);
			eventApi.create(event);
			getDeviceConfig(mor);
			if (connector.getType().equals("generic")) {
				ManagedObjectRepresentation updateOwner = new ManagedObjectRepresentation();
				updateOwner.setId(mor.getId());
				updateOwner.setOwner(inventoryApi.get(GId.asGId(lnsConnectorId)).getOwner());
				inventoryApi.update(updateOwner);
			}
		} else {
			throw new CannotProvisionDeviceException(deviceProvisioning.getDevEUI());
		}
		return mor;
	}

	public void deprovisionDevice(String lnsInstanceId, String deveui) {
		var connector = lnsConnectorManager.getConnector(lnsInstanceId);
		try {
			connector.deprovisionDevice(deveui);
		} catch (Exception e) {
			throw new CannotDeprovisionDeviceException(deveui, e);
		}
		ManagedObjectRepresentation mor = mustGetDevice(deveui);
		ManagedObjectRepresentation update = new ManagedObjectRepresentation();
		update.setId(mor.getId());
		update.removeProperty("c8y_RequiredInterval");
		update.setProperty(PROVISIONED, false);
		inventoryApi.update(update);
	}
}
