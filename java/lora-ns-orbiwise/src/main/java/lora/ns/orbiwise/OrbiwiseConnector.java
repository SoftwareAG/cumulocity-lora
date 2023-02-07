package lora.ns.orbiwise;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.stream.Collectors;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;

import lora.codec.downlink.DownlinkData;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.connector.LNSResponse;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.gateway.Gateway;
import lora.ns.orbiwise.rest.OrbiwiseService;
import lora.ns.orbiwise.rest.model.Device;
import lora.ns.orbiwise.rest.model.DeviceCreate;
import lora.ns.orbiwise.rest.model.Pushmode;
import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

public class OrbiwiseConnector extends LNSAbstractConnector {

	private OrbiwiseService orbiwiseService;

	private final Logger logger = LoggerFactory.getLogger(OrbiwiseConnector.class);

	private enum DeviceClass {
		A(0), B(1), C(2);

		private int loraClass;

		static final Map<Integer, DeviceClass> BY_VALUE = new HashMap<>();

		static {
			for (DeviceClass f : values()) {
				BY_VALUE.put(f.loraClass, f);
			}
		}

		private DeviceClass(int loraClass) {
			this.loraClass = loraClass;
		}
	}

	class APIKeyInterceptor implements Interceptor {

		@Override
		public okhttp3.Response intercept(Chain chain) throws IOException {
			Request request = chain.request();

			request = request.newBuilder()
					.header("Authorization", "Basic " + Base64.getEncoder().encodeToString(
							(properties.getProperty("username") + ":" + properties.getProperty("password")).getBytes()))
					.header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
					.header("Accept", MediaType.APPLICATION_JSON_VALUE).build();

			okhttp3.Response response = chain.proceed(request);

			logger.info("Response code from {} {}: {}", request.method(), request.url(), response.code());

			if (!response.isSuccessful()) {
				logger.error("Error message from Orbiwan: {}", response.message());
				logger.error("Request was: {}", request);
			}

			return response;
		}

	}

	public OrbiwiseConnector(Properties properties) {
		super(properties);
	}

	public OrbiwiseConnector(ManagedObjectRepresentation instance) {
		super(instance);
	}

	@Override
	protected void init() {
		// logger.info("Initializing Retrofit client to Orbiwan API");
		OkHttpClient okHttpClient = new OkHttpClient.Builder().addInterceptor(new APIKeyInterceptor()).build();

		Retrofit retrofit = new Retrofit.Builder().client(okHttpClient).baseUrl("https://eu.saas.orbiwise.com/rest/")
				.addConverterFactory(JacksonConverterFactory.create()).build();
		orbiwiseService = retrofit.create(OrbiwiseService.class);
	}

	@Override
	public LNSResponse<List<EndDevice>> getDevices() {
		LNSResponse<List<EndDevice>> result = new LNSResponse<List<EndDevice>>().withOk(true)
				.withResult(new ArrayList<>());
		try {
			var response = orbiwiseService.getDevices().execute();
			if (response.isSuccessful()) {
				List<Device> devices = response.body();
				if (devices != null) {
					result.setResult(devices.stream()
							.map(device -> new EndDevice(device.getDeveui(), device.getDeveui(),
									DeviceClass.BY_VALUE.get(device.getLora_device_class()).name()))
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
			var response = orbiwiseService.getDevice(devEui).execute();
			if (response.isSuccessful()) {
				Device device = response.body();
				result.setResult(
						new EndDevice(devEui, devEui, DeviceClass.BY_VALUE.get(device.getLora_device_class()).name()));
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
		logger.info("Will send {} to Orbiwan.", operation.toString());

		try {
			var response = orbiwiseService
					.sendCommand(operation.getDevEui(), operation.getFport(), operation.getPayload()).execute();
			if (response.isSuccessful()) {
				result.setResult(response.body().getId().toString());
			} else {
				result.withOk(false).withMessage(response.errorBody().string());
			}
		} catch (IOException e1) {
			e1.printStackTrace();
			result.withOk(false).withMessage(e1.getMessage());
		}

		return result;
	}

	@Override
	public LNSResponse<Void> provisionDevice(DeviceProvisioning deviceProvisioning) {
		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);
		DeviceCreate deviceCreate = new DeviceCreate();
		deviceCreate.setDeveui(deviceProvisioning.getDevEUI());
		deviceCreate.setAppeui(deviceProvisioning.getAppEUI());
		deviceCreate.setAppkey(deviceProvisioning.getAppKey());
		if (deviceProvisioning.getLat() != null) {
			deviceCreate.setLatitude(deviceProvisioning.getLat());
		}
		if (deviceProvisioning.getLng() != null) {
			deviceCreate.setLongitude(deviceProvisioning.getLng());
		}

		try {
			var response = orbiwiseService.createDevice(deviceCreate).execute();
			if (!response.isSuccessful()) {
				result.withOk(false).withMessage(response.errorBody().string());
				logger.error("Error from Orbiwan: {}", response.errorBody().string());
			}
		} catch (IOException e) {
			e.printStackTrace();
			result.withOk(false).withMessage(e.getMessage());
		}
		return result;
	}

	public LNSResponse<Void> configureRouting(String url, String tenant, String login, String password,
			String subscriptions) {
		assert orbiwiseService != null : "orbiwiseService is not initialized";

		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);

		Pushmode pushmode = new Pushmode();
		pushmode.setAuth_string(
				"Basic " + Base64.getEncoder().encodeToString((tenant + "/" + login + ":" + password).getBytes()));
		pushmode.setData_format("hex");
		pushmode.setEnabled(true);
		URL urlObject = null;
		try {
			urlObject = new URL(url);
		} catch (MalformedURLException e1) {
			e1.printStackTrace();
		}
		pushmode.setHost(urlObject.getProtocol() + "://" + urlObject.getHost());
		pushmode.setPath_prefix(urlObject.getPath());
		pushmode.setPort(urlObject.getDefaultPort());
		pushmode.setPush_subscription(subscriptions);
		pushmode.setRetry_policy(1);

		try {
			var response = orbiwiseService.createHttpRouting(pushmode).execute();
			if (!response.isSuccessful()) {
				logger.error("Error from Orbiwan: {}", response.errorBody().string());
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
		logger.info("Configuring routings to: {} with credentials: {}:{}", url, login, password);
		return configureRouting(url, tenant, login, password, "payloads_dl,payloads_ul");
	}

	@Override
	public LNSResponse<Void> removeRoutings() {
		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);
		try {
			var response = orbiwiseService.stopRouting().execute();
			if (!response.isSuccessful()) {
				result.withOk(false).withMessage(response.errorBody().string());
			}
		} catch (IOException e1) {
			e1.printStackTrace();
			result.withOk(false).withMessage(e1.getMessage());
		}
		return result;
	}

	@Override
	public LNSResponse<Void> deprovisionDevice(String deveui) {
		LNSResponse<Void> result = new LNSResponse<Void>().withOk(true);
		try {
			var response = orbiwiseService.deprovisionDevice(deveui).execute();
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
		return new LNSResponse<List<Gateway>>().withOk(true).withResult(new ArrayList<>());
	}

	public LNSResponse<Void> provisionGateway(lora.ns.gateway.GatewayProvisioning gatewayProvisioning) {
		return new LNSResponse<Void>().withOk(false).withMessage("Not implemented.");
	}

	public LNSResponse<Void> deprovisionGateway(String id) {
		return new LNSResponse<Void>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public boolean hasGatewayManagementCapability() {
		return false;
	}
}
