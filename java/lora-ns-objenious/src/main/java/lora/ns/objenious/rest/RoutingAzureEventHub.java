package lora.ns.objenious.rest;

import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Configuration of azure eventhub
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class RoutingAzureEventHub   {
  @JsonProperty("connection_string")
  private String connectionString = null;

  @JsonProperty("hub_name")
  private String hubName = null;

  public RoutingAzureEventHub connectionString(String connectionString) {
    this.connectionString = connectionString;
    return this;
  }

  /**
   * Connection string to communicate with azure, with the format \"Endpoint=xxx;SharedAccessKeyName=xxx;SharedAccessKey=xxx\"
   * @return connectionString
  **/


  public String getConnectionString() {
    return connectionString;
  }

  public void setConnectionString(String connectionString) {
    this.connectionString = connectionString;
  }

  public RoutingAzureEventHub hubName(String hubName) {
    this.hubName = hubName;
    return this;
  }

  /**
   * Hub name
   * @return hubName
  **/


  public String getHubName() {
    return hubName;
  }

  public void setHubName(String hubName) {
    this.hubName = hubName;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RoutingAzureEventHub routingAzureEventHub = (RoutingAzureEventHub) o;
    return Objects.equals(this.connectionString, routingAzureEventHub.connectionString) &&
        Objects.equals(this.hubName, routingAzureEventHub.hubName);
  }

  @Override
  public int hashCode() {
    return Objects.hash(connectionString, hubName);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RoutingAzureEventHub {\n");
    
    sb.append("    connectionString: ").append(toIndentedString(connectionString)).append("\n");
    sb.append("    hubName: ").append(toIndentedString(hubName)).append("\n");
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

