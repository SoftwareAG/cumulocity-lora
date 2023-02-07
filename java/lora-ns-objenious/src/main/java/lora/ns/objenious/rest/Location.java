package lora.ns.objenious.rest;

import java.time.OffsetDateTime;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Location
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class Location {
  @JsonProperty("timestamp")
  private OffsetDateTime timestamp = null;

  @JsonProperty("latitude")
  private Double latitude = null;

  @JsonProperty("longitude")
  private Double longitude = null;

  /**
   * Geolocation type
   */
  public enum GeolocationTypeEnum {
    NONE("none"),

    FIXED("fixed"),

    NETWORK("network"),

    DEVICE("device"),

    TDOA("tdoa"),

    ZONE("zone");

    private String value;

    GeolocationTypeEnum(String value) {
      this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static GeolocationTypeEnum fromValue(String text) {
      for (GeolocationTypeEnum b : GeolocationTypeEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }

  @JsonProperty("geolocation_type")
  private GeolocationTypeEnum geolocationType = GeolocationTypeEnum.FIXED;

  @JsonProperty("geolocation_precision")
  private Integer geolocationPrecision = null;

  @JsonProperty("city_name")
  private String cityName = null;

  @JsonProperty("city_code")
  private Integer cityCode = null;

  public Location timestamp(OffsetDateTime timestamp) {
    this.timestamp = timestamp;
    return this;
  }

  /**
   * Date of location
   * 
   * @return timestamp
   **/

  public OffsetDateTime getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(OffsetDateTime timestamp) {
    this.timestamp = timestamp;
  }

  public Location latitude(Double latitude) {
    this.latitude = latitude;
    return this;
  }

  /**
   * Device latitude
   * 
   * @return latitude
   **/

  public Double getLatitude() {
    return latitude;
  }

  public void setLatitude(Double latitude) {
    this.latitude = latitude;
  }

  public Location longitude(Double longitude) {
    this.longitude = longitude;
    return this;
  }

  /**
   * Device longitude
   * 
   * @return longitude
   **/

  public Double getLongitude() {
    return longitude;
  }

  public void setLongitude(Double longitude) {
    this.longitude = longitude;
  }

  public Location geolocationType(GeolocationTypeEnum geolocationType) {
    this.geolocationType = geolocationType;
    return this;
  }

  /**
   * Geolocation type
   * 
   * @return geolocationType
   **/

  public GeolocationTypeEnum getGeolocationType() {
    return geolocationType;
  }

  public void setGeolocationType(GeolocationTypeEnum geolocationType) {
    this.geolocationType = geolocationType;
  }

  public Location geolocationPrecision(Integer geolocationPrecision) {
    this.geolocationPrecision = geolocationPrecision;
    return this;
  }

  /**
   * Geolocation precision (in meters)
   * 
   * @return geolocationPrecision
   **/

  public Integer getGeolocationPrecision() {
    return geolocationPrecision;
  }

  public void setGeolocationPrecision(Integer geolocationPrecision) {
    this.geolocationPrecision = geolocationPrecision;
  }

  public Location cityName(String cityName) {
    this.cityName = cityName;
    return this;
  }

  /**
   * City name
   * 
   * @return cityName
   **/

  public String getCityName() {
    return cityName;
  }

  public void setCityName(String cityName) {
    this.cityName = cityName;
  }

  public Location cityCode(Integer cityCode) {
    this.cityCode = cityCode;
    return this;
  }

  /**
   * City code
   * 
   * @return cityCode
   **/

  public Integer getCityCode() {
    return cityCode;
  }

  public void setCityCode(Integer cityCode) {
    this.cityCode = cityCode;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Location location = (Location) o;
    return Objects.equals(this.timestamp, location.timestamp) &&
        Objects.equals(this.latitude, location.latitude) &&
        Objects.equals(this.longitude, location.longitude) &&
        Objects.equals(this.geolocationType, location.geolocationType) &&
        Objects.equals(this.geolocationPrecision, location.geolocationPrecision) &&
        Objects.equals(this.cityName, location.cityName) &&
        Objects.equals(this.cityCode, location.cityCode);
  }

  @Override
  public int hashCode() {
    return Objects.hash(timestamp, latitude, longitude, geolocationType, geolocationPrecision, cityName, cityCode);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Location {\n");

    sb.append("    timestamp: ").append(toIndentedString(timestamp)).append("\n");
    sb.append("    latitude: ").append(toIndentedString(latitude)).append("\n");
    sb.append("    longitude: ").append(toIndentedString(longitude)).append("\n");
    sb.append("    geolocationType: ").append(toIndentedString(geolocationType)).append("\n");
    sb.append("    geolocationPrecision: ").append(toIndentedString(geolocationPrecision)).append("\n");
    sb.append("    cityName: ").append(toIndentedString(cityName)).append("\n");
    sb.append("    cityCode: ").append(toIndentedString(cityCode)).append("\n");
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
