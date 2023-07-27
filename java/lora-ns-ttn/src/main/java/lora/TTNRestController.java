package lora;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Properties;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lora.common.IdNameEntry;
import lora.ns.connector.LNSConnector;
import lora.ns.connector.LNSConnectorManager;
import lora.ns.ttn.TTNConnector;
import ttn.lorawan.v3.ApplicationOuterClass.Application;
import ttn.lorawan.v3.Lorawan.MACVersion;
import ttn.lorawan.v3.Lorawan.PHYVersion;

@RestController
public class TTNRestController {
	@Autowired
	private LNSConnectorManager lnsConnectorManager;

	@GetMapping(value = "/{lnsConnectorId}/macversion", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<IdNameEntry> getMACVersions(@PathVariable String lnsConnectorId) {
		List<IdNameEntry> result = new ArrayList<>();
		Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsConnectorId);
		if (connector.isPresent()) {
			result = Arrays.stream(MACVersion.values()).map(m -> new IdNameEntry(m.toString(), m.toString()))
					.collect(Collectors.toList());
		}

		return result;
	}

	@GetMapping(value = "/{lnsConnectorId}/phyversion", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<IdNameEntry> getPHYVersions(@PathVariable String lnsConnectorId) {
		List<IdNameEntry> result = new ArrayList<>();
		Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsConnectorId);
		if (connector.isPresent()) {
			result = Arrays.stream(PHYVersion.values()).map(m -> new IdNameEntry(m.toString(), m.toString()))
					.collect(Collectors.toList());
		}

		return result;
	}

	@GetMapping(value = "/{lnsConnectorId}/frequencyplan", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<IdNameEntry> getFequencyPlans(@PathVariable String lnsConnectorId) {
		List<IdNameEntry> result = new ArrayList<>();
		Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsConnectorId);
		if (connector.isPresent()) {
			result = ((TTNConnector) connector.get()).getFrequencyPlans().stream()
					.map(fp -> new IdNameEntry(fp.getId(), fp.getName())).collect(Collectors.toList());
		}

		return result;
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
		List<IdNameEntry> result = new ArrayList<>();
		Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsConnectorId);
		if (connector.isPresent()) {
			properties = connector.get().mergeProperties(properties);
			result = new TTNConnector(properties).getApplications().stream()
					.map(a -> new IdNameEntry(a.getIds().getApplicationId(), a.getName())).collect(Collectors.toList());
		}

		return result;
	}

	/***
	 * Retrieves the list of application in TTN when
	 * creating
	 * a new TTN connector.
	 * 
	 * @param properties
	 * @return
	 */
	@PostMapping(value = "/apps", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public List<IdNameEntry> getApps(@RequestBody Properties properties) {
		return new TTNConnector(properties).getApplications().stream()
				.map(a -> new IdNameEntry(a.getIds().getApplicationId(), a.getName())).collect(Collectors.toList());
	}
}
