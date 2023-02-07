package lora.ns.objenious.rest;

import java.time.OffsetDateTime;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Values
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class Values {
  @JsonProperty("timestamp")
  private OffsetDateTime timestamp = null;

  @JsonProperty("data")
  private Object data = null;

  @JsonProperty("lat")
  private Double lat = null;

  @JsonProperty("lng")
  private Double lng = null;

  public Values timestamp(OffsetDateTime timestamp) {
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

  public Values data(Object data) {
    this.data = data;
    return this;
  }

  /**
   * List of values sent by the device
   * 
   * @return data
   **/

  public Object getData() {
    return data;
  }

  public void setData(Object data) {
    this.data = data;
  }

  public Values lat(Double lat) {
    this.lat = lat;
    return this;
  }

  /**
   * Device latitude (if device has been located)
   * 
   * @return lat
   **/

  public Double getLat() {
    return lat;
  }

  public void setLat(Double lat) {
    this.lat = lat;
  }

  public Values lng(Double lng) {
    this.lng = lng;
    return this;
  }

  /**
   * Device longitude (if device has been located)
   * 
   * @return lng
   **/

  public Double getLng() {
    return lng;
  }

  public void setLng(Double lng) {
    this.lng = lng;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Values values = (Values) o;
    return Objects.equals(this.timestamp, values.timestamp) &&
        Objects.equals(this.data, values.data) &&
        Objects.equals(this.lat, values.lat) &&
        Objects.equals(this.lng, values.lng);
  }

  @Override
  public int hashCode() {
    return Objects.hash(timestamp, data, lat, lng);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Values {\n");

    sb.append("    timestamp: ").append(toIndentedString(timestamp)).append("\n");
    sb.append("    data: ").append(toIndentedString(data)).append("\n");
    sb.append("    lat: ").append(toIndentedString(lat)).append("\n");
    sb.append("    lng: ").append(toIndentedString(lng)).append("\n");
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
