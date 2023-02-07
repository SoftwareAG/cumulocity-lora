package lora.ns.objenious.rest;

import java.time.OffsetDateTime;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * DownlinkCreate
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class DownlinkCreate {
  @JsonProperty("command_id")
  private Integer commandId = null;

  @JsonProperty("cleartext")
  private String cleartext = null;

  @JsonProperty("encrypted")
  private String encrypted = null;

  @JsonProperty("fcntdown")
  private Integer fcntdown = null;

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

  public DownlinkCreate commandId(Integer commandId) {
    this.commandId = commandId;
    return this;
  }

  /**
   * The command id (optional); if not set, a command_id will be generated.
   * 
   * @return commandId
   **/

  public Integer getCommandId() {
    return commandId;
  }

  public void setCommandId(Integer commandId) {
    this.commandId = commandId;
  }

  public DownlinkCreate cleartext(String cleartext) {
    this.cleartext = cleartext;
    return this;
  }

  /**
   * The cleartext payload (hexadecimal); it will be encrypted by the platform.
   * Either cleartext or encrypted must be set.
   * 
   * @return cleartext
   **/

  public String getCleartext() {
    return cleartext;
  }

  public void setCleartext(String cleartext) {
    this.cleartext = cleartext;
  }

  public DownlinkCreate encrypted(String encrypted) {
    this.encrypted = encrypted;
    return this;
  }

  /**
   * The encrypted payload (hexadecimal); it will be sent as is. Either cleartext
   * or encrypted must be set.
   * 
   * @return encrypted
   **/

  public String getEncrypted() {
    return encrypted;
  }

  public void setEncrypted(String encrypted) {
    this.encrypted = encrypted;
  }

  public DownlinkCreate fcntdown(Integer fcntdown) {
    this.fcntdown = fcntdown;
    return this;
  }

  /**
   * If encrypted is set, fcntdown is mandatory.
   * 
   * @return fcntdown
   **/

  public Integer getFcntdown() {
    return fcntdown;
  }

  public void setFcntdown(Integer fcntdown) {
    this.fcntdown = fcntdown;
  }

  public DownlinkCreate confirmed(Boolean confirmed) {
    this.confirmed = confirmed;
    return this;
  }

  /**
   * If set to true, the device will confirm that the downlink has been received.
   * 
   * @return confirmed
   **/

  public Boolean isConfirmed() {
    return confirmed;
  }

  public void setConfirmed(Boolean confirmed) {
    this.confirmed = confirmed;
  }

  public DownlinkCreate validUntil(ValidUntilEnum validUntil) {
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

  public DownlinkCreate expiration(OffsetDateTime expiration) {
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

  public DownlinkCreate protocolData(DownlinkCreateProtocolData protocolData) {
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

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DownlinkCreate downlinkCreate = (DownlinkCreate) o;
    return Objects.equals(this.commandId, downlinkCreate.commandId) &&
        Objects.equals(this.cleartext, downlinkCreate.cleartext) &&
        Objects.equals(this.encrypted, downlinkCreate.encrypted) &&
        Objects.equals(this.fcntdown, downlinkCreate.fcntdown) &&
        Objects.equals(this.confirmed, downlinkCreate.confirmed) &&
        Objects.equals(this.validUntil, downlinkCreate.validUntil) &&
        Objects.equals(this.expiration, downlinkCreate.expiration) &&
        Objects.equals(this.protocolData, downlinkCreate.protocolData);
  }

  @Override
  public int hashCode() {
    return Objects.hash(commandId, cleartext, encrypted, fcntdown, confirmed, validUntil, expiration, protocolData);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DownlinkCreate {\n");

    sb.append("    commandId: ").append(toIndentedString(commandId)).append("\n");
    sb.append("    cleartext: ").append(toIndentedString(cleartext)).append("\n");
    sb.append("    encrypted: ").append(toIndentedString(encrypted)).append("\n");
    sb.append("    fcntdown: ").append(toIndentedString(fcntdown)).append("\n");
    sb.append("    confirmed: ").append(toIndentedString(confirmed)).append("\n");
    sb.append("    validUntil: ").append(toIndentedString(validUntil)).append("\n");
    sb.append("    expiration: ").append(toIndentedString(expiration)).append("\n");
    sb.append("    protocolData: ").append(toIndentedString(protocolData)).append("\n");
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
