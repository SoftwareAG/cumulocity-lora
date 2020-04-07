package lora.codec;

import java.util.List;
import java.util.Map;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;

import com.cumulocity.microservice.subscription.model.MicroserviceSubscriptionAddedEvent;
import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
import com.cumulocity.model.ID;
import com.cumulocity.model.event.CumulocityAlarmStatuses;
import com.cumulocity.rest.representation.alarm.AlarmRepresentation;
import com.cumulocity.rest.representation.event.EventRepresentation;
import com.cumulocity.rest.representation.identity.ExternalIDRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.cumulocity.sdk.client.SDKException;
import com.cumulocity.sdk.client.alarm.AlarmApi;
import com.cumulocity.sdk.client.alarm.AlarmFilter;
import com.cumulocity.sdk.client.event.EventApi;
import com.cumulocity.sdk.client.identity.IdentityApi;
import com.cumulocity.sdk.client.inventory.InventoryApi;
import com.cumulocity.sdk.client.measurement.MeasurementApi;
import com.google.common.io.BaseEncoding;

import lora.common.Component;

public abstract class DeviceCodec implements Component {

	@Autowired
	protected EventApi eventApi;

	@Autowired
	protected AlarmApi alarmApi;

	@Autowired
	protected MeasurementApi measurementApi;

	@Autowired
	protected InventoryApi inventoryApi;
	
	@Autowired
	protected IdentityApi identityApi;
	
    @Autowired
    protected MicroserviceSubscriptionsService subscriptionsService;

	final protected Logger logger = LoggerFactory.getLogger(getClass());
	
	protected final String DEVEUI_TYPE = "LoRa devEUI";
	public static final String CODEC_TYPE = "Device Codec";
	public static final String CODEC_ID = "Codec ID";
	
    abstract protected C8YData decode(ManagedObjectRepresentation mor, String model, int fport, DateTime updateTime, byte[] payload);
	abstract protected DownlinkData encode(ManagedObjectRepresentation mor, String model, String operation);
	
	public DownlinkData encode(Encode encode) {
		DownlinkData data = null;
		ManagedObjectRepresentation mor = getDevice(encode.getDevEui());

		logger.info("Processing operation {} for device {}", encode.getOperation(), encode.getDevEui());
		
		if (encode.getOperation().startsWith("raw ")) {
			String[] tokens = encode.getOperation().split(" ");
			data = new DownlinkData(encode.getDevEui(), Integer.parseInt(tokens[1]), tokens[2]);
		} else if (encode.getOperation().equals("get config")) {
			data = askDeviceConfig(encode.getDevEui());
		} else {
			data = encode(mor, encode.getModel(), encode.getOperation());
			if (data != null) {
				data.setDevEui(encode.getDevEui());
			}
		}
		logger.info("Will send to LNS {}", data);
		
		return data;
	}
	
	@EventListener
	private void registerCodec(MicroserviceSubscriptionAddedEvent event) {
		ExternalIDRepresentation id = findExternalId(this.getId(), CODEC_ID);
		ManagedObjectRepresentation mor = null;
		if (id == null) {
			mor = new ManagedObjectRepresentation();
			mor.set(new DeviceCodecRepresentation(this));
			mor.setType(CODEC_TYPE);
			mor.setName(getName());
			mor = inventoryApi.create(mor);
			
			id = new ExternalIDRepresentation();
			id.setExternalId(this.getId());
			id.setType(CODEC_ID);
			id.setManagedObject(mor);
			identityApi.create(id);
		} else {
			mor = id.getManagedObject();
			mor.set(new DeviceCodecRepresentation(this));
			inventoryApi.update(mor);
		}
	}

	protected void createMeasurement(MeasurementRepresentation m) {
		measurementApi.create(m);
	}

	protected void createEvent(EventRepresentation eventRepresentation) {
		eventApi.create(eventRepresentation);
	}

	protected void createAlarm(AlarmRepresentation alarmRepresentation) {
		alarmApi.create(alarmRepresentation);
	}

	protected void clearAlarm(String alarmType) {
		try {
			AlarmFilter filter = new AlarmFilter();
			filter.byType(alarmType);
			filter.byStatus(CumulocityAlarmStatuses.ACTIVE);
			for (AlarmRepresentation alarmRepresentation : alarmApi.getAlarmsByFilter(filter).get().allPages()) {
				alarmRepresentation.setStatus(CumulocityAlarmStatuses.CLEARED.toString());
				alarmApi.update(alarmRepresentation);
			}
		} catch (SDKException e) {
			logger.error("Error on creating Event", e);
		}
	}
    
    protected ExternalIDRepresentation findExternalId(String externalId, String type) {
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
    
    protected ManagedObjectRepresentation getDevice(String devEui) {
        ExternalIDRepresentation extId = findExternalId(devEui, DEVEUI_TYPE);
		return extId.getManagedObject();
    }
    
    protected void processData(C8YData c8yData) {
		for (MeasurementRepresentation m : c8yData.getMeasurements()) {
			createMeasurement(m);
		}
		for (EventRepresentation e : c8yData.getEvents()) {
			createEvent(e);
		}
		for (AlarmRepresentation a : c8yData.getAlarms()) {
			createAlarm(a);
		}
		for (String t : c8yData.getAlarmsToClear()) {
			clearAlarm(t);
		}
		if (c8yData.getMorToUpdate() != null) {
			inventoryApi.update(c8yData.getMorToUpdate());
		}
    }
    
	public void decode(Decode data) {
		ManagedObjectRepresentation mor = getDevice(data.getDeveui());
		byte[] payload = BaseEncoding.base16().decode(data.getPayload().toUpperCase());
		C8YData c8yData = decode(mor, data.getModel(), data.getfPort(), new DateTime(data.getUpdateTime()), payload);
		processData(c8yData);
	}
	public String getUrl() {
		return System.getenv("C8Y_BASEURL") + "/service/lora-codec-" + this.getId();
	}
	
	public abstract List<String> getModels();
	public abstract DownlinkData askDeviceConfig(String devEui);
	public abstract Map<String, DeviceOperation> getAvailableOperations(String model);
}
