package lora.ns.orbiwise.rest.model;

import java.math.BigDecimal;

public class DeviceCreate {
	private String deveui;
	private String appeui;
	private String appkey;
	private Integer lora_device_class = 0;
	private Boolean lora_fcnt_32bit = false;
	private String lora_rx2_sf = "SF12";
	private BigDecimal latitude = BigDecimal.valueOf(0);
	private BigDecimal longitude = BigDecimal.valueOf(0);

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

	public Integer getLora_device_class() {
		return lora_device_class;
	}

	public void setLora_device_class(Integer lora_device_class) {
		this.lora_device_class = lora_device_class;
	}

	public Boolean getLora_fcnt_32bit() {
		return lora_fcnt_32bit;
	}

	public void setLora_fcnt_32bit(Boolean lora_fcnt_32bit) {
		this.lora_fcnt_32bit = lora_fcnt_32bit;
	}

	public String getLora_rx2_sf() {
		return lora_rx2_sf;
	}

	public void setLora_rx2_sf(String lora_rx2_sf) {
		this.lora_rx2_sf = lora_rx2_sf;
	}
}
