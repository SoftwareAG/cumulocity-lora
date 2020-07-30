package lora.codec.ms;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.codec.binary.Hex;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import com.cumulocity.microservice.subscription.model.MicroserviceSubscriptionAddedEvent;
import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
import com.cumulocity.model.ID;
import com.cumulocity.model.event.CumulocitySeverities;
import com.cumulocity.rest.representation.alarm.AlarmRepresentation;
import com.cumulocity.rest.representation.event.EventRepresentation;
import com.cumulocity.rest.representation.identity.ExternalIDRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.operation.OperationRepresentation;
import com.cumulocity.sdk.client.SDKException;
import com.cumulocity.sdk.client.alarm.AlarmApi;
import com.cumulocity.sdk.client.event.EventApi;
import com.cumulocity.sdk.client.identity.IdentityApi;
import com.cumulocity.sdk.client.inventory.InventoryApi;
import com.cumulocity.sdk.client.inventory.InventoryFilter;
import com.cumulocity.sdk.client.inventory.ManagedObjectCollection;

import c8y.Command;
import c8y.Hardware;
import lora.codec.Decode;
import lora.codec.DeviceCodec;
import lora.codec.DeviceCodecRepresentation;
import lora.codec.DeviceOperationParam;
import lora.codec.DownlinkData;
import lora.codec.Encode;
import lora.codec.Result;
import lora.ns.DeviceData;

@Service
public class CodecManager {

	@Autowired
	private EventApi eventApi;
	
	@Autowired
	private InventoryApi inventoryApi;

	@Autowired
	private IdentityApi identityApi;
	
	@Autowired
	private AlarmApi alarmApi;

    @Autowired
    private MicroserviceSubscriptionsService subscriptionsService;

	final private Logger logger = LoggerFactory.getLogger(getClass());
	
	final private static String LORA_DEVICE_COMMAND_ERROR = "LoRa device command error";
	final private static String LORA_DEVICE_PAYLOAD_ERROR = "LoRa device payload decoding error";

	private Map<String, CodecProxy> codecInstances = new HashMap<>();

	@EventListener
	private void updateCodecsList(MicroserviceSubscriptionAddedEvent event) {
		InventoryFilter filter = new InventoryFilter().byType(DeviceCodec.CODEC_TYPE);
		ManagedObjectCollection col = inventoryApi.getManagedObjectsByFilter(filter);
		for (ManagedObjectRepresentation mor : col.get().allPages()) {
			DeviceCodecRepresentation codec = mor.get(DeviceCodecRepresentation.class);
			if (codec != null) {
				logger.info("Adding to codec list: {} {}", codec.getName(), codec.getVersion());
				codecInstances.put(codec.getId(), new CodecProxy(codec.getId(), codec.getName(), codec.getVersion()));
			}
		}
	}

	private ExternalIDRepresentation findExternalId(String externalId, String type) {
		ID id = new ID();
		id.setType(type);
		id.setValue(externalId);
		ExternalIDRepresentation extId = null;
		try {
			extId = identityApi.getExternalId(id);
		} catch (SDKException e) {
			logger.info("External ID {} not found", externalId);
		}
		return extId;
	}

	public CodecProxy getCodec(String id) {
		CodecProxy result = codecInstances.get(id);
		if (result == null) {
			ExternalIDRepresentation extId = findExternalId(id, DeviceCodec.CODEC_ID);
			if (extId != null) {
				ManagedObjectRepresentation mor = inventoryApi.get(extId.getManagedObject().getId());
				DeviceCodecRepresentation codec = mor.get(DeviceCodecRepresentation.class);
				if (codec != null) {
					result = new CodecProxy(id, codec.getName(), codec.getVersion());
					codecInstances.put(id, result);
				}
			}
		}
		return result;
	}

	public void decode(ManagedObjectRepresentation mor, DeviceData event) {
		EventRepresentation eventRepresentation = new EventRepresentation();
		eventRepresentation.setSource(mor);
		eventRepresentation.setDateTime(new DateTime(event.getDateTime()));
		eventRepresentation.setText("LoRa raw payload");
		eventRepresentation.setType("LoRaPayload");
		eventRepresentation.setProperty("payload", Hex.encodeHexString(event.getPayload()));
		eventRepresentation.setProperty("port", event.getfPort());
		logger.info("Device details: {}", mor.toJSON());
		if (mor.hasProperty("codec")) {
			logger.info("Codec {} will be used with device {} for decoding payload {} on port {}", mor.getProperty("codec"), event.getDevEui(), event.getPayload(), event.getfPort());
			CodecProxy codec = getCodec(mor.getProperty("codec").toString());
			if (codec != null) {
				String authentication = subscriptionsService.getCredentials(subscriptionsService.getTenant()).get().toCumulocityCredentials().getAuthenticationString();
				codec.setAuthentication(authentication);
				Result<String> result = codec.decode(new Decode(event));
				if (result.isSuccess()) {
					eventRepresentation.setProperty("processed", true);
				} else {
					eventRepresentation.setProperty("processed", false);
					AlarmRepresentation alarm = new AlarmRepresentation();
					alarm.setSource(mor);
					alarm.setType(LORA_DEVICE_PAYLOAD_ERROR);
					alarm.setText(result.getMessage() != null ? result.getMessage() : result.getResponse());
					alarm.setDateTime(new DateTime());
					alarm.setSeverity(CumulocitySeverities.CRITICAL.name());
					alarmApi.create(alarm);
				}
			} else {
				eventRepresentation.setProperty("processed", false);
				logger.error("Codec {} does not exist.", mor.getProperty("codec"));
			}
		} else {
        	logger.info("Device has no codec information. Payload will be stored for later parsing when Codec will be provided.");
            eventRepresentation.setProperty("processed", false);
		}
		eventApi.create(eventRepresentation);
	}
	
	public DownlinkData encode(String devEui, OperationRepresentation operation) {
		DownlinkData data = null;
		ManagedObjectRepresentation mor = inventoryApi.get(operation.getDeviceId());
		if (mor.hasProperty("codec")) {
			logger.info("Codec {} will be used with device {} for encoding operation {}", mor.getProperty("codec"), devEui, operation.toJSON());
			CodecProxy codec = getCodec(mor.getProperty("codec").toString());
			if (codec != null) {
				String authentication = subscriptionsService.getCredentials(subscriptionsService.getTenant()).get().toCumulocityCredentials().getAuthenticationString();
				codec.setAuthentication(authentication);
				Hardware hardware = mor.get(Hardware.class);
				Result<DownlinkData> result = codec.encode(new Encode(devEui, operation.get(Command.class).getText(), hardware != null ? hardware.getModel() : null));
				if (result.isSuccess()) {
					if (result.getResponse() != null) {
						logger.info("Result of command \"{}\" is payload {}", operation.get(Command.class).getText(), result.getResponse().getPayload());
					} else {
						logger.info("Result of command \"{}\" is empty", operation.get(Command.class).getText());
					}
					data = result.getResponse();
				} else {
					AlarmRepresentation alarm = new AlarmRepresentation();
					alarm.setSource(mor);
					alarm.setType(LORA_DEVICE_COMMAND_ERROR);
					alarm.setText(result.getMessage());
					alarm.setDateTime(new DateTime());
					alarm.setSeverity(CumulocitySeverities.CRITICAL.name());
					alarmApi.create(alarm);
				}
			} else {
				logger.error("Codec {} does not exist.", mor.getProperty("codec"));
			}
		} else {
        	logger.info("Device has no codec information. Operation will be processed when Codec will be provided.");
		}
		return data;
	}
	
	public Map<String, DeviceOperationParam> getAvailableOperations(ManagedObjectRepresentation mor) {
		Map<String, DeviceOperationParam> result = null;
		if (mor.hasProperty("codec")) {
			CodecProxy codec = getCodec(mor.getProperty("codec").toString());
			if (codec != null) {
				String authentication = subscriptionsService.getCredentials(subscriptionsService.getTenant()).get().toCumulocityCredentials().getAuthenticationString();
				codec.setAuthentication(authentication);
				String model = null;
				if (mor.get(Hardware.class) != null) {
					model = mor.get(Hardware.class).getModel();
				}
				result = codec.getAvailableOperations(model);
			}
		}		
		return result;
	}
	
	public Map<String, CodecProxy> getCodecs() {
		return codecInstances;
	}
}
