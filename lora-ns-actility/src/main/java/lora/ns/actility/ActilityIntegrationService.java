package lora.ns.actility;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cumulocity.model.measurement.MeasurementValue;
import com.cumulocity.model.operation.OperationStatus;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.BaseEncoding;

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
public class ActilityIntegrationService extends LNSIntegrationService<ActilityConnector> {
	
	private final Logger logger = LoggerFactory.getLogger(ActilityIntegrationService.class);
	
	{
		wizard.add(new ConnectorWizardStep1());
		deviceProvisioningAdditionalProperties.add(new PropertyDescription("deviceProfile", "Device profile", true, null, "/deviceProfiles", null, null, null, null, null, PropertyType.LIST, false));
		gatewayProvisioningAdditionalProperties.add(new PropertyDescription("SMN", "SMN", false, null, null, null, null, null, null, null, PropertyType.TEXT, false));
		gatewayProvisioningAdditionalProperties.add(new PropertyDescription("gatewayProfile", "Gateway profile", true, null, "/baseStationProfiles", null, null, null, null, null, PropertyType.LIST, false));
		gatewayProvisioningAdditionalProperties.add(new PropertyDescription("rfRegion", "RF Region", true, null, "/rfRegions", null, null, null, null, null, PropertyType.LIST, false));
	}

	@Override
	public DeviceData processUplinkEvent(String event) {
        ObjectMapper mapper = new ObjectMapper();
        DeviceData data = null;
        try {
            JsonNode rootNode = mapper.readTree(event);
            String deviceEui = rootNode.at("DevEUI_uplink/DevEUI").asText();
            int fPort = rootNode.at("DevEUI_uplink/FPort").asInt();
            double rssi = rootNode.at("DevEUI_uplink/LrrRSSI").asDouble();
            double snr = rootNode.at("DevEUI_uplink/LrrSNR").asDouble();
            double sf = rootNode.at("DevEUI_uplink/SpFact").asDouble();
            Double lat = rootNode.at("DevEUI_uplink/DevLAT").asDouble();
            Double lng = rootNode.at("DevEUI_uplink/DevLON").asDouble();
            logger.info("Signal strength: rssi = {} dBm, snr = {} dB", rssi, snr);
            byte[] payload = BaseEncoding.base16().decode(rootNode.at("DevEUI_uplink/payload_hex").asText().toUpperCase());
            Long updateTime = new DateTime(rootNode.at("DevEUI_uplink/Time").asText()).getMillis();
            //String model = null;
            logger.info("Update time is: " + updateTime);

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

    		mv = new MeasurementValue();
    		mv.setValue(BigDecimal.valueOf(sf));
    		mv.setUnit("");
    		measurementValueMap.put("sf", mv);

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
		data.setStatus(OperationStatus.SUCCESSFUL);
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode rootNode = mapper.readTree(event);
            String commandId = rootNode.at("DevEUI_downlink_Sent/CorrelationID").asText();
            if (commandId != null) {
            	data.setCommandId(commandId);
	            int error = rootNode.at("DevEUI_downlink_Sent/DeliveryStatus").asInt();
	            if (error == 0) {
	            	data.setErrorMessage("Error");
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
        ObjectMapper mapper = new ObjectMapper();
		boolean result = false;
		try {
			JsonNode rootNode = mapper.readTree(eventString);
			result = rootNode.has("DevEUI_downlink_Sent");
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public String getType() {
		return "actility";
	}

	@Override
	public String getName() {
		return "Actility Thingpark (push mode)";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}
}
