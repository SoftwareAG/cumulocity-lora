package lora.ns.operation;

import java.util.HashMap;
import java.util.Map;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
import com.cumulocity.model.idtype.GId;
import com.cumulocity.model.operation.OperationStatus;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.operation.OperationRepresentation;
import com.cumulocity.sdk.client.devicecontrol.DeviceControlApi;
import com.cumulocity.sdk.client.inventory.InventoryApi;

import c8y.Command;
import lombok.RequiredArgsConstructor;
import lora.codec.downlink.DownlinkData;
import lora.codec.ms.CodecManager;
import lora.ns.connector.LNSConnectorService;
import lora.ns.device.LNSDeviceService;
import lora.ns.integration.LNSIntegrationService;
import lora.rest.LoraContextService;

@Service
@RequiredArgsConstructor
public class LNSOperationService {

	private static final String DOWNLINKS = "downlinks";

	private final InventoryApi inventoryApi;

	private final DeviceControlApi deviceControlApi;

	private final MicroserviceSubscriptionsService subscriptionsService;

	private final CodecManager codecManager;

	private final LNSDeviceService lnsDeviceManager;

	private final LNSConnectorService lnsConnectorManager;

	private final LoraContextService loraContextService;

	private final Map<String, Map<String, Map<String, OperationRepresentation>>> operations = new HashMap<>();

	@Async
	public void executePending(OperationRepresentation operation) {
		loraContextService.log("Will execute operation {}", operation.toJSON());
		if (lnsDeviceManager.getDeviceEui(operation.getDeviceId()) != null) {
			loraContextService.log("Processing operation {}", operation);
			DownlinkData encodedData = codecManager.encode(lnsDeviceManager.getDeviceEui(operation.getDeviceId()),
					operation);
			if (encodedData != null && encodedData.getFport() != null && encodedData.getPayload() != null
					&& !encodedData.isSkipDownlink()) {
				operation.setStatus(OperationStatus.EXECUTING.toString());
				String lnsConnectorId = inventoryApi.get(operation.getDeviceId())
						.getProperty(LNSIntegrationService.LNS_CONNECTOR_REF).toString();
				processOperation(lnsConnectorId, encodedData, operation);
			} else if (encodedData != null && encodedData.isSkipDownlink()) {
				operation.setStatus(OperationStatus.SUCCESSFUL.toString());
				if (operation.get(Command.class) != null) {
					Command command = operation.get(Command.class);
					command.setResult("Command skipped.");
					operation.set(command);
				}
			} else {
				operation.setStatus(OperationStatus.FAILED.toString());
				if (operation.get(Command.class) != null) {
					Command command = operation.get(Command.class);
					command.setResult("Command not supported.");
					operation.set(command);
				} else {
					operation.setFailureReason("Command not supported.");
				}
			}
			deviceControlApi.update(operation);
		} else {
			loraContextService.log("Operation {} will be ignored", operation);
		}
	}

	public void processOperation(String lnsConnectorId, DownlinkData operation, OperationRepresentation c8yOperation) {
		try {
			String commandId = lnsConnectorManager.getConnector(lnsConnectorId).sendDownlink(operation);
			if (commandId != null) {
				storeOperation(lnsConnectorId, c8yOperation, commandId);
			} else {
				loraContextService.log("Operation {} status won't be updated as no correlation Id was sent by LNS.",
						operation);
			}
		} catch (Exception e) {
			loraContextService.log("Unable to send downlink", e);
			c8yOperation.setStatus(OperationStatus.FAILED.toString());
			c8yOperation.setFailureReason(e.getMessage());
			Command command = c8yOperation.get(Command.class);
			command.setResult("Unable to send downlink: " + e.getMessage());
			c8yOperation.set(command);
			deviceControlApi.update(c8yOperation);
		}
	}

	public void storeOperation(String lnsConnectorId, OperationRepresentation c8yOperation, String commandId) {
		if (!operations.containsKey(subscriptionsService.getTenant())) {
			operations.put(subscriptionsService.getTenant(), new HashMap<>());
		}
		if (!operations.get(subscriptionsService.getTenant()).containsKey(lnsConnectorId)) {
			operations.get(subscriptionsService.getTenant()).put(lnsConnectorId, new HashMap<>());
		}
		operations.get(subscriptionsService.getTenant()).get(lnsConnectorId).put(commandId, c8yOperation);
		storeOperationOnMO(lnsConnectorId, c8yOperation, commandId);
	}

	public OperationRepresentation retrieveOperation(String lnsConnectorId, String commandId) {
		OperationRepresentation result = operations.containsKey(subscriptionsService.getTenant())
				&& operations.get(subscriptionsService.getTenant()).containsKey(lnsConnectorId)
						? operations.get(subscriptionsService.getTenant()).get(lnsConnectorId).get(commandId)
						: null;

		if (result == null) {
			loraContextService.log("Operation {} not in cache, fetching it from DB", commandId);
			result = retrieveOperationFromMO(lnsConnectorId, commandId);
		}

		return result;
	}

	public void removeOperation(String lnsConnectorId, String commandId) {
		if (operations.containsKey(subscriptionsService.getTenant())
				&& operations.get(subscriptionsService.getTenant()).containsKey(lnsConnectorId)) {
			operations.get(subscriptionsService.getTenant()).get(lnsConnectorId).remove(commandId);
			removeOperationOnMO(lnsConnectorId, commandId);
		}
	}

	@SuppressWarnings("unchecked")
	private void storeOperationOnMO(String lnsConnectorId, OperationRepresentation c8yOperation, String commandId) {
		ManagedObjectRepresentation mor = inventoryApi.get(GId.asGId(lnsConnectorId));
		if (mor != null) {
			Map<String, String> downlinks = new HashMap<>();
			if (mor.hasProperty(DOWNLINKS)) {
				downlinks = (Map<String, String>) mor.getProperty(DOWNLINKS);
			}
			downlinks.put(commandId, c8yOperation.getId().getValue());
			mor = new ManagedObjectRepresentation();
			mor.setId(GId.asGId(lnsConnectorId));
			mor.setProperty(DOWNLINKS, downlinks);
			inventoryApi.update(mor);
			c8yOperation.setProperty("ExternalCommandId", commandId);
			deviceControlApi.update(c8yOperation);
		}
	}

	private OperationRepresentation retrieveOperationFromMO(String lnsConnectorId, String commandId) {
		OperationRepresentation result = null;
		ManagedObjectRepresentation mor = inventoryApi.get(GId.asGId(lnsConnectorId));
		if (mor != null && mor.hasProperty(DOWNLINKS)) {
			@SuppressWarnings("unchecked")
			Map<String, String> downlinks = (Map<String, String>) mor.getProperty(DOWNLINKS);
			if (downlinks.containsKey(commandId)) {
				result = deviceControlApi.getOperation(GId.asGId(downlinks.get(commandId)));
			}
		}
		return result;
	}

	private void removeOperationOnMO(String lnsConnectorId, String commandId) {
		ManagedObjectRepresentation mor = inventoryApi.get(GId.asGId(lnsConnectorId));
		if (mor != null && mor.hasProperty(DOWNLINKS)) {
			@SuppressWarnings("unchecked")
			Map<String, String> downlinks = (Map<String, String>) mor.getProperty(DOWNLINKS);
			downlinks.remove(commandId);
			mor = new ManagedObjectRepresentation();
			mor.setId(GId.asGId(lnsConnectorId));
			mor.setProperty(DOWNLINKS, downlinks);
			inventoryApi.update(mor);
		}
	}
}
