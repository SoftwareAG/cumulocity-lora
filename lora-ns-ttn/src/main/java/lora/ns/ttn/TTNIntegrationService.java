package lora.ns.ttn;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
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

@Service
public class TTNIntegrationService extends LNSIntegrationService<TTNConnector> {
	
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	{
		wizard.add(new InstanceWizardStep1());
		//wizard.add(new InstanceWizardStep2());
	}

	@Override
	public DeviceData processUplinkEvent(String event) {
        ObjectMapper mapper = new ObjectMapper();
        DeviceData data = null;
        try {
            JsonNode rootNode = mapper.readTree(event);
            String deviceEui = rootNode.get("end_device_ids").get("dev_eui").asText();
            int fPort = rootNode.get("uplink_message").get("f_port").asInt();
            double rssi = rootNode.get("uplink_message").get("rx_metadata").get(0).get("rssi").asDouble();
            double snr = rootNode.get("uplink_message").get("rx_metadata").get(0).get("snr").asDouble();
            logger.info("Signal strength: rssi = {} dBm, snr = {} dB", rssi, snr);
            byte[] payload = BaseEncoding.base64().decode(rootNode.get("uplink_message").get("frm_payload").asText());
            Long updateTime = new DateTime(rootNode.get("uplink_message").get("received_at").asText()).getMillis();
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

    		data = new DeviceData(deviceEui, deviceEui, null, null, fPort, payload, updateTime, measurements, null, null);
        } catch (Exception e) {
        	e.printStackTrace();
            logger.error("Error on Mapping LoRa payload to Cumulocity", e);
        }
		return data;
	}

	@Override
	public OperationData processDownlinkEvent(String event) {
		OperationData data = new OperationData();
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode rootNode = mapper.readTree(event);
            String commandId = rootNode.get("command_id") != null ? rootNode.get("command_id").asText() : null;
            if (commandId != null) {
            	data.setCommandId(commandId);
	            JsonNode error = rootNode.get("error");
		            if (error != null) {
		            	data.setStatus(OperationStatus.FAILED);
		            	data.setErrorMessage(error.asText());
		            } else {
		            	data.setStatus(OperationStatus.SUCCESSFUL);
		            }
            }
        } catch (Exception e) {
            logger.error("Error on Mapping LoRa payload to Cumulocity", e);
        }
		return data;
	}
	
	@Override
	public boolean isOperationUpdate(String eventString) {
		return false;
	}

	@Override
	public String getType() {
		return "ttn";
	}

	@Override
	public String getName() {
		return "TTN (push mode)";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}
}
