package lora.ns.loriot.rest.model;

public class Downlink {
	private String cmd = "tx";
	private String EUI;
	private int port;
	private boolean confirmed = true;
	private String data;
	private String appid;
	
	public Downlink(String eUI, int port, String data, String appid) {
		super();
		EUI = eUI;
		this.port = port;
		this.data = data;
		this.appid = appid;
	}
	public String getCmd() {
		return cmd;
	}
	public void setCmd(String cmd) {
		this.cmd = cmd;
	}
	public String getEUI() {
		return EUI;
	}
	public void setEUI(String eUI) {
		EUI = eUI;
	}
	public int getPort() {
		return port;
	}
	public void setPort(int port) {
		this.port = port;
	}
	public boolean isConfirmed() {
		return confirmed;
	}
	public void setConfirmed(boolean confirmed) {
		this.confirmed = confirmed;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	public String getAppid() {
		return appid;
	}
	public void setAppid(String appid) {
		this.appid = appid;
	}
	@Override
	public String toString() {
		return "Downlink [cmd=" + cmd + ", EUI=" + EUI + ", port=" + port + ", confirmed=" + confirmed + ", data="
				+ data + ", appid=" + appid + "]";
	}
	public String toJson() {
		return "{\"cmd\":\"" + cmd + "\", \"EUI\":\"" + EUI + "\", \"port\":" + port + ", \"confirmed\":" + confirmed + ", \"data\":\""
				+ data + "\", \"appid\":\"" + appid + "\"}";
	}
}
