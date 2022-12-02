package lora.ns.objenious.rest;

import java.time.OffsetDateTime;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * MessagePayload
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class MessagePayload {
  @JsonProperty("timestamp")
  private OffsetDateTime timestamp = null;

  @JsonProperty("data")
  private Object data = null;

  public MessagePayload timestamp(OffsetDateTime timestamp) {
    this.timestamp = timestamp;
    return this;
  }

  /**
   * Date of measure
   * 
   * @return timestamp
   **/

  public OffsetDateTime getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(OffsetDateTime timestamp) {
    this.timestamp = timestamp;
  }

  public MessagePayload data(Object data) {
    this.data = data;
    return this;
  }

  /**
   * values
   * 
   * @return data
   **/

  public Object getData() {
    return data;
  }

  public void setData(Object data) {
    this.data = data;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    MessagePayload messagePayload = (MessagePayload) o;
    return Objects.equals(this.timestamp, messagePayload.timestamp) &&
        Objects.equals(this.data, messagePayload.data);
  }

  @Override
  public int hashCode() {
    return Objects.hash(timestamp, data);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class MessagePayload {\n");

    sb.append("    timestamp: ").append(toIndentedString(timestamp)).append("\n");
    sb.append("    data: ").append(toIndentedString(data)).append("\n");
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
