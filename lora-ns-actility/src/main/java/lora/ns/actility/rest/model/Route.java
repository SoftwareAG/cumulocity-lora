package lora.ns.actility.rest.model;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Route {
    private String contentType;
    private String asId;
    private String ref;
    private String name;
    private Map<String, String> connectionProperties;
    public String getContentType() {
        return contentType;
    }
    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
    public String getAsId() {
        return asId;
    }
    public void setAsId(String asId) {
        this.asId = asId;
    }
    public String getRef() {
        return ref;
    }
    public void setRef(String ref) {
        this.ref = ref;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Map<String, String> getConnectionProperties() {
        return connectionProperties;
    }
    public void setConnectionProperties(Map<String, String> connectionProperties) {
        this.connectionProperties = connectionProperties;
    }   
}
