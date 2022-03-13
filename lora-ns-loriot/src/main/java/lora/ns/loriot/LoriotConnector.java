package lora.ns.loriot;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Properties;
import java.util.stream.Collectors;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import lora.codec.downlink.DownlinkData;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.connector.LNSResponse;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.gateway.Gateway;
import lora.ns.loriot.rest.LoriotService;
import lora.ns.loriot.rest.model.AbpDeviceRegistration;
import lora.ns.loriot.rest.model.App;
import lora.ns.loriot.rest.model.Device;
import lora.ns.loriot.rest.model.Downlink;
import lora.ns.loriot.rest.model.DownlinkResponse;
import lora.ns.loriot.rest.model.HttpPush;
import lora.ns.loriot.rest.model.OtaaDeviceRegistration;
import lora.ns.loriot.rest.model.Output;
import lora.ns.loriot.rest.model.Session;
import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

public class LoriotConnector extends LNSAbstractConnector {

	private LoriotService loriotService;
	private String sessionId;

	private final Logger logger = LoggerFactory.getLogger(LoriotConnector.class);

	class APIKeyInterceptor implements Interceptor {
		private int maxTries = 5;
		private int tries = 0;

		@Override
		public Response intercept(Chain chain) throws IOException {
			Request request = chain.request();

			if (sessionId == null) {
				login();
			}

			request = request.newBuilder().header("Authorization", "Session " + sessionId)
					.header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
					.header("Accept", MediaType.APPLICATION_JSON_VALUE).build();

			Response response = chain.proceed(request);

			logger.info("Response code from {} {}: {}", request.method(), request.url(), response.code());

			if (!response.isSuccessful()) {
				logger.error("Error message from Objenious: {}", response.message());
				logger.error("Request was: {}", request);
				if (response.code() == 403 && tries < maxTries) {
					tries++;
					logger.error("Will try to refresh session. Try {}", tries);
					login();
					response = intercept(chain);
				}
			}
			tries = 0;

			return response;
		}

		private void login() {
			String user = getProperties().getProperty("user");
			String pwd = getProperties().getProperty("pwd");
			RestTemplate restTemplate = new RestTemplate();
			String request = String.format("{\"user\":\"%s\", \"pwd\":\"%s\"}", user, pwd);
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			List<MediaType> mediaTypes = new ArrayList<MediaType>();
			mediaTypes.add(MediaType.APPLICATION_JSON);
			headers.setAccept(mediaTypes);
			Session session = restTemplate.postForObject(getProperties().getProperty("url") + "/1/pub/login",
					new HttpEntity<String>(request, headers), Session.class);
			logger.info("Received session: {}", session.getSession());
			sessionId = session.getSession();
		}

	}

	public LoriotConnector(Properties properties) {
		super(properties);
	}

	public LoriotConnector(ManagedObjectRepresentation instance) {
		super(instance);
	}

	@Override
	protected void init() {
		OkHttpClient okHttpClient = new OkHttpClient.Builder().addInterceptor(new APIKeyInterceptor()).build();

		Retrofit retrofit = new Retrofit.Builder().client(okHttpClient).baseUrl(getProperties().getProperty("url"))
				.addConverterFactory(JacksonConverterFactory.create()).build();
		loriotService = retrofit.create(LoriotService.class);
	}

	@Override
	public LNSResponse<List<EndDevice>> getDevices() {
		LNSResponse<List<EndDevice>> result = new LNSResponse<List<EndDevice>>().withOk(true).withResult(new ArrayList<EndDevice>());
		try {
			retrofit2.Response<List<Device>> response = loriotService.getDevices(getProperties().getProperty("appid"))
					.execute();
			if (response.isSuccessful()) {
				List<Device> devices = response.body();
				if (devices != null) {
					result.setResult(devices.stream()
							.map(device -> new EndDevice(device.getDeveui(), device.getTitle(), device.getDevclass()))
							.collect(Collectors.toList()));
				}
			} else {
				result.withOk(false).withMessage(response.errorBody().string());
			}
		} catch (IOException e) {
			e.printStackTrace();
			result.withOk(false).withMessage(e.getMessage());
		}

		return result;
	}

	@Override
	public LNSResponse<EndDevice> getDevice(String devEui) {
		LNSResponse<EndDevice> result = new LNSResponse<EndDevice>().withOk(true);
		try {
			retrofit2.Response<Device> response = loriotService.getDevice(getProperties().getProperty("appid"), devEui).execute();
			if (response.isSuccessful()) {
				Device device = response.body();
				result.setResult(new EndDevice(devEui, device.getTitle(), device.getDevclass()));
			} else {
				result.withOk(false).withMessage(response.errorBody().string());
			}
		} catch (IOException e) {
			e.printStackTrace();
			result.withOk(false).withMessage(e.getMessage());
		}
		return result;
	}

	@Override
	public LNSResponse<String> sendDownlink(DownlinkData operation) {
		LNSResponse<String> result = new LNSResponse<String>().withOk(true);
		String token = null;
		try {
			retrofit2.Response<List<String>> response = loriotService.getTokens(getProperties().getProperty("appid")).execute();
			if (response.isSuccessful()) {
				token = response.body().iterator().next();
			}
		} catch (IOException e) {
			e.printStackTrace();
			result.withOk(false).withMessage(e.getMessage());
		}
		if (token != null) {
			logger.info("Will send {} to Loriot.", operation.toString());
			RestTemplate restTemplate = new RestTemplate();
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			List<MediaType> mediaTypes = new ArrayList<MediaType>();
			mediaTypes.add(MediaType.APPLICATION_JSON);
			headers.setAccept(mediaTypes);
			headers.setBearerAuth(token);
			Downlink downlink = new Downlink(operation.getDevEui(), operation.getFport(), operation.getPayload(),
					getProperties().getProperty("appid"));
			logger.info("Will send {} to Loriot.", downlink.toJson());
			try {
				DownlinkResponse response = restTemplate.postForObject(getProperties().getProperty("url") + "/1/rest",
						new HttpEntity<String>(downlink.toJson(), headers), DownlinkResponse.class);
				if (response != null) {
					result.setResult(response.getSeqdn());
				}
			} catch(HttpClientErrorException e) {
				e.printStackTrace();
				result.withOk(false).withMessage(e.getResponseBodyAsString());
			}
		}
		return result;
	}

	@Override
	public LNSResponse<Void> provisionDevice(DeviceProvisioning deviceProvisioning) {
		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);
		Device device = null;
		try {
			retrofit2.Response<Device> response = loriotService
					.getDevice(getProperties().getProperty("appid"), deviceProvisioning.getDevEUI()).execute();
			if (response.isSuccessful()) {
				device = response.body();
			}
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		if (device == null) {
			OtaaDeviceRegistration deviceCreate = new OtaaDeviceRegistration();
			deviceCreate.setTitle(deviceProvisioning.getName());
			deviceCreate.setDeveui(deviceProvisioning.getDevEUI());
			switch (deviceProvisioning.getProvisioningMode()) {
				case ABP:
					result = provisionDeviceAbp(deviceProvisioning);
					break;
				case OTAA:
				default:
					result = provisionDeviceOtaa(deviceProvisioning);
					break;
			}
		}
		return result;
	}

	private LNSResponse<Void> provisionDeviceOtaa(DeviceProvisioning deviceProvisioning) {
		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);
		OtaaDeviceRegistration deviceCreate = new OtaaDeviceRegistration();
		deviceCreate.setTitle(deviceProvisioning.getName());
		deviceCreate.setDeveui(deviceProvisioning.getDevEUI());
		deviceCreate.setAppeui(deviceProvisioning.getAppEUI());
		deviceCreate.setAppkey(deviceProvisioning.getAppKey());
		deviceCreate.setDescription("");
		deviceCreate.setDevclass(Optional.ofNullable(deviceProvisioning.getDeviceClass().name()).orElse("A"));

		try {
			retrofit2.Response<Device> response = loriotService.createDeviceOtaa(getProperties().getProperty("appid"), deviceCreate).execute();
			if (!response.isSuccessful()) {
				result.withOk(false).withMessage(response.errorBody().string());
			}
		} catch (IOException e) {
			e.printStackTrace();
			result.withOk(false).withMessage(e.getMessage());
		}
		return result;
	}

	private LNSResponse<Void> provisionDeviceAbp(DeviceProvisioning deviceProvisioning) {
		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);
		AbpDeviceRegistration deviceCreate = new AbpDeviceRegistration();
		deviceCreate.setTitle(deviceProvisioning.getName());
		deviceCreate.setDeveui(deviceProvisioning.getDevEUI());
		deviceCreate.setAppskey(deviceProvisioning.getAppSKey());
		deviceCreate.setNwkskey(deviceProvisioning.getNwkSKey());
		deviceCreate.setDevaddr(deviceProvisioning.getDevAddr());
		deviceCreate.setDescription("");
		deviceCreate.setDevclass(Optional.ofNullable(deviceProvisioning.getDeviceClass().name()).orElse("A"));

		try {
			retrofit2.Response<Device> response = loriotService.createDeviceAbp(getProperties().getProperty("appid"), deviceCreate).execute();
			if (!response.isSuccessful()) {
				result.withOk(false).withMessage(response.errorBody().string());
			}
		} catch (IOException e) {
			e.printStackTrace();
			result.withOk(false).withMessage(e.getMessage());
		}
		return result;
	}

	@Override
	public LNSResponse<Void> configureRoutings(String url, String tenant, String login, String password) {
		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);
		logger.info("Configuring routings to: {} with credentials: {}:{}", url, login, password);
		try {
			retrofit2.Response<List<Output>> outputs = loriotService.getOutputs(getProperties().getProperty("appid"))
					.execute();
			if (outputs.isSuccessful()) {
				int i = 0;
				for (Output output : outputs.body()) {
					logger.info("Detected {} output config", output.get_id());
					if (output.get_id().equals("httppush")) {
						logger.info("Deleting existing httppush output config");
						loriotService.deleteOutput(getProperties().getProperty("appid"), i).execute();
					}
					i++;
				}
			}
			HttpPush httpPush = new HttpPush(url + "/uplink",
					"Basic " + Base64.getEncoder().encodeToString((tenant + "/" + login + ":" + password).getBytes()));
			retrofit2.Response<ResponseBody> response = loriotService.createHttpPush(getProperties().getProperty("appid"), httpPush).execute();
			if (!response.isSuccessful()) {
				result.withOk(false).withMessage(response.errorBody().string());
			}
		} catch (IOException e) {
			e.printStackTrace();
			result.withOk(false).withMessage(e.getMessage());
		}
		return result;
	}

	@Override
	public LNSResponse<Void> removeRoutings(String tenant) {
		// TODO
		return new LNSResponse<Void>().withOk(false).withMessage("Not implemented");
	}

	public List<App> getApps() {
		List<App> result = new ArrayList<App>();

		try {
			result = loriotService.getApps().execute().body().getApps();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return result;
	}

	@Override
	public LNSResponse<Void> deprovisionDevice(String deveui) {
		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);
		try {
			retrofit2.Response<Device> response = loriotService.removeDevice(getProperties().getProperty("appid"), deveui).execute();
			if (!response.isSuccessful()) {
				result.withOk(false).withMessage(response.errorBody().string());
			}
		} catch (IOException e) {
			e.printStackTrace();
			result.withOk(false).withMessage(e.getMessage());
		}
		return result;
	}

	@Override
	public LNSResponse<List<Gateway>> getGateways() {
		return new LNSResponse<List<Gateway>>().withOk(false).withMessage("Not implemented");
	}

	public LNSResponse<Void> provisionGateway(lora.ns.gateway.GatewayProvisioning gatewayProvisioning) {
		return new LNSResponse<Void>().withOk(false).withMessage("Not implemented");
	}

	public LNSResponse<Void> deprovisionGateway(String id) {
		return new LNSResponse<Void>().withOk(false).withMessage("Not implemented");
	}
}
