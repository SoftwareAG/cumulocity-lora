package lora.ns.chirpstack;

import java.util.ArrayList;
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

@RestController
public class ChirpstackRestController {

    @Autowired
    private LNSConnectorManager lnsConnectorManager;

    @GetMapping(value = "/{lnsConnectorId}/deviceprofiles", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<IdNameEntry> getDeviceProfiles(@PathVariable String lnsConnectorId) {
        List<IdNameEntry> result = new ArrayList<>();
        Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsConnectorId);
        if (connector.isPresent()) {
            ChirpstackConnector chirpstackConnector = (ChirpstackConnector) connector.get();
            result = chirpstackConnector.getDeviceProfiles().stream()
                    .map(dp -> new IdNameEntry(dp.getId(), dp.getName())).collect(Collectors.toList());
        }
        return result;
    }

    @PostMapping(value = "/{lnsConnectorId}/applications", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<IdNameEntry> getApplications(@PathVariable String lnsConnectorId, @RequestBody Properties properties) {
        List<IdNameEntry> result = new ArrayList<>();
        Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsConnectorId);
        if (connector.isPresent()) {
            properties = connector.get().mergeProperties(properties);
            ChirpstackConnector chirpstackConnector = new ChirpstackConnector(properties);
            result = chirpstackConnector.getApplications().stream()
                    .map(a -> new IdNameEntry(a.getId(), a.getName())).collect(Collectors.toList());
        }
        return result;
    }

    @PostMapping(value = "/applications", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<IdNameEntry> getApplications(@RequestBody Properties properties) {
        ChirpstackConnector chirpstackConnector = new ChirpstackConnector(properties);
        return chirpstackConnector.getApplications().stream()
                .map(a -> new IdNameEntry(a.getId(), a.getName())).collect(Collectors.toList());
    }

}
