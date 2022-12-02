package lora.ns.objenious.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * MacCommandPayloadDecoded
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class MacCommandPayloadDecoded {
  @JsonProperty("channel_mask_control")
  private Integer channelMaskControl = null;

  @JsonProperty("channels")
  private List<Integer> channels = null;

  @JsonProperty("data_rate")
  private Integer dataRate = null;

  @JsonProperty("data_rate_eu")
  private String dataRateEu = null;

  @JsonProperty("nb_trans")
  private Integer nbTrans = null;

  @JsonProperty("tx_power")
  private Integer txPower = null;

  @JsonProperty("tx_power_eu")
  private String txPowerEu = null;

  public MacCommandPayloadDecoded channelMaskControl(Integer channelMaskControl) {
    this.channelMaskControl = channelMaskControl;
    return this;
  }

  /**
   * encodes the channels usable for uplink access. A bit in the ChMask field set
   * to 1 means that the corresponding channel can be used for uplink
   * transmissions if this channel allows the data rate currently used by the
   * end-device. A bit set to 0 means the corresponding channels should be
   * avoided.
   * 
   * @return channelMaskControl
   **/

  public Integer getChannelMaskControl() {
    return channelMaskControl;
  }

  public void setChannelMaskControl(Integer channelMaskControl) {
    this.channelMaskControl = channelMaskControl;
  }

  public MacCommandPayloadDecoded channels(List<Integer> channels) {
    this.channels = channels;
    return this;
  }

  public MacCommandPayloadDecoded addChannelsItem(Integer channelsItem) {
    if (this.channels == null) {
      this.channels = new ArrayList<Integer>();
    }
    this.channels.add(channelsItem);
    return this;
  }

  /**
   * array of channel
   * 
   * @return channels
   **/

  public List<Integer> getChannels() {
    return channels;
  }

  public void setChannels(List<Integer> channels) {
    this.channels = channels;
  }

  public MacCommandPayloadDecoded dataRate(Integer dataRate) {
    this.dataRate = dataRate;
    return this;
  }

  /**
   * spreading factor that will be used by the device (from SF7 or DR 5 to SF12 or
   * DR0).
   * 
   * @return dataRate
   **/

  public Integer getDataRate() {
    return dataRate;
  }

  public void setDataRate(Integer dataRate) {
    this.dataRate = dataRate;
  }

  public MacCommandPayloadDecoded dataRateEu(String dataRateEu) {
    this.dataRateEu = dataRateEu;
    return this;
  }

  /**
   * type of mac command (LoRa devices)
   * 
   * @return dataRateEu
   **/

  public String getDataRateEu() {
    return dataRateEu;
  }

  public void setDataRateEu(String dataRateEu) {
    this.dataRateEu = dataRateEu;
  }

  public MacCommandPayloadDecoded nbTrans(Integer nbTrans) {
    this.nbTrans = nbTrans;
    return this;
  }

  /**
   * number of transmissions for each uplink message. This applies only to
   * ―unconfirmed uplink frames. The default value is 1 corresponding to a single
   * transmission of each frame. The valid range is [1:15]. If NbTrans==0 is
   * received the end-device should use the default value. This field can be used
   * 21 by the network manager to control the redundancy of the node uplinks to
   * obtain a given Quality of Service.
   * 
   * @return nbTrans
   **/

  public Integer getNbTrans() {
    return nbTrans;
  }

  public void setNbTrans(Integer nbTrans) {
    this.nbTrans = nbTrans;
  }

  public MacCommandPayloadDecoded txPower(Integer txPower) {
    this.txPower = txPower;
    return this;
  }

  /**
   * transmission Power that will be used by the device.
   * 
   * @return txPower
   **/

  public Integer getTxPower() {
    return txPower;
  }

  public void setTxPower(Integer txPower) {
    this.txPower = txPower;
  }

  public MacCommandPayloadDecoded txPowerEu(String txPowerEu) {
    this.txPowerEu = txPowerEu;
    return this;
  }

  /**
   * type of mac command (LoRa devices)
   * 
   * @return txPowerEu
   **/

  public String getTxPowerEu() {
    return txPowerEu;
  }

  public void setTxPowerEu(String txPowerEu) {
    this.txPowerEu = txPowerEu;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    MacCommandPayloadDecoded macCommandPayloadDecoded = (MacCommandPayloadDecoded) o;
    return Objects.equals(this.channelMaskControl, macCommandPayloadDecoded.channelMaskControl) &&
        Objects.equals(this.channels, macCommandPayloadDecoded.channels) &&
        Objects.equals(this.dataRate, macCommandPayloadDecoded.dataRate) &&
        Objects.equals(this.dataRateEu, macCommandPayloadDecoded.dataRateEu) &&
        Objects.equals(this.nbTrans, macCommandPayloadDecoded.nbTrans) &&
        Objects.equals(this.txPower, macCommandPayloadDecoded.txPower) &&
        Objects.equals(this.txPowerEu, macCommandPayloadDecoded.txPowerEu);
  }

  @Override
  public int hashCode() {
    return Objects.hash(channelMaskControl, channels, dataRate, dataRateEu, nbTrans, txPower, txPowerEu);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class MacCommandPayloadDecoded {\n");

    sb.append("    channelMaskControl: ").append(toIndentedString(channelMaskControl)).append("\n");
    sb.append("    channels: ").append(toIndentedString(channels)).append("\n");
    sb.append("    dataRate: ").append(toIndentedString(dataRate)).append("\n");
    sb.append("    dataRateEu: ").append(toIndentedString(dataRateEu)).append("\n");
    sb.append("    nbTrans: ").append(toIndentedString(nbTrans)).append("\n");
    sb.append("    txPower: ").append(toIndentedString(txPower)).append("\n");
    sb.append("    txPowerEu: ").append(toIndentedString(txPowerEu)).append("\n");
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
