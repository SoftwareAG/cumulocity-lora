package lora.ns.liveobjects;

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
public class LiveObjectsRestController {

    @Autowired
    private LNSConnectorManager lnsConnectorManager;

    @GetMapping(value = "/{lnsConnectorId}/connectivityPlans", produces = MediaType.APPLICATION_JSON_VALUE)
    private List<IdNameEntry> getConnectivityPlans(@PathVariable String lnsConnectorId) {
        List<IdNameEntry> result = new ArrayList<>();
        Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsConnectorId);
        if (connector.isPresent()) {
            LiveObjectsConnector liveObjectsConnector = (LiveObjectsConnector) connector.get();
            result = liveObjectsConnector.getConnectivityPlans().stream()
                    .map(dp -> new IdNameEntry(dp.getId().toString(), dp.getName())).collect(Collectors.toList());
        }
        return result;
    }

    @GetMapping(value = "/{lnsConnectorId}/profiles", produces = MediaType.APPLICATION_JSON_VALUE)
    private List<IdNameEntry> getProfiles(@PathVariable String lnsConnectorId) {
        List<IdNameEntry> result = new ArrayList<>();
        Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsConnectorId);
        if (connector.isPresent()) {
            LiveObjectsConnector liveObjectsConnector = (LiveObjectsConnector) connector.get();
            result = liveObjectsConnector.getProfiles().stream()
                    .map(dp -> new IdNameEntry(dp, dp)).collect(Collectors.toList());
        }
        return result;
    }

}
