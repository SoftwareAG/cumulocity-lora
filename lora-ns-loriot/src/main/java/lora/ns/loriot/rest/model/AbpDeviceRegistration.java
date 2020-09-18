package lora.ns.loriot.rest.model;

public class AbpDeviceRegistration {
	private String title;
	private String description;
	private String devclass;
	private String appskey;
	private String nwkskey;
	private String devaddr;
	private String deveui;

	public AbpDeviceRegistration() {
	}

	public AbpDeviceRegistration(String title, String description, String devclass, String appskey, String nwkskey,
			String devaddr, String deveui) {
		super();
		this.title = title;
		this.description = description;
		this.devclass = devclass;
		this.appskey = appskey;
		this.nwkskey = nwkskey;
		this.devaddr = devaddr;
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

	public String getDeveui() {
		return deveui;
	}

	public void setDeveui(String deveui) {
		this.deveui = deveui;
	}

	public String getAppskey() {
		return appskey;
	}

	public void setAppskey(String appskey) {
		this.appskey = appskey;
	}

	public String getNwkskey() {
		return nwkskey;
	}

	public void setNwkskey(String nwkskey) {
		this.nwkskey = nwkskey;
	}

	public String getDevaddr() {
		return devaddr;
	}

	public void setDevaddr(String devaddr) {
		this.devaddr = devaddr;
	}
}
