package lora.ns.liveobjects.rest;

import java.util.List;

import lora.ns.liveobjects.rest.model.ActionPolicy;
import lora.ns.liveobjects.rest.model.Command;
import lora.ns.liveobjects.rest.model.CommandResponse;
import lora.ns.liveobjects.rest.model.ConnectivityPlan;
import lora.ns.liveobjects.rest.model.CreateDevice;
import lora.ns.liveobjects.rest.model.Group;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface LiveObjectsService {
	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@POST("api/v1/event2action/actionPolicies")
	Call<ActionPolicy> createActionPolicy(@Body ActionPolicy actionPolicy);

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@DELETE("api/v1/event2action/actionPolicies/{policyId}")
	Call<ResponseBody> deleteActionPolicy(@Path("policyId") String policyId);

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@POST("api/v1/deviceMgt/devices")
	Call<CreateDevice> createDevice(@Body CreateDevice createDevice);

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@DELETE("api/v1/deviceMgt/devices/{deviceId}")
	Call<ResponseBody> deleteDevice(@Path("deviceId") String deviceId);

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@POST("api/v1/deviceMgt/devices/{deviceId}/commands")
	Call<CommandResponse> createCommand(@Path("deviceId") String deviceId, @Body Command command);

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@GET("api/v1/deviceMgt/connectors/lora/connectivities")
	Call<List<ConnectivityPlan>> getConnectivityPlans();

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@GET("api/v1/deviceMgt/connectors/lora/profiles")
	Call<List<String>> getProfiles();

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@GET("api/v1/deviceMgt/groups")
	Call<List<Group>> getGroups();
}
