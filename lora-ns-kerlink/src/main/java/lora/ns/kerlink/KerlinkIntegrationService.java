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
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.BaseEncoding;

import lora.ns.DeviceData;
import lora.ns.LNSIntegrationService;
import lora.ns.OperationData;
import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.connector.PropertyDescription;
import lora.ns.connector.PropertyDescription.PropertyType;

@Service
public class KerlinkIntegrationService extends LNSIntegrationService<KerlinkConnector> {
	
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	{
		wizard.add(new LNSConnectorWizardStep() {
			final private LinkedList<PropertyDescription> propertyDescriptions = new LinkedList<>();
			{
				propertyDescriptions.add(new PropertyDescription("baseUrl", "URL", true, "https://<your wanesy instance>.wanesy.com/gms/application", null, null, null, null, null, null, PropertyType.TEXT, true));
				propertyDescriptions.add(new PropertyDescription("username", "Username", true, null, null, null, null, null, null, null, PropertyType.TEXT, true));
				propertyDescriptions.add(new PropertyDescription("password", "Password", true, null, null, null, null, null, null, null, PropertyType.PASSWORD, true));
			}

			@Override
			public String getName() {
				return "Configure LNS access";
			}

			@Override
			public LinkedList<PropertyDescription> getPropertyDescriptions() {
				return propertyDescriptions;
			}
		});
		wizard.add(new LNSConnectorWizardStep() {
			final private LinkedList<PropertyDescription> propertyDescriptions = new LinkedList<>();
			{
				propertyDescriptions.add(new PropertyDescription("clusterId", "Cluster", true, null, "/clusters", null, null, null, null, null, PropertyType.LIST, false));
			}

			@Override
			public String getName() {
				return "Select a cluster";
			}

			@Override
			public LinkedList<PropertyDescription> getPropertyDescriptions() {
				return propertyDescriptions;
			}
		});
	}
	
	
	private Map<String, OperationStatus> statusMap = new HashMap<>();
	{
		statusMap.put("OK", OperationStatus.SUCCESSFUL);
		statusMap.put("IN_PROGRESS", OperationStatus.EXECUTING);
		statusMap.put("KO", OperationStatus.FAILED);
	}

	@Override
	public DeviceData processUplinkEvent(String event) {
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

    		return new DeviceData(null, deviceEui, null, null, fPort, payload, updateTime, measurements, null, null);
        } catch (Exception e) {
            logger.error("Error on Mapping LoRa payload to Cumulocity", e);
        }
		return null;
	}

	@Override
	public OperationData processDownlinkEvent(String event) {
		OperationData data = new OperationData();
		ObjectMapper mapper = new ObjectMapper();
		try {
			JsonNode rootNode = mapper.readTree(event);
			data.setCommandId(rootNode.get("dataDownId").asText());
			data.setStatus(statusMap.get(rootNode.get("status").asText()));
			if (data.getStatus() == OperationStatus.FAILED) {
				data.setErrorMessage("Error");
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return data;
	}
	
	@Override
	public boolean isOperationUpdate(String eventString) {
		boolean result = false;
		ObjectMapper mapper = new ObjectMapper();
		try {
			JsonNode rootNode = mapper.readTree(eventString);
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
	public String getType() {
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
}
