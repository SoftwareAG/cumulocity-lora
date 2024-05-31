package lora.ns.actility;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lora.common.IdNameEntry;
import lora.ns.connector.LNSConnectorService;

@RestController
@RequiredArgsConstructor
public class ActilityRestController {
    private final LNSConnectorService lnsConnectorManager;

    @GetMapping(value = "/{lnsConnectorId}/deviceProfiles", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<IdNameEntry> getDeviceProfiles(@PathVariable String lnsConnectorId) {
        var connector = lnsConnectorManager.getConnector(lnsConnectorId);
        ActilityConnector actilityConnector = (ActilityConnector) connector;
        return actilityConnector.getDeviceProfiles().stream()
                        .map(dp -> new IdNameEntry(dp.getID(), dp.getCommercialName())).collect(Collectors.toList());
    }

    @GetMapping(value = "/{lnsConnectorId}/baseStationProfiles", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<IdNameEntry> getBaseStationProfiles(@PathVariable String lnsConnectorId) {
        var connector = lnsConnectorManager.getConnector(lnsConnectorId);
        ActilityConnector actilityConnector = (ActilityConnector) connector;
        return actilityConnector.getBaseStationProfiles().stream()
                        .map(bsp -> new IdNameEntry(bsp.getID(), bsp.getCommercialName())).collect(Collectors.toList());
    }
}
