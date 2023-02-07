package lora.ns.actility.rest;

import lora.ns.actility.rest.model.Token;
import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;

public interface ActilityAdminService {
	@FormUrlEncoded
	@POST("oauth/token")
	Call<Token> getToken(@Field("grant_type") String grantType, @Field("client_id") String clientId, @Field("client_secret") String clientSecret);
}
