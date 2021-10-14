package lora.ns.actility.rest.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ConnectorProperties {
    private String downlinkAsId;
    private String downlinkAsKey;
    private String applicationServerURL;
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
    public String getApplicationServerURL() {
        return applicationServerURL;
    }
    public void setApplicationServerURL(String applicationServerURL) {
        this.applicationServerURL = applicationServerURL;
    }
}
