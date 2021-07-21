package lora.ns.actility;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lora.codec.DownlinkData;
import lora.ns.actility.rest.ActilityAdminService;
import lora.ns.actility.rest.ActilityCoreService;
import lora.ns.actility.rest.JwtInterceptor;
import lora.ns.actility.rest.model.Connection;
import lora.ns.actility.rest.model.ConnectionHttpConfig;
import lora.ns.actility.rest.model.ConnectionRequest;
import lora.ns.actility.rest.model.Route;
import lora.ns.actility.rest.model.Token;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.gateway.Gateway;
import okhttp3.OkHttpClient;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

public class ActilityConnector extends LNSAbstractConnector {

	private ActilityCoreService actilityCoreService;
	private ActilityAdminService actilityAdminService;
	
	private String downlinkAsId;
	private String downlinkAsKey;
	private String routeRef;

	private final Logger logger = LoggerFactory.getLogger(ActilityConnector.class);

	class DXAdminJWTInterceptor extends JwtInterceptor {

		public DXAdminJWTInterceptor(String clientId, String clientSecret) {
			super(clientId, clientSecret);
		}

		@Override
		protected String getToken() {
			String token = null;
			try {
				Response<Token> response;
				response = actilityAdminService.getToken("client_credentials", this.clientId, this.clientSecret).execute();
				if (response.isSuccessful() && response.body() != null) {
					token = response.body().getAccessToken();
					logger.info("Successfully received a JWT: {}", token);
				} else {
					logger.error("Can't obtain a JWT with the following reponse: {}", response.errorBody().string());
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
			return token;
		}
	}

	public ActilityConnector(Properties properties) {
		super(properties);
	}

	public ActilityConnector(ManagedObjectRepresentation instance) {
		super(instance);
	}

	@Override
	protected void init() {
		OkHttpClient dxClient = new OkHttpClient.Builder().addInterceptor(new DXAdminJWTInterceptor(properties.getProperty("username"), properties.getProperty("password"))).build();

		String domain = properties.getProperty("domain");

		Retrofit core = new Retrofit.Builder().client(dxClient).baseUrl("https://"+domain+".thingpark.io/thingpark/dx/core/latest/api/")
				.addConverterFactory(JacksonConverterFactory.create()).build();
		Retrofit admin = new Retrofit.Builder().baseUrl("https://"+domain+".thingpark.io/iot-flow/v1/")
				.addConverterFactory(JacksonConverterFactory.create()).build();
		actilityCoreService = core.create(ActilityCoreService.class);
		actilityAdminService = admin.create(ActilityAdminService.class);
	}

	@Override
	public List<EndDevice> getDevices() {
		List<EndDevice> result = new ArrayList<EndDevice>();

		return result;
	}

	@Override
	public Optional<EndDevice> getDevice(String devEui) {
		EndDevice result = null;
		return Optional.ofNullable(result);
	}

	@Override
	public String sendDownlink(DownlinkData operation) {
		String result = null;
		logger.info("Will send {} to Thingpark.", operation.toString());

		return result;
	}

	@Override
	public boolean provisionDevice(DeviceProvisioning deviceProvisioning) {
		boolean result = false;
		return result;
	}

	@Override
	public void configureRoutings(String url, String tenant, String login, String password) {
		logger.info("Configuring routings to: {} with credentials: {}:{}", url, login, password);

		removeRoutings(tenant);

		ConnectionRequest connectionRequest = new ConnectionRequest();
		ConnectionHttpConfig configuration = new ConnectionHttpConfig();
		configuration.setDestinationURL(url);
		configuration.getHeaders().put("Authorization", "Basic " + Base64.getEncoder().encodeToString((tenant + "/" + login + ":" + password).getBytes()));
		connectionRequest.setConfiguration(configuration);
		connectionRequest.setName(tenant + "-" + this.getId());

		Connection connection;
		try {
			Response<Connection> response = actilityCoreService.createConnection(connectionRequest).execute();
			if (response.isSuccessful()) {
				connection = response.body();
				this.downlinkAsId = connection.getConfiguration().getDownlinkAsId();
				this.downlinkAsKey = connection.getConfiguration().getDownlinkAsKey();
				logger.info("Created new connection: {}", connection);
				Response<List<Route>> response2 = actilityCoreService.getRoutes().execute();
				if (response2.isSuccessful()) {
					for(Route route: response2.body()) {
						if (route.getName().equals(tenant + "-" + this.getId())) {
							this.routeRef = route.getRef();
						}
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void removeRoutings(String tenant) {
		try {
			Response<List<Connection>> response = actilityCoreService.getConnections().execute();
			if (response.isSuccessful()) {
				response.body().forEach(connection -> {
					if (connection.getName().equals(tenant + "-" + this.getId())) {
						actilityCoreService.deleteConnection(connection.getId());
					}
				});
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public boolean deprovisionDevice(String deveui) {
		boolean result = false;
		return result;
	}

	@Override
	public List<Gateway> getGateways() {
		return new ArrayList<>();
	}
}
