package lora.ns.loriot.rest.model;

public class HttpPush {
	private String output = "httppush";
	private HttpPushOSetup osetup;
	
	public HttpPush() {}
	public HttpPush(String url, String auth) {
		osetup = new HttpPushOSetup(url, auth);
	}
	public String getOutput() {
		return output;
	}
	public void setOutput(String output) {
		this.output = output;
	}
	public HttpPushOSetup getOsetup() {
		return osetup;
	}
	public void setOsetup(HttpPushOSetup osetup) {
		this.osetup = osetup;
	}
}
