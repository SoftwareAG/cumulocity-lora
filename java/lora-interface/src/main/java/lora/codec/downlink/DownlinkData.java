package lora.codec.downlink;

public class DownlinkData {
	private String devEui;
	private Integer fport;
	private String payload;
	private boolean skipDownlink;
	public DownlinkData() {}
	public DownlinkData(String devEui, Integer fport, String payload) {
		super();
		this.devEui = devEui;
		this.fport = fport;
		this.payload = payload;
		this.setSkipDownlink(false);
	}
	public Integer getFport() {
		return fport;
	}
	public void setFport(Integer fport) {
		this.fport = fport;
	}
	public String getPayload() {
		return payload;
	}
	public void setPayload(String payload) {
		this.payload = payload;
	}
	public String getDevEui() {
		return devEui;
	}
	public void setDevEui(String devEui) {
		this.devEui = devEui;
	}
	public boolean isSkipDownlink() {
		return skipDownlink;
	}
	public void setSkipDownlink(boolean skipDownlink) {
		this.skipDownlink = skipDownlink;
	}
	@Override
	public String toString() {
		return "DownlinkData [devEui=" + devEui + ", fport=" + fport + ", payload=" + payload + ", skipDownlink=" + skipDownlink+ "]";
	}
}
