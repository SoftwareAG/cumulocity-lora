package lora.ns.gateway;

import java.math.BigDecimal;
import java.util.Properties;

import c8y.ConnectionState;

public class GatewayProvisioning {
    private String name;
    private String externalId;
    private BigDecimal lat;
    private BigDecimal lng;
    private String type;
    private ConnectionState status;
    private Properties additionalProperties;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getExternalId() {
        return externalId;
    }
    public void setExternalId(String externalId) {
        this.externalId = externalId;
    }
    public Properties getAdditionalProperties() {
        return additionalProperties;
    }
    public void setAdditionalProperties(Properties additionalProperties) {
        this.additionalProperties = additionalProperties;
    }
    public BigDecimal getLat() {
        return lat;
    }
    public void setLat(BigDecimal lat) {
        this.lat = lat;
    }
    public BigDecimal getLng() {
        return lng;
    }
    public void setLng(BigDecimal lng) {
        this.lng = lng;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public ConnectionState getStatus() {
        return status;
    }
    public void setStatus(ConnectionState status) {
        this.status = status;
    }
}
