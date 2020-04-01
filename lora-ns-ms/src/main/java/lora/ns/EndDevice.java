package lora.ns;

public class EndDevice {
	private String devEui;
	private String name;
	private String deviceClass;
	private String devAddr;
	private String clusterName;
	public EndDevice(String devEui, String name, String deviceClass, String devAddr, String clusterName) {
		super();
		this.devEui = devEui;
		this.name = name;
		this.deviceClass = deviceClass;
		this.devAddr = devAddr;
		this.clusterName = clusterName;
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
	public String getDevAddr() {
		return devAddr;
	}
	public void setDevAddr(String devAddr) {
		this.devAddr = devAddr;
	}
	public String getClusterName() {
		return clusterName;
	}
	public void setClusterName(String clusterName) {
		this.clusterName = clusterName;
	}
}
