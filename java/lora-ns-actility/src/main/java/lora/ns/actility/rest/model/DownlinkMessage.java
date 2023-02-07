package lora.ns.actility.rest.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DownlinkMessage {
    private String payloadHex;
    private String targetPorts;
    private MessageSecurityParams securityParams;
    public String getPayloadHex() {
        return payloadHex;
    }
    public void setPayloadHex(String payloadHex) {
        this.payloadHex = payloadHex;
    }
    public String getTargetPorts() {
        return targetPorts;
    }
    public void setTargetPorts(String targetPorts) {
        this.targetPorts = targetPorts;
    }
    public MessageSecurityParams getSecurityParams() {
        return securityParams;
    }
    public void setSecurityParams(MessageSecurityParams securityParams) {
        this.securityParams = securityParams;
    }
}
