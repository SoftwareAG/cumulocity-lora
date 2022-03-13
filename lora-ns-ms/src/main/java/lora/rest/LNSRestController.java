package lora.rest;

import java.util.List;
import java.util.Map;
import java.util.Properties;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lora.ns.connector.LNSConnector;
import lora.ns.connector.LNSConnectorRepresentation;
import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.connector.LNSResponse;
import lora.ns.connector.PropertyDescription;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.device.LNSDeviceManager;
import lora.ns.gateway.GatewayProvisioning;
import lora.ns.gateway.LNSGatewayManager;
import lora.ns.integration.LNSIntegrationService;

@RestController
public class LNSRestController {

	@Autowired
	private LNSIntegrationService<?> lnsProxy;

	@Autowired
	private LNSDeviceManager lnsDeviceManager;

	@Autowired
	private LNSGatewayManager lnsGatewayManager;

	final Logger logger = LoggerFactory.getLogger(LNSRestController.class);

	@PostMapping(value = "/{lnsInstanceId}/uplink", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> lnsUp(@RequestBody String event, @PathVariable String lnsInstanceId) {
		lnsProxy.mapEventToC8Y(event, lnsInstanceId);
		return ResponseEntity.ok().build();
	}

	@PostMapping(value = "/{lnsInstanceId}/downlink", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> lnsDown(@RequestBody String event, @PathVariable String lnsInstanceId) {
		lnsProxy.updateOperation(event, lnsInstanceId);
		return ResponseEntity.ok().build();
	}

	@GetMapping(value = "/{lnsInstanceId}/devices", produces = MediaType.APPLICATION_JSON_VALUE)
	public LNSResponse<List<EndDevice>> getDevices(@PathVariable String lnsInstanceId) {
		return lnsProxy.getDevices(lnsInstanceId);
	}
	
	@PostMapping(value = "/{lnsInstanceId}/devices", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public LNSResponse<ManagedObjectRepresentation> provisionDevice(@RequestBody DeviceProvisioning deviceProvisioning, @PathVariable String lnsInstanceId) {
		return lnsDeviceManager.provisionDevice(lnsInstanceId, deviceProvisioning);
	}
	
	@DeleteMapping(value = "/{lnsInstanceId}/devices/{deveui}", produces = MediaType.APPLICATION_JSON_VALUE)
	public LNSResponse<Void> deprovisionDevice(@PathVariable String lnsInstanceId, @PathVariable String deveui) {
		return lnsDeviceManager.deprovisionDevice(lnsInstanceId, deveui);
	}
	
	@PostMapping(value = "/{lnsInstanceId}/gateways", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public LNSResponse<ManagedObjectRepresentation> provisionGateway(@RequestBody GatewayProvisioning gatewayProvisioning, @PathVariable String lnsInstanceId) {
		return lnsGatewayManager.provisionGateway(lnsInstanceId, gatewayProvisioning);
	}
	
	@DeleteMapping(value = "/{lnsInstanceId}/gateways/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public LNSResponse<Void> deprovisionGateway(@PathVariable String lnsInstanceId, @PathVariable String id) {
		return lnsGatewayManager.deprovisionGateway(lnsInstanceId, id);
	}

	@PostMapping(value = "/devices/{deveui}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> createDevice(@PathVariable String deveui, @RequestBody ManagedObjectRepresentation device) {
		lnsDeviceManager.createDevice(deveui, device);
		return ResponseEntity.ok().build();
	}

	@PutMapping(value = "/devices/{deveui}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> updateDevice(@PathVariable String deveui, @RequestBody ManagedObjectRepresentation device) {
		lnsDeviceManager.updateDevice(deveui, device);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping(value = "/lnsinstances", produces = MediaType.APPLICATION_JSON_VALUE)
	public Map<String, LNSConnector> getLnsInstances() {
		return lnsProxy.getConnectors();
	}
	
	@PostMapping(value = "/lnsinstances", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ManagedObjectRepresentation addLnsConnector(@RequestBody LNSConnectorRepresentation connector) {
		return lnsProxy.addLnsConnector(connector);
	}

	
	@PutMapping(value = "/lnsinstances/{lnsInstanceId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> updateLnsConnector(@PathVariable String lnsConnectorId, @RequestBody Properties properties) {
		lnsProxy.updateLnsConnector(lnsConnectorId, properties);
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping(value = "/lnsinstances/{lnsInstanceId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> removeLnsConnector(@PathVariable String lnsConnectorId) {
		lnsProxy.removeLnsConnector(lnsConnectorId);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping(value = "/wizard", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<LNSConnectorWizardStep> getWizard() {
		return lnsProxy.getInstanceWizard();
	}
	
	@GetMapping(value = "/deviceProvisioningAdditionalProperties", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<PropertyDescription> getDeviceProvisioningAdditionalProperties() {
		return lnsProxy.getDeviceProvisioningAdditionalProperties();
	}
	
	@GetMapping(value = "/gatewayProvisioningAdditionalProperties", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<PropertyDescription> getGatewayProvisioningAdditionalProperties() {
		return lnsProxy.getGatewayProvisioningAdditionalProperties();
	}
}
