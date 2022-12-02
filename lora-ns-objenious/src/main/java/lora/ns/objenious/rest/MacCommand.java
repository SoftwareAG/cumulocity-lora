package lora.ns.objenious.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Mac command.
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class MacCommand {
  @JsonProperty("type")
  private String type = null;

  @JsonProperty("payload")
  private String payload = null;

  @JsonProperty("payload_decoded")
  private List<MacCommandPayloadDecoded> payloadDecoded = null;

  public MacCommand type(String type) {
    this.type = type;
    return this;
  }

  /**
   * type of mac command (LoRa devices). Requests the end-device to change data
   * rate, transmit power, repetition rate or channel.
   * 
   * @return type
   **/

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public MacCommand payload(String payload) {
    this.payload = payload;
    return this;
  }

  /**
   * payload
   * 
   * @return payload
   **/

  public String getPayload() {
    return payload;
  }

  public void setPayload(String payload) {
    this.payload = payload;
  }

  public MacCommand payloadDecoded(List<MacCommandPayloadDecoded> payloadDecoded) {
    this.payloadDecoded = payloadDecoded;
    return this;
  }

  public MacCommand addPayloadDecodedItem(MacCommandPayloadDecoded payloadDecodedItem) {
    if (this.payloadDecoded == null) {
      this.payloadDecoded = new ArrayList<MacCommandPayloadDecoded>();
    }
    this.payloadDecoded.add(payloadDecodedItem);
    return this;
  }

  /**
   * decoded payload values
   * 
   * @return payloadDecoded
   **/

  public List<MacCommandPayloadDecoded> getPayloadDecoded() {
    return payloadDecoded;
  }

  public void setPayloadDecoded(List<MacCommandPayloadDecoded> payloadDecoded) {
    this.payloadDecoded = payloadDecoded;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    MacCommand macCommand = (MacCommand) o;
    return Objects.equals(this.type, macCommand.type) &&
        Objects.equals(this.payload, macCommand.payload) &&
        Objects.equals(this.payloadDecoded, macCommand.payloadDecoded);
  }

  @Override
  public int hashCode() {
    return Objects.hash(type, payload, payloadDecoded);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class MacCommand {\n");

    sb.append("    type: ").append(toIndentedString(type)).append("\n");
    sb.append("    payload: ").append(toIndentedString(payload)).append("\n");
    sb.append("    payloadDecoded: ").append(toIndentedString(payloadDecoded)).append("\n");
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
