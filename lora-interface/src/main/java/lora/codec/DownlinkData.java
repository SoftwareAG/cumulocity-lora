package lora.codec;

public class DownlinkData {
	private String devEui;
	private Integer fport;
	private String payload;
	public DownlinkData() {}
	public DownlinkData(String devEui, Integer fport, String payload) {
		super();
		this.devEui = devEui;
		this.fport = fport;
		this.payload = payload;
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
	@Override
	public String toString() {
		return "DownlinkData [devEui=" + devEui + ", fport=" + fport + ", payload=" + payload + "]";
	}
}
