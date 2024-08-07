/*
 * ThingPark things management Networks API
 * REST interface for networks management. 
 *
 * The version of the OpenAPI document: 7.3
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

package lora.ns.actility.api.model.basestation;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * BsBriefInt
 */

@Data
@EqualsAndHashCode
public class BsBriefInt {

  private Integer avgRoundTrip;

  private String ip;

  private String name;

  public static final String JSON_PROPERTY_RX_AVG_RATE = "rxAvgRate";
  private Integer rxAvgRate;

  public static final String JSON_PROPERTY_TX_AVG_RATE = "txAvgRate";
  private Integer txAvgRate;

  /**
   * Interface type
   */
  public enum TypeEnum {
    ETHERNET("ETHERNET"),

    GPRS("GPRS"),

    WLAN("WLAN");

    private String value;

    TypeEnum(String value) {
      this.value = value;
    }

    @JsonValue
    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static TypeEnum fromValue(String value) {
      for (TypeEnum b : TypeEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }
  }

  protected TypeEnum type;

  private Integer state;

  /**
   * Cellular connection type
   */
  public enum ConnectionTypeEnum {
    _3G("3G"),

    _4G("4G");

    private String value;

    ConnectionTypeEnum(String value) {
      this.value = value;
    }

    @JsonValue
    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static ConnectionTypeEnum fromValue(String value) {
      for (ConnectionTypeEnum b : ConnectionTypeEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }
  }

  private ConnectionTypeEnum connectionType;

  private String iccid;

  private String imei;

  private String imsi;

  private String networkOperator;

  private Float rssi;

  private Float rscp;

  private Float ecIo;

  private Float rsrp;

  private Float rsrq;

  private Float sinr;

  private String ssid;
}
