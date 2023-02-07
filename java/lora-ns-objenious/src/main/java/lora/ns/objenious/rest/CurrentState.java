package lora.ns.objenious.rest;

import java.time.OffsetDateTime;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * CurrentState
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class CurrentState {
  @JsonProperty("id")
  private Integer id = null;

  /**
   * The device status
   */
  public enum StatusEnum {
    PROVISIONED("provisioned"),

    JOINED("joined"),

    ACTIVE("active"),

    INACTIVE("inactive"),

    ERROR("error"),

    WARNING("warning"),

    ALERT("alert");

    private String value;

    StatusEnum(String value) {
      this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static StatusEnum fromValue(String text) {
      for (StatusEnum b : StatusEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }

  @JsonProperty("status")
  private StatusEnum status = StatusEnum.PROVISIONED;

  @JsonProperty("uplink_count")
  private Integer uplinkCount = null;

  @JsonProperty("last_uplink")
  private OffsetDateTime lastUplink = null;

  @JsonProperty("downlink_count")
  private Integer downlinkCount = null;

  @JsonProperty("last_downlink")
  private OffsetDateTime lastDownlink = null;

  @JsonProperty("data")
  private Object data = null;

  @JsonProperty("lat")
  private Double lat = null;

  @JsonProperty("lng")
  private Double lng = null;

  @JsonProperty("protocol_data")
  private ProtocolData protocolData = null;

  /**
   * Geolocation type
   */
  public enum GeolocationTypeEnum {
    NONE("none"),

    FIXED("fixed"),

    NETWORK("network"),

    DEVICE("device"),

    TDOA("tdoa"),

    ZONE("zone");

    private String value;

    GeolocationTypeEnum(String value) {
      this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static GeolocationTypeEnum fromValue(String text) {
      for (GeolocationTypeEnum b : GeolocationTypeEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }

  @JsonProperty("geolocation_type")
  private GeolocationTypeEnum geolocationType = GeolocationTypeEnum.FIXED;

  @JsonProperty("zone")
  private Ref zone = null;

  public CurrentState id(Integer id) {
    this.id = id;
    return this;
  }

  /**
   * device identifier
   * 
   * @return id
   **/

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public CurrentState status(StatusEnum status) {
    this.status = status;
    return this;
  }

  /**
   * The device status
   * 
   * @return status
   **/

  public StatusEnum getStatus() {
    return status;
  }

  public void setStatus(StatusEnum status) {
    this.status = status;
  }

  public CurrentState uplinkCount(Integer uplinkCount) {
    this.uplinkCount = uplinkCount;
    return this;
  }

  /**
   * The current uplink counter
   * 
   * @return uplinkCount
   **/

  public Integer getUplinkCount() {
    return uplinkCount;
  }

  public void setUplinkCount(Integer uplinkCount) {
    this.uplinkCount = uplinkCount;
  }

  public CurrentState lastUplink(OffsetDateTime lastUplink) {
    this.lastUplink = lastUplink;
    return this;
  }

  /**
   * Date of last uplink
   * 
   * @return lastUplink
   **/

  public OffsetDateTime getLastUplink() {
    return lastUplink;
  }

  public void setLastUplink(OffsetDateTime lastUplink) {
    this.lastUplink = lastUplink;
  }

  public CurrentState downlinkCount(Integer downlinkCount) {
    this.downlinkCount = downlinkCount;
    return this;
  }

  /**
   * The current downlink counter
   * 
   * @return downlinkCount
   **/

  public Integer getDownlinkCount() {
    return downlinkCount;
  }

  public void setDownlinkCount(Integer downlinkCount) {
    this.downlinkCount = downlinkCount;
  }

  public CurrentState lastDownlink(OffsetDateTime lastDownlink) {
    this.lastDownlink = lastDownlink;
    return this;
  }

  /**
   * Date of last downlink
   * 
   * @return lastDownlink
   **/

  public OffsetDateTime getLastDownlink() {
    return lastDownlink;
  }

  public void setLastDownlink(OffsetDateTime lastDownlink) {
    this.lastDownlink = lastDownlink;
  }

  public CurrentState data(Object data) {
    this.data = data;
    return this;
  }

  /**
   * Last data received from the device
   * 
   * @return data
   **/

  public Object getData() {
    return data;
  }

  public void setData(Object data) {
    this.data = data;
  }

  public CurrentState lat(Double lat) {
    this.lat = lat;
    return this;
  }

  /**
   * Device latitude
   * 
   * @return lat
   **/

  public Double getLat() {
    return lat;
  }

  public void setLat(Double lat) {
    this.lat = lat;
  }

  public CurrentState lng(Double lng) {
    this.lng = lng;
    return this;
  }

  /**
   * Device longitude
   * 
   * @return lng
   **/

  public Double getLng() {
    return lng;
  }

  public void setLng(Double lng) {
    this.lng = lng;
  }

  public CurrentState protocolData(ProtocolData protocolData) {
    this.protocolData = protocolData;
    return this;
  }

  /**
   * Get protocolData
   * 
   * @return protocolData
   **/

  public ProtocolData getProtocolData() {
    return protocolData;
  }

  public void setProtocolData(ProtocolData protocolData) {
    this.protocolData = protocolData;
  }

  public CurrentState geolocationType(GeolocationTypeEnum geolocationType) {
    this.geolocationType = geolocationType;
    return this;
  }

  /**
   * Geolocation type
   * 
   * @return geolocationType
   **/

  public GeolocationTypeEnum getGeolocationType() {
    return geolocationType;
  }

  public void setGeolocationType(GeolocationTypeEnum geolocationType) {
    this.geolocationType = geolocationType;
  }

  public CurrentState zone(Ref zone) {
    this.zone = zone;
    return this;
  }

  /**
   * Get zone
   * 
   * @return zone
   **/

  public Ref getZone() {
    return zone;
  }

  public void setZone(Ref zone) {
    this.zone = zone;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CurrentState currentState = (CurrentState) o;
    return Objects.equals(this.id, currentState.id) &&
        Objects.equals(this.status, currentState.status) &&
        Objects.equals(this.uplinkCount, currentState.uplinkCount) &&
        Objects.equals(this.lastUplink, currentState.lastUplink) &&
        Objects.equals(this.downlinkCount, currentState.downlinkCount) &&
        Objects.equals(this.lastDownlink, currentState.lastDownlink) &&
        Objects.equals(this.data, currentState.data) &&
        Objects.equals(this.lat, currentState.lat) &&
        Objects.equals(this.lng, currentState.lng) &&
        Objects.equals(this.protocolData, currentState.protocolData) &&
        Objects.equals(this.geolocationType, currentState.geolocationType) &&
        Objects.equals(this.zone, currentState.zone);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, status, uplinkCount, lastUplink, downlinkCount, lastDownlink, data, lat, lng, protocolData,
        geolocationType, zone);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CurrentState {\n");

    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    status: ").append(toIndentedString(status)).append("\n");
    sb.append("    uplinkCount: ").append(toIndentedString(uplinkCount)).append("\n");
    sb.append("    lastUplink: ").append(toIndentedString(lastUplink)).append("\n");
    sb.append("    downlinkCount: ").append(toIndentedString(downlinkCount)).append("\n");
    sb.append("    lastDownlink: ").append(toIndentedString(lastDownlink)).append("\n");
    sb.append("    data: ").append(toIndentedString(data)).append("\n");
    sb.append("    lat: ").append(toIndentedString(lat)).append("\n");
    sb.append("    lng: ").append(toIndentedString(lng)).append("\n");
    sb.append("    protocolData: ").append(toIndentedString(protocolData)).append("\n");
    sb.append("    geolocationType: ").append(toIndentedString(geolocationType)).append("\n");
    sb.append("    zone: ").append(toIndentedString(zone)).append("\n");
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
