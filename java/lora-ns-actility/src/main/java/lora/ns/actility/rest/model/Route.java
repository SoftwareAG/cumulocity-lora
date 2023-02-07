package lora.ns.actility.rest.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(Include.NON_NULL)
public class Route {
    private String contentType;
    private String asId;
    private String ref;
    private String name;
    private String connectorClass;
    private ConnectorProperties connectorProperties;
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
    public ConnectorProperties getConnectorProperties() {
        return connectorProperties;
    }
    public void setConnectorProperties(ConnectorProperties connectorProperties) {
        this.connectorProperties = connectorProperties;
    }
    public String getConnectorClass() {
        return connectorClass;
    }
    public void setConnectorClass(String connectorClass) {
        this.connectorClass = connectorClass;
    }
}
