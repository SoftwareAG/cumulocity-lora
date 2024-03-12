package lora.codec.semtech;

import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface LoraCloudService {
    @POST("send")
    Call<ResponseBody> sendData(@Body RequestBody message);

    @POST("info")
    Call<ResponseBody> getDeviceInfo(@Body RequestBody message);
}
