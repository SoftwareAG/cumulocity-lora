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

	@PostMapping(value = "/applications", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Application> getApplications(@RequestBody Properties properties) {
		TTNConnector connector = new TTNConnector(properties);
		return connector.getApplications();
	}

	@PostMapping(value = "/{lnsConnectorId}/applications", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Application> getApplications(@PathVariable String lnsConnectorId, @RequestBody Properties properties) {
		Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsConnectorId);
		if (connector.isPresent()) {
            properties = connector.get().mergeProperties(properties);
		}
		return new TTNConnector(properties).getApplications();
	}

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
}
