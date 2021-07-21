package lora.ns.orbiwise;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;
import java.util.stream.Collectors;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;

import lora.codec.DownlinkData;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.gateway.Gateway;
import lora.ns.orbiwise.rest.OrbiwiseService;
import lora.ns.orbiwise.rest.model.Device;
import lora.ns.orbiwise.rest.model.DeviceCreate;
import lora.ns.orbiwise.rest.model.DownlinkResponse;
import lora.ns.orbiwise.rest.model.Pushmode;
import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.ResponseBody;
import retrofit2.Response;
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
	public List<EndDevice> getDevices() {
		List<EndDevice> result = new ArrayList<EndDevice>();
		try {
			retrofit2.Response<List<Device>> response = orbiwiseService.getDevices().execute();
			List<Device> devices = response.body();
			if (devices != null) {
				result = devices.stream()
						.map(device -> new EndDevice(device.getDeveui(), device.getDeveui(),
								DeviceClass.BY_VALUE.get(device.getLora_device_class()).name()))
						.collect(Collectors.toList());
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		return result;
	}

	@Override
	public Optional<EndDevice> getDevice(String devEui) {
		EndDevice result = null;
		try {
			Device device = orbiwiseService.getDevice(devEui).execute().body();
			result = new EndDevice(devEui, devEui, DeviceClass.BY_VALUE.get(device.getLora_device_class()).name());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return Optional.ofNullable(result);
	}

	@Override
	public String sendDownlink(DownlinkData operation) {
		String result = null;
		logger.info("Will send {} to Orbiwan.", operation.toString());

		try {
			retrofit2.Response<DownlinkResponse> response = orbiwiseService
					.sendCommand(operation.getDevEui(), operation.getFport(), operation.getPayload()).execute();
			if (response.isSuccessful()) {
				result = response.body().getId().toString();
			}
		} catch (IOException e1) {
			e1.printStackTrace();
		}

		return result;
	}

	@Override
	public boolean provisionDevice(DeviceProvisioning deviceProvisioning) {
		boolean result = false;
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
			Response<ResponseBody> response = orbiwiseService.createDevice(deviceCreate).execute();
			result = response.isSuccessful();
			if (!response.isSuccessful()) {
				logger.error("Error from Orbiwan: {}", response.errorBody().string());
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}

	public void configureRouting(String url, String tenant, String login, String password, String subscriptions) {
		assert orbiwiseService != null : "orbiwiseService is not initialized";

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
			retrofit2.Response<ResponseBody> response = orbiwiseService.createHttpRouting(pushmode).execute();
			if (!response.isSuccessful()) {
				logger.error("Error from Orbiwan: {}", response.errorBody().string());
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void configureRoutings(String url, String tenant, String login, String password) {
		logger.info("Configuring routings to: {} with credentials: {}:{}", url, login, password);
		configureRouting(url, tenant, login, password, "payloads_dl,payloads_ul");
	}

	@Override
	public void removeRoutings(String tenant) {
		try {
			orbiwiseService.stopRouting().execute();
		} catch (

		IOException e1) {
			e1.printStackTrace();
		}
	}

	@Override
	public boolean deprovisionDevice(String deveui) {
		boolean result = false;
		try {
			result = orbiwiseService.deprovisionDevice(deveui).execute().isSuccessful();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public List<Gateway> getGateways() {
		return new ArrayList<>();
	}
}
