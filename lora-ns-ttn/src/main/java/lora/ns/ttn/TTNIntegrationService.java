package lora.ns.ttn;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Base64;
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

import lora.ns.DeviceData;
import lora.ns.LNSIntegrationService;
import lora.ns.OperationData;

@Service
public class TTNIntegrationService extends LNSIntegrationService<TTNConnector> {
	
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	{
		wizard.add(new InstanceWizardStep());
	}

	@Override
	public DeviceData processUplinkEvent(String event) {
        ObjectMapper mapper = new ObjectMapper();
        DeviceData data = null;
        try {
            JsonNode rootNode = mapper.readTree(event);
            String deviceEui = rootNode.get("end_device_ids").get("dev_eui").asText();
            int fPort = rootNode.get("uplink_message").get("f_port").asInt();
            Double rssi = rootNode.get("uplink_message").get("rx_metadata").get(0).has("rssi") ? rootNode.get("uplink_message").get("rx_metadata").get(0).get("rssi").asDouble() : null;
            double snr = rootNode.get("uplink_message").get("rx_metadata").get(0).get("snr").asDouble();
            logger.info("Signal strength: rssi = {} dBm, snr = {} dB", rssi, snr);
            byte[] payload = Base64.getDecoder().decode(rootNode.get("uplink_message").get("frm_payload").asText());
            Long updateTime = new DateTime(rootNode.get("uplink_message").get("received_at").asText()).getMillis();
            logger.info("Update time is: {}", updateTime);

			Double lat = null;
			Double lng = null;
			if (rootNode.get("uplink_message").has("locations")) {
				lat = rootNode.get("uplink_message").get("locations").get("user").get("latitude").asDouble();
				lng = rootNode.get("uplink_message").get("locations").get("user").get("longitude").asDouble();
			}

            List<MeasurementRepresentation> measurements = new ArrayList<>();
    		MeasurementRepresentation m = new MeasurementRepresentation();
    		Map<String, MeasurementValue> measurementValueMap = new HashMap<>();
    		
    		MeasurementValue mv = new MeasurementValue();
			if (rssi != null) {
				mv.setValue(BigDecimal.valueOf(rssi));
				mv.setUnit("dBm");
				measurementValueMap.put("rssi", mv);
			}

    		mv = new MeasurementValue();
    		mv.setValue(BigDecimal.valueOf(snr));
    		mv.setUnit("dB");
    		measurementValueMap.put("snr", mv);

    		m.set(measurementValueMap, "c8y_SignalStrength");
    		m.setType("c8y_SignalStrength");
    		m.setDateTime(new DateTime(updateTime));
    		measurements.add(m);

    		data = new DeviceData(deviceEui, deviceEui, null, null, fPort, payload, updateTime, measurements, lat != null ? BigDecimal.valueOf(lat) : null, lng != null ? BigDecimal.valueOf(lng) : null);
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
			if (rootNode.has("downlink_sent")) {
				if (rootNode.get("end_device_ids").has("dev_eui")) {
					logger.info("Downlink sent successfully to device {}", rootNode.get("end_device_ids").get("dev_eui"));
				} else {
					logger.info("Downlink sent successfully to device {}", rootNode.get("end_device_ids").get("device_id"));
				}
				data.setStatus(OperationStatus.SUCCESSFUL);
				JsonNode correlationIds = rootNode.get("downlink_sent").get("correlation_ids");
				for (JsonNode correlationId: correlationIds) {
					if (correlationId.asText().startsWith("as:downlink:")) {
						data.setCommandId(correlationId.asText().split(":")[2]);
					}
				}
			} else if (rootNode.has("downlink_failed")) {
				if (rootNode.get("end_device_ids").has("dev_eui")) {
					logger.info("Downlink failed on device {}", rootNode.get("end_device_ids").get("dev_eui"));
				} else {
					logger.info("Downlink failed on device {}", rootNode.get("end_device_ids").get("device_id"));
				}
				data.setStatus(OperationStatus.FAILED);
				data.setErrorMessage(rootNode.get("downlink_failed").get("error").get("message_format").asText());
				JsonNode correlationIds = rootNode.get("downlink_failed").get("downlink").get("correlation_ids");
				for (JsonNode correlationId: correlationIds) {
					if (correlationId.asText().startsWith("as:downlink:")) {
						data.setCommandId(correlationId.asText().split(":")[2]);
					}
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
