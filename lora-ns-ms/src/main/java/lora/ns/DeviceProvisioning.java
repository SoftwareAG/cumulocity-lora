package lora.ns;

import java.math.BigDecimal;

public class DeviceProvisioning {
	private String name;
	private String devEUI;
	private String appEUI;
	private String appKey;
	private String codec;
	private String model;
	private BigDecimal lat;
	private BigDecimal lng;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDevEUI() {
		return devEUI;
	}
	public void setDevEUI(String devEUI) {
		this.devEUI = devEUI;
	}
	public String getAppEUI() {
		return appEUI;
	}
	public void setAppEUI(String appEUI) {
		this.appEUI = appEUI;
	}
	public String getAppKey() {
		return appKey;
	}
	public void setAppKey(String appKey) {
		this.appKey = appKey;
	}
	public BigDecimal getLat() {
		return lat;
	}
	public void setLat(BigDecimal lat) {
		this.lat = lat;
	}
	public BigDecimal getLng() {
		return lng;
	}
	public void setLng(BigDecimal lng) {
		this.lng = lng;
	}
	public String getCodec() {
		return codec;
	}
	public void setCodec(String codec) {
		this.codec = codec;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
}
