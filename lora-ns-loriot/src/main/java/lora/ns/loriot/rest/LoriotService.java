package lora.ns.loriot.rest;

import java.util.List;

import lora.ns.loriot.rest.model.AbpDeviceRegistration;
import lora.ns.loriot.rest.model.Apps;
import lora.ns.loriot.rest.model.Device;
import lora.ns.loriot.rest.model.HttpPush;
import lora.ns.loriot.rest.model.OtaaDeviceRegistration;
import lora.ns.loriot.rest.model.Output;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface LoriotService {
	@GET("1/nwk/apps")
	Call<Apps> getApps();
	
	@GET("1/nwk/app/{appid}/device/{deveui}")
	Call<Device> getDevice(@Path("appid") String appid, @Path("deveui") String deveui);
	
	@DELETE("1/nwk/app/{appid}/device/{deveui}")
	Call<Device> removeDevice(@Path("appid") String appid, @Path("deveui") String deveui);
	
	@POST("1/nwk/app/{appid}/devices/otaa")
	Call<Device> createDeviceOtaa(@Path("appid") String appid, @Body OtaaDeviceRegistration otaaDeviceRegistration);
	
	@POST("1/nwk/app/{appid}/devices/abp")
	Call<Device> createDeviceAbp(@Path("appid") String appid, @Body AbpDeviceRegistration abpDeviceRegistration);
	
	@GET("1/nwk/app/{appid}/devices")
	Call<List<Device>> getDevices(@Path("appid") String appid);

	@GET("1/nwk/app/{appid}/outputs")
	Call<List<Output>> getOutputs(@Path("appid") String appid);
	
	@GET("1/nwk/app/{appid}/token")
	Call<List<String>> getTokens(@Path("appid") String appid);
	
	@POST("1/nwk/app/{appid}/outputs/httppush")
	Call<ResponseBody> createHttpPush(@Path("appid") String appid, @Body HttpPush httpPush);
	
	@DELETE("1/nwk/app/{appid}/outputs/{index}")
	Call<ResponseBody> deleteOutput(@Path("appid") String appid, @Path("index") int index);
}
