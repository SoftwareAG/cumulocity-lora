package lora.ns.objenious.rest;

import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Configuration of the push http
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")
@JsonIgnoreProperties(ignoreUnknown = true)

public class RoutingHttp {
	@JsonProperty("url")
	private String url = null;

	@JsonProperty("headers")
	private Headers headers = null;

	/**
	 * Type of message (join, uplink, downlink, external)
	 */
	public enum MethodEnum {
		POST("POST"),

		PUT("PUT"),

		PATCH("PATCH");

		private String value;

		MethodEnum(String value) {
			this.value = value;
		}

		@Override
		@JsonValue
		public String toString() {
			return String.valueOf(value);
		}

		@JsonCreator
		public static MethodEnum fromValue(String text) {
			for (MethodEnum b : MethodEnum.values()) {
				if (String.valueOf(b.value).equals(text)) {
					return b;
				}
			}
			return null;
		}
	}

	@JsonProperty("method")
	private MethodEnum method = null;

	public RoutingHttp url(String url) {
		this.url = url;
		return this;
	}

	/**
	 * Url of the request
	 * 
	 * @return url
	 **/

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public RoutingHttp headers(Headers headers) {
		this.headers = headers;
		return this;
	}

	public MethodEnum getMethod() {
		return method;
	}

	public void setMethod(MethodEnum method) {
		this.method = method;
	}

	/**
	 * Get headers
	 * 
	 * @return headers
	 **/

	public Headers getHeaders() {
		return headers;
	}

	public void setHeaders(Headers headers) {
		this.headers = headers;
	}

	@Override
	public boolean equals(java.lang.Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		RoutingHttp routingHttp = (RoutingHttp) o;
		return Objects.equals(this.url, routingHttp.url) && Objects.equals(this.headers, routingHttp.headers);
	}

	@Override
	public int hashCode() {
		return Objects.hash(url, headers);
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("class RoutingHttp {\n");

		sb.append("    url: ").append(toIndentedString(url)).append("\n");
		sb.append("    method: ").append(toIndentedString(method)).append("\n");
		sb.append("    headers: ").append(toIndentedString(headers)).append("\n");
		sb.append("}");
		return sb.toString();
	}

	/**
	 * Convert the given object to string with each line indented by 4 spaces
	 * (except the first line).
	 */
	private String toIndentedString(java.lang.Object o) {
		if (o == null) {
			return "null";
		}
		return o.toString().replace("\n", "\n    ");
	}
}
