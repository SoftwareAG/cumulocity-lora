package lora.ns.orbiwise.rest.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Device {
	private String deveui;
	private int lora_device_class;

	public String getDeveui() {
		return deveui;
	}

	public void setDeveui(String deveui) {
		this.deveui = deveui;
	}

	public int getLora_device_class() {
		return lora_device_class;
	}

	public void setLora_device_class(int lora_device_class) {
		this.lora_device_class = lora_device_class;
	}
	
	
}
