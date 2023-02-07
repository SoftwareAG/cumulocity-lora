package lora.ns.loriot.rest.model;

public class HttpPushOSetup {
	private String url;
	private String auth;
	
	public HttpPushOSetup() {}
	public HttpPushOSetup(String url, String auth) {
		super();
		this.url = url;
		this.auth = auth;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getAuth() {
		return auth;
	}
	public void setAuth(String auth) {
		this.auth = auth;
	}
}
