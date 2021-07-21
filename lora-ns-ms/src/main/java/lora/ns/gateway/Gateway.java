package lora.ns.gateway;

import java.math.BigDecimal;

public class Gateway {
    private String id;
    private String name;
    private BigDecimal lat;
    private BigDecimal lng;
    private String type;

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

    public Gateway(String id, String name, BigDecimal lat, BigDecimal lng, String type) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.type = type;
    }

    public Gateway() {
    }
}