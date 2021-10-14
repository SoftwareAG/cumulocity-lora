package lora.ns.actility.rest;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface ActilityTunnelService {
	@Headers("Accept: application/json")
    @POST("downlink")
    Call<ResponseBody> sendDownlink(@Query("DevEUI") String devEUI, @Query("FPort") int fport, @Query("Payload") String payload, @Query("AS_ID") String asId, @Query("Time") String time, @Query("CorrelationID") String correlationId, @Query("Token") String token);
}
