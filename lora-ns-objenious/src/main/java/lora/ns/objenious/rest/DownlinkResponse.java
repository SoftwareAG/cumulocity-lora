package lora.ns.objenious.rest;

import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * DownlinkResponse
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")
@JsonIgnoreProperties(ignoreUnknown = true)
public class DownlinkResponse   {
  @JsonProperty("command_id")
  private Long commandId = null;

  @JsonProperty("count")
  private Integer count = null;

  public DownlinkResponse commandId(Long commandId) {
    this.commandId = commandId;
    return this;
  }

  /**
   * The command id for the newly created command
   * @return commandId
  **/


  public Long getCommandId() {
    return commandId;
  }

  public void setCommandId(Long commandId) {
    this.commandId = commandId;
  }

  public DownlinkResponse count(Integer count) {
    this.count = count;
    return this;
  }

  /**
   * The downlink counter for the newly created command - as of may, 3rd, 2017, this value is not set anymore
   * @return count
  **/


  public Integer getCount() {
    return count;
  }

  public void setCount(Integer count) {
    this.count = count;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DownlinkResponse downlinkResponse = (DownlinkResponse) o;
    return Objects.equals(this.commandId, downlinkResponse.commandId) &&
        Objects.equals(this.count, downlinkResponse.count);
  }

  @Override
  public int hashCode() {
    return Objects.hash(commandId, count);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DownlinkResponse {\n");
    
    sb.append("    commandId: ").append(toIndentedString(commandId)).append("\n");
    sb.append("    count: ").append(toIndentedString(count)).append("\n");
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

