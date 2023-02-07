package lora.ns.objenious;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cumulocity.model.measurement.MeasurementValue;
import com.cumulocity.model.operation.OperationStatus;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
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
public class ObjeniousIntegrationService extends LNSIntegrationService<ObjeniousConnector> {
	
	private final Logger logger = LoggerFactory.getLogger(ObjeniousIntegrationService.class);
	
	{
		wizard.add(new ConnectorWizardStep1());
		wizard.add(new ConnectorWizardStep2());
		deviceProvisioningAdditionalProperties.add(new PropertyDescription("deviceProfile", "Device profile", true, null, "/deviceProfiles", null, null, null, null, null, PropertyType.LIST, false));
		payloadSimulationFields.add(PropertyDescription.text("deveui", "Device EUI", true).withPattern("[a-fA-F0-9]{16}"));
		payloadSimulationFields.add(PropertyDescription.text("name", "Device name", true));
		payloadSimulationFields.add(PropertyDescription.integer("port", "Port", true));
		payloadSimulationFields.add(new PropertyDescription("rssi", "RSSI", true, null, null, null, null, null, null, null, PropertyType.NUMBER, false));
		payloadSimulationFields.add(new PropertyDescription("snr", "SNR", true, null, null, null, null, null, null, null, PropertyType.NUMBER, false));
		payloadSimulationFields.add(new PropertyDescription("noise", "Noise", true, null, null, null, null, null, null, null, PropertyType.NUMBER, false));
		payloadSimulationFields.add(new PropertyDescription("signal", "Signal", true, null, null, null, null, null, null, null, PropertyType.NUMBER, false));
		payloadSimulationFields.add(new PropertyDescription("sf", "SF", true, null, null, null, null, null, null, null, PropertyType.INTEGER, false));
		payloadSimulationFields.add(new PropertyDescription("lat", "Latitude", true, null, null, null, null, null, null, null, PropertyType.NUMBER, false));
		payloadSimulationFields.add(new PropertyDescription("lng", "Longitude", true, null, null, null, null, null, null, null, PropertyType.NUMBER, false));
		payloadSimulationFields.add(new PropertyDescription("payload", "Payload", true, null, null, null, null, null, null, null, PropertyType.TEXT, false));
		payloadSimulationFields.add(new PropertyDescription("timestamp", "Timestamp", true, null, null, null, null, null, null, null, PropertyType.DATETIME, false));
	}

	@Override
	public DeviceData processUplinkEvent(String event) {
        ObjectMapper mapper = new ObjectMapper();
        DeviceData data = null;
        try {
            JsonNode rootNode = mapper.readTree(event);
            String deviceEui = rootNode.at("/device_properties/deveui").asText();
            String name = rootNode.at("/device_properties/external_id").asText();
            int fPort = rootNode.at("/protocol_data/port").asInt();
            double rssi = rootNode.at("/protocol_data/rssi").asDouble();
            double snr = rootNode.at("/protocol_data/snr").asDouble();
            double noise = rootNode.at("/protocol_data/noise").asDouble();
            double signal = rootNode.at("/protocol_data/signal").asDouble();
            double sf = rootNode.at("/protocol_data/sf").asDouble();
            Double lat = rootNode.at("/lat").asDouble();
            Double lng = rootNode.at("/lng").asDouble();
            logger.info("Signal strength: rssi = {} dBm, snr = {} dB", rssi, snr);
			JsonNode payloadNode = rootNode.get("payload_cleartext");
			byte[] payload = new byte[0];
			if (payloadNode != null && !payloadNode.isNull()) {
				payload = BaseEncoding.base16().decode(payloadNode.asText().toUpperCase());
			}
            Long updateTime = new DateTime(rootNode.get("timestamp").asText()).getMillis();
            logger.info("Update time is: {}", updateTime);

            List<MeasurementRepresentation> measurements = new ArrayList<>();
    		MeasurementRepresentation m = new MeasurementRepresentation();
    		Map<String, MeasurementValue> measurementValueMap = new HashMap<>();
    		
    		MeasurementValue mv = new MeasurementValue();
    		mv.setValue(BigDecimal.valueOf(rssi));
    		mv.setUnit("dBm");
    		measurementValueMap.put("rssi", mv);
    		
    		mv = new MeasurementValue();
    		mv.setValue(BigDecimal.valueOf(noise));
    		mv.setUnit("dBm");
    		measurementValueMap.put("noise", mv);
    		
    		mv = new MeasurementValue();
    		mv.setValue(BigDecimal.valueOf(signal));
    		mv.setUnit("dBm");
    		measurementValueMap.put("signal", mv);

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
    		
//    		if (rootNode.has("profile_id")) {
//    			ManagedObjectRepresentation device = getDevice(deviceEui);
//    			if (device != null) {
//    				updateDevice(getDevice(deviceEui), ((Instance)instances.get(subscriptionsService.getTenant()).get(lnsInstanceId)).getProfile(rootNode.get("profile_id").asInt()));
//    			}
//    		}

    		data = new DeviceData(name, deviceEui, null, null, fPort, payload, updateTime, measurements, lat != null ? BigDecimal.valueOf(lat) : null, lng != null ? BigDecimal.valueOf(lng) : null);
        } catch (Exception e) {
        	e.printStackTrace();
            logger.error("Error on Mapping LoRa payload to Cumulocity", e);
        }
		return data;
	}

	// TODO ugly, need to put all that in a config file
//	private void updateDevice(ManagedObjectRepresentation device, Profile profile) {
//		if (profile != null && (device.get(Hardware.class) == null || device.getProperty("codec") == null)) {
//			device.setLastUpdatedDateTime(null);
//			Hardware hardware = new Hardware();
//			String profileName = profile.getName().toLowerCase();
//			if (profileName.contains("nke")) {
//				device.setProperty("codec", "nke");
//				if (profileName.contains("50-70-053")) {
//					hardware.setModel("50-70-053");
//				}
//				if (profileName.contains("50-70-085")) {
//					hardware.setModel("50-70-085");
//				}
//				if (profileName.contains("50-70-043")) {
//					hardware.setModel("50-70-043");
//				}
//				if (profileName.contains("50-70-014")) {
//					hardware.setModel("50-70-014");
//				}
//				if (profileName.contains("50-70-072")) {
//					hardware.setModel("50-70-072");
//				}
//				if (profileName.contains("50-70-016")) {
//					hardware.setModel("50-70-016");
//				}
//				if (profileName.contains("50-70-008")) {
//					hardware.setModel("50-70-008");
//				}
//				if (profileName.contains("50-70-080")) {
//					hardware.setModel("50-70-080");
//				}
//			}
//			if (profileName.contains("senlab")) {
//				device.setProperty("codec", "senlab");
//				if (profileName.contains("pul")) {
//					hardware.setModel("Senlab Meter");
//				}
//				if (profileName.contains("tor")) {
//					hardware.setModel("Senlab Digital");
//				}
//				if (profileName.contains("thy")) {
//					hardware.setModel("Senlab humidity");
//				}
//				if (profileName.contains("tem")) {
//					hardware.setModel("Senlab temperature");
//				}
//			}
//			if (profileName.contains("adeunis")) {
//				device.setProperty("codec", "adeunis");
//				if (profileName.contains("arf8230")) {
//					hardware.setModel("pulse");
//				}
//				if (profileName.contains("arf8240")) {
//					hardware.setModel("modbus");
//				}
//				if (profileName.contains("arf8180")) {
//					hardware.setModel("temp");
//				}
//				if (profileName.contains("arf8275")) {
//					hardware.setModel("comfort");
//				}
//				if (profileName.contains("arf8170")) {
//					hardware.setModel("dc");
//				}
//			}
//			if (profileName.contains("pyrescom")) {
//				device.setProperty("codec", "pyrescom");
//				if (profileName.contains("class") && profileName.contains("air")) {
//					hardware.setModel("Class'Air");
//				}
//			}
//			
//			if (hardware.getModel() != null) {
//				device.set(hardware);
//			}
//			
//			inventoryApi.update(device);
//		}
//	}

	@Override
	public OperationData processDownlinkEvent(String event) {
		OperationData data = new OperationData();
		data.setStatus(OperationStatus.SUCCESSFUL);
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode rootNode = mapper.readTree(event);
            String commandId = rootNode.get("command_id") != null ? rootNode.get("command_id").asText() : null;
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
		return false;
	}

	@Override
	public String getType() {
		return "objenious";
	}

	@Override
	public String getName() {
		return "Objenious (push mode)";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}
}
