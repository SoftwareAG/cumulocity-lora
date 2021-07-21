package lora.c8y;

import okhttp3.MultipartBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Headers;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
import retrofit2.http.Path;

public interface ApplicationBinaryService {
    @POST("application/applications/{id}/binaries")
    @Headers("Accept: application/json")
    //@FormUrlEncoded
    @Multipart
    Call<ResponseBody> uploadApplicationAttachment(@Path("id") String id, /*@Field("file") String file*/@Part MultipartBody.Part file);
}
