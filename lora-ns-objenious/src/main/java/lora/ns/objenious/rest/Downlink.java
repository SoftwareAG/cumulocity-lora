package lora.ns.objenious.rest;

import java.time.OffsetDateTime;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Downlink
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class Downlink {
  @JsonProperty("command_id")
  private Integer commandId = null;

  @JsonProperty("cleartext")
  private String cleartext = null;

  @JsonProperty("encrypted")
  private String encrypted = null;

  @JsonProperty("confirmed")
  private Boolean confirmed = null;

  /**
   * The validity of the downlink. Possible values are \"next_join\" (the downlink
   * will be canceled if the devices re-joins, mandatory for encrypted downlink)
   * and \"expiration\" (default - the downlink will be retried if the device
   * re-joins).
   */
  public enum ValidUntilEnum {
    NEXT_JOIN("next_join"),

    EXPIRATION("expiration");

    private String value;

    ValidUntilEnum(String value) {
      this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static ValidUntilEnum fromValue(String text) {
      for (ValidUntilEnum b : ValidUntilEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }

  @JsonProperty("valid_until")
  private ValidUntilEnum validUntil = null;

  @JsonProperty("expiration")
  private OffsetDateTime expiration = null;

  @JsonProperty("protocol_data")
  private DownlinkCreateProtocolData protocolData = null;

  /**
   * Status of the downlink
   */
  public enum StatusEnum {
    QUEUED("queued"),

    SENT("sent"),

    ERROR("error"),

    RETRYING("retrying"),

    CANCELED("canceled"),

    TIMEOUT("timeout"),

    CONFIRMED("confirmed"),

    SENDING("sending");

    private String value;

    StatusEnum(String value) {
      this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static StatusEnum fromValue(String text) {
      for (StatusEnum b : StatusEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }

  @JsonProperty("status")
  private StatusEnum status = null;

  /**
   * Error of the downlink
   */
  public enum ErrorMsgEnum {
    BADPARAMETERFORMAT("BadParameterFormat"),

    MISSINGPARAMETER("MissingParameter"),

    FPORT_OUTOFRANGE("FPort_OutOfRange"),

    FRMPAYLOAD_TOOLARGE("FRMPayload_TooLarge"),

    EXPIRATIONDATE_OUTOFRANGE("ExpirationDate_OutOfRange"),

    DEVADDR_BADVALUE("DevAddr_BadValue"),

    FCNTDOWN_BADVALUE("FCntDown_BadValue"),

    UNKNOWNDEVICE("UnknownDevice"),

    TIMEOUT("Timeout"),

    CANCELED("Canceled"),

    LNSINTERNALERROR("LNSInternalError"),

    INVALIDMIC("InvalidMIC"),

    NOAVAILABLEDLRESOURCE("NoAvailableDLResource");

    private String value;

    ErrorMsgEnum(String value) {
      this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static ErrorMsgEnum fromValue(String text) {
      for (ErrorMsgEnum b : ErrorMsgEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }

  @JsonProperty("error_msg")
  private ErrorMsgEnum errorMsg = null;

  @JsonProperty("created_at")
  private OffsetDateTime createdAt = null;

  @JsonProperty("dequeued_at")
  private OffsetDateTime dequeuedAt = null;

  @JsonProperty("delivered_at")
  private OffsetDateTime deliveredAt = null;

  public Downlink commandId(Integer commandId) {
    this.commandId = commandId;
    return this;
  }

  /**
   * The command id
   * 
   * @return commandId
   **/

  public Integer getCommandId() {
    return commandId;
  }

  public void setCommandId(Integer commandId) {
    this.commandId = commandId;
  }

  public Downlink cleartext(String cleartext) {
    this.cleartext = cleartext;
    return this;
  }

  /**
   * The cleartext payload (hexadecimal);
   * 
   * @return cleartext
   **/

  public String getCleartext() {
    return cleartext;
  }

  public void setCleartext(String cleartext) {
    this.cleartext = cleartext;
  }

  public Downlink encrypted(String encrypted) {
    this.encrypted = encrypted;
    return this;
  }

  /**
   * The encrypted payload (hexadecimal);
   * 
   * @return encrypted
   **/

  public String getEncrypted() {
    return encrypted;
  }

  public void setEncrypted(String encrypted) {
    this.encrypted = encrypted;
  }

  public Downlink confirmed(Boolean confirmed) {
    this.confirmed = confirmed;
    return this;
  }

  /**
   * If set to true, the device confirmed that the downlink has been received.
   * 
   * @return confirmed
   **/

  public Boolean isConfirmed() {
    return confirmed;
  }

  public void setConfirmed(Boolean confirmed) {
    this.confirmed = confirmed;
  }

  public Downlink validUntil(ValidUntilEnum validUntil) {
    this.validUntil = validUntil;
    return this;
  }

  /**
   * The validity of the downlink. Possible values are \"next_join\" (the downlink
   * will be canceled if the devices re-joins, mandatory for encrypted downlink)
   * and \"expiration\" (default - the downlink will be retried if the device
   * re-joins).
   * 
   * @return validUntil
   **/

  public ValidUntilEnum getValidUntil() {
    return validUntil;
  }

  public void setValidUntil(ValidUntilEnum validUntil) {
    this.validUntil = validUntil;
  }

  public Downlink expiration(OffsetDateTime expiration) {
    this.expiration = expiration;
    return this;
  }

  /**
   * The expiration date of the downlink.
   * 
   * @return expiration
   **/

  public OffsetDateTime getExpiration() {
    return expiration;
  }

  public void setExpiration(OffsetDateTime expiration) {
    this.expiration = expiration;
  }

  public Downlink protocolData(DownlinkCreateProtocolData protocolData) {
    this.protocolData = protocolData;
    return this;
  }

  /**
   * Get protocolData
   * 
   * @return protocolData
   **/

  public DownlinkCreateProtocolData getProtocolData() {
    return protocolData;
  }

  public void setProtocolData(DownlinkCreateProtocolData protocolData) {
    this.protocolData = protocolData;
  }

  public Downlink status(StatusEnum status) {
    this.status = status;
    return this;
  }

  /**
   * Status of the downlink
   * 
   * @return status
   **/

  public StatusEnum getStatus() {
    return status;
  }

  public void setStatus(StatusEnum status) {
    this.status = status;
  }

  public Downlink errorMsg(ErrorMsgEnum errorMsg) {
    this.errorMsg = errorMsg;
    return this;
  }

  /**
   * Error of the downlink
   * 
   * @return errorMsg
   **/

  public ErrorMsgEnum getErrorMsg() {
    return errorMsg;
  }

  public void setErrorMsg(ErrorMsgEnum errorMsg) {
    this.errorMsg = errorMsg;
  }

  public Downlink createdAt(OffsetDateTime createdAt) {
    this.createdAt = createdAt;
    return this;
  }

  /**
   * Date of created downlink
   * 
   * @return createdAt
   **/

  public OffsetDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(OffsetDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public Downlink dequeuedAt(OffsetDateTime dequeuedAt) {
    this.dequeuedAt = dequeuedAt;
    return this;
  }

  /**
   * Date of dequeued downlink
   * 
   * @return dequeuedAt
   **/

  public OffsetDateTime getDequeuedAt() {
    return dequeuedAt;
  }

  public void setDequeuedAt(OffsetDateTime dequeuedAt) {
    this.dequeuedAt = dequeuedAt;
  }

  public Downlink deliveredAt(OffsetDateTime deliveredAt) {
    this.deliveredAt = deliveredAt;
    return this;
  }

  /**
   * Date of delivered downlink
   * 
   * @return deliveredAt
   **/

  public OffsetDateTime getDeliveredAt() {
    return deliveredAt;
  }

  public void setDeliveredAt(OffsetDateTime deliveredAt) {
    this.deliveredAt = deliveredAt;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Downlink downlink = (Downlink) o;
    return Objects.equals(this.commandId, downlink.commandId) &&
        Objects.equals(this.cleartext, downlink.cleartext) &&
        Objects.equals(this.encrypted, downlink.encrypted) &&
        Objects.equals(this.confirmed, downlink.confirmed) &&
        Objects.equals(this.validUntil, downlink.validUntil) &&
        Objects.equals(this.expiration, downlink.expiration) &&
        Objects.equals(this.protocolData, downlink.protocolData) &&
        Objects.equals(this.status, downlink.status) &&
        Objects.equals(this.errorMsg, downlink.errorMsg) &&
        Objects.equals(this.createdAt, downlink.createdAt) &&
        Objects.equals(this.dequeuedAt, downlink.dequeuedAt) &&
        Objects.equals(this.deliveredAt, downlink.deliveredAt);
  }

  @Override
  public int hashCode() {
    return Objects.hash(commandId, cleartext, encrypted, confirmed, validUntil, expiration, protocolData, status,
        errorMsg, createdAt, dequeuedAt, deliveredAt);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Downlink {\n");

    sb.append("    commandId: ").append(toIndentedString(commandId)).append("\n");
    sb.append("    cleartext: ").append(toIndentedString(cleartext)).append("\n");
    sb.append("    encrypted: ").append(toIndentedString(encrypted)).append("\n");
    sb.append("    confirmed: ").append(toIndentedString(confirmed)).append("\n");
    sb.append("    validUntil: ").append(toIndentedString(validUntil)).append("\n");
    sb.append("    expiration: ").append(toIndentedString(expiration)).append("\n");
    sb.append("    protocolData: ").append(toIndentedString(protocolData)).append("\n");
    sb.append("    status: ").append(toIndentedString(status)).append("\n");
    sb.append("    errorMsg: ").append(toIndentedString(errorMsg)).append("\n");
    sb.append("    createdAt: ").append(toIndentedString(createdAt)).append("\n");
    sb.append("    dequeuedAt: ").append(toIndentedString(dequeuedAt)).append("\n");
    sb.append("    deliveredAt: ").append(toIndentedString(deliveredAt)).append("\n");
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
