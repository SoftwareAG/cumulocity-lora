package lora.ns.ttn;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cumulocity.model.measurement.MeasurementValue;
import com.cumulocity.model.operation.OperationStatus;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import lora.ns.DeviceData;
import lora.ns.connector.PropertyDescription;
import lora.ns.connector.PropertyDescription.PropertyType;
import lora.ns.integration.LNSIntegrationService;
import lora.ns.operation.OperationData;

@Service
public class TTNIntegrationService extends LNSIntegrationService<TTNConnector> {

	private final Logger logger = LoggerFactory.getLogger(TTNIntegrationService.class);

	{
		wizard.add(new InstanceWizardStep());
		deviceProvisioningAdditionalProperties.add(new PropertyDescription("MACVersion", "MAC Version", true, null, "/macversion", null, null, null, null, null, PropertyType.LIST, false));
		deviceProvisioningAdditionalProperties.add(new PropertyDescription("PHYVersion", "PHY Version", true, null, "/phyversion", null, null, null, null, null, PropertyType.LIST, false));
		deviceProvisioningAdditionalProperties.add(new PropertyDescription("frequencyPlan", "Frequency Plan", true, null, "/frequencyplan", null, null, null, null, null, PropertyType.LIST, false));

		gatewayProvisioningAdditionalProperties.add(new PropertyDescription("public", "Make status public", true, null, null, null, null, null, null, null, PropertyType.BOOLEAN, false));
		gatewayProvisioningAdditionalProperties.add(new PropertyDescription("frequencyPlan", "Frequency Plan", true, null, "/frequencyplan", null, null, null, null, null, PropertyType.LIST, false));
	}

	@Override
	public DeviceData processUplinkEvent(String event) {
		ObjectMapper mapper = new ObjectMapper();
		DeviceData data = null;
		try {
			JsonNode rootNode = mapper.readTree(event);
			String deviceEui = rootNode.at("/end_device_ids/dev_eui").asText();
			int fPort = rootNode.at("/uplink_message/f_port").asInt();
			Double rssi = rootNode.at("/uplink_message/rx_metadata/0/rssi").asDouble();
			Double snr = rootNode.at("/uplink_message/rx_metadata/0/snr").asDouble();
			logger.info("Signal strength: rssi = {} dBm, snr = {} dB", rssi, snr);
			byte[] payload = Base64.getDecoder().decode(rootNode.at("/uplink_message/frm_payload").asText());
			Long updateTime = rootNode.has("/uplink_message/received_at") ? new DateTime(rootNode.at("/uplink_message/received_at").asText()).getMillis() : new DateTime().getMillis();
			logger.info("Update time is: {}", updateTime);

			Double lat = rootNode.at("/uplink_message/locations/user/latitude").asDouble();
			Double lng = rootNode.at("/uplink_message/locations/user/longitude").asDouble();

			List<MeasurementRepresentation> measurements = new ArrayList<>();
			MeasurementRepresentation m = new MeasurementRepresentation();
			Map<String, MeasurementValue> measurementValueMap = new HashMap<>();

			MeasurementValue mv = new MeasurementValue();
			if (rssi != null) {
				mv.setValue(BigDecimal.valueOf(rssi));
				mv.setUnit("dBm");
				measurementValueMap.put("rssi", mv);
			}

			if (snr != null) {
				mv = new MeasurementValue();
				mv.setValue(BigDecimal.valueOf(snr));
				mv.setUnit("dB");
				measurementValueMap.put("snr", mv);
			}

			if (rssi != null || snr != null) {
				m.set(measurementValueMap, "c8y_SignalStrength");
				m.setType("c8y_SignalStrength");
				m.setDateTime(new DateTime(updateTime));
				measurements.add(m);
			}

			data = new DeviceData(deviceEui, deviceEui, null, null, fPort, payload, updateTime, measurements,
					lat != null ? BigDecimal.valueOf(lat) : null, lng != null ? BigDecimal.valueOf(lng) : null);
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
					logger.info("Downlink sent successfully to device {}",
							rootNode.get("end_device_ids").get("dev_eui"));
				} else {
					logger.info("Downlink sent successfully to device {}",
							rootNode.get("end_device_ids").get("device_id"));
				}
				data.setStatus(OperationStatus.SUCCESSFUL);
				JsonNode correlationIds = rootNode.get("downlink_sent").get("correlation_ids");
				for (JsonNode correlationId : correlationIds) {
					if (correlationId.asText().startsWith("c8y:")) {
						data.setCommandId(correlationId.asText().split(":")[1]);
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
				for (JsonNode correlationId : correlationIds) {
					if (correlationId.asText().startsWith("c8y:")) {
						data.setCommandId(correlationId.asText().split(":")[1]);
					}
				}
			} else if (rootNode.has("downlink_queued")) {
				if (rootNode.get("end_device_ids").has("dev_eui")) {
					logger.info("Downlink successfully queued on device {}",
							rootNode.get("end_device_ids").get("dev_eui"));
				} else {
					logger.info("Downlink successfully queued on device {}",
							rootNode.get("end_device_ids").get("device_id"));
				}
				data.setStatus(OperationStatus.EXECUTING);
				JsonNode correlationIds = rootNode.get("downlink_queued").get("correlation_ids");
				for (JsonNode correlationId : correlationIds) {
					if (correlationId.asText().startsWith("c8y:")) {
						data.setCommandId(correlationId.asText().split(":")[1]);
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
