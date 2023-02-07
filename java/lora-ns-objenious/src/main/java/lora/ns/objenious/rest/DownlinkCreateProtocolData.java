package lora.ns.objenious.rest;

import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * DownlinkCreateProtocolData
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class DownlinkCreateProtocolData {
  @JsonProperty("port")
  private Integer port = null;

  public DownlinkCreateProtocolData port(Integer port) {
    this.port = port;
    return this;
  }

  /**
   * port to send the downlink to (mandatory for LoRa devices)
   * minimum: 1
   * maximum: 223
   * 
   * @return port
   **/

  public Integer getPort() {
    return port;
  }

  public void setPort(Integer port) {
    this.port = port;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DownlinkCreateProtocolData downlinkCreateProtocolData = (DownlinkCreateProtocolData) o;
    return Objects.equals(this.port, downlinkCreateProtocolData.port);
  }

  @Override
  public int hashCode() {
    return Objects.hash(port);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DownlinkCreateProtocolData {\n");

    sb.append("    port: ").append(toIndentedString(port)).append("\n");
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
