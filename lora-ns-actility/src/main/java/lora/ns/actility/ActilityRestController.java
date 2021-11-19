package lora.ns.actility;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import lora.common.IdNameEntry;
import lora.ns.connector.LNSConnector;
import lora.ns.connector.LNSConnectorManager;

@RestController
public class ActilityRestController {
    @Autowired
	private LNSConnectorManager lnsConnectorManager;

    @GetMapping(value = "/{lnsConnectorId}/deviceProfiles", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<IdNameEntry> getDeviceProfiles(@PathVariable String lnsConnectorId) {
        List<IdNameEntry> result = new ArrayList<>();
		Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsConnectorId);
		if (connector.isPresent()) {
            ActilityConnector actilityConnector = (ActilityConnector)connector.get();
            result = actilityConnector.getDeviceProfiles().stream().map(dp -> new IdNameEntry(dp.getId(), dp.getName())).collect(Collectors.toList());
		}
        return result;
    }

    @GetMapping(value = "/{lnsConnectorId}/baseStationProfiles", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<IdNameEntry> getBaseStationProfiles(@PathVariable String lnsConnectorId) {
        List<IdNameEntry> result = new ArrayList<>();
		Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsConnectorId);
		if (connector.isPresent()) {
            ActilityConnector actilityConnector = (ActilityConnector)connector.get();
            result = actilityConnector.getBaseStationProfiles().stream().map(bsp -> new IdNameEntry(bsp.getId(), bsp.getCommercialName())).collect(Collectors.toList());
		}
        return result;
    }
}
