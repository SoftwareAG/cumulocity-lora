package lora.ns.objenious.rest;

import java.util.HashMap;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * User defined device properties. Additional key/value pairs can be present, based on device configuration. Key and values will be strings. 
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class Properties extends HashMap<String, String>  {
  @JsonProperty("external_id")
  private String externalId = null;

  @JsonProperty("deveui")
  private String deveui = null;

  @JsonProperty("appeui")
  private String appeui = null;

  public Properties externalId(String externalId) {
    this.externalId = externalId;
    return this;
  }

  /**
   * the id on the client platform
   * @return externalId
  **/


  public String getExternalId() {
    return externalId;
  }

  public void setExternalId(String externalId) {
    this.externalId = externalId;
  }

  public Properties deveui(String deveui) {
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

  public Properties appeui(String appeui) {
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


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Properties properties = (Properties) o;
    return Objects.equals(this.externalId, properties.externalId) &&
        Objects.equals(this.deveui, properties.deveui) &&
        Objects.equals(this.appeui, properties.appeui) &&
        super.equals(o);
  }

  @Override
  public int hashCode() {
    return Objects.hash(externalId, deveui, appeui, super.hashCode());
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Properties {\n");
    sb.append("    ").append(toIndentedString(super.toString())).append("\n");
    sb.append("    externalId: ").append(toIndentedString(externalId)).append("\n");
    sb.append("    deveui: ").append(toIndentedString(deveui)).append("\n");
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

