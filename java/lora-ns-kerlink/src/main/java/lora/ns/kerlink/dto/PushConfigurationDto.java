package lora.ns.kerlink.dto;

import java.util.Arrays;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonValue;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PushConfigurationDto {
	@JsonInclude(Include.NON_NULL)
	private Integer id;
	private String name;
	private PushConfigurationType type;
	private PushConfigurationMSgDetailLevel msgDetailLevel;
	private PushConfigurationHeaderDto[] headers;
	private String httpDataDownEventRoute;
	private String httpDataUpRoute;
	private String url;
	private String user;
	private String password;
	private CustomerDto customer;
	
	public PushConfigurationDto() {}
	
	public PushConfigurationDto(CustomerDto customer, String name, PushConfigurationType type,
			PushConfigurationMSgDetailLevel msgDetailLevel, PushConfigurationHeaderDto[] headers,
			String httpDataDownEventRoute, String httpDataUpRoute, String url, String user, String password) {
		super();
		this.customer = customer;
		this.name = name;
		this.type = type;
		this.msgDetailLevel = msgDetailLevel;
		this.headers = headers;
		this.httpDataDownEventRoute = httpDataDownEventRoute;
		this.httpDataUpRoute = httpDataUpRoute;
		this.url = url;
		this.user = user;
		this.password = password;
	}

	public CustomerDto getCustomer() {
		return customer;
	}

	public void setCustomer(CustomerDto customer) {
		this.customer = customer;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public PushConfigurationType getType() {
		return type;
	}

	public void setType(PushConfigurationType type) {
		this.type = type;
	}

	public PushConfigurationMSgDetailLevel getMsgDetailLevel() {
		return msgDetailLevel;
	}

	public void setMsgDetailLevel(PushConfigurationMSgDetailLevel msgDetailLevel) {
		this.msgDetailLevel = msgDetailLevel;
	}

	public PushConfigurationHeaderDto[] getHeaders() {
		return headers;
	}

	public void setHeaders(PushConfigurationHeaderDto[] headers) {
		this.headers = headers;
	}

	public String getHttpDataDownEventRoute() {
		return httpDataDownEventRoute;
	}

	public void setHttpDataDownEventRoute(String httpDataDownEventRoute) {
		this.httpDataDownEventRoute = httpDataDownEventRoute;
	}

	public String getHttpDataUpRoute() {
		return httpDataUpRoute;
	}

	public void setHttpDataUpRoute(String httpDataUpRoute) {
		this.httpDataUpRoute = httpDataUpRoute;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public enum PushConfigurationType {
		MQTT("MQTT"),
		HTTP("HTTP"),
		WEBSOCKET("WEBSOCKET");

		private String value;

		PushConfigurationType(String value) {
			this.value = value;
		}

		@Override
		@JsonValue
		public String toString() {
			return String.valueOf(value);
		}

		@JsonCreator
		public static PushConfigurationType fromValue(String text) {
			for (PushConfigurationType b : PushConfigurationType.values()) {
				if (String.valueOf(b.value).equals(text)) {
					return b;
				}
			}
			return null;
		}
	}
	
	public enum PushConfigurationMSgDetailLevel {
		NETWORK("NETWORK"),
		PAYLOAD("PAYLOAD"),
		RADIO("RADIO");

		private String value;

		PushConfigurationMSgDetailLevel(String value) {
			this.value = value;
		}

		@Override
		@JsonValue
		public String toString() {
			return String.valueOf(value);
		}

		@JsonCreator
		public static PushConfigurationMSgDetailLevel fromValue(String text) {
			for (PushConfigurationMSgDetailLevel b : PushConfigurationMSgDetailLevel.values()) {
				if (String.valueOf(b.value).equals(text)) {
					return b;
				}
			}
			return null;
		}
	}

	@Override
	public String toString() {
		return "PushConfigurationDto [id=" + id + ", name=" + name + ", type=" + type + ", msgDetailLevel="
				+ msgDetailLevel + ", headers=" + Arrays.toString(headers) + ", httpDataDownEventRoute="
				+ httpDataDownEventRoute + ", httpDataUpRoute=" + httpDataUpRoute + ", url=" + url + ", user=" + user
				+ ", password=" + password + "]";
	}
}
