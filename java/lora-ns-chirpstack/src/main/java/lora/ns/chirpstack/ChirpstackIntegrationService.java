package lora.ns.chirpstack;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.commons.codec.binary.Base16;
import org.joda.time.DateTime;
import org.springframework.stereotype.Service;

import com.cumulocity.model.measurement.MeasurementValue;
import com.cumulocity.model.operation.OperationStatus;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;
import lora.ns.DeviceData;
import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.connector.PropertyDescription;
import lora.ns.integration.LNSIntegrationService;
import lora.ns.operation.OperationData;

@Service
@Slf4j
public class ChirpstackIntegrationService extends LNSIntegrationService<ChirpstackConnector> {
	{
		wizard.add(new LNSConnectorWizardStep() {
			protected LinkedList<PropertyDescription> propertyDescriptions = new LinkedList<>();
			{
				propertyDescriptions.add(PropertyDescription.text("address", "Address (IP or server address)", true));
				propertyDescriptions.add(PropertyDescription.integer("port", "Port", true));
				propertyDescriptions.add(PropertyDescription.bool("ssl", "Use SSL"));
				propertyDescriptions.add(PropertyDescription.text("apikey", "Tenant API Key", true));
				propertyDescriptions.add(PropertyDescription.text("tenantid", "Tenant Id", true));
			}

			public String getName() {
				return "step1";
			}

			public java.util.LinkedList<PropertyDescription> getPropertyDescriptions() {
				return propertyDescriptions;
			}
		});
		wizard.add(new LNSConnectorWizardStep() {
			protected LinkedList<PropertyDescription> propertyDescriptions = new LinkedList<>();
			{
				propertyDescriptions.add(PropertyDescription.list("application", "Application", "/applications", true));
			}

			public String getName() {
				return "step2";
			}

			public java.util.LinkedList<PropertyDescription> getPropertyDescriptions() {
				return propertyDescriptions;
			}
		});
		deviceProvisioningAdditionalProperties
				.add(PropertyDescription.list("deviceprofile", "Device Profile", "/deviceprofiles", true));
	}

	@Override
	public DeviceData processUplinkEvent(String event) {
		ObjectMapper mapper = new ObjectMapper();
		DeviceData data = null;
		JsonNode rootNode;
		try {
			rootNode = mapper.readTree(event);
			String devEUI = rootNode.at("/deviceInfo/devEui").asText();
			int fPort = rootNode.at("/fPort").asInt();
			String payloadNode = rootNode.at("/data").asText();
			byte[] payload = new byte[0];
			if (payloadNode != null && !payloadNode.isEmpty()) {
				payload = Base64.getDecoder().decode(payloadNode);
			}
			Long updateTime = new DateTime(rootNode.at("/time").asText()).getMillis();
			log.info("Update time is: {}", updateTime);

			double rssi = rootNode.at("/rxInfo/0/rssi").asDouble();
			double snr = rootNode.at("/rxInfo/0/snr").asDouble();

			List<MeasurementRepresentation> measurements = new ArrayList<>();
			MeasurementRepresentation m = new MeasurementRepresentation();
			Map<String, MeasurementValue> measurementValueMap = new HashMap<>();

			MeasurementValue mv = new MeasurementValue();
			mv.setValue(BigDecimal.valueOf(rssi));
			mv.setUnit("dBm");
			measurementValueMap.put("rssi", mv);

			mv = new MeasurementValue();
			mv.setValue(BigDecimal.valueOf(snr));
			mv.setUnit("dB");
			measurementValueMap.put("snr", mv);

			m.set(measurementValueMap, "c8y_SignalStrength");
			m.setType("c8y_SignalStrength");
			m.setDateTime(new DateTime(updateTime));
			measurements.add(m);

			data = new DeviceData(devEUI, devEUI, null, null, fPort, payload, updateTime, measurements, null, null);
		} catch (Exception e) {
			e.printStackTrace();
			log.error("Error on Mapping LoRa payload to Cumulocity", e);
		}
		return data;
	}

	@Override
	public OperationData processDownlinkEvent(String event) {
		ObjectMapper mapper = new ObjectMapper();
		OperationData data = null;
		JsonNode rootNode;
		try {
			rootNode = mapper.readTree(event);
			data = new OperationData();
			data.setCommandId(rootNode.at("/queueItemId").asText());
			if (rootNode.has("acknowledged")) {
				boolean ack = rootNode.at("/acknowledged").asBoolean();
				if (ack) {
					data.setStatus(OperationStatus.SUCCESSFUL);
				} else {
					data.setStatus(OperationStatus.FAILED);
				}
			} else {
				data.setStatus(OperationStatus.EXECUTING);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return data;
	}

	@Override
	public boolean isOperationUpdate(String eventString) {
		return eventString.contains("queueItemId");
	}

	@Override
	public String getType() {
		return "chirpstack";
	}

	@Override
	public String getName() {
		return "Chirpstack";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}

	@Override
	public String getSimulatedPayload(java.util.Map<String, Object> fields) {
		if (fields.containsKey("payload")) {
			fields = new HashMap<>(fields);
			fields.put("payload",
					Base64.getEncoder().encodeToString(new Base16().decode(fields.get("payload").toString())));
		}
		return super.getSimulatedPayload(fields);
	}
}
