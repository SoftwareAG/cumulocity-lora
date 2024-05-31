package lora;

import java.util.Arrays;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lora.common.IdNameEntry;
import lora.ns.connector.LNSConnectorService;
import lora.ns.ttn.TTNConnector;
import ttn.lorawan.v3.Lorawan.MACVersion;
import ttn.lorawan.v3.Lorawan.PHYVersion;

@RestController
@RequiredArgsConstructor
public class TTNRestController {
	private final LNSConnectorService lnsConnectorManager;

	@GetMapping(value = "/{lnsConnectorId}/macversion", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<IdNameEntry> getMACVersions(@PathVariable String lnsConnectorId) {
		return Arrays.stream(MACVersion.values()).map(m -> new IdNameEntry(m.toString(), m.toString()))
						.collect(Collectors.toList());
	}

	@GetMapping(value = "/{lnsConnectorId}/phyversion", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<IdNameEntry> getPHYVersions(@PathVariable String lnsConnectorId) {
		return Arrays.stream(PHYVersion.values()).map(m -> new IdNameEntry(m.toString(), m.toString()))
						.collect(Collectors.toList());
	}

	@GetMapping(value = "/{lnsConnectorId}/frequencyplan", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<IdNameEntry> getFequencyPlans(@PathVariable String lnsConnectorId) {
		var connector = lnsConnectorManager.getConnector(lnsConnectorId);
		return ((TTNConnector) connector).getFrequencyPlans().stream()
						.map(fp -> new IdNameEntry(fp.getId(), fp.getName())).collect(Collectors.toList());
	}

	/***
	 * Should be used when updating the connector to get the list of available
	 * applications.
	 * 
	 * @param lnsConnectorId
	 * @param properties
	 * @return
	 */
	@PostMapping(value = "/{lnsConnectorId}/apps", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public List<IdNameEntry> getApps(@PathVariable String lnsConnectorId, @RequestBody Properties properties) {
		var connector = lnsConnectorManager.getConnector(lnsConnectorId);
		properties = connector.mergeProperties(properties);
		return new TTNConnector(properties).getApplications().stream()
						.map(a -> new IdNameEntry(a.getIds().getApplicationId(), a.getName()))
						.collect(Collectors.toList());
	}

	/***
	 * Retrieves the list of application in TTN when creating a new TTN connector.
	 * 
	 * @param properties
	 * @return
	 */
	@PostMapping(value = "/apps", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public List<IdNameEntry> getApps(@RequestBody Properties properties) {
		return new TTNConnector(properties).getApplications().stream()
						.map(a -> new IdNameEntry(a.getIds().getApplicationId(), a.getName()))
						.collect(Collectors.toList());
	}
}
