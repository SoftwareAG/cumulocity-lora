package lora.ns.objenious.rest;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Message
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class Message {
  @JsonProperty("id")
  private String id = null;

  /**
   * Type of message (join, uplink, downlink, external)
   */
  public enum TypeEnum {
    JOIN("join"),

    UPLINK("uplink"),

    DOWNLINK("downlink"),

    EXTERNAL("external");

    private String value;

    TypeEnum(String value) {
      this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static TypeEnum fromValue(String text) {
      for (TypeEnum b : TypeEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }

  @JsonProperty("type")
  private TypeEnum type = null;

  @JsonProperty("timestamp")
  private OffsetDateTime timestamp = null;

  @JsonProperty("count")
  private Integer count = null;

  @JsonProperty("payload_encrypted")
  private String payloadEncrypted = null;

  @JsonProperty("payload_cleartext")
  private String payloadCleartext = null;

  @JsonProperty("payload")
  private List<MessagePayload> payload = null;

  @JsonProperty("protocol_data")
  private ProtocolData protocolData = null;

  @JsonProperty("command_id")
  private Integer commandId = null;

  @JsonProperty("delivered_at")
  private OffsetDateTime deliveredAt = null;

  @JsonProperty("error")
  private String error = null;

  @JsonProperty("lat")
  private Double lat = null;

  @JsonProperty("lng")
  private Double lng = null;

  /**
   * Geolocation type (uplink)
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

  @JsonProperty("mac_command")
  private MacCommand macCommand = null;

  public Message id(String id) {
    this.id = id;
    return this;
  }

  /**
   * Message identifier
   * 
   * @return id
   **/

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public Message type(TypeEnum type) {
    this.type = type;
    return this;
  }

  /**
   * Type of message (join, uplink, downlink, external)
   * 
   * @return type
   **/

  public TypeEnum getType() {
    return type;
  }

  public void setType(TypeEnum type) {
    this.type = type;
  }

  public Message timestamp(OffsetDateTime timestamp) {
    this.timestamp = timestamp;
    return this;
  }

  /**
   * Date of message
   * 
   * @return timestamp
   **/

  public OffsetDateTime getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(OffsetDateTime timestamp) {
    this.timestamp = timestamp;
  }

  public Message count(Integer count) {
    this.count = count;
    return this;
  }

  /**
   * The uplink/downlink counter (uplink/downlink)
   * 
   * @return count
   **/

  public Integer getCount() {
    return count;
  }

  public void setCount(Integer count) {
    this.count = count;
  }

  public Message payloadEncrypted(String payloadEncrypted) {
    this.payloadEncrypted = payloadEncrypted;
    return this;
  }

  /**
   * The encrypted payload, hexadecimal (uplink)
   * 
   * @return payloadEncrypted
   **/

  public String getPayloadEncrypted() {
    return payloadEncrypted;
  }

  public void setPayloadEncrypted(String payloadEncrypted) {
    this.payloadEncrypted = payloadEncrypted;
  }

  public Message payloadCleartext(String payloadCleartext) {
    this.payloadCleartext = payloadCleartext;
    return this;
  }

  /**
   * The cleartext payload, hexadecimal (uplink)
   * 
   * @return payloadCleartext
   **/

  public String getPayloadCleartext() {
    return payloadCleartext;
  }

  public void setPayloadCleartext(String payloadCleartext) {
    this.payloadCleartext = payloadCleartext;
  }

  public Message payload(List<MessagePayload> payload) {
    this.payload = payload;
    return this;
  }

  public Message addPayloadItem(MessagePayload payloadItem) {
    if (this.payload == null) {
      this.payload = new ArrayList<MessagePayload>();
    }
    this.payload.add(payloadItem);
    return this;
  }

  /**
   * decoded payload values (uplink)
   * 
   * @return payload
   **/

  public List<MessagePayload> getPayload() {
    return payload;
  }

  public void setPayload(List<MessagePayload> payload) {
    this.payload = payload;
  }

  public Message protocolData(ProtocolData protocolData) {
    this.protocolData = protocolData;
    return this;
  }

  /**
   * Get protocolData
   * 
   * @return protocolData
   **/

  public ProtocolData getProtocolData() {
    return protocolData;
  }

  public void setProtocolData(ProtocolData protocolData) {
    this.protocolData = protocolData;
  }

  public Message commandId(Integer commandId) {
    this.commandId = commandId;
    return this;
  }

  /**
   * The command id (downlink)
   * 
   * @return commandId
   **/

  public Integer getCommandId() {
    return commandId;
  }

  public void setCommandId(Integer commandId) {
    this.commandId = commandId;
  }

  public Message deliveredAt(OffsetDateTime deliveredAt) {
    this.deliveredAt = deliveredAt;
    return this;
  }

  /**
   * Date the downlink was sent (downlink)
   * 
   * @return deliveredAt
   **/

  public OffsetDateTime getDeliveredAt() {
    return deliveredAt;
  }

  public void setDeliveredAt(OffsetDateTime deliveredAt) {
    this.deliveredAt = deliveredAt;
  }

  public Message error(String error) {
    this.error = error;
    return this;
  }

  /**
   * The error message in case of an error (join/downlink)
   * 
   * @return error
   **/

  public String getError() {
    return error;
  }

  public void setError(String error) {
    this.error = error;
  }

  public Message lat(Double lat) {
    this.lat = lat;
    return this;
  }

  /**
   * Device latitude (if device has been located - join/uplink)
   * 
   * @return lat
   **/

  public Double getLat() {
    return lat;
  }

  public void setLat(Double lat) {
    this.lat = lat;
  }

  public Message lng(Double lng) {
    this.lng = lng;
    return this;
  }

  /**
   * Device longitude (if device has been located - join/uplink)
   * 
   * @return lng
   **/

  public Double getLng() {
    return lng;
  }

  public void setLng(Double lng) {
    this.lng = lng;
  }

  public Message geolocationType(GeolocationTypeEnum geolocationType) {
    this.geolocationType = geolocationType;
    return this;
  }

  /**
   * Geolocation type (uplink)
   * 
   * @return geolocationType
   **/

  public GeolocationTypeEnum getGeolocationType() {
    return geolocationType;
  }

  public void setGeolocationType(GeolocationTypeEnum geolocationType) {
    this.geolocationType = geolocationType;
  }

  public Message macCommand(MacCommand macCommand) {
    this.macCommand = macCommand;
    return this;
  }

  /**
   * Get macCommand
   * 
   * @return macCommand
   **/

  public MacCommand getMacCommand() {
    return macCommand;
  }

  public void setMacCommand(MacCommand macCommand) {
    this.macCommand = macCommand;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Message message = (Message) o;
    return Objects.equals(this.id, message.id) &&
        Objects.equals(this.type, message.type) &&
        Objects.equals(this.timestamp, message.timestamp) &&
        Objects.equals(this.count, message.count) &&
        Objects.equals(this.payloadEncrypted, message.payloadEncrypted) &&
        Objects.equals(this.payloadCleartext, message.payloadCleartext) &&
        Objects.equals(this.payload, message.payload) &&
        Objects.equals(this.protocolData, message.protocolData) &&
        Objects.equals(this.commandId, message.commandId) &&
        Objects.equals(this.deliveredAt, message.deliveredAt) &&
        Objects.equals(this.error, message.error) &&
        Objects.equals(this.lat, message.lat) &&
        Objects.equals(this.lng, message.lng) &&
        Objects.equals(this.geolocationType, message.geolocationType) &&
        Objects.equals(this.macCommand, message.macCommand);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, type, timestamp, count, payloadEncrypted, payloadCleartext, payload, protocolData,
        commandId, deliveredAt, error, lat, lng, geolocationType, macCommand);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Message {\n");

    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    type: ").append(toIndentedString(type)).append("\n");
    sb.append("    timestamp: ").append(toIndentedString(timestamp)).append("\n");
    sb.append("    count: ").append(toIndentedString(count)).append("\n");
    sb.append("    payloadEncrypted: ").append(toIndentedString(payloadEncrypted)).append("\n");
    sb.append("    payloadCleartext: ").append(toIndentedString(payloadCleartext)).append("\n");
    sb.append("    payload: ").append(toIndentedString(payload)).append("\n");
    sb.append("    protocolData: ").append(toIndentedString(protocolData)).append("\n");
    sb.append("    commandId: ").append(toIndentedString(commandId)).append("\n");
    sb.append("    deliveredAt: ").append(toIndentedString(deliveredAt)).append("\n");
    sb.append("    error: ").append(toIndentedString(error)).append("\n");
    sb.append("    lat: ").append(toIndentedString(lat)).append("\n");
    sb.append("    lng: ").append(toIndentedString(lng)).append("\n");
    sb.append("    geolocationType: ").append(toIndentedString(geolocationType)).append("\n");
    sb.append("    macCommand: ").append(toIndentedString(macCommand)).append("\n");
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
