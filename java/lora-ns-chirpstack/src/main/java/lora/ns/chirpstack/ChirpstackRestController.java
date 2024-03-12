package lora.ns.chirpstack;

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

@RestController
public class ChirpstackRestController {

    @Autowired
    private LNSConnectorService lnsConnectorManager;

    @GetMapping(value = "/{lnsConnectorId}/deviceprofiles", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<IdNameEntry> getDeviceProfiles(@PathVariable String lnsConnectorId) {
        var connector = lnsConnectorManager.getConnector(lnsConnectorId);
        ChirpstackConnector chirpstackConnector = (ChirpstackConnector) connector;
        return chirpstackConnector.getDeviceProfiles().stream().map(dp -> new IdNameEntry(dp.getId(), dp.getName()))
                        .collect(Collectors.toList());
    }

    @PostMapping(value = "/{lnsConnectorId}/applications", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<IdNameEntry> getApplications(@PathVariable String lnsConnectorId, @RequestBody Properties properties) {
        var connector = lnsConnectorManager.getConnector(lnsConnectorId);
        properties = connector.mergeProperties(properties);
        ChirpstackConnector chirpstackConnector = new ChirpstackConnector(properties);
        return chirpstackConnector.getApplications().stream().map(a -> new IdNameEntry(a.getId(), a.getName()))
                        .collect(Collectors.toList());
    }

    @PostMapping(value = "/applications", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<IdNameEntry> getApplications(@RequestBody Properties properties) {
        ChirpstackConnector chirpstackConnector = new ChirpstackConnector(properties);
        return chirpstackConnector.getApplications().stream().map(a -> new IdNameEntry(a.getId(), a.getName()))
                        .collect(Collectors.toList());
    }

}
