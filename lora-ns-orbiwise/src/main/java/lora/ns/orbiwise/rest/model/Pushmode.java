package lora.ns.orbiwise.rest.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Pushmode {
	private boolean enabled;
    private String host;    // Hostname or IP address
    // of DASS HTTPS host interface
    private int port;        // port number of DASS HTTPS host interface
    private String path_prefix;    // path prefix

    private String auth_string; // see below

    private int retry_policy;    // to be detailed
    private String data_format = "hex";   // hex or base64. Default is base64.
    private String push_subscription;
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	public int getPort() {
		return port;
	}
	public void setPort(int port) {
		this.port = port;
	}
	public String getPath_prefix() {
		return path_prefix;
	}
	public void setPath_prefix(String path_prefix) {
		this.path_prefix = path_prefix;
	}
	public String getAuth_string() {
		return auth_string;
	}
	public void setAuth_string(String auth_string) {
		this.auth_string = auth_string;
	}
	public int getRetry_policy() {
		return retry_policy;
	}
	public void setRetry_policy(int retry_policy) {
		this.retry_policy = retry_policy;
	}
	public String getData_format() {
		return data_format;
	}
	public void setData_format(String data_format) {
		this.data_format = data_format;
	}
	public String getPush_subscription() {
		return push_subscription;
	}
	public void setPush_subscription(String push_subscription) {
		this.push_subscription = push_subscription;
	}
	public boolean isEnabled() {
		return enabled;
	}
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
}
