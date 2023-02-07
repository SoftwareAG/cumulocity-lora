package lora.ns.kerlink.dto;

import org.joda.time.DateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class JwtDto {
	private Long expiredDate;
	private String token;
	private String tokenType;
	public Long getExpiredDate() {
		return expiredDate;
	}
	public void setExpiredDate(Long expiredDate) {
		this.expiredDate = expiredDate;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getTokenType() {
		return tokenType;
	}
	public void setTokenType(String tokenType) {
		this.tokenType = tokenType;
	}
	
	public boolean isExpired() {
		return new DateTime().getMillis() > expiredDate;
	}
}
