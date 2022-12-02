package lora.ns.liveobjects.rest;

import lora.ns.liveobjects.rest.model.ActionPolicy;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Headers;
import retrofit2.http.POST;

public interface LiveObjectsService {
	@Headers({"Content-Type: application/json", "Accept: application/json"})
	@POST("api/v1/event2action/actionPolicies")
    Call<ActionPolicy> createActionPolicy(@Body ActionPolicy actionPolicy);
}
