package lora.codec.semtech;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import com.cumulocity.rest.representation.event.EventRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.operation.OperationRepresentation;
import com.cumulocity.sdk.client.devicecontrol.DeviceControlApi;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import c8y.Command;
import c8y.Position;
import lora.codec.DeviceCodec;
import lora.codec.downlink.DeviceOperation;
import lora.codec.downlink.DownlinkData;
import lora.codec.downlink.Encode;
import lora.codec.uplink.C8YData;
import lora.codec.uplink.Decode;
import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

@Component
public class SemtechCodec extends DeviceCodec {

	/**
	 *
	 */
	private static final String DAS_LORACLOUD_URL = "https://das.loracloud.com/api/v1/device/";

	private final Logger logger = LoggerFactory.getLogger(SemtechCodec.class);

	class AuthorizationInterceptor implements Interceptor {

		@Override
		public Response intercept(Chain chain) throws IOException {
			Request request = chain.request();

			request = request.newBuilder().header("Authorization", System.getenv("LORACLOUD_DAS_TOKEN"))
					.header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
					.header("Accept", MediaType.APPLICATION_JSON_VALUE).build();

			Response response = chain.proceed(request);

			logger.info("Response code from {} {}: {}", request.method(), request.url(), response.code());

			if (!response.isSuccessful()) {
				logger.error("Error message from Objenious: {}", response.message());
				logger.error("Request was: {}", request);
			}

			return response;
		}

	}

	private LoraCloudService loraCloudService;

	public SemtechCodec() {
		logger.info("Adding supported models...");
		models.put("lr1110", "LR1110 with DAS");
		logger.info("Configuring LoRa Cloud DAS access...");
		var okHttpClient = new OkHttpClient.Builder().addInterceptor(new AuthorizationInterceptor()).build();

		var retrofit = new Retrofit.Builder().client(okHttpClient).baseUrl(DAS_LORACLOUD_URL)
				.addConverterFactory(JacksonConverterFactory.create()).build();
		loraCloudService = retrofit.create(LoraCloudService.class);
		logger.info("Init done.");
	}

	private static final String DAS_MODEM_MSG = "{\"deveui\": \"%s\", \"uplink\": {\"msgtype\": \"modem\", \"fcnt\":%d, \"payload\": \"%s\"}}";
	private static final String DAS_MODEM_MSG_WITH_POS = "{\"deveui\": \"%s\", \"uplink\": {\"msgtype\": \"modem\", \"fcnt\":%d, \"payload\": \"%s\", \"gnss_assist_position\": [%f, %f], \"gnss_assist_altitude\": %f}}";
	private static final String DAS_MSG = "{\"deveui\": \"%s\", \"uplink\": {\"msgtype\": \"%s\", \"payload\": \"%s\"}}";

	private Map<String, Integer> fcnts = new HashMap<>();

	@Autowired
	private DeviceControlApi deviceControlApi;

	@Override
	public String getId() {
		return "semtech";
	}

	@Override
	protected DownlinkData encode(ManagedObjectRepresentation mor, Encode encode) {
		DownlinkData data = new DownlinkData();

		return data;
	}

	@Override
	public String getName() {
		return "Semtech";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}

	private String formatEUI(String eui) {
		var result = new StringBuilder();
		var separator = '-';
		char[] chars = eui.toUpperCase().toCharArray();
		for (int i = 0; i < chars.length; i++) {
			result.append(chars[i]);
			if ((i + 1) % 2 == 0 && (i+1) < chars.length) {
				result.append(separator);
			}
		}
		return result.toString();
	}

	private JsonNode getDeviceInfo(String devEui) {
		String eui = formatEUI(devEui);
		var message = String.format("{\"deveuis\": [\"%s\"]}", eui);
		JsonNode result = null;
		try {
			var response = loraCloudService.getDeviceInfo(RequestBody.create(okhttp3.MediaType.parse("application/json; charset=utf-8"), message)).execute();
			if (response.isSuccessful()) {
				var mapper = new ObjectMapper();
				result = mapper.readTree(response.body().string()).get("result");
				logger.info("Answer of LoRa Cloud DAS is {} with content {}", response.code(), result.toString());
			} else {
				logger.error("Something went wrong while calling LoRa Cloud DAS: {}", response.errorBody().string());
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		return result;
	}

	private JsonNode sendToDAS(String message) {
		JsonNode result = null;
		try {
			var response = loraCloudService.sendData(RequestBody.create(okhttp3.MediaType.parse("application/json; charset=utf-8"), message)).execute();
			if (response.isSuccessful()) {
				var mapper = new ObjectMapper();
				result = mapper.readTree(response.body().string()).get("result");
				logger.info("Answer of LoRa Cloud DAS is {} with content {}", response.code(), result.toString());
			} else {
				logger.error("Something went wrong while calling LoRa Cloud DAS: {}", response.errorBody().string());
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}

	private JsonNode sendWifiRequest(String devEui, String payload) {
		String eui = formatEUI(devEui);
		String wifipayload = "01" + payload.substring(4);
		var message = String.format(DAS_MSG, eui, "wifi", wifipayload);
		return sendToDAS(message);
	}

	private JsonNode sendGnssRequest(String devEui, String payload) {
		String eui = formatEUI(devEui);
		String gnsspayload = payload.substring(4);
		var message = String.format(DAS_MSG, eui, "gnss", gnsspayload);
		return sendToDAS(message);
	}

	private Integer getFcnt(String devEui) {
		logger.info("Getting current fcnt for device {}", devEui);
		Integer result = 0;
		if (fcnts.containsKey(devEui)) {
			result = fcnts.get(devEui) + 1;
			logger.info("Current fcnt for device {} is in cache: {}", devEui, result);
		} else {
			logger.info("Current fcnt for device {} is not in cache, will get it from loracloud DAS", devEui);
			JsonNode root = getDeviceInfo(devEui);
			if (root != null) {
				String eui = formatEUI(devEui);
				JsonNode fcntNode = root.at("/" + eui + "/result/last_uplink/fcnt");
				if (!fcntNode.isMissingNode()) {
					logger.info("Current fcnt for device {} retrieved from loracloud DAS: {}", devEui,
							fcntNode.asInt());
					result = fcntNode.asInt() + 1;
				}
			}
		}
		logger.info("New fcnt for device {}: {}", devEui, result);
		fcnts.put(devEui, result);
		return result;
	}

	private void updatePosition(ManagedObjectRepresentation mor, C8YData c8yData, JsonNode positionSolution, String positioningType) {
		JsonNode llh = positionSolution.at("/position_solution/llh");
		if (!llh.isMissingNode()) {
			BigDecimal timestamp = positionSolution.at("/position_solution/timestamp").decimalValue();
			BigDecimal lat = llh.get(0).decimalValue();
			BigDecimal lng = llh.get(1).decimalValue();
			BigDecimal alt = llh.get(2).decimalValue();
			Position p = new Position();
			p.setLat(lat);
			p.setLng(lng);
			p.setAlt(alt);
			mor.set(p);
			c8yData.updateRootDevice(mor);
			EventRepresentation locationUpdate = new EventRepresentation();
			locationUpdate.setSource(mor);
			locationUpdate.setType("c8y_LocationUpdate");
			locationUpdate.set(p);
			locationUpdate.setText("Location updated");
			locationUpdate.setDateTime(new DateTime(timestamp.multiply(BigDecimal.valueOf(1000)).longValue()));
			locationUpdate.setProperty("positioningType", positioningType);
			c8yData.addEvent(locationUpdate);
		}
	}

	@Override
	protected C8YData decode(ManagedObjectRepresentation mor, Decode decode) {
		var c8yData = new C8YData();

		if (decode.getFPort() == 199) {
			logger.info("Modem payload will be sent to DAS.");
			Position p = inventoryApi.get(mor.getId()).get(Position.class);
			JsonNode root = null;
			if (p != null) {
				logger.info("Will use assisted position: {}", p);
				root = sendToDAS(String.format(DAS_MODEM_MSG_WITH_POS, formatEUI(decode.getDeveui()), getFcnt(decode.getDeveui()), decode.getPayload(), p.getLat().doubleValue(), p.getLng().doubleValue(), p.getAlt().doubleValue()));
			} else {
				root = sendToDAS(String.format(DAS_MODEM_MSG, formatEUI(decode.getDeveui()), getFcnt(decode.getDeveui()), decode.getPayload()));
			}
			if (root != null) {
				JsonNode tempNode = root.at("/info_fields/temp");
				if (!tempNode.isMissingNode() && !tempNode.isNull()) {
					logger.info("Message from DAS contains temperature infos, will send measurement to c8y.");
					BigDecimal temp = tempNode.get("value").decimalValue();
					BigDecimal timestamp = tempNode.get("timestamp").decimalValue();
					DateTime mDate = new DateTime(timestamp.multiply(BigDecimal.valueOf(1000)).longValue());
					logger.info("Measurement date is: {}", mDate);
					c8yData.addMeasurement(mor, "Temperature", "T", "°C", temp,
							mDate);
				}
				if (root.has("dnlink") && !root.get("dnlink").isNull()) {
					logger.info("Message from DAS contains a downlink, sending it to device.");
					int port = root.get("dnlink").get("port").asInt();
					String payload = root.get("dnlink").get("payload").asText();
					OperationRepresentation op = new OperationRepresentation();
					op.setDeviceId(mor.getId());
					Command command = new Command("raw " + port + " " + payload);
					op.set(command);
					deviceControlApi.create(op);
				}
				if (root.has("stream_records") && !root.get("stream_records").isNull()) {
					logger.info("Message from DAS contains stream records.");
					for (JsonNode streamRecord : root.get("stream_records")) {
						String payload = streamRecord.get(1).asText();
						if (payload.startsWith("08")) {
							updatePosition(mor, c8yData, sendWifiRequest(decode.getDeveui(), payload), "WiFi");
						}
						if (payload.startsWith("06") || payload.startsWith("07")) {
							updatePosition(mor, c8yData, sendGnssRequest(decode.getDeveui(), payload), "GNSS");
						}
					}
				}
			}
		}
		return c8yData;
	}

	@Override
	public DownlinkData askDeviceConfig(String devEui) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, DeviceOperation> getAvailableOperations(String model) {
		Map<String, DeviceOperation> result = new HashMap<String, DeviceOperation>();
		return result;
	}

	@Override
	protected Map<String, String> getChildDevicesNames() {
		// TODO Auto-generated method stub
		return null;
	}

}
