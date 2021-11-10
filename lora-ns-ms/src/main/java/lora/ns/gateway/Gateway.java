package lora.ns.gateway;

import java.math.BigDecimal;

import c8y.ConnectionState;
import lora.codec.uplink.C8YData;

public class Gateway {
    private String id;
    private String name;
    private BigDecimal lat;
    private BigDecimal lng;
    private String type;
    private ConnectionState status;
    private C8YData data;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public C8YData getData() {
        return data;
    }

    public void setData(C8YData data) {
        this.data = data;
    }

    public Gateway(String id, String name, BigDecimal lat, BigDecimal lng, String type, ConnectionState status, C8YData data) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.type = type;
        this.status = status;
        this.data = data;
    }

    public Gateway() {
    }
}