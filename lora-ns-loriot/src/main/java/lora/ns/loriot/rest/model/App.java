package lora.ns.loriot.rest.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class App {
	private Long _id;
	private String name;
	
	public App() {}
	
	public App(Long _id, String name) {
		super();
		this._id = _id;
		this.name = name;
	}
	public Long get_id() {
		return _id;
	}
	public void set_id(Long _id) {
		this._id = _id;
	}
	public String getId() {
		return Long.toHexString(_id).toUpperCase();
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
