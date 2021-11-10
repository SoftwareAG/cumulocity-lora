package lora.codec.uplink;

import com.google.common.io.BaseEncoding;

import lora.ns.DeviceData;

public class Decode {
	private String deveui;
	private int fPort;
	private String payload;
	private Long updateTime;
	private String model;

	public Decode() {
	};

	
	public String getModel() {
		return model;
	}


	public void setModel(String model) {
		this.model = model;
	}


	public Decode(String deveui, String model, int fPort, String payload, Long updateTime) {
		super();
		this.deveui = deveui;
		this.model = model;
		this.fPort = fPort;
		this.payload = payload;
		this.updateTime = updateTime;
	}

	public Decode(DeviceData event) {
		super();
		this.deveui = event.getDevEui();
		this.model = event.getModel();
		this.fPort = event.getfPort();
		this.payload = BaseEncoding.base16().encode(event.getPayload());
		this.updateTime = event.getDateTime();
	}

	public String getDeveui() {
		return deveui;
	}

	public int getfPort() {
		return fPort;
	}

	public String getPayload() {
		return payload;
	}

	public Long getUpdateTime() {
		return updateTime;
	}

	public void setDeveui(String deveui) {
		this.deveui = deveui;
	}

	public void setfPort(int fPort) {
		this.fPort = fPort;
	}

	public void setPayload(String payload) {
		this.payload = payload;
	}

	public void setUpdateTime(Long updateTime) {
		this.updateTime = updateTime;
	}


	@Override
	public String toString() {
		return "Decode [deveui=" + deveui + ", fPort=" + fPort + ", payload=" + payload + ", updateTime=" + updateTime
				+ ", model=" + model + "]";
	}
}
