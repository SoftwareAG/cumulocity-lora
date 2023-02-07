package lora.ns.objenious.rest;

import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Configuration of azure iothub
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class RoutingAzureIotHub   {
  @JsonProperty("connection_string")
  private String connectionString = null;

  public RoutingAzureIotHub connectionString(String connectionString) {
    this.connectionString = connectionString;
    return this;
  }

  /**
   * Connection string to communicate with azure, with the format \"HostName=xxx;SharedAccessKeyName=xxx;SharedAccessKey=xxx\"
   * @return connectionString
  **/


  public String getConnectionString() {
    return connectionString;
  }

  public void setConnectionString(String connectionString) {
    this.connectionString = connectionString;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RoutingAzureIotHub routingAzureIotHub = (RoutingAzureIotHub) o;
    return Objects.equals(this.connectionString, routingAzureIotHub.connectionString);
  }

  @Override
  public int hashCode() {
    return Objects.hash(connectionString);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RoutingAzureIotHub {\n");
    
    sb.append("    connectionString: ").append(toIndentedString(connectionString)).append("\n");
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

