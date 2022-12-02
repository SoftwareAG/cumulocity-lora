package lora.ns.objenious.rest;

import java.math.BigDecimal;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * DeviceCreate
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class DeviceCreate {
  @JsonProperty("label")
  private String label = null;

  @JsonProperty("deveui")
  private String deveui = null;

  @JsonProperty("appeui")
  private String appeui = null;

  @JsonProperty("appkey")
  private String appkey = null;

  @JsonProperty("group_id")
  private Integer groupId = null;

  @JsonProperty("profile_id")
  private Integer profileId = null;

  @JsonProperty("lat")
  private BigDecimal lat = null;

  @JsonProperty("lng")
  private BigDecimal lng = null;

  @JsonProperty("properties")
  private PropertiesCreate properties = null;

  public DeviceCreate label(String label) {
    this.label = label;
    return this;
  }

  /**
   * Device name
   * 
   * @return label
   **/

  public String getLabel() {
    return label;
  }

  public void setLabel(String label) {
    this.label = label;
  }

  public DeviceCreate deveui(String deveui) {
    this.deveui = deveui;
    return this;
  }

  /**
   * (LoRa devices) the device deveui in hexadecimal/bigendian
   * 
   * @return deveui
   **/

  public String getDeveui() {
    return deveui;
  }

  public void setDeveui(String deveui) {
    this.deveui = deveui;
  }

  public DeviceCreate appeui(String appeui) {
    this.appeui = appeui;
    return this;
  }

  /**
   * (LoRa devices) the device appeui in hexadecimal/bigendian
   * 
   * @return appeui
   **/

  public String getAppeui() {
    return appeui;
  }

  public void setAppeui(String appeui) {
    this.appeui = appeui;
  }

  public DeviceCreate appkey(String appkey) {
    this.appkey = appkey;
    return this;
  }

  /**
   * Application key
   * 
   * @return appkey
   **/

  public String getAppkey() {
    return appkey;
  }

  public void setAppkey(String appkey) {
    this.appkey = appkey;
  }

  public DeviceCreate groupId(Integer groupId) {
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

  public DeviceCreate profileId(Integer profileId) {
    this.profileId = profileId;
    return this;
  }

  /**
   * Device profile identifier
   * 
   * @return profileId
   **/

  public Integer getProfileId() {
    return profileId;
  }

  public void setProfileId(Integer profileId) {
    this.profileId = profileId;
  }

  public DeviceCreate lat(BigDecimal lat) {
    this.lat = lat;
    return this;
  }

  /**
   * Latitude for stationary devices
   * 
   * @return lat
   **/

  public BigDecimal getLat() {
    return lat;
  }

  public void setLat(BigDecimal lat) {
    this.lat = lat;
  }

  public DeviceCreate lng(BigDecimal lng) {
    this.lng = lng;
    return this;
  }

  /**
   * Longitude for stationary devices
   * 
   * @return lng
   **/

  public BigDecimal getLng() {
    return lng;
  }

  public void setLng(BigDecimal lng) {
    this.lng = lng;
  }

  public DeviceCreate properties(PropertiesCreate properties) {
    this.properties = properties;
    return this;
  }

  /**
   * Get properties
   * 
   * @return properties
   **/

  public PropertiesCreate getProperties() {
    return properties;
  }

  public void setProperties(PropertiesCreate properties) {
    this.properties = properties;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DeviceCreate deviceCreate = (DeviceCreate) o;
    return Objects.equals(this.label, deviceCreate.label) &&
        Objects.equals(this.deveui, deviceCreate.deveui) &&
        Objects.equals(this.appeui, deviceCreate.appeui) &&
        Objects.equals(this.appkey, deviceCreate.appkey) &&
        Objects.equals(this.groupId, deviceCreate.groupId) &&
        Objects.equals(this.profileId, deviceCreate.profileId) &&
        Objects.equals(this.lat, deviceCreate.lat) &&
        Objects.equals(this.lng, deviceCreate.lng) &&
        Objects.equals(this.properties, deviceCreate.properties);
  }

  @Override
  public int hashCode() {
    return Objects.hash(label, deveui, appeui, appkey, groupId, profileId, lat, lng, properties);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DeviceCreate {\n");

    sb.append("    label: ").append(toIndentedString(label)).append("\n");
    sb.append("    deveui: ").append(toIndentedString(deveui)).append("\n");
    sb.append("    appeui: ").append(toIndentedString(appeui)).append("\n");
    sb.append("    appkey: ").append(toIndentedString(appkey)).append("\n");
    sb.append("    groupId: ").append(toIndentedString(groupId)).append("\n");
    sb.append("    profileId: ").append(toIndentedString(profileId)).append("\n");
    sb.append("    lat: ").append(toIndentedString(lat)).append("\n");
    sb.append("    lng: ").append(toIndentedString(lng)).append("\n");
    sb.append("    properties: ").append(toIndentedString(properties)).append("\n");
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
