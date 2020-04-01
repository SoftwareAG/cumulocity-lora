package lora.ns.objenious.rest;

import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * DeviceReplace
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class DeviceReplace   {
  @JsonProperty("deveui")
  private String deveui = null;

  @JsonProperty("appeui")
  private String appeui = null;

  @JsonProperty("appkey")
  private String appkey = null;

  public DeviceReplace deveui(String deveui) {
    this.deveui = deveui;
    return this;
  }

  /**
   * (LoRa devices) the device deveui in hexadecimal/bigendian
   * @return deveui
  **/


  public String getDeveui() {
    return deveui;
  }

  public void setDeveui(String deveui) {
    this.deveui = deveui;
  }

  public DeviceReplace appeui(String appeui) {
    this.appeui = appeui;
    return this;
  }

  /**
   * (LoRa devices) the device appeui in hexadecimal/bigendian
   * @return appeui
  **/


  public String getAppeui() {
    return appeui;
  }

  public void setAppeui(String appeui) {
    this.appeui = appeui;
  }

  public DeviceReplace appkey(String appkey) {
    this.appkey = appkey;
    return this;
  }

  /**
   * Application key
   * @return appkey
  **/


  public String getAppkey() {
    return appkey;
  }

  public void setAppkey(String appkey) {
    this.appkey = appkey;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DeviceReplace deviceReplace = (DeviceReplace) o;
    return Objects.equals(this.deveui, deviceReplace.deveui) &&
        Objects.equals(this.appeui, deviceReplace.appeui) &&
        Objects.equals(this.appkey, deviceReplace.appkey);
  }

  @Override
  public int hashCode() {
    return Objects.hash(deveui, appeui, appkey);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DeviceReplace {\n");
    
    sb.append("    deveui: ").append(toIndentedString(deveui)).append("\n");
    sb.append("    appeui: ").append(toIndentedString(appeui)).append("\n");
    sb.append("    appkey: ").append(toIndentedString(appkey)).append("\n");
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

