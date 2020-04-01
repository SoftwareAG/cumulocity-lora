package lora.ns.objenious.rest;

import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * DeviceRecycle
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class DeviceRecycle   {
  @JsonProperty("group_id")
  private Integer groupId = null;

  @JsonProperty("appeui")
  private String appeui = null;

  public DeviceRecycle groupId(Integer groupId) {
    this.groupId = groupId;
    return this;
  }

  /**
   * If not set, it will keep the same group from the recycled device.
   * @return groupId
  **/


  public Integer getGroupId() {
    return groupId;
  }

  public void setGroupId(Integer groupId) {
    this.groupId = groupId;
  }

  public DeviceRecycle appeui(String appeui) {
    this.appeui = appeui;
    return this;
  }

  /**
   * If not set, it will keep the same appeui from the recycled device.
   * @return appeui
  **/


  public String getAppeui() {
    return appeui;
  }

  public void setAppeui(String appeui) {
    this.appeui = appeui;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DeviceRecycle deviceRecycle = (DeviceRecycle) o;
    return Objects.equals(this.groupId, deviceRecycle.groupId) &&
        Objects.equals(this.appeui, deviceRecycle.appeui);
  }

  @Override
  public int hashCode() {
    return Objects.hash(groupId, appeui);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DeviceRecycle {\n");
    
    sb.append("    groupId: ").append(toIndentedString(groupId)).append("\n");
    sb.append("    appeui: ").append(toIndentedString(appeui)).append("\n");
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

