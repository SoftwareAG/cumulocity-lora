package lora.ns.loriot.rest.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Device {
	private String deveui;
	private String title;
	private String devclass;
	
	public Device() {}
	public Device(String deveui, String title, String devclass) {
		super();
		this.deveui = deveui;
		this.title = title;
		this.devclass = devclass;
	}
	public String getDeveui() {
		return deveui;
	}
	public void setDeveui(String deveui) {
		this.deveui = deveui;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDevclass() {
		return devclass;
	}
	public void setDevclass(String devclass) {
		this.devclass = devclass;
	}
}
