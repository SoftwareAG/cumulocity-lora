package lora.ns.liveobjects;

import java.io.IOException;
import java.math.BigDecimal;
import java.security.InvalidParameterException;
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
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.BaseEncoding;

import lora.ns.DeviceData;
import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.connector.PropertyDescription;
import lora.ns.integration.LNSIntegrationService;
import lora.ns.operation.OperationData;

@Service
public class LiveObjectsIntegrationService extends LNSIntegrationService<LiveObjectsConnector> {
	public LiveObjectsIntegrationService() {
		wizard.add(new LNSConnectorWizardStep() {
			protected LinkedList<PropertyDescription> propertyDescriptions = new LinkedList<>(
					List.of(PropertyDescription.text("apikey", "API Key", true)));

			public String getName() {
				return "step1";
			}

			public java.util.LinkedList<PropertyDescription> getPropertyDescriptions() {
				return propertyDescriptions;
			}
		});
		wizard.add(new LNSConnectorWizardStep() {
			protected LinkedList<PropertyDescription> propertyDescriptions = new LinkedList<>(
					List.of(PropertyDescription.list("groupId", "Group", "/groups", true)));

			public String getName() {
				return "step2";
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
	public DeviceData processUplinkEvent(String event) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		JsonNode rootNode;
		rootNode = mapper.readTree(event);
		String devEUI = rootNode.at("/metadata/network/lora/devEUI").asText();
		if (devEUI == null) {
			throw new InvalidParameterException("DevEUI can't be null");
		}
		int fPort = rootNode.at("/metadata/network/lora/port").asInt();
		JsonNode payloadNode = rootNode.at("/value/payload");
		byte[] payload = new byte[0];
		if (payloadNode != null && !payloadNode.isNull()) {
			payload = BaseEncoding.base16().decode(payloadNode.asText().toUpperCase());
		}
		Long updateTime = new DateTime(rootNode.at("/timestamp").asText()).getMillis();
		loraContextService.log("Update time is: {}", updateTime);

		double rssi = rootNode.at("/metadata/network/lora/rssi").asDouble();
		double snr = rootNode.at("/metadata/network/lora/snr").asDouble();
		double esp = rootNode.at("/metadata/network/lora/esp").asDouble();
		double sf = rootNode.at("/metadata/network/lora/sf").asDouble();

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

		return new DeviceData(devEUI, devEUI, null, null, fPort, payload, updateTime, measurements, null, null);
	}

	@Override
	public OperationData processDownlinkEvent(String event) throws IOException {
		loraContextService.log("Will process downlink event {}", event);
		OperationData data = new OperationData();
		data.setStatus(OperationStatus.SUCCESSFUL);
		ObjectMapper mapper = new ObjectMapper();
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
