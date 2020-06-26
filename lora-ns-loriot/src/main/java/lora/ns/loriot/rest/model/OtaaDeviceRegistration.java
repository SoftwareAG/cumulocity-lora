package lora.ns.loriot.rest.model;

public class OtaaDeviceRegistration {
	private String title;
	private String description;
	private String devclass;
	private String appkey;
	private String appeui;
	private String deveui;
	
	public OtaaDeviceRegistration() {}
	public OtaaDeviceRegistration(String title, String description, String devclass, String appkey, String appeui,
			String deveui) {
		super();
		this.title = title;
		this.description = description;
		this.devclass = devclass;
		this.appkey = appkey;
		this.appeui = appeui;
		this.deveui = deveui;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDevclass() {
		return devclass;
	}
	public void setDevclass(String devclass) {
		this.devclass = devclass;
	}
	public String getAppkey() {
		return appkey;
	}
	public void setAppkey(String appkey) {
		this.appkey = appkey;
	}
	public String getAppeui() {
		return appeui;
	}
	public void setAppeui(String appeui) {
		this.appeui = appeui;
	}
	public String getDeveui() {
		return deveui;
	}
	public void setDeveui(String deveui) {
		this.deveui = deveui;
	}
}
