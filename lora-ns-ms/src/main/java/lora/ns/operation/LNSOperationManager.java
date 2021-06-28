package lora.ns.operation;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
import com.cumulocity.model.idtype.GId;
import com.cumulocity.model.operation.OperationStatus;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.operation.OperationRepresentation;
import com.cumulocity.sdk.client.devicecontrol.DeviceControlApi;
import com.cumulocity.sdk.client.inventory.InventoryApi;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import c8y.Command;
import lora.codec.DownlinkData;
import lora.codec.ms.CodecManager;
import lora.ns.LNSIntegrationService;
import lora.ns.connector.LNSConnector;
import lora.ns.connector.LNSConnectorManager;
import lora.ns.device.LNSDeviceManager;

@Component
public class LNSOperationManager {

	final Logger logger = LoggerFactory.getLogger(getClass());

	private static final String DOWNLINKS = "downlinks";

	@Autowired
	private InventoryApi inventoryApi;

	@Autowired
	protected DeviceControlApi deviceControlApi;

	@Autowired
	private MicroserviceSubscriptionsService subscriptionsService;

	@Autowired
	private CodecManager codecManager;

	@Autowired
	private LNSDeviceManager lnsDeviceManager;

	@Autowired
	private LNSConnectorManager lnsConnectorManager;

	private Map<String, Map<String, Map<String, OperationRepresentation>>> operations = new HashMap<>();

	@Async
	public void executePending(OperationRepresentation operation) {
		logger.info("Will execute operation {}", operation.toJSON());
		if (lnsDeviceManager.getDeviceEui(operation.getDeviceId()) != null) {
			logger.info("Processing operation {}", operation);
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
				Command command = operation.get(Command.class);
				command.setResult("Operation skipped.");
				operation.set(command);
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

	public void processOperation(String lnsConnectorId, DownlinkData operation, OperationRepresentation c8yOperation) {
		Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsConnectorId);
		if (connector.isPresent()) {
			String commandId = connector.get().sendDownlink(operation);
			storeOperation(lnsConnectorId, c8yOperation, commandId);
		} else {
			logger.warn(
					"Operation {} will be ignored for now as there is no connector with Id {} so we don't know where to send it. Next uplink should update the connector Id on the device and it will then be possible to succesfully send this operation.",
					operation, lnsConnectorId);
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
			logger.info("Operation {} not in cache, fetching it from DB", commandId);
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
			Map<String, String> downlinks = new HashMap<String, String>();
			if (mor.hasProperty(DOWNLINKS)) {
				downlinks = (Map<String, String>) mor.getProperty(DOWNLINKS);
			}
			downlinks.put(commandId, c8yOperation.getId().getValue());
			mor = new ManagedObjectRepresentation();
			mor.setId(GId.asGId(lnsConnectorId));
			mor.setProperty(DOWNLINKS, downlinks);
			inventoryApi.update(mor);
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
