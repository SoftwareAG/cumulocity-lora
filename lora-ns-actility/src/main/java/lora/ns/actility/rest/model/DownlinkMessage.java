package lora.ns.actility.rest.model;

public class DownlinkMessage {
    private String payloadHex;
    private String targetPorts;
    private SecurityParams securityParams;
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
    public SecurityParams getSecurityParams() {
        return securityParams;
    }
    public void setSecurityParams(SecurityParams securityParams) {
        this.securityParams = securityParams;
    }
}
