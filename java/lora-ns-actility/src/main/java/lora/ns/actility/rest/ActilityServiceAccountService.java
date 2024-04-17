package lora.ns.actility.rest;

import feign.Headers;
import feign.Param;
import feign.RequestLine;
import lora.ns.actility.rest.model.Token;

public interface ActilityServiceAccountService {
	@Headers("Content-Type: application/x-www-form-urlencoded")
	@RequestLine("POST openid-connect/token")
	Token getToken(@Param("grant_type") String grantType, @Param("client_id") String clientId,
					@Param("client_secret") String clientSecret);
}
