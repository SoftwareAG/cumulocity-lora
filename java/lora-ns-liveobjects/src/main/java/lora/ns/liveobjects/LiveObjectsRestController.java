package lora.ns.liveobjects;

import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lora.common.IdNameEntry;
import lora.ns.connector.LNSConnectorService;

@RestController
@RequiredArgsConstructor
public class LiveObjectsRestController {

    private final LNSConnectorService lnsConnectorManager;

    @GetMapping(value = "/{lnsConnectorId}/connectivityPlans", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<IdNameEntry>> getConnectivityPlans(@PathVariable String lnsConnectorId) {
        var connector = lnsConnectorManager.getConnector(lnsConnectorId);
        LiveObjectsConnector liveObjectsConnector = (LiveObjectsConnector) connector;
        return new ResponseEntity<>(liveObjectsConnector.getConnectivityPlans().stream()
                        .map(dp -> new IdNameEntry(dp.getId(), dp.getName())).collect(Collectors.toList()),
                        HttpStatus.OK);
    }

    @GetMapping(value = "/{lnsConnectorId}/profiles", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<IdNameEntry>> getProfiles(@PathVariable String lnsConnectorId) {
        var connector = lnsConnectorManager.getConnector(lnsConnectorId);
        LiveObjectsConnector liveObjectsConnector = (LiveObjectsConnector) connector;
        return new ResponseEntity<>(liveObjectsConnector.getProfiles().stream().map(dp -> new IdNameEntry(dp, dp))
                        .collect(Collectors.toList()), HttpStatus.OK);
    }

    /***
     * Should be used when updating the connector to get the list of available
     * device groups.
     * 
     * @param lnsConnectorId
     * @param properties
     * @return
     */
    @PostMapping(value = "/{lnsConnectorId}/groups", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<IdNameEntry>> getGroups(@PathVariable String lnsConnectorId,
                    @RequestBody Properties properties) {
        var connector = lnsConnectorManager.getConnector(lnsConnectorId);
        properties = connector.mergeProperties(properties);
        return new ResponseEntity<>(new LiveObjectsConnector(properties).getGroups().stream()
                        .map(g -> new IdNameEntry(g.getPath(), g.getPath())).collect(Collectors.toList()),
                        HttpStatus.OK);
    }

    /***
     * Retrieves the list of available device groups in Live Object tenant when
     * creating a new Live Object connector.
     * 
     * @param properties
     * @return
     */
    @PostMapping(value = "/groups", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<IdNameEntry>> getGroups(@RequestBody Properties properties) {
        return new ResponseEntity<>(new LiveObjectsConnector(properties).getGroups().stream()
                        .map(g -> new IdNameEntry(g.getPath(), g.getPath())).collect(Collectors.toList()),
                        HttpStatus.OK);
    }

}
