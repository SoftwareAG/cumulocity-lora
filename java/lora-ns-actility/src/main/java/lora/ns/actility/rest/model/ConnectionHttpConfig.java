package lora.ns.actility.rest.model;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ConnectionHttpConfig {
    private String description;

    private String destinationURL;

    private Map<String, String> headers = new HashMap<>();

    private String downlinkAsId;

    private String downlinkAsKey;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDestinationURL() {
        return destinationURL;
    }

    public void setDestinationURL(String destinationURL) {
        this.destinationURL = destinationURL;
    }

    public Map<String, String> getHeaders() {
        return headers;
    }

    public void setHeaders(Map<String, String> headers) {
        this.headers = headers;
    }

    public String getDownlinkAsId() {
        return downlinkAsId;
    }

    public void setDownlinkAsId(String downlinkAsId) {
        this.downlinkAsId = downlinkAsId;
    }

    public String getDownlinkAsKey() {
        return downlinkAsKey;
    }

    public void setDownlinkAsKey(String downlinkAsKey) {
        this.downlinkAsKey = downlinkAsKey;
    }
}
