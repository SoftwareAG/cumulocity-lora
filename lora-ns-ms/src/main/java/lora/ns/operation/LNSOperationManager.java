package lora.ns.operation;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
import com.cumulocity.model.operation.OperationStatus;
import com.cumulocity.rest.representation.operation.OperationRepresentation;
import com.cumulocity.sdk.client.devicecontrol.DeviceControlApi;
import com.cumulocity.sdk.client.inventory.InventoryApi;

import c8y.Command;
import lora.codec.DownlinkData;
import lora.codec.ms.CodecManager;
import lora.ns.LNSIntegrationService;
import lora.ns.device.LNSDeviceManager;

@Component
public abstract class LNSOperationManager {

	final Logger logger = LoggerFactory.getLogger(getClass());

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

	private Map<String, Map<String, Map<String, OperationRepresentation>>> operations = new HashMap<>();

	protected abstract String processOperation(DownlinkData operation, OperationRepresentation c8yOperation);

	@Async
	public void executePending(OperationRepresentation operation) {
		logger.info("Will execute operation {}", operation.toJSON());
		if (lnsDeviceManager.getDeviceEui(operation.getDeviceId()) != null) {
			logger.info("Processing operation {}", operation);
			DownlinkData encodedData = codecManager.encode(lnsDeviceManager.getDeviceEui(operation.getDeviceId()),
					operation);
			if (encodedData != null && encodedData.getFport() != null && encodedData.getPayload() != null) {
				operation.setStatus(OperationStatus.EXECUTING.toString());
				String lnsConnectorId = inventoryApi.get(operation.getDeviceId()).getProperty(LNSIntegrationService.LNS_INSTANCE_REF)
						.toString();
				processOperation(lnsConnectorId, encodedData, operation);
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
		if (operations.containsKey(subscriptionsService.getTenant())
				&& operations.get(subscriptionsService.getTenant()).containsKey(lnsConnectorId)) {
			String commandId = processOperation(operation, c8yOperation);
			storeOperation(lnsConnectorId, c8yOperation, commandId);
			deviceControlApi.update(c8yOperation);
		} else {
			logger.error("LNS instance {} could not be found on tenant {}", lnsConnectorId,
					subscriptionsService.getTenant());
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
	}

	public OperationRepresentation retrieveOperation(String lnsConnectorId, String commandId) {
		return operations.containsKey(subscriptionsService.getTenant())
				&& operations.get(subscriptionsService.getTenant()).containsKey(lnsConnectorId)
						? operations.get(subscriptionsService.getTenant()).get(lnsConnectorId).get(commandId)
						: null;
	}

	public void removeOperation(String lnsConnectorId, String commandId) {
		if (operations.containsKey(subscriptionsService.getTenant())
				&& operations.get(subscriptionsService.getTenant()).containsKey(lnsConnectorId)) {
			operations.get(subscriptionsService.getTenant()).get(lnsConnectorId).remove(commandId);
		}
	}
}
