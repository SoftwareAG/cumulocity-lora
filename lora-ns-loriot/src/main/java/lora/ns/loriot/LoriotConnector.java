package lora.ns.loriot;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Properties;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import lora.codec.DownlinkData;
import lora.ns.DeviceProvisioning;
import lora.ns.EndDevice;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.loriot.rest.LoriotService;
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
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

public class LoriotConnector extends LNSAbstractConnector {

	private LoriotService loriotService;
	private String sessionId;

	private final Logger logger = LoggerFactory.getLogger(getClass());

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
			Session session = restTemplate.postForObject(getProperties().getProperty("url") + "/1/pub/login", new HttpEntity<String>(request, headers), Session.class);
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
	public List<EndDevice> getDevices() {
		List<EndDevice> result = new ArrayList<EndDevice>();
		try {
			retrofit2.Response<List<Device>> response = loriotService.getDevices(getProperties().getProperty("appid")).execute();
			List<Device> devices = response.body();
			if (devices != null) {
				result = devices.stream().map(
						device -> new EndDevice(device.getDeveui(), device.getTitle(), device.getDevclass()))
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
			Device device = loriotService.getDevice(getProperties().getProperty("appid"), devEui).execute().body();
			result = new EndDevice(devEui, device.getTitle(), device.getDevclass());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return Optional.ofNullable(result);
	}

	@Override
	public String sendDownlink(DownlinkData operation) {
		String token = null;
		try {
			List<String> tokens = loriotService.getTokens(getProperties().getProperty("appid")).execute().body();
			token = tokens.iterator().next();
		} catch (IOException e) {
			e.printStackTrace();
		}
		logger.info("Will send {} to Loriot.", operation.toString());
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		List<MediaType> mediaTypes = new ArrayList<MediaType>();
		mediaTypes.add(MediaType.APPLICATION_JSON);
		headers.setAccept(mediaTypes);
		headers.setBearerAuth(token);
		Downlink downlink = new Downlink(operation.getDevEui(), operation.getFport(), operation.getPayload(), getProperties().getProperty("appid"));
		logger.info("Will send {} to Loriot.", downlink.toJson());
		DownlinkResponse response = restTemplate.postForObject(getProperties().getProperty("url") + "/1/rest", new HttpEntity<String>(downlink.toJson(), headers), DownlinkResponse.class);

		return response != null ? response.getSeqdn() : null;
	}

	@Override
	public boolean provisionDevice(DeviceProvisioning deviceProvisioning) {
		boolean result = false;
		Device device = null;
		try {
			retrofit2.Response<Device> response = loriotService.getDevice(getProperties().getProperty("appid"), deviceProvisioning.getDevEUI()).execute();
			if (response.code() == 200) {
				device = response.body();
			}
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		if (device == null) {
			OtaaDeviceRegistration deviceCreate = new OtaaDeviceRegistration();
			deviceCreate.setTitle(deviceProvisioning.getName());
			deviceCreate.setDeveui(deviceProvisioning.getDevEUI());
			deviceCreate.setAppeui(deviceProvisioning.getAppEUI());
			deviceCreate.setAppkey(deviceProvisioning.getAppKey());
			deviceCreate.setDescription("");
			deviceCreate.setDevclass("A");
	
			try {
				result = loriotService.createDevice(getProperties().getProperty("appid"), deviceCreate).execute().isSuccessful();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	@Override
	public void configureRoutings(String url, String tenant, String login, String password) {
		logger.info("Configuring routings to: {} with credentials: {}:{}", url, login, password);
		try {
			retrofit2.Response<List<Output>> outputs = loriotService.getOutputs(getProperties().getProperty("appid")).execute();
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
			HttpPush httpPush = new HttpPush(url + "/uplink", "Basic " + Base64.getEncoder().encodeToString((tenant + "/" + login + ":" + password).getBytes()));
			loriotService.createHttpPush(getProperties().getProperty("appid"), httpPush).execute();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void removeRoutings() {
		//TODO
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
	public boolean deprovisionDevice(String deveui) {
		boolean result = false;
		try {
			result = loriotService.removeDevice(getProperties().getProperty("appid"), deveui).execute().isSuccessful();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}
}
