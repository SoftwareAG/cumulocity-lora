package lora.c8y.tenant;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface TenantService {
    @POST("tenant/tenants/{tenantId}/applications")
    @Headers({"Accept: application/json", "Content-Type: application/json"})
    Call<ResponseBody> subscribeToApplication(@Path("tenantId") String tenantId, @Body Subscription subscription);
}
