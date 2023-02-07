package lora.ns.objenious.rest;

import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Device
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Device {
  @JsonProperty("id")
  private Long id = null;

  @JsonProperty("link")
  private String link = null;

  @JsonProperty("label")
  private String label = null;

  @JsonProperty("group")
  private Ref group = null;

  @JsonProperty("profile")
  private Ref profile = null;

  @JsonProperty("properties")
  private Properties properties = null;

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

  @JsonProperty("enabled")
  private Boolean enabled = null;

  @JsonProperty("recycled")
  private Boolean recycled = null;

  public Device id(Long id) {
    this.id = id;
    return this;
  }

  /**
   * Device identifier
   * 
   * @return id
   **/

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Device link(String link) {
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

  public Device label(String label) {
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

  public Device group(Ref group) {
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

  public Device profile(Ref profile) {
    this.profile = profile;
    return this;
  }

  /**
   * Get profile
   * 
   * @return profile
   **/

  public Ref getProfile() {
    return profile;
  }

  public void setProfile(Ref profile) {
    this.profile = profile;
  }

  public Device properties(Properties properties) {
    this.properties = properties;
    return this;
  }

  /**
   * Get properties
   * 
   * @return properties
   **/

  public Properties getProperties() {
    return properties;
  }

  public void setProperties(Properties properties) {
    this.properties = properties;
  }

  public Device status(StatusEnum status) {
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

  public Device enabled(Boolean enabled) {
    this.enabled = enabled;
    return this;
  }

  /**
   * If set to true, the device is enabled
   * 
   * @return enabled
   **/

  public Boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(Boolean enabled) {
    this.enabled = enabled;
  }

  public Device recycled(Boolean recycled) {
    this.recycled = recycled;
    return this;
  }

  /**
   * If set to true, the device is recycled
   * 
   * @return recycled
   **/

  public Boolean isRecycled() {
    return recycled;
  }

  public void setRecycled(Boolean recycled) {
    this.recycled = recycled;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Device device = (Device) o;
    return Objects.equals(this.id, device.id) &&
        Objects.equals(this.link, device.link) &&
        Objects.equals(this.label, device.label) &&
        Objects.equals(this.group, device.group) &&
        Objects.equals(this.profile, device.profile) &&
        Objects.equals(this.properties, device.properties) &&
        Objects.equals(this.status, device.status) &&
        Objects.equals(this.enabled, device.enabled) &&
        Objects.equals(this.recycled, device.recycled);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, link, label, group, profile, properties, status, enabled, recycled);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Device {\n");

    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    link: ").append(toIndentedString(link)).append("\n");
    sb.append("    label: ").append(toIndentedString(label)).append("\n");
    sb.append("    group: ").append(toIndentedString(group)).append("\n");
    sb.append("    profile: ").append(toIndentedString(profile)).append("\n");
    sb.append("    properties: ").append(toIndentedString(properties)).append("\n");
    sb.append("    status: ").append(toIndentedString(status)).append("\n");
    sb.append("    enabled: ").append(toIndentedString(enabled)).append("\n");
    sb.append("    recycled: ").append(toIndentedString(recycled)).append("\n");
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
