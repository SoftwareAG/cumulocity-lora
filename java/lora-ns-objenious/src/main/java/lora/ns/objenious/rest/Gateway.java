package lora.ns.objenious.rest;

import java.time.OffsetDateTime;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Gateway
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class Gateway {
  @JsonProperty("id")
  private Integer id = null;

  @JsonProperty("gateway_id")
  private String gatewayId = null;

  @JsonProperty("gateway_name")
  private String gatewayName = null;

  @JsonProperty("gateway_type")
  private String gatewayType = null;

  @JsonProperty("serial_number")
  private String serialNumber = null;

  @JsonProperty("group")
  private Ref group = null;

  @JsonProperty("last_message")
  private OffsetDateTime lastMessage = null;

  @JsonProperty("deployed_at")
  private OffsetDateTime deployedAt = null;

  @JsonProperty("lat")
  private Double lat = null;

  @JsonProperty("lng")
  private Double lng = null;

  @JsonProperty("version")
  private String version = null;

  @JsonProperty("iccid")
  private String iccid = null;

  /**
   * The gateway status
   */
  public enum StatusEnum {
    ACTIVE("active"),

    INACTIVE("inactive"),

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
  private StatusEnum status = null;

  @JsonProperty("link")
  private String link = null;

  public Gateway id(Integer id) {
    this.id = id;
    return this;
  }

  /**
   * Gateway identifier
   * 
   * @return id
   **/

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Gateway gatewayId(String gatewayId) {
    this.gatewayId = gatewayId;
    return this;
  }

  /**
   * Gateway name
   * 
   * @return gatewayId
   **/

  public String getGatewayId() {
    return gatewayId;
  }

  public void setGatewayId(String gatewayId) {
    this.gatewayId = gatewayId;
  }

  public Gateway gatewayName(String gatewayName) {
    this.gatewayName = gatewayName;
    return this;
  }

  /**
   * Gateway label
   * 
   * @return gatewayName
   **/

  public String getGatewayName() {
    return gatewayName;
  }

  public void setGatewayName(String gatewayName) {
    this.gatewayName = gatewayName;
  }

  public Gateway gatewayType(String gatewayType) {
    this.gatewayType = gatewayType;
    return this;
  }

  /**
   * Gateway type
   * 
   * @return gatewayType
   **/

  public String getGatewayType() {
    return gatewayType;
  }

  public void setGatewayType(String gatewayType) {
    this.gatewayType = gatewayType;
  }

  public Gateway serialNumber(String serialNumber) {
    this.serialNumber = serialNumber;
    return this;
  }

  /**
   * Gateway label
   * 
   * @return serialNumber
   **/

  public String getSerialNumber() {
    return serialNumber;
  }

  public void setSerialNumber(String serialNumber) {
    this.serialNumber = serialNumber;
  }

  public Gateway group(Ref group) {
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

  public Gateway lastMessage(OffsetDateTime lastMessage) {
    this.lastMessage = lastMessage;
    return this;
  }

  /**
   * Last message date
   * 
   * @return lastMessage
   **/

  public OffsetDateTime getLastMessage() {
    return lastMessage;
  }

  public void setLastMessage(OffsetDateTime lastMessage) {
    this.lastMessage = lastMessage;
  }

  public Gateway deployedAt(OffsetDateTime deployedAt) {
    this.deployedAt = deployedAt;
    return this;
  }

  /**
   * Deployment date
   * 
   * @return deployedAt
   **/

  public OffsetDateTime getDeployedAt() {
    return deployedAt;
  }

  public void setDeployedAt(OffsetDateTime deployedAt) {
    this.deployedAt = deployedAt;
  }

  public Gateway lat(Double lat) {
    this.lat = lat;
    return this;
  }

  /**
   * Gateway latitude
   * 
   * @return lat
   **/

  public Double getLat() {
    return lat;
  }

  public void setLat(Double lat) {
    this.lat = lat;
  }

  public Gateway lng(Double lng) {
    this.lng = lng;
    return this;
  }

  /**
   * Gateway longitude
   * 
   * @return lng
   **/

  public Double getLng() {
    return lng;
  }

  public void setLng(Double lng) {
    this.lng = lng;
  }

  public Gateway version(String version) {
    this.version = version;
    return this;
  }

  /**
   * Gateway version
   * 
   * @return version
   **/

  public String getVersion() {
    return version;
  }

  public void setVersion(String version) {
    this.version = version;
  }

  public Gateway iccid(String iccid) {
    this.iccid = iccid;
    return this;
  }

  /**
   * Gateway ICCID
   * 
   * @return iccid
   **/

  public String getIccid() {
    return iccid;
  }

  public void setIccid(String iccid) {
    this.iccid = iccid;
  }

  public Gateway status(StatusEnum status) {
    this.status = status;
    return this;
  }

  /**
   * The gateway status
   * 
   * @return status
   **/

  public StatusEnum getStatus() {
    return status;
  }

  public void setStatus(StatusEnum status) {
    this.status = status;
  }

  public Gateway link(String link) {
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

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Gateway gateway = (Gateway) o;
    return Objects.equals(this.id, gateway.id) &&
        Objects.equals(this.gatewayId, gateway.gatewayId) &&
        Objects.equals(this.gatewayName, gateway.gatewayName) &&
        Objects.equals(this.serialNumber, gateway.serialNumber) &&
        Objects.equals(this.group, gateway.group) &&
        Objects.equals(this.lastMessage, gateway.lastMessage) &&
        Objects.equals(this.deployedAt, gateway.deployedAt) &&
        Objects.equals(this.lat, gateway.lat) &&
        Objects.equals(this.lng, gateway.lng) &&
        Objects.equals(this.version, gateway.version) &&
        Objects.equals(this.iccid, gateway.iccid) &&
        Objects.equals(this.status, gateway.status) &&
        Objects.equals(this.link, gateway.link);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, gatewayId, gatewayName, serialNumber, group, lastMessage, deployedAt, lat, lng, version,
        iccid, status, link);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Gateway {\n");

    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    gatewayId: ").append(toIndentedString(gatewayId)).append("\n");
    sb.append("    gatewayName: ").append(toIndentedString(gatewayName)).append("\n");
    sb.append("    gatewayType: ").append(toIndentedString(gatewayType)).append("\n");
    sb.append("    serialNumber: ").append(toIndentedString(serialNumber)).append("\n");
    sb.append("    group: ").append(toIndentedString(group)).append("\n");
    sb.append("    lastMessage: ").append(toIndentedString(lastMessage)).append("\n");
    sb.append("    deployedAt: ").append(toIndentedString(deployedAt)).append("\n");
    sb.append("    lat: ").append(toIndentedString(lat)).append("\n");
    sb.append("    lng: ").append(toIndentedString(lng)).append("\n");
    sb.append("    version: ").append(toIndentedString(version)).append("\n");
    sb.append("    iccid: ").append(toIndentedString(iccid)).append("\n");
    sb.append("    status: ").append(toIndentedString(status)).append("\n");
    sb.append("    link: ").append(toIndentedString(link)).append("\n");
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
