package lora.ns.actility.rest.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DownlinkMessage {
    private String payloadHex;
    private String targetPorts;
    private MessageSecurityParams securityParams;
    private String correlationID;

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

    public String getCorrelationID() {
        return correlationID;
    }

    public void setCorrelationID(String correlationID) {
        this.correlationID = correlationID;
    }
}
