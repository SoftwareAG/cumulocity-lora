package lora.ns.liveobjects;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.joda.time.DateTime;
import org.springframework.stereotype.Service;

import com.cumulocity.model.measurement.MeasurementValue;
import com.cumulocity.model.operation.OperationStatus;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.BaseEncoding;

import lombok.extern.slf4j.Slf4j;
import lora.ns.DeviceData;
import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.connector.PropertyDescription;
import lora.ns.integration.LNSIntegrationService;
import lora.ns.operation.OperationData;

@Service
@Slf4j
public class LiveObjectsIntegrationService extends LNSIntegrationService<LiveObjectsConnector> {
	{
		wizard.add(new LNSConnectorWizardStep() {
			protected LinkedList<PropertyDescription> propertyDescriptions = new LinkedList<>();
			{
				propertyDescriptions.add(PropertyDescription.text("apikey", "API Key", true));
			}

			public String getName() {
				return "step1";
			}

			public java.util.LinkedList<PropertyDescription> getPropertyDescriptions() {
				return propertyDescriptions;
			}
		});
		deviceProvisioningAdditionalProperties
				.add(PropertyDescription.list("connectivityPlan", "Connectivity Plan", "/connectivityPlans", true));
		deviceProvisioningAdditionalProperties
				.add(PropertyDescription.list("profile", "Profile", "/profiles", true));
	}

	@Override
	public DeviceData processUplinkEvent(String event) {
		ObjectMapper mapper = new ObjectMapper();
		DeviceData data = null;
		JsonNode rootNode;
		try {
			rootNode = mapper.readTree(event);
			String devEUI = rootNode.at("/devEUI").asText();
			int fPort = rootNode.at("/port").asInt();
			JsonNode payloadNode = rootNode.get("payload");
			byte[] payload = new byte[0];
			if (payloadNode != null && !payloadNode.isNull()) {
				payload = BaseEncoding.base16().decode(payloadNode.asText().toUpperCase());
			}
			Long updateTime = new DateTime(rootNode.at("/timestamp").asText()).getMillis();
			log.info("Update time is: {}", updateTime);

			double rssi = rootNode.at("/signal/rssi").asDouble();
			double snr = rootNode.at("/signal/snr").asDouble();
			double esp = rootNode.at("/signal/esp").asDouble();
			double sf = rootNode.at("/signal/sf").asDouble();

			List<MeasurementRepresentation> measurements = new ArrayList<>();
			MeasurementRepresentation m = new MeasurementRepresentation();
			Map<String, MeasurementValue> measurementValueMap = new HashMap<>();

			MeasurementValue mv = new MeasurementValue();
			mv.setValue(BigDecimal.valueOf(rssi));
			mv.setUnit("dBm");
			measurementValueMap.put("rssi", mv);

			mv = new MeasurementValue();
			mv.setValue(BigDecimal.valueOf(esp));
			mv.setUnit("dBm");
			measurementValueMap.put("esp", mv);

			mv = new MeasurementValue();
			mv.setValue(BigDecimal.valueOf(snr));
			mv.setUnit("dB");
			measurementValueMap.put("snr", mv);

			mv = new MeasurementValue();
			mv.setValue(BigDecimal.valueOf(sf));
			mv.setUnit("");
			measurementValueMap.put("sf", mv);

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
		log.info("Will process downlink event {}", event);
		OperationData data = new OperationData();
		data.setStatus(OperationStatus.SUCCESSFUL);
		ObjectMapper mapper = new ObjectMapper();
		try {
			JsonNode rootNode = mapper.readTree(event);
			String commandId = rootNode.at("/id").asText();
			String type = rootNode.at("/type").asText();
			if (commandId != null && type.equals("commandStatus")) {
				String commandStatus = rootNode.at("/status").asText();
				data.setCommandId(commandId);
				if (commandStatus.equals("PROCESSED")) {
					data.setStatus(OperationStatus.SUCCESSFUL);
				} else if (commandStatus.equals("ERROR")) {
					data.setStatus(OperationStatus.FAILED);
					data.setErrorMessage("Command failed");
				} else if (commandStatus.equals("CANCELED")) {
					data.setStatus(OperationStatus.FAILED);
					data.setErrorMessage("Command was canceled");
				} else if (commandStatus.equals("EXPIRED")) {
					data.setStatus(OperationStatus.FAILED);
					data.setErrorMessage("Command expired");
				}
			} else {
				data.setStatus(OperationStatus.FAILED);
				data.setErrorMessage("Unrecognized downlink event");
			}
		} catch (Exception e) {
			log.error("Error on Mapping LoRa payload to Cumulocity", e);
			data.setStatus(OperationStatus.FAILED);
		}
		return data;
	}

	@Override
	public boolean isOperationUpdate(String eventString) {
		return false;
	}

	@Override
	public String getType() {
		return "liveobjects";
	}

	@Override
	public String getName() {
		return "Live Objects";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}
}
