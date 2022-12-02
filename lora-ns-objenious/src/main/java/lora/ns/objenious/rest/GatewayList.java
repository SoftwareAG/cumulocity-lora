package lora.ns.objenious.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * GatewayList
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class GatewayList {
  @JsonProperty("locations")
  private List<Gateway> locations = null;

  @JsonProperty("start_exclusive")
  private String startExclusive = null;

  public GatewayList locations(List<Gateway> locations) {
    this.locations = locations;
    return this;
  }

  public GatewayList addLocationsItem(Gateway locationsItem) {
    if (this.locations == null) {
      this.locations = new ArrayList<Gateway>();
    }
    this.locations.add(locationsItem);
    return this;
  }

  /**
   * Get locations
   * 
   * @return locations
   **/

  public List<Gateway> getLocations() {
    return locations;
  }

  public void setLocations(List<Gateway> locations) {
    this.locations = locations;
  }

  public GatewayList startExclusive(String startExclusive) {
    this.startExclusive = startExclusive;
    return this;
  }

  /**
   * the start_exclusive value to be used for the next page
   * 
   * @return startExclusive
   **/

  public String getStartExclusive() {
    return startExclusive;
  }

  public void setStartExclusive(String startExclusive) {
    this.startExclusive = startExclusive;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GatewayList gatewayList = (GatewayList) o;
    return Objects.equals(this.locations, gatewayList.locations) &&
        Objects.equals(this.startExclusive, gatewayList.startExclusive);
  }

  @Override
  public int hashCode() {
    return Objects.hash(locations, startExclusive);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GatewayList {\n");

    sb.append("    locations: ").append(toIndentedString(locations)).append("\n");
    sb.append("    startExclusive: ").append(toIndentedString(startExclusive)).append("\n");
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
