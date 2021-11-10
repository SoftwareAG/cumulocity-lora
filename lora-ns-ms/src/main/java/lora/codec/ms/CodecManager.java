package lora.codec.ms;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.cumulocity.microservice.context.credentials.MicroserviceCredentials;
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

import org.apache.commons.codec.binary.Hex;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import c8y.Command;
import c8y.Hardware;
import lora.codec.DeviceCodecRepresentation;
import lora.codec.Result;
import lora.codec.downlink.DeviceOperationElement;
import lora.codec.downlink.DownlinkData;
import lora.codec.downlink.Encode;
import lora.codec.uplink.Decode;
import lora.common.C8YUtils;
import lora.ns.DeviceData;

@Service
public class CodecManager {

	/**
	 *
	 */
	private static final String PROPERTY_PROCESSED = "processed";

	/**
	 *
	 */
	private static final String PROPERTY_CODEC = "codec";

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

	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	private static final String LORA_DEVICE_COMMAND_ERROR = "LoRa device command error";
	private static final String LORA_DEVICE_PAYLOAD_ERROR = "LoRa device payload decoding error";

	private Map<String, CodecProxy> codecInstances = new HashMap<>();

	@EventListener
	private void updateCodecsList(MicroserviceSubscriptionAddedEvent event) {
		InventoryFilter filter = new InventoryFilter().byType(C8YUtils.CODEC_TYPE);
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
			logger.info("Codec {} not in cache, will get it from inventory.", id);
			ExternalIDRepresentation extId = findExternalId(id, C8YUtils.CODEC_ID);
			if (extId != null) {
				ManagedObjectRepresentation mor = inventoryApi.get(extId.getManagedObject().getId());
				DeviceCodecRepresentation codec = mor.get(DeviceCodecRepresentation.class);
				if (codec != null) {
					result = new CodecProxy(id, codec.getName(), codec.getVersion());
					codecInstances.put(id, result);
				} else {
					codec = new DeviceCodecRepresentation();
					codec.setId(id);
					codec.setName("codec_name");
					codec.setVersion("codec_version");
					logger.warn("Codec {} exists in inventory but structure is wrong: {}", id, mor.toJSON());
					mor = new ManagedObjectRepresentation();
					mor.set(codec);
					logger.warn("Codec structure should look like: {}", mor.toJSON());
				}
			} else {
				logger.warn("No external id could be found for {}.", id);
			}
		}
		if (result == null) {
			logger.warn("Codec {} is not available on that tenant.", id);
		}
		return result;
	}

	private Optional<CodecProxy> getCodec(ManagedObjectRepresentation device) {
		CodecProxy codec = null;
		Optional<CodecProxy> result = Optional.empty();
		if (device.hasProperty(PROPERTY_CODEC)) {
			codec = getCodec(device.getProperty(PROPERTY_CODEC).toString());
			Optional<MicroserviceCredentials> credentials = subscriptionsService.getCredentials(subscriptionsService.getTenant());
			if (codec != null && credentials.isPresent()) {
				String authentication = credentials.get().toCumulocityCredentials().getAuthenticationString();
				codec.setAuthentication(authentication);
				result = Optional.of(codec);
			} else {
				if (codec == null) {
					logger.error("Codec {} does not exist.", device.getProperty(PROPERTY_CODEC));
				} else {
					logger.error("Could not retrieve microservice credentials.");
				}
			}
		} else {
        	logger.info("Device has no codec information. Payload will be stored for later parsing when Codec will be provided.");
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
		eventRepresentation.setProperty(PROPERTY_PROCESSED, false);
		getCodec(mor).ifPresent(codec -> {
			logger.info("Codec {} will be used with device {} for decoding payload {} on port {}", mor.getProperty(PROPERTY_CODEC), event.getDevEui(), event.getPayload(), event.getfPort());
			Result<String> result = codec.decode(new Decode(event));
			if (result.isSuccess()) {
				eventRepresentation.setProperty(PROPERTY_PROCESSED, true);
			} else {
				eventRepresentation.setProperty(PROPERTY_PROCESSED, false);
				AlarmRepresentation alarm = new AlarmRepresentation();
				alarm.setSource(mor);
				alarm.setType(LORA_DEVICE_PAYLOAD_ERROR);
				alarm.setText(result.getMessage() != null ? result.getMessage() : result.getResponse());
				alarm.setDateTime(new DateTime());
				alarm.setSeverity(CumulocitySeverities.CRITICAL.name());
				alarmApi.create(alarm);
			}
		});
		eventApi.create(eventRepresentation);
	}
	
	public DownlinkData encode(String devEui, OperationRepresentation operation) {
		DownlinkData[] data = {null};
		ManagedObjectRepresentation mor = inventoryApi.get(operation.getDeviceId());
		getCodec(mor).ifPresent(codec -> {
			logger.info("Codec {} will be used with device {} for encoding operation {}", mor.getProperty(PROPERTY_CODEC), devEui, operation.toJSON());
			Hardware hardware = mor.get(Hardware.class);
			Result<DownlinkData> result = codec.encode(new Encode(devEui, operation.get(Command.class).getText(), hardware != null ? hardware.getModel() : null));
			if (result.isSuccess()) {
				if (result.getResponse() != null) {
					logger.info("Result of command \"{}\" is payload {}", operation.get(Command.class).getText(), result.getResponse().getPayload());
				} else {
					logger.info("Result of command \"{}\" is empty", operation.get(Command.class).getText());
				}
				data[0] = result.getResponse();
			} else {
				AlarmRepresentation alarm = new AlarmRepresentation();
				alarm.setSource(mor);
				alarm.setType(LORA_DEVICE_COMMAND_ERROR);
				alarm.setText(result.getMessage());
				alarm.setDateTime(new DateTime());
				alarm.setSeverity(CumulocitySeverities.CRITICAL.name());
				alarmApi.create(alarm);
			}
		});
		return data[0];
	}
	
	public Map<String, DeviceOperationElement> getAvailableOperations(ManagedObjectRepresentation mor) {
		Map<String, DeviceOperationElement> result = null;
		if (mor.hasProperty(PROPERTY_CODEC)) {
			CodecProxy codec = getCodec(mor.getProperty(PROPERTY_CODEC).toString());
			Optional<MicroserviceCredentials> credentials = subscriptionsService.getCredentials(subscriptionsService.getTenant());
			if (codec != null && credentials.isPresent()) {
				String authentication = credentials.get().toCumulocityCredentials().getAuthenticationString();
				codec.setAuthentication(authentication);
				String model = null;
				if (mor.get(Hardware.class) != null) {
					model = mor.get(Hardware.class).getModel();
				}
				result = codec.getAvailableOperations(model);
			} else {
				if (codec == null) {
					logger.error("Codec {} does not exist.", mor.getProperty(PROPERTY_CODEC));
				} else {
					logger.error("Could not retrieve microservice credentials.");
				}
			}
		}		
		return result;
	}
	
	public Map<String, CodecProxy> getCodecs() {
		return codecInstances;
	}
}
