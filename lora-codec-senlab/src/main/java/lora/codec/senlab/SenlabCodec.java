package lora.codec.senlab;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormatter;
import org.joda.time.format.ISODateTimeFormat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.google.common.collect.Lists;
import com.google.common.io.BaseEncoding;

import lora.codec.C8YData;
import lora.codec.DeviceCodec;
import lora.codec.DownlinkData;

@Component
public class SenlabCodec extends DeviceCodec {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	private Map<String, String> models = new HashMap<>();
	{
		models.put("Senlab 4-20mA", "SenlabA");
		models.put("Senlab Digital", "SenlabD");
		models.put("Senlab humidity", "SenlabH");
		models.put("Senlab Meter", "SenlabM");
		models.put("Senlab occupancy", "SenlabO");
		models.put("Senlab Passage", "SenlabP");
		models.put("SenlabR", "SenlabR");
		models.put("Senlab temperature", "SenlabT");
		models.put("Senlab Valve", "SenlabV");
	}

	private static final Map<String, Map<String, Map<String, Map<String, String>>>> modelDescs = new HashMap<>();

	@Override
	public String getId() {
		return "senlab";
	}

	@Override
	protected DownlinkData encode(ManagedObjectRepresentation mor, String model, String operation) {
		DownlinkData data = new DownlinkData();

		String authentication = subscriptionsService.getCredentials(subscriptionsService.getTenant()).get()
				.toCumulocityCredentials().getAuthenticationString();
		RestTemplate restTemplate = new RestTemplate();
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", authentication);
			headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
			ObjectMapper mapper = new ObjectMapper();
			ResponseEntity<String> response = restTemplate.exchange(
					System.getenv("C8Y_BASEURL") + "/service/slcodec/" + model + "/encodeRequest", HttpMethod.POST,
					new HttpEntity<String>(operation, headers), String.class);
			logger.info("Answer of Sensing Labs decoder is {} with content {}", response.getStatusCode(),
					response.getBody());
			String result = response.getBody();
			JsonNode root = mapper.readTree(result);
			int port = root.get("port").asInt();
			String payload = root.get("payload").asText();
			data.setFport(port);
			data.setPayload(payload);
		} catch (HttpClientErrorException e) {
			e.printStackTrace();
			logger.error(e.getResponseBodyAsString());
		} catch (IOException e) {
			e.printStackTrace();
		}

		return data;
	}

	@Override
	public String getName() {
		return "Sensing Labs";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}

	@Override
	protected C8YData decode(ManagedObjectRepresentation mor, String model, int fport, DateTime updateTime,
			byte[] payload) {
		C8YData c8yData = new C8YData();

		String spayload = BaseEncoding.base16().encode(payload);
		String authentication = subscriptionsService.getCredentials(subscriptionsService.getTenant()).get()
				.toCumulocityCredentials().getAuthenticationString();
		DateTimeFormatter fmt = ISODateTimeFormat.dateTime();
		String message = "{\"port\":" + fport + ",\"payload\":\"" + spayload + "\",\"timestamp\":\""
				+ fmt.print(updateTime) + "\"}";

		RestTemplate restTemplate = new RestTemplate();
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", authentication);
			headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
			ObjectMapper mapper = new ObjectMapper();
			ResponseEntity<String> response = restTemplate.exchange(
					System.getenv("C8Y_BASEURL") + "/service/slcodec/" + model + "/decodeMessage", HttpMethod.POST,
					new HttpEntity<String>(message, headers), String.class);
			logger.info("Answer of Sensing Labs decoder is {} with content {}", response.getStatusCode(),
					response.getBody());
			String result = response.getBody();
			JsonNode root = mapper.readTree(result);
			ArrayNode measures = (ArrayNode) root.get("measures");
			if (!modelDescs.containsKey(models.get(model))) {
				addModelDesc(model);
			}
			measures.forEach(measure -> {
				String fragment = measure.get("id").asText();
				String series = "" + fragment.charAt(0);
				String unit = "";
				if (modelDescs.get(models.get(model)).get("measures").containsKey(measure.get("id").asText())) {
					fragment = modelDescs.get(models.get(model)).get("measures").get(measure.get("id").asText())
							.get("name");
					series = "" + fragment.charAt(0);
					unit = modelDescs.get(models.get(model)).get("measures").get(measure.get("id").asText())
							.get("unit");
					if (fragment.toLowerCase().contains("battery")) {
						fragment = "c8y_Battery";
						series = "level";
						unit = "%";
						mor.setLastUpdatedDateTime(null);
						mor.setProperty("battery", new BigDecimal(measure.get("value").asDouble()));
						c8yData.setMorToUpdate(mor);
					}
				} else {
					logger.error("Unknown measure: {}, will use id with no unit", measure.get("id"));
				}
				c8yData.addMeasurement(mor, fragment, series, unit, new BigDecimal(measure.get("value").asDouble()),
						new DateTime(measure.get("timestamp").asLong()));
			});
		} catch (HttpClientErrorException e) {
			e.printStackTrace();
			logger.error(e.getResponseBodyAsString());
		} catch (IOException e) {
			e.printStackTrace();
		}

		return c8yData;
	}

	private void addModelDesc(String model) {
		String authentication = subscriptionsService.getCredentials(subscriptionsService.getTenant()).get()
				.toCumulocityCredentials().getAuthenticationString();
		RestTemplate restTemplate = new RestTemplate();
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", authentication);
			headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
			ResponseEntity<String> response = restTemplate.exchange(
					System.getenv("C8Y_BASEURL") + "/service/slcodec/" + model, HttpMethod.GET,
					new HttpEntity<String>("", headers), String.class);
			ObjectMapper mapper = new ObjectMapper();
			JsonNode desc = mapper.readTree(response.getBody());
			modelDescs.put(models.get(model), new HashMap<>());
			modelDescs.get(models.get(model)).put("measures", new HashMap<>());
			ArrayNode measures = (ArrayNode) desc.get("measures");
			measures.forEach(measure -> {
				modelDescs.get(models.get(model)).get("measures").put(measure.get("id").asText(), new HashMap<>());
				modelDescs.get(models.get(model)).get("measures").get(measure.get("id").asText()).put("unit",
						measure.get("unit").asText());
				modelDescs.get(models.get(model)).get("measures").get(measure.get("id").asText()).put("name",
						measure.get("name").asText());
			});
		} catch (HttpClientErrorException e) {
			e.printStackTrace();
			logger.error(e.getResponseBodyAsString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public List<String> getModels() {
		return Lists.newArrayList(models.keySet());
	}

}
