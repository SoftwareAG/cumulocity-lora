package lora.ns.liveobjects;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;

import org.springframework.http.MediaType;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import lombok.extern.slf4j.Slf4j;
import lora.codec.downlink.DownlinkData;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.connector.LNSResponse;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.gateway.Gateway;
import lora.ns.gateway.GatewayProvisioning;
import lora.ns.liveobjects.rest.LiveObjectsService;
import lora.ns.liveobjects.rest.model.ActionPolicy;
import lora.ns.liveobjects.rest.model.ActionTriggers;
import lora.ns.liveobjects.rest.model.Actions;
import lora.ns.liveobjects.rest.model.Command;
import lora.ns.liveobjects.rest.model.CommandPolicy;
import lora.ns.liveobjects.rest.model.CommandResponse;
import lora.ns.liveobjects.rest.model.CommandStatusTrigger;
import lora.ns.liveobjects.rest.model.ConnectivityPlan;
import lora.ns.liveobjects.rest.model.CreateDevice;
import lora.ns.liveobjects.rest.model.DataMessageFilter;
import lora.ns.liveobjects.rest.model.DataMessageTrigger;
import lora.ns.liveobjects.rest.model.DeviceGroup;
import lora.ns.liveobjects.rest.model.DeviceInterface;
import lora.ns.liveobjects.rest.model.DeviceInterfaceDefinition;
import lora.ns.liveobjects.rest.model.Group;
import lora.ns.liveobjects.rest.model.GroupPath;
import lora.ns.liveobjects.rest.model.HttpPushAction;
import lora.ns.liveobjects.rest.model.LoraNetworkFilter;
import lora.ns.liveobjects.rest.model.LoraNetworkFilter.MessageType;
import lora.ns.liveobjects.rest.model.LoraNetworkTrigger;
import lora.ns.liveobjects.rest.model.RequestValue;
import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.ResponseBody;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

@Slf4j
public class LiveObjectsConnector extends LNSAbstractConnector {

	private LiveObjectsService service;

	public LiveObjectsConnector(Properties properties) {
		super(properties);
	}

	public LiveObjectsConnector(ManagedObjectRepresentation instance) {
		super(instance);
	}

	class APIKeyInterceptor implements Interceptor {

		@Override
		public okhttp3.Response intercept(Chain chain) throws IOException {
			Request request = chain.request();

			request = request.newBuilder().header("X-API-KEY", properties.getProperty("apikey"))
					.header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
					.header("Accept", MediaType.APPLICATION_JSON_VALUE).build();

			okhttp3.Response response = chain.proceed(request);

			log.info("Response code from {} {}: {}", request.method(), request.url(), response.code());

			if (!response.isSuccessful()) {
				log.error("Error message from Live Objects: {}", response.message());
				log.error("Request was: {}", request);
			}

			return response;
		}

	}

	@Override
	protected void init() {
		HttpLoggingInterceptor interceptor = new HttpLoggingInterceptor();
		interceptor.setLevel(HttpLoggingInterceptor.Level.BODY);
		OkHttpClient okHttpClient = new OkHttpClient.Builder().addInterceptor(new APIKeyInterceptor())
				.addInterceptor(interceptor).build();

		Retrofit retrofit = new Retrofit.Builder().client(okHttpClient)
				.baseUrl("https://liveobjects.orange-business.com/")
				.addConverterFactory(JacksonConverterFactory.create()).build();
		service = retrofit.create(LiveObjectsService.class);
	}

	@Override
	public LNSResponse<List<EndDevice>> getDevices() {
		return new LNSResponse<List<EndDevice>>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<EndDevice> getDevice(String devEui) {
		return new LNSResponse<EndDevice>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<String> sendDownlink(DownlinkData operation) {
		LNSResponse<String> result = new LNSResponse<String>().withOk(true);
		try {
			Response<CommandResponse> response = service
					.createCommand("urn:lo:nsid:lora:" + operation.getDevEui(),
							new Command(new lora.ns.liveobjects.rest.model.Request()
									.withValue(new RequestValue(operation.getPayload(), operation.getFport())),
									new CommandPolicy()))
					.execute();
			if (response.isSuccessful()) {
				result.setResult(response.body().getId());
			} else {
				result.setOk(false);
				result.setMessage(response.errorBody().string());
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.setOk(false);
			result.setMessage(e.getMessage());
		}
		return result;
	}

	@Override
	public LNSResponse<Void> provisionDevice(DeviceProvisioning deviceProvisioning) {
		LNSResponse<Void> response = new LNSResponse<Void>().withOk(true);
		try {
			Response<CreateDevice> result = service.createDevice(new CreateDevice()
					.withId("urn:lo:nsid:lora:" + deviceProvisioning.getDevEUI().toLowerCase())
					.withName(deviceProvisioning.getName())
					.withGroup(new DeviceGroup(properties.getProperty("groupId")))
					.withInterfaces(List.of(new DeviceInterface()
							.withDefinition(new DeviceInterfaceDefinition().withAppEUI(deviceProvisioning.getAppEUI())
									.withAppKey(deviceProvisioning.getAppKey())
									.withDevEUI(deviceProvisioning.getDevEUI())
									.withConnectivityPlan(deviceProvisioning.getAdditionalProperties()
											.getProperty("connectivityPlan"))
									.withProfile(deviceProvisioning.getAdditionalProperties()
											.getProperty("profile"))))))
					.execute();
			if (!result.isSuccessful()) {
				response.setOk(false);
				response.setMessage(result.errorBody().string());
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setOk(false);
			response.setMessage(e.getMessage());
		}
		return response;
	}

	@Override
	public LNSResponse<Void> configureRoutings(String url, String tenant, String login, String password) {
		LNSResponse<Void> response = new LNSResponse<Void>().withOk(true);
		String authorization = "Basic "
				+ Base64.getEncoder().encodeToString((tenant + "/" + login + ":" + password).getBytes());
		try {
			DataMessageFilter dataMessageFilter = new DataMessageFilter();
			dataMessageFilter.getGroupPaths().add(new GroupPath().withPath(properties.getProperty("groupId")));
			dataMessageFilter.getConnectors().add("lora");
			Response<ActionPolicy> result = service.createActionPolicy(new ActionPolicy()
					.withId(null)
					.withName("Cumulocity webhook for tenant " + tenant)
					.withEnabled(true)
					.withActions(new Actions()
							.withHttpPush(List.of(new HttpPushAction()
									.withWebhookUrl(url + "/uplink")
									.withHeaders(Map.of("Authorization", List.of(authorization))))))
					.withTriggers(new ActionTriggers()
							.withDataMessage(new DataMessageTrigger()
									.withFilter(dataMessageFilter))))
					.execute();
			if (!result.isSuccessful()) {
				response.setOk(false);
				response.setMessage(result.errorBody().string());
			} else {
				this.setProperty("uplinkRouteId", result.body().getId());
				result = service.createActionPolicy(new ActionPolicy()
						.withId(null)
						.withName("Cumulocity webhook for tenant " + tenant)
						.withEnabled(true)
						.withActions(new Actions()
								.withHttpPush(List.of(new HttpPushAction()
										.withWebhookUrl(url + "/downlink")
										.withHeaders(Map.of("Authorization", List.of(authorization))))))
						.withTriggers(new ActionTriggers()
								.withCommandStatus(new CommandStatusTrigger())))
						.execute();
				if (!result.isSuccessful()) {
					response.setOk(false);
					response.setMessage(result.errorBody().string());
				} else {
					this.setProperty("downlinkRouteId", result.body().getId());
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
			response.withOk(false).withMessage(e.getMessage());
		}
		return response;
	}

	@Override
	public LNSResponse<Void> removeRoutings() {
		final LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);
		Optional<Object> uplinkRouteId = getProperty("uplinkRouteId");
		Optional<Object> downlinkRouteId = getProperty("downlinkRouteId");
		uplinkRouteId.ifPresent(id -> {
			LNSResponse<Void> uplinkResult = removeRouting(id.toString());
			result.setOk(uplinkResult.isOk());
			result.setMessage(uplinkResult.getMessage());
		});
		if (result.isOk()) {
			downlinkRouteId.ifPresent(id -> {
				LNSResponse<Void> downlinkResult = removeRouting(id.toString());
				result.setOk(downlinkResult.isOk());
				result.setMessage(downlinkResult.getMessage());
			});
		}
		return result;
	}

	private LNSResponse<Void> removeRouting(String id) {
		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);
		try {
			Response<ResponseBody> response = service.deleteActionPolicy(id).execute();
			if (!response.isSuccessful()) {
				result.setOk(false);
				result.setMessage(response.errorBody().string());
			}
		} catch (IOException e) {
			e.printStackTrace();
			result.setOk(false);
			result.setMessage(e.getMessage());
		}
		return result;
	}

	@Override
	public LNSResponse<Void> deprovisionDevice(String deveui) {
		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);

		try {
			Response<ResponseBody> response = service.deleteDevice("urn:lo:nsid:lora:" + deveui).execute();
			if (!response.isSuccessful()) {
				result.setOk(false);
				result.setMessage(response.errorBody().string());
			}
		} catch (IOException e) {
			e.printStackTrace();
			result.setOk(false);
			result.setMessage(e.getMessage());
		}

		return result;
	}

	@Override
	public LNSResponse<List<Gateway>> getGateways() {
		return new LNSResponse<List<Gateway>>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<Void> provisionGateway(GatewayProvisioning gatewayProvisioning) {
		return new LNSResponse<Void>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<Void> deprovisionGateway(String id) {
		return new LNSResponse<Void>().withOk(false).withMessage("Not implemented.");
	}

	public boolean hasGatewayManagementCapability() {
		return false;
	}

	public List<ConnectivityPlan> getConnectivityPlans() {
		List<ConnectivityPlan> result = new ArrayList<>();
		Response<List<ConnectivityPlan>> response;
		try {
			response = service.getConnectivityPlans().execute();
			if (response.isSuccessful()) {
				result = response.body();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}

	public List<String> getProfiles() {
		List<String> result = new ArrayList<>();
		Response<List<String>> response;
		try {
			response = service.getProfiles().execute();
			if (response.isSuccessful()) {
				result = response.body();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}

	public List<Group> getGroups() {
		List<Group> groups = new ArrayList<>();

		try {
			Response<List<Group>> response = service.getGroups().execute();
			if (response.isSuccessful()) {
				groups = response.body();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		return groups;
	}
}
