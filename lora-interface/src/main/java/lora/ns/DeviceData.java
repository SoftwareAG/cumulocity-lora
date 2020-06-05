package lora.ns;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;

public class DeviceData {
	private String deviceName;
	private String devEui;
	private String codec;
	private String model;
	private int fPort;
	private List<MeasurementRepresentation> measurements = new ArrayList<>();
	private BigDecimal lat;
	private BigDecimal lng;
	private byte[] payload;
	private Long dateTime;
	public DeviceData(String deviceName, String devEui, String codec, String model, int fPort, byte[] payload, Long dateTime, List<MeasurementRepresentation> measurements, BigDecimal lat, BigDecimal lng) {
		super();
		this.deviceName = deviceName;
		this.devEui = devEui;
		this.codec = codec;
		this.model = model;
		this.fPort = fPort;
		this.measurements = measurements;
		this.lat = lat;
		this.lng = lng;
		this.payload = payload;
		this.dateTime = dateTime;
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
	public String getDevEui() {
		return devEui;
	}
	public void setDevEui(String devEui) {
		this.devEui = devEui;
	}
	public int getfPort() {
		return fPort;
	}
	public void setfPort(int fPort) {
		this.fPort = fPort;
	}
	public byte[] getPayload() {
		return payload;
	}
	public void setPayload(byte[] payload) {
		this.payload = payload;
	}
	public Long getDateTime() {
		return dateTime;
	}
	public void setDateTime(Long dateTime) {
		this.dateTime = dateTime;
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
	public List<MeasurementRepresentation> getMeasurements() {
		return measurements;
	}
	public String getDeviceName() {
		return deviceName;
	}
	public void setDeviceName(String name) {
		this.deviceName = name;
	}
}
