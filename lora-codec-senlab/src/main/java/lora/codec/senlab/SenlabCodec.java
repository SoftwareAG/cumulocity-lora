package lora.codec.senlab;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
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
import lora.codec.DeviceOperation;
import lora.codec.DeviceOperationParam;
import lora.codec.DeviceOperationParam.ParamType;
import lora.codec.DownlinkData;

@Component
public class SenlabCodec extends DeviceCodec {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	{
		models.put("SenlabA", "Senlab 4-20mA");
		models.put("SenlabD", "Senlab Digital");
		models.put("SenlabH", "Senlab humidity");
		models.put("SenlabM", "Senlab Meter");
		models.put("SenlabO", "Senlab occupancy");
		models.put("SenlabP", "Senlab Passage");
		models.put("SenlabR", "SenlabR");
		models.put("SenlabT", "Senlab temperature");
		models.put("SenlabV", "Senlab Valve");
	}

	private static final Map<String, Map<String, Map<String, Map<String, String>>>> modelDescs = new HashMap<>();

	@Override
	public String getId() {
		return "senlab";
	}

	@Override
	protected DownlinkData encode(ManagedObjectRepresentation mor, String model, String operation) {
		DownlinkData data = new DownlinkData();
		ObjectMapper mapper = new ObjectMapper();
		JsonNode root;
		String senlabOp = null;
		try {
			root = mapper.readTree(operation);
			String command = root.fieldNames().next();
			senlabOp = "{\"id\":\"" + command + "\", \"parameters\": [";
			JsonNode params = root.get(command);
			Iterator<String> paramNames = params.fieldNames();
			if (paramNames != null && paramNames.hasNext()) {
				String paramName = paramNames.next();
				senlabOp += "{\"id\":\"" + paramName + "\", \"value\": \"" + params.get(paramName).asText() + "\"}";
				while(paramNames.hasNext()) {
					paramName = paramNames.next();
					senlabOp += ",{\"id\":\"" + paramName + "\", \"value\": \"" + params.get(paramName).asText() + "\"}";
				}
			}
			senlabOp += "]}";
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		logger.info("Will encode operation {}", senlabOp);
		String authentication = subscriptionsService.getCredentials(subscriptionsService.getTenant()).get()
				.toCumulocityCredentials().getAuthenticationString();
		RestTemplate restTemplate = new RestTemplate();
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", authentication);
			headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
			mapper = new ObjectMapper();
			ResponseEntity<String> response = restTemplate.exchange(
					System.getenv("C8Y_BASEURL") + "/service/slcodec/" + model + "/encodeRequest", HttpMethod.POST,
					new HttpEntity<String>(senlabOp, headers), String.class);
			logger.info("Answer of Sensing Labs decoder is {} with content {}", response.getStatusCode(),
					response.getBody());
			String result = response.getBody();
			root = mapper.readTree(result);
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
			if (!modelDescs.containsKey(model)) {
				addModelDesc(model);
			}
			measures.forEach(measure -> {
				if (measure.has("value") && measure.get("value") != null) {
					String fragment = measure.get("id").asText();
					String series = "" + fragment.charAt(0);
					String unit = "";
					if (modelDescs.get(model).get("measures").containsKey(measure.get("id").asText())) {
						fragment = modelDescs.get(model).get("measures").get(measure.get("id").asText()).get("name");
						series = "" + fragment.charAt(0);
						unit = modelDescs.get(model).get("measures").get(measure.get("id").asText()).get("unit");
						if (unit == null || unit.equals("null")) {
							unit = "";
						}
						if (fragment.toLowerCase().contains("battery")) {
							fragment = "c8y_Battery";
							series = "level";
							unit = "%";
							mor.setLastUpdatedDateTime(null);
							mor.setProperty("battery", measure.get("value").decimalValue());
							c8yData.setMorToUpdate(mor);
						}
					} else {
						logger.error("Unknown measure: {}, will use id with no unit", measure.get("id"));
					}
					c8yData.addMeasurement(mor, fragment, series, unit, measure.get("value").decimalValue(),
							new DateTime(measure.get("timestamp").asLong()));
				} else {
					logger.info("{} has no value or has an invalid value.", measure.get("id"));
				}
			});
		} catch (HttpClientErrorException e) {
			e.printStackTrace();
			logger.error(e.getResponseBodyAsString());
		} catch (IOException e) {
			e.printStackTrace();
		}

		return c8yData;
	}

	private JsonNode getModelDetails(String model) {
		JsonNode result = null;
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
			result = mapper.readTree(response.getBody());
		} catch (HttpClientErrorException e) {
			e.printStackTrace();
			logger.error(e.getResponseBodyAsString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}

	private void addModelDesc(String model) {
		JsonNode desc = getModelDetails(model);
		modelDescs.put(model, new HashMap<>());
		modelDescs.get(model).put("measures", new HashMap<>());
		ArrayNode measures = (ArrayNode) desc.get("measures");
		measures.forEach(measure -> {
			modelDescs.get(model).get("measures").put(measure.get("id").asText(), new HashMap<>());
			modelDescs.get(model).get("measures").get(measure.get("id").asText()).put("unit",
					measure.get("unit").asText());
			modelDescs.get(model).get("measures").get(measure.get("id").asText()).put("name",
					measure.get("name").asText());
		});
	}

	@Override
	public DownlinkData askDeviceConfig(String devEui) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, DeviceOperation> getAvailableOperations(String model) {
		Map<String, DeviceOperation> result = new HashMap<String, DeviceOperation>();
		JsonNode desc = getModelDetails(model);
		ArrayNode operations = (ArrayNode) desc.get("operations");
		ArrayNode params = (ArrayNode) desc.get("parameters");
		Map<String, JsonNode> paramMap = new HashMap<String, JsonNode>();
		params.forEach(param -> {
			paramMap.put(param.get("id").asText(), param);
		});
		operations.forEach(o -> {
			String[] paramIds = null;
			if (o.get("in") != null) {
				paramIds = o.get("in").asText().split(",");
			}
			List<DeviceOperationParam> opParams = new ArrayList<>();
			if (paramIds != null) {
				for (String paramId : paramIds) {
					paramId = paramId.trim();
					JsonNode param = paramMap.get(paramId);
					if (param != null) {
						ParamType type = param != null && param.has("is") ? param.get("is").asText().contains("INT") ? ParamType.INTEGER : ParamType.valueOf(param.get("is").asText()) : null;
						opParams.add(new DeviceOperationParam(paramId, param.get("name").asText(), type, null));
					} else {
						logger.error("Param {} is not defined.", paramId);
					}
				}
			}
			result.put(o.get("id").asText(), new DeviceOperation(o.get("id").asText(), o.get("name").asText(), opParams));
		});
		return result;
	}

	@Override
	protected Map<String, String> getChildDevicesNames() {
		// TODO Auto-generated method stub
		return null;
	}

}
