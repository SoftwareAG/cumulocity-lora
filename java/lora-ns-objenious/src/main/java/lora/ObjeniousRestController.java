package lora;

import java.util.List;
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
import lora.ns.connector.LNSConnectorService;
import lora.ns.objenious.ObjeniousConnector;
import lora.ns.objenious.rest.Group;

@RestController
public class ObjeniousRestController {
    @Autowired
    private LNSConnectorService lnsConnectorManager;

    @GetMapping(value = "/{lnsConnectorId}/deviceProfiles", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<IdNameEntry> getDeviceProfiles(@PathVariable String lnsConnectorId) {
        var connector = lnsConnectorManager.getConnector(lnsConnectorId);
        ObjeniousConnector objeniousConnector = (ObjeniousConnector) connector;
        return objeniousConnector.getDeviceProfiles().stream()
                        .map(dp -> new IdNameEntry(dp.getId().toString(), dp.getName())).collect(Collectors.toList());
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
    public List<Group> getGroups(@PathVariable String lnsConnectorId, @RequestBody Properties properties) {
        var connector = lnsConnectorManager.getConnector(lnsConnectorId);
        properties = connector.mergeProperties(properties);
        return new ObjeniousConnector(properties).getGroups();
    }

    /***
     * Retrieves the list of avaible device groups in Objenious tenant when creating
     * a new Objenious connector.
     * 
     * @param properties
     * @return
     */
    @PostMapping(value = "/groups", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<Group> getGroups(@RequestBody Properties properties) {
        return new ObjeniousConnector(properties).getGroups();
    }
}
