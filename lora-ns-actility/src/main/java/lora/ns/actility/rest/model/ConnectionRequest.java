package lora.ns.actility.rest.model;

public class ConnectionRequest {
    private String name;

    private String contentType = "JSON";

    private String connectorId = "actility-http-iot";

    private ConnectionHttpConfig configuration;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getConnectorId() {
        return connectorId;
    }

    public void setConnectorId(String connectorId) {
        this.connectorId = connectorId;
    }

    public ConnectionHttpConfig getConfiguration() {
        return configuration;
    }

    public void setConfiguration(ConnectionHttpConfig configuration) {
        this.configuration = configuration;
    }
}
