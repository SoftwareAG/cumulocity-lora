package lora.ns.actility.api.model.appserver;

public class DownlinkSecurity {
    public DownlinkSecurity(String asID, String downlinkAsKey) {
        this.asID = asID;
        this.downlinkAsKey = downlinkAsKey;
    }

    public DownlinkSecurity() {
    }

    private String asID;
    private String downlinkAsKey;
    private Integer maxTimestampDeviation;
    private String status = "DOWNLINK_AS_KEY";

    public String getAsID() {
        return asID;
    }

    public void setAsID(String asID) {
        this.asID = asID;
    }

    public String getDownlinkAsKey() {
        return downlinkAsKey;
    }

    public void setDownlinkAsKey(String downlinkAsKey) {
        this.downlinkAsKey = downlinkAsKey;
    }

    public Integer getMaxTimestampDeviation() {
        return maxTimestampDeviation;
    }

    public void setMaxTimestampDeviation(Integer maxTimestampDeviation) {
        this.maxTimestampDeviation = maxTimestampDeviation;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
