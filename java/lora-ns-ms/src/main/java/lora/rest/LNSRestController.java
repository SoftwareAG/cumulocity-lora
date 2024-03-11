package lora.rest;

import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import lombok.RequiredArgsConstructor;
import lora.ns.connector.LNSConnectorRepresentation;
import lora.ns.connector.LNSConnectorService;
import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.connector.PropertyDescription;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.device.LNSDeviceService;
import lora.ns.gateway.GatewayProvisioning;
import lora.ns.gateway.LNSGatewayService;
import lora.ns.integration.LNSIntegrationService;

@RestController
@RequiredArgsConstructor
public class LNSRestController {

	private final LNSIntegrationService<?> lnsIntegrationService;

	private final LNSDeviceService lnsDeviceManager;

	private final LNSGatewayService lnsGatewayManager;

	private final LNSConnectorService lnsConnectorManager;

	private final LoraContext loraContext;

	@PostMapping(value = "/{lnsInstanceId}/uplink", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> lnsUp(@RequestBody String event, @PathVariable String lnsInstanceId) {
		loraContext.setConnector(lnsConnectorManager.getConnector(lnsInstanceId));
		lnsIntegrationService.mapEventToC8Y(event, lnsInstanceId);
		return ResponseEntity.ok().build();
	}

	@PostMapping(value = "/{lnsInstanceId}/downlink", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> lnsDown(@RequestBody String event, @PathVariable String lnsInstanceId) {
		loraContext.setConnector(lnsConnectorManager.getConnector(lnsInstanceId));
		lnsIntegrationService.updateOperation(event, lnsInstanceId);
		return ResponseEntity.ok().build();
	}

	@GetMapping(value = "/{lnsInstanceId}/devices", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<EndDevice>> getDevices(@PathVariable String lnsInstanceId) {
		loraContext.setConnector(lnsConnectorManager.getConnector(lnsInstanceId));
		return new ResponseEntity<>(lnsIntegrationService.getDevices(lnsInstanceId), HttpStatus.OK);
	}

	@PostMapping(value = "/{lnsInstanceId}/devices", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ManagedObjectRepresentation> provisionDevice(
			@RequestBody DeviceProvisioning deviceProvisioning,
			@PathVariable String lnsInstanceId) {
		loraContext.setConnector(lnsConnectorManager.getConnector(lnsInstanceId));
		return new ResponseEntity<>(lnsDeviceManager.provisionDevice(lnsInstanceId, deviceProvisioning),
				HttpStatus.CREATED);
	}

	@DeleteMapping(value = "/{lnsInstanceId}/devices/{deveui}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> deprovisionDevice(@PathVariable String lnsInstanceId, @PathVariable String deveui) {
		loraContext.setConnector(lnsConnectorManager.getConnector(lnsInstanceId));
		lnsDeviceManager.deprovisionDevice(lnsInstanceId, deveui);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@PostMapping(value = "/{lnsInstanceId}/gateways", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ManagedObjectRepresentation> provisionGateway(
			@RequestBody GatewayProvisioning gatewayProvisioning, @PathVariable String lnsInstanceId) {
		loraContext.setConnector(lnsConnectorManager.getConnector(lnsInstanceId));
		return new ResponseEntity<>(lnsGatewayManager.provisionGateway(lnsInstanceId, gatewayProvisioning),
				HttpStatus.CREATED);
	}

	@DeleteMapping(value = "/{lnsInstanceId}/gateways/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> deprovisionGateway(@PathVariable String lnsInstanceId, @PathVariable String id) {
		loraContext.setConnector(lnsConnectorManager.getConnector(lnsInstanceId));
		lnsGatewayManager.deprovisionGateway(lnsInstanceId, id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@GetMapping(value = "/lnsinstances", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, LNSConnectorRepresentation>> getLnsInstances() {
		return new ResponseEntity<>(lnsIntegrationService.getConnectors(), HttpStatus.OK);
	}

	@PostMapping(value = "/lnsinstances", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ManagedObjectRepresentation> addLnsConnector(
			@RequestBody LNSConnectorRepresentation connector) {
		return new ResponseEntity<>(lnsIntegrationService.addLnsConnector(connector), HttpStatus.CREATED);
	}

	@PutMapping(value = "/lnsinstances/{lnsConnectorId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> updateLnsConnector(@PathVariable String lnsConnectorId,
			@RequestBody Properties properties) {
		loraContext.setConnector(lnsConnectorManager.getConnector(lnsConnectorId));
		lnsIntegrationService.updateLnsConnector(lnsConnectorId, properties);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping(value = "/lnsinstances/{lnsConnectorId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> removeLnsConnector(@PathVariable String lnsConnectorId) {
		loraContext.setConnector(lnsConnectorManager.getConnector(lnsConnectorId));
		lnsIntegrationService.removeLnsConnector(lnsConnectorId);
		return ResponseEntity.ok().build();
	}

	@GetMapping(value = "/wizard", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<LNSConnectorWizardStep>> getWizard() {
		return new ResponseEntity<>(lnsIntegrationService.getInstanceWizard(), HttpStatus.OK);
	}

	@GetMapping(value = "/deviceProvisioningAdditionalProperties", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<PropertyDescription>> getDeviceProvisioningAdditionalProperties() {
		return new ResponseEntity<>(lnsIntegrationService.getDeviceProvisioningAdditionalProperties(), HttpStatus.OK);
	}

	@GetMapping(value = "/gatewayProvisioningAdditionalProperties", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<PropertyDescription>> getGatewayProvisioningAdditionalProperties() {
		return new ResponseEntity<>(lnsIntegrationService.getGatewayProvisioningAdditionalProperties(), HttpStatus.OK);
	}

	@GetMapping(value = "/simulatePayload", produces = MediaType.ALL_VALUE)
	public ResponseEntity<String> getSimulatedPayload(@RequestParam Map<String, Object> fields) {
		return new ResponseEntity<>(lnsIntegrationService.getSimulatedPayload(fields), HttpStatus.OK);
	}

	@GetMapping(value = "/payloadAvailableFields", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<PropertyDescription>> getPayloadAvailableFields() {
		return new ResponseEntity<>(lnsIntegrationService.getPayloadSimulationFields(), HttpStatus.OK);
	}
}
