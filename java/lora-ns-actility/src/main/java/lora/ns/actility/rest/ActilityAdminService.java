package lora.ns.actility.rest;

import feign.Headers;
import feign.Param;
import feign.RequestLine;
import lora.ns.actility.api.model.common.Token;

public interface ActilityAdminService {
	@Headers("Content-Type: application/x-www-form-urlencoded")
	@RequestLine("POST oauth/token")
	Token getToken(@Param("grant_type") String grantType, @Param("client_id") String clientId,
					@Param("client_secret") String clientSecret);
}
