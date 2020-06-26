package lora.ns.orbiwise.rest.model;

import java.math.BigDecimal;

public class DeviceCreate {
	private String deveui;
	private String appeui;
	private String appkey;
	private BigDecimal latitude;
	private BigDecimal longitude;

	public String getDeveui() {
		return deveui;
	}
	public void setDeveui(String deveui) {
		this.deveui = deveui;
	}
	public String getAppeui() {
		return appeui;
	}
	public void setAppeui(String appeui) {
		this.appeui = appeui;
	}
	public String getAppkey() {
		return appkey;
	}
	public void setAppkey(String appkey) {
		this.appkey = appkey;
	}
	public BigDecimal getLatitude() {
		return latitude;
	}
	public void setLatitude(BigDecimal latitude) {
		this.latitude = latitude;
	}
	public BigDecimal getLongitude() {
		return longitude;
	}
	public void setLongitude(BigDecimal longitude) {
		this.longitude = longitude;
	}
}
