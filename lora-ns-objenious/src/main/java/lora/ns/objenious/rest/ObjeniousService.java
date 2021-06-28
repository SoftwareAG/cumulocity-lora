package lora.ns.objenious.rest;

import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface ObjeniousService {
	@GET("devices")
	Call<List<Device>> getDevices();

	@GET("devices/lora:{devEui}")
	Call<Device> getDevice(@Path("devEui") String devEui);

	@POST("devices/lora:{devEui}/deprovision")
	Call<ObjectDeleted> deprovisionDevice(@Path("devEui") String devEui);

	@POST("devices/lora:{devEui}/reactivate")
	Call<Device> reactivateDevice(@Path("devEui") String devEui);
	
	@POST("devices/lora:{devEui}/downlinks")
	Call<DownlinkResponse> sendCommand(@Path("devEui") String devEui, @Body DownlinkCreate command);
	
	@POST("scenarios/routing")
	Call<ScenarioRouting> createHttpRouting(@Body ScenarioRoutingCreateUpdate routing);
	
	@GET("scenarios/routing")
	Call<List<ScenarioRoutingReader>> getRouting();
	
	@DELETE("scenarios/routing/{id}")
	Call<ResponseBody> deleteRouting(@Path("id") Integer id);
	
	@POST("devices")
	Call<Device> createDevice(@Body DeviceCreate device);
	
	@GET("profiles")
	Call<List<Profile>> getProfiles();
	
	@GET("profiles/{id}")
	Call<Profile> getProfile(@Path("id") Integer id);
	
	@GET("groups")
	Call<List<Group>> getGroups();
}
