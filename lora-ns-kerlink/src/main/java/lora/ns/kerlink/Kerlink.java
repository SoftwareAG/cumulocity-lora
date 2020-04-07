package lora.ns.kerlink;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.cumulocity.model.measurement.MeasurementValue;
import com.cumulocity.model.operation.OperationStatus;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.cumulocity.rest.representation.operation.OperationRepresentation;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.BaseEncoding;

import lora.ns.DeviceData;
import lora.ns.LNSInstance;
import lora.ns.LNSInstanceRepresentation;
import lora.ns.LNSInstanceWizardInitialStep;
import lora.ns.LNSInstanceWizardStep;
import lora.ns.LNSProxy;
import lora.ns.PropertyDescription;
import lora.ns.PropertyDescription.PropertyType;

@Service
public class Kerlink extends LNSProxy {
	
	private final Logger logger = LoggerFactory.getLogger(getClass());
//	
//	{
//		instances.put("t198098409", new HashMap<>());
//		instances.get("t198098409").put("accorinvest", new Instance("https://wmcintegration.wanesy.com/gms/application", "Cumulocity", "cumulocity"));
//	}
	
	private class WizardStep extends LNSInstanceWizardInitialStep {
		{
			propertyDescriptions.add(new PropertyDescription("baseUrl", "URL", true, "https://<your wanesy instance>.wanesy.com/gms/application", null, null, null, null, null, null, PropertyType.STRING));
			propertyDescriptions.add(new PropertyDescription("username", "Username", true, null, null, null, null, null, null, null, PropertyType.STRING));
			propertyDescriptions.add(new PropertyDescription("password", "Password", true, null, null, null, null, null, null, null, PropertyType.STRING));
		}
	}
	
	LinkedList<LNSInstanceWizardStep> wizard = new LinkedList<LNSInstanceWizardStep>();
	{
		wizard.add(new WizardStep());
	}
	
	
	private Map<String, String> statusMap = new HashMap<>();
	{
		statusMap.put("OK", OperationStatus.SUCCESSFUL.toString());
		statusMap.put("IN_PROGRESS", OperationStatus.EXECUTING.toString());
		statusMap.put("KO", OperationStatus.FAILED.toString());
	}

	@Override
	public DeviceData extractLNSInfo(String event, String lnsInstanceId) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode rootNode = mapper.readTree(event);
            String deviceEui = rootNode.get("endDevice").get("devEui").asText();
            int fPort = rootNode.get("fPort").asInt();
            double rssi = rootNode.get("gwInfo").get(0).get("rssi").asDouble();
            double snr = rootNode.get("gwInfo").get(0).get("snr").asDouble();
            logger.info("Signal strength: rssi = {} dBm, snr = {} dB", rssi, snr);
            byte[] payload = BaseEncoding.base16().decode(rootNode.get("payload").asText().toUpperCase());
            Long updateTime = rootNode.get("recvTime").asLong();
            String model = null;
            logger.info("Update time is: " + updateTime);

            List<MeasurementRepresentation> measurements = new ArrayList<>();
    		MeasurementRepresentation m = new MeasurementRepresentation();
    		Map<String, MeasurementValue> measurementValueMap = new HashMap<>();
    		MeasurementValue mv = new MeasurementValue();
    		mv.setValue(new BigDecimal(rssi));
    		mv.setUnit("dBm");
    		measurementValueMap.put("rssi", mv);
    		mv = new MeasurementValue();
    		mv.setValue(new BigDecimal(snr));
    		mv.setUnit("dB");
    		measurementValueMap.put("snr", mv);
    		m.set(measurementValueMap, "c8y_SignalStrength");
    		m.setType("c8y_SignalStrength");
    		m.setDateTime(new DateTime(updateTime));
    		measurements.add(m);

    		return new DeviceData(null, deviceEui, model, fPort, payload, updateTime, measurements, null, null);
        } catch (Exception e) {
            logger.error("Error on Mapping LoRa payload to Cumulocity", e);
        }
		return null;
	}

	@Override
	public OperationRepresentation getOperation(String event) {
		OperationRepresentation operation = null;
		ObjectMapper mapper = new ObjectMapper();
		try {
			JsonNode rootNode = mapper.readTree(event);
			logger.info("List of pending operations: {}", operations);
			operation = operations.get(rootNode.get("dataDownId").asText());
			logger.info("Operation found: {}", operation);
			if (operation != null) {
				operation.setStatus(statusMap.get(rootNode.get("status").asText()));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return operation;
	}
	
	@Override
	public boolean isOperationUpdate(String eventString) {
		boolean result = false;
		ObjectMapper mapper = new ObjectMapper();
		try {
			JsonNode rootNode = mapper.readTree(eventString);
			logger.info("List of pending operations: {}", operations);
			JsonNode op = rootNode.get("dataDownId");
			if (op != null) {
				result = true;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public String getId() {
		return "kerlink";
	}

	@Override
	public String getName() {
		return "Kerlink Wanesy";
	}

	@Override
	public String getVersion() {
		return "3.1";
	}

	@Override
	protected LNSInstance getInstance(LNSInstanceRepresentation instance) {
		return new Instance(instance);
	}

	@Override
	public LinkedList<LNSInstanceWizardStep> getInstanceWizard() {
		return wizard;
	}
}
