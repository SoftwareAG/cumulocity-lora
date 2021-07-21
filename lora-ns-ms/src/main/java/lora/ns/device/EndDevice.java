package lora.ns.device;

public class EndDevice {
	private String devEui;
	private String name;
	private String deviceClass;
	public EndDevice(String devEui, String name, String deviceClass) {
		super();
		this.devEui = devEui;
		this.name = name;
		this.deviceClass = deviceClass;
	}
	public String getDevEui() {
		return devEui;
	}
	public void setDevEui(String devEui) {
		this.devEui = devEui;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDeviceClass() {
		return deviceClass;
	}
	public void setDeviceClass(String deviceClass) {
		this.deviceClass = deviceClass;
	}
}
