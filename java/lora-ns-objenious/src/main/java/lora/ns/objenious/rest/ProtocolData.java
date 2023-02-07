package lora.ns.objenious.rest;

import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Protocol specific data.
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class ProtocolData {
  @JsonProperty("deveui")
  private String deveui = null;

  @JsonProperty("appeui")
  private String appeui = null;

  @JsonProperty("appnonce")
  private String appnonce = null;

  @JsonProperty("devnonce")
  private String devnonce = null;

  @JsonProperty("devaddr")
  private String devaddr = null;

  @JsonProperty("netid")
  private String netid = null;

  @JsonProperty("sf")
  private Integer sf = null;

  @JsonProperty("rssi")
  private Double rssi = null;

  @JsonProperty("snr")
  private Double snr = null;

  @JsonProperty("best_gateway_id")
  private String bestGatewayId = null;

  @JsonProperty("gateways")
  private Integer gateways = null;

  @JsonProperty("signal")
  private Double signal = null;

  @JsonProperty("noise")
  private Double noise = null;

  @JsonProperty("port")
  private Integer port = null;

  public ProtocolData deveui(String deveui) {
    this.deveui = deveui;
    return this;
  }

  /**
   * deveui (hexadecimal format, bigendian) (LoRa devices)
   * 
   * @return deveui
   **/

  public String getDeveui() {
    return deveui;
  }

  public void setDeveui(String deveui) {
    this.deveui = deveui;
  }

  public ProtocolData appeui(String appeui) {
    this.appeui = appeui;
    return this;
  }

  /**
   * appeui (hexadecimal format, bigendian) (LoRa devices)
   * 
   * @return appeui
   **/

  public String getAppeui() {
    return appeui;
  }

  public void setAppeui(String appeui) {
    this.appeui = appeui;
  }

  public ProtocolData appnonce(String appnonce) {
    this.appnonce = appnonce;
    return this;
  }

  /**
   * AppNonce in hexadecimal/bigendian (LoRa)
   * 
   * @return appnonce
   **/

  public String getAppnonce() {
    return appnonce;
  }

  public void setAppnonce(String appnonce) {
    this.appnonce = appnonce;
  }

  public ProtocolData devnonce(String devnonce) {
    this.devnonce = devnonce;
    return this;
  }

  /**
   * DevNonce in hexadecimal/bigendian (LoRa)
   * 
   * @return devnonce
   **/

  public String getDevnonce() {
    return devnonce;
  }

  public void setDevnonce(String devnonce) {
    this.devnonce = devnonce;
  }

  public ProtocolData devaddr(String devaddr) {
    this.devaddr = devaddr;
    return this;
  }

  /**
   * DevAddr in hexadecimal/bigendian (LoRa)
   * 
   * @return devaddr
   **/

  public String getDevaddr() {
    return devaddr;
  }

  public void setDevaddr(String devaddr) {
    this.devaddr = devaddr;
  }

  public ProtocolData netid(String netid) {
    this.netid = netid;
    return this;
  }

  /**
   * NetID in hexadecimal/bigendian (LoRa)
   * 
   * @return netid
   **/

  public String getNetid() {
    return netid;
  }

  public void setNetid(String netid) {
    this.netid = netid;
  }

  public ProtocolData sf(Integer sf) {
    this.sf = sf;
    return this;
  }

  /**
   * spreading factor (LoRa)
   * 
   * @return sf
   **/

  public Integer getSf() {
    return sf;
  }

  public void setSf(Integer sf) {
    this.sf = sf;
  }

  public ProtocolData rssi(Double rssi) {
    this.rssi = rssi;
    return this;
  }

  /**
   * Rssi (LoRa)
   * 
   * @return rssi
   **/

  public Double getRssi() {
    return rssi;
  }

  public void setRssi(Double rssi) {
    this.rssi = rssi;
  }

  public ProtocolData snr(Double snr) {
    this.snr = snr;
    return this;
  }

  /**
   * Snr (LoRa)
   * 
   * @return snr
   **/

  public Double getSnr() {
    return snr;
  }

  public void setSnr(Double snr) {
    this.snr = snr;
  }

  public ProtocolData bestGatewayId(String bestGatewayId) {
    this.bestGatewayId = bestGatewayId;
    return this;
  }

  /**
   * Identifier of the gateway which has the best SNR
   * 
   * @return bestGatewayId
   **/

  public String getBestGatewayId() {
    return bestGatewayId;
  }

  public void setBestGatewayId(String bestGatewayId) {
    this.bestGatewayId = bestGatewayId;
  }

  public ProtocolData gateways(Integer gateways) {
    this.gateways = gateways;
    return this;
  }

  /**
   * Number of gateways (LoRa)
   * minimum: 0
   * 
   * @return gateways
   **/

  public Integer getGateways() {
    return gateways;
  }

  public void setGateways(Integer gateways) {
    this.gateways = gateways;
  }

  public ProtocolData signal(Double signal) {
    this.signal = signal;
    return this;
  }

  /**
   * Signal (LoRa)
   * 
   * @return signal
   **/

  public Double getSignal() {
    return signal;
  }

  public void setSignal(Double signal) {
    this.signal = signal;
  }

  public ProtocolData noise(Double noise) {
    this.noise = noise;
    return this;
  }

  /**
   * Noise (LoRa)
   * 
   * @return noise
   **/

  public Double getNoise() {
    return noise;
  }

  public void setNoise(Double noise) {
    this.noise = noise;
  }

  public ProtocolData port(Integer port) {
    this.port = port;
    return this;
  }

  /**
   * the port the message was sent to (LoRa)
   * minimum: 1
   * maximum: 223
   * 
   * @return port
   **/

  public Integer getPort() {
    return port;
  }

  public void setPort(Integer port) {
    this.port = port;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ProtocolData protocolData = (ProtocolData) o;
    return Objects.equals(this.deveui, protocolData.deveui) &&
        Objects.equals(this.appeui, protocolData.appeui) &&
        Objects.equals(this.appnonce, protocolData.appnonce) &&
        Objects.equals(this.devnonce, protocolData.devnonce) &&
        Objects.equals(this.devaddr, protocolData.devaddr) &&
        Objects.equals(this.netid, protocolData.netid) &&
        Objects.equals(this.sf, protocolData.sf) &&
        Objects.equals(this.rssi, protocolData.rssi) &&
        Objects.equals(this.snr, protocolData.snr) &&
        Objects.equals(this.bestGatewayId, protocolData.bestGatewayId) &&
        Objects.equals(this.gateways, protocolData.gateways) &&
        Objects.equals(this.signal, protocolData.signal) &&
        Objects.equals(this.noise, protocolData.noise) &&
        Objects.equals(this.port, protocolData.port);
  }

  @Override
  public int hashCode() {
    return Objects.hash(deveui, appeui, appnonce, devnonce, devaddr, netid, sf, rssi, snr, bestGatewayId, gateways,
        signal, noise, port);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ProtocolData {\n");

    sb.append("    deveui: ").append(toIndentedString(deveui)).append("\n");
    sb.append("    appeui: ").append(toIndentedString(appeui)).append("\n");
    sb.append("    appnonce: ").append(toIndentedString(appnonce)).append("\n");
    sb.append("    devnonce: ").append(toIndentedString(devnonce)).append("\n");
    sb.append("    devaddr: ").append(toIndentedString(devaddr)).append("\n");
    sb.append("    netid: ").append(toIndentedString(netid)).append("\n");
    sb.append("    sf: ").append(toIndentedString(sf)).append("\n");
    sb.append("    rssi: ").append(toIndentedString(rssi)).append("\n");
    sb.append("    snr: ").append(toIndentedString(snr)).append("\n");
    sb.append("    bestGatewayId: ").append(toIndentedString(bestGatewayId)).append("\n");
    sb.append("    gateways: ").append(toIndentedString(gateways)).append("\n");
    sb.append("    signal: ").append(toIndentedString(signal)).append("\n");
    sb.append("    noise: ").append(toIndentedString(noise)).append("\n");
    sb.append("    port: ").append(toIndentedString(port)).append("\n");
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
