package lora.ns.orbiwise.rest;

import java.util.List;

import lora.ns.orbiwise.rest.model.Device;
import lora.ns.orbiwise.rest.model.DeviceCreate;
import lora.ns.orbiwise.rest.model.DownlinkResponse;
import lora.ns.orbiwise.rest.model.Pushmode;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface OrbiwiseService {
	@GET("nodes")
	Call<List<Device>> getDevices();

	@GET("nodes/{devEui}")
	Call<Device> getDevice(@Path("devEui") String devEui);

	@DELETE("nodes/{devEui}")
	Call<ResponseBody> deprovisionDevice(@Path("devEui") String devEui);

	@PUT("nodes/{devEui}")
	Call<ResponseBody> reactivateDevice(@Path("devEui") String devEui);
	
	@POST("nodes")
	Call<ResponseBody> createDevice(@Body DeviceCreate device);
	
	@POST("nodes/{devEui}/payloads/dl?data_format=hex")
	Call<DownlinkResponse> sendCommand(@Path("devEui") String devEui, @Query("port") int fport, @Body String payload);
	
	@PUT("pushmode/start")
	Call<ResponseBody> createHttpRouting(@Body Pushmode routing);
	
	@PUT("pushmode/stop")
	Call<ResponseBody> stopRouting();
}
