package lora.ns.objenious.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Zone
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class Zone {
  @JsonProperty("id")
  private Integer id = null;

  @JsonProperty("link")
  private String link = null;

  @JsonProperty("name")
  private String name = null;

  @JsonProperty("type")
  private String type = null;

  @JsonProperty("description")
  private String description = null;

  @JsonProperty("group")
  private Ref group = null;

  @JsonProperty("geo")
  private Object geo = null;

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

  public Zone id(Integer id) {
    this.id = id;
    return this;
  }

  /**
   * Zone identifier
   * 
   * @return id
   **/

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Zone link(String link) {
    this.link = link;
    return this;
  }

  /**
   * URL of ressource
   * 
   * @return link
   **/

  public String getLink() {
    return link;
  }

  public void setLink(String link) {
    this.link = link;
  }

  public Zone name(String name) {
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

  public Zone type(String type) {
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

  public Zone description(String description) {
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

  public Zone group(Ref group) {
    this.group = group;
    return this;
  }

  /**
   * Get group
   * 
   * @return group
   **/

  public Ref getGroup() {
    return group;
  }

  public void setGroup(Ref group) {
    this.group = group;
  }

  public Zone geo(Object geo) {
    this.geo = geo;
    return this;
  }

  /**
   * GeoJSON representation of a center/radius zone. The circle is converted to a
   * polygon.
   * 
   * @return geo
   **/

  public Object getGeo() {
    return geo;
  }

  public void setGeo(Object geo) {
    this.geo = geo;
  }

  public Zone zoneType(ZoneTypeEnum zoneType) {
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

  public Zone zoneColor(String zoneColor) {
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

  public Zone gateways(List<String> gateways) {
    this.gateways = gateways;
    return this;
  }

  public Zone addGatewaysItem(String gatewaysItem) {
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
    Zone zone = (Zone) o;
    return Objects.equals(this.id, zone.id) &&
        Objects.equals(this.link, zone.link) &&
        Objects.equals(this.name, zone.name) &&
        Objects.equals(this.type, zone.type) &&
        Objects.equals(this.description, zone.description) &&
        Objects.equals(this.group, zone.group) &&
        Objects.equals(this.geo, zone.geo) &&
        Objects.equals(this.zoneType, zone.zoneType) &&
        Objects.equals(this.zoneColor, zone.zoneColor) &&
        Objects.equals(this.gateways, zone.gateways);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, link, name, type, description, group, geo, zoneType, zoneColor, gateways);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Zone {\n");

    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    link: ").append(toIndentedString(link)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    type: ").append(toIndentedString(type)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    group: ").append(toIndentedString(group)).append("\n");
    sb.append("    geo: ").append(toIndentedString(geo)).append("\n");
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
