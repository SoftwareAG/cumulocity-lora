package lora.ns.objenious.rest;

import java.math.BigDecimal;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * DeviceUpdate
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class DeviceUpdate {
  @JsonProperty("label")
  private String label = null;

  @JsonProperty("group_id")
  private Integer groupId = null;

  @JsonProperty("profile_id")
  private Integer profileId = null;

  @JsonProperty("lat")
  private BigDecimal lat = null;

  @JsonProperty("lng")
  private BigDecimal lng = null;

  @JsonProperty("appkey")
  private String appkey = null;

  @JsonProperty("properties")
  private PropertiesCreate properties = null;

  public DeviceUpdate label(String label) {
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

  public DeviceUpdate groupId(Integer groupId) {
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

  public DeviceUpdate profileId(Integer profileId) {
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

  public DeviceUpdate lat(BigDecimal lat) {
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

  public DeviceUpdate lng(BigDecimal lng) {
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

  public DeviceUpdate appkey(String appkey) {
    this.appkey = appkey;
    return this;
  }

  /**
   * Application key in hexadecimal (optional). **WARNING:** If set, the device
   * must send a new join request.
   * 
   * @return appkey
   **/

  public String getAppkey() {
    return appkey;
  }

  public void setAppkey(String appkey) {
    this.appkey = appkey;
  }

  public DeviceUpdate properties(PropertiesCreate properties) {
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
    DeviceUpdate deviceUpdate = (DeviceUpdate) o;
    return Objects.equals(this.label, deviceUpdate.label) &&
        Objects.equals(this.groupId, deviceUpdate.groupId) &&
        Objects.equals(this.profileId, deviceUpdate.profileId) &&
        Objects.equals(this.lat, deviceUpdate.lat) &&
        Objects.equals(this.lng, deviceUpdate.lng) &&
        Objects.equals(this.appkey, deviceUpdate.appkey) &&
        Objects.equals(this.properties, deviceUpdate.properties);
  }

  @Override
  public int hashCode() {
    return Objects.hash(label, groupId, profileId, lat, lng, appkey, properties);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DeviceUpdate {\n");

    sb.append("    label: ").append(toIndentedString(label)).append("\n");
    sb.append("    groupId: ").append(toIndentedString(groupId)).append("\n");
    sb.append("    profileId: ").append(toIndentedString(profileId)).append("\n");
    sb.append("    lat: ").append(toIndentedString(lat)).append("\n");
    sb.append("    lng: ").append(toIndentedString(lng)).append("\n");
    sb.append("    appkey: ").append(toIndentedString(appkey)).append("\n");
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
