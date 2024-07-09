/*
 * ThingPark things management Devices API
 * REST interface for Devices management. 
 *
 * The version of the OpenAPI document: 7.3
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

package lora.ns.actility.api.model.device;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.JsonTypeName;

/**
 * DeviceLorawanDebug
 */
@JsonPropertyOrder({ DeviceLorawanDebug.JSON_PROPERTY_ALLOWED, DeviceLorawanDebug.JSON_PROPERTY_LORAWAN,
    DeviceLorawanDebug.JSON_PROPERTY_LORAWAN_SINCE, DeviceLorawanDebug.JSON_PROPERTY_NW_GEOLOC })
@JsonTypeName("DeviceLorawan_debug")
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen", date = "2024-05-29T01:47:08.521515962+02:00[Europe/Paris]", comments = "Generator version: 7.6.0")
public class DeviceLorawanDebug {
  public static final String JSON_PROPERTY_ALLOWED = "allowed";
  private Boolean allowed;

  public static final String JSON_PROPERTY_LORAWAN = "lorawan";
  private Boolean lorawan;

  public static final String JSON_PROPERTY_LORAWAN_SINCE = "lorawanSince";
  private Long lorawanSince;

  public static final String JSON_PROPERTY_NW_GEOLOC = "nwGeoloc";
  private Boolean nwGeoloc;

  public DeviceLorawanDebug() {
  }

  @JsonCreator
  public DeviceLorawanDebug(@JsonProperty(JSON_PROPERTY_ALLOWED) Boolean allowed,
          @JsonProperty(JSON_PROPERTY_LORAWAN) Boolean lorawan,
          @JsonProperty(JSON_PROPERTY_LORAWAN_SINCE) Long lorawanSince) {
    this();
    this.allowed = allowed;
    this.lorawan = lorawan;
    this.lorawanSince = lorawanSince;
  }

  /**
   * TRUE if user is allowed to access device debug feature
   * 
   * @return allowed
   **/
  @javax.annotation.Nonnull
  @JsonProperty(JSON_PROPERTY_ALLOWED)
  @JsonInclude(value = JsonInclude.Include.ALWAYS)

  public Boolean getAllowed() {
    return allowed;
  }

  /**
   * TRUE if LoRaWAN debugging is activated
   * 
   * @return lorawan
   **/
  @javax.annotation.Nonnull
  @JsonProperty(JSON_PROPERTY_LORAWAN)
  @JsonInclude(value = JsonInclude.Include.ALWAYS)

  public Boolean getLorawan() {
    return lorawan;
  }

  /**
   * Last update of LoRaWAN debugging mode, epoch time in milliseconds
   * 
   * @return lorawanSince
   **/
  @javax.annotation.Nullable
  @JsonProperty(JSON_PROPERTY_LORAWAN_SINCE)
  @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

  public Long getLorawanSince() {
    return lorawanSince;
  }

  public DeviceLorawanDebug nwGeoloc(Boolean nwGeoloc) {

    this.nwGeoloc = nwGeoloc;
    return this;
  }

  /**
   * TRUE if network geolocation debugging is activated
   * 
   * @return nwGeoloc
   **/
  @javax.annotation.Nullable
  @JsonProperty(JSON_PROPERTY_NW_GEOLOC)
  @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

  public Boolean getNwGeoloc() {
    return nwGeoloc;
  }

  @JsonProperty(JSON_PROPERTY_NW_GEOLOC)
  @JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
  public void setNwGeoloc(Boolean nwGeoloc) {
    this.nwGeoloc = nwGeoloc;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DeviceLorawanDebug deviceLorawanDebug = (DeviceLorawanDebug) o;
    return Objects.equals(this.allowed, deviceLorawanDebug.allowed)
            && Objects.equals(this.lorawan, deviceLorawanDebug.lorawan)
            && Objects.equals(this.lorawanSince, deviceLorawanDebug.lorawanSince)
            && Objects.equals(this.nwGeoloc, deviceLorawanDebug.nwGeoloc);
  }

  @Override
  public int hashCode() {
    return Objects.hash(allowed, lorawan, lorawanSince, nwGeoloc);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DeviceLorawanDebug {\n");
    sb.append("    allowed: ").append(toIndentedString(allowed)).append("\n");
    sb.append("    lorawan: ").append(toIndentedString(lorawan)).append("\n");
    sb.append("    lorawanSince: ").append(toIndentedString(lorawanSince)).append("\n");
    sb.append("    nwGeoloc: ").append(toIndentedString(nwGeoloc)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }

}