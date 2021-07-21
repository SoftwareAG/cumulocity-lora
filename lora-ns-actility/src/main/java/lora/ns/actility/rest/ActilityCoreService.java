package lora.ns.actility.rest;

import java.util.List;

import lora.ns.actility.rest.model.Connection;
import lora.ns.actility.rest.model.ConnectionRequest;
import lora.ns.actility.rest.model.Route;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface ActilityCoreService {
	@GET("connections")
	Call<List<Connection>> getConnections();

	@POST("connections")
	Call<Connection> createConnection(@Body ConnectionRequest connectionRequest);

	@DELETE("connections/{connectionId}")
	Call<ResponseBody> deleteConnection(@Path("connectionId") String connectionId);

	@GET("routes")
	Call<List<Route>> getRoutes();
}
