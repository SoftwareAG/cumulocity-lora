package lora.ns.objenious.rest;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * ZoneCreate
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class ZoneCreate {
  @JsonProperty("name")
  private String name = null;

  @JsonProperty("type")
  private String type = null;

  @JsonProperty("description")
  private String description = null;

  @JsonProperty("group_id")
  private Integer groupId = null;

  @JsonProperty("lat")
  private BigDecimal lat = null;

  @JsonProperty("lng")
  private BigDecimal lng = null;

  @JsonProperty("radius")
  private BigDecimal radius = null;

  /**
   * If set to \"gateway\", the zone will be defined by a list of gateways, and
   * the geo polygon will be ignored. If set to \"geo\", it will be defined by a
   * center and a radius (converted to a polygon). A device will be considered
   * inside a \"gateway\" zone when it will be received by one or more of its
   * gateways (or the zone with the most gateways if multiple zones are eligible).
   */
  public enum ZoneTypeEnum {
    GEO("geo"),

    GATEWAY("gateway");

    private String value;

    ZoneTypeEnum(String value) {
      this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static ZoneTypeEnum fromValue(String text) {
      for (ZoneTypeEnum b : ZoneTypeEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }

  @JsonProperty("zone_type")
  private ZoneTypeEnum zoneType = ZoneTypeEnum.GEO;

  @JsonProperty("zone_color")
  private String zoneColor = null;

  @JsonProperty("gateways")
  private List<String> gateways = null;

  public ZoneCreate name(String name) {
    this.name = name;
    return this;
  }

  /**
   * Zone name
   * 
   * @return name
   **/

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public ZoneCreate type(String type) {
    this.type = type;
    return this;
  }

  /**
   * Zone type
   * 
   * @return type
   **/

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public ZoneCreate description(String description) {
    this.description = description;
    return this;
  }

  /**
   * Zone description
   * 
   * @return description
   **/

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public ZoneCreate groupId(Integer groupId) {
    this.groupId = groupId;
    return this;
  }

  /**
   * Group identifier
   * 
   * @return groupId
   **/

  public Integer getGroupId() {
    return groupId;
  }

  public void setGroupId(Integer groupId) {
    this.groupId = groupId;
  }

  public ZoneCreate lat(BigDecimal lat) {
    this.lat = lat;
    return this;
  }

  /**
   * Latitude of the zone's center
   * 
   * @return lat
   **/

  public BigDecimal getLat() {
    return lat;
  }

  public void setLat(BigDecimal lat) {
    this.lat = lat;
  }

  public ZoneCreate lng(BigDecimal lng) {
    this.lng = lng;
    return this;
  }

  /**
   * Longitude of the zone's center
   * 
   * @return lng
   **/

  public BigDecimal getLng() {
    return lng;
  }

  public void setLng(BigDecimal lng) {
    this.lng = lng;
  }

  public ZoneCreate radius(BigDecimal radius) {
    this.radius = radius;
    return this;
  }

  /**
   * The radius (in meters) to define the zone around the latitude and longitude
   * 
   * @return radius
   **/

  public BigDecimal getRadius() {
    return radius;
  }

  public void setRadius(BigDecimal radius) {
    this.radius = radius;
  }

  public ZoneCreate zoneType(ZoneTypeEnum zoneType) {
    this.zoneType = zoneType;
    return this;
  }

  /**
   * If set to \"gateway\", the zone will be defined by a list of gateways, and
   * the geo polygon will be ignored. If set to \"geo\", it will be defined by a
   * center and a radius (converted to a polygon). A device will be considered
   * inside a \"gateway\" zone when it will be received by one or more of its
   * gateways (or the zone with the most gateways if multiple zones are eligible).
   * 
   * @return zoneType
   **/

  public ZoneTypeEnum getZoneType() {
    return zoneType;
  }

  public void setZoneType(ZoneTypeEnum zoneType) {
    this.zoneType = zoneType;
  }

  public ZoneCreate zoneColor(String zoneColor) {
    this.zoneColor = zoneColor;
    return this;
  }

  /**
   * The hexadecimal color of the zone if needed. Example: #0000ff
   * 
   * @return zoneColor
   **/

  public String getZoneColor() {
    return zoneColor;
  }

  public void setZoneColor(String zoneColor) {
    this.zoneColor = zoneColor;
  }

  public ZoneCreate gateways(List<String> gateways) {
    this.gateways = gateways;
    return this;
  }

  public ZoneCreate addGatewaysItem(String gatewaysItem) {
    if (this.gateways == null) {
      this.gateways = new ArrayList<String>();
    }
    this.gateways.add(gatewaysItem);
    return this;
  }

  /**
   * The list of gateways defining the zone.
   * 
   * @return gateways
   **/

  public List<String> getGateways() {
    return gateways;
  }

  public void setGateways(List<String> gateways) {
    this.gateways = gateways;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ZoneCreate zoneCreate = (ZoneCreate) o;
    return Objects.equals(this.name, zoneCreate.name) &&
        Objects.equals(this.type, zoneCreate.type) &&
        Objects.equals(this.description, zoneCreate.description) &&
        Objects.equals(this.groupId, zoneCreate.groupId) &&
        Objects.equals(this.lat, zoneCreate.lat) &&
        Objects.equals(this.lng, zoneCreate.lng) &&
        Objects.equals(this.radius, zoneCreate.radius) &&
        Objects.equals(this.zoneType, zoneCreate.zoneType) &&
        Objects.equals(this.zoneColor, zoneCreate.zoneColor) &&
        Objects.equals(this.gateways, zoneCreate.gateways);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, type, description, groupId, lat, lng, radius, zoneType, zoneColor, gateways);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ZoneCreate {\n");

    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    type: ").append(toIndentedString(type)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    groupId: ").append(toIndentedString(groupId)).append("\n");
    sb.append("    lat: ").append(toIndentedString(lat)).append("\n");
    sb.append("    lng: ").append(toIndentedString(lng)).append("\n");
    sb.append("    radius: ").append(toIndentedString(radius)).append("\n");
    sb.append("    zoneType: ").append(toIndentedString(zoneType)).append("\n");
    sb.append("    zoneColor: ").append(toIndentedString(zoneColor)).append("\n");
    sb.append("    gateways: ").append(toIndentedString(gateways)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
