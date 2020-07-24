package lora.ns.loriot;

import java.io.IOException;
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
public class LoriotIntegrationService extends LNSIntegrationService<LoriotConnector> {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	{
		wizard.add(new ConnectorWizardStep1());
		wizard.add(new ConnectorWizardStep2());
	}

	@Override
	public DeviceData processUplinkEvent(String event) {
		ObjectMapper mapper = new ObjectMapper();
		DeviceData data = null;
		try {
			JsonNode rootNode = mapper.readTree(event);
			String msgType = rootNode.get("cmd").asText();
			if (msgType.equals("rx")) {
				String deviceEui = rootNode.get("EUI").asText();
				int fPort = rootNode.get("port").asInt();
				double rssi = rootNode.get("rssi").asDouble();
				double snr = rootNode.get("snr").asDouble();
				logger.info("Signal strength: rssi = {} dBm, snr = {} dB", rssi, snr);
				byte[] payload = BaseEncoding.base16().decode(rootNode.get("data").asText().toUpperCase());
				Long updateTime = rootNode.get("ts").asLong();
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

				data = new DeviceData(deviceEui, deviceEui, null, null, fPort, payload, updateTime, measurements,
						null, null);
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("Error on Mapping LoRa payload to Cumulocity", e);
		}
		return data;
	}

	@Override
	public OperationData processDownlinkEvent(String event) {
		OperationData data = new OperationData();
		data.setStatus(OperationStatus.SUCCESSFUL);
		ObjectMapper mapper = new ObjectMapper();
		try {
			JsonNode rootNode = mapper.readTree(event);
			String commandId = rootNode.get("seqdn") != null ? rootNode.get("seqdn").asText() : null;
			if (commandId != null) {
				data.setCommandId(commandId);
				JsonNode error = rootNode.get("error");
				if (error != null) {
					data.setErrorMessage(error.asText());
					data.setStatus(OperationStatus.FAILED);
				}
			}
		} catch (Exception e) {
			logger.error("Error on Mapping LoRa payload to Cumulocity", e);
		}
		return data;
	}

	@Override
	public boolean isOperationUpdate(String eventString) {
		boolean result = false;
		ObjectMapper mapper = new ObjectMapper();
		JsonNode rootNode;
		try {
			rootNode = mapper.readTree(eventString);
			String msgType = rootNode.get("cmd").asText();
			result = msgType.equals("txd");
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public String getType() {
		return "loriot";
	}

	@Override
	public String getName() {
		return "Loriot (push mode)";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}
}
