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
import com.cumulocity.sdk.client.inventory.InventoryApi;
import com.cumulocity.sdk.client.measurement.MeasurementApi;
import com.google.common.io.BaseEncoding;

import lora.common.C8YUtils;
import lora.common.Component;

public abstract class DeviceCodec implements Component {

	@Autowired
	protected C8YUtils c8yUtils;
	
	@Autowired
	protected EventApi eventApi;

	@Autowired
	protected AlarmApi alarmApi;

	@Autowired
	protected MeasurementApi measurementApi;

	@Autowired
	protected InventoryApi inventoryApi;
	
    @Autowired
    protected MicroserviceSubscriptionsService subscriptionsService;

	final protected Logger logger = LoggerFactory.getLogger(getClass());
	
	public static final String DEVEUI_TYPE = "LoRa devEUI";
	public static final String CODEC_TYPE = "Device Codec";
	public static final String CODEC_ID = "Codec ID";
	
    abstract protected C8YData decode(ManagedObjectRepresentation mor, String model, int fport, DateTime updateTime, byte[] payload);
	abstract protected DownlinkData encode(ManagedObjectRepresentation mor, String model, String operation);
	public abstract List<String> getModels();
	public abstract DownlinkData askDeviceConfig(String devEui);
	public abstract Map<String, DeviceOperation> getAvailableOperations(String model);
	
	@EventListener
	private void registerCodec(MicroserviceSubscriptionAddedEvent event) {
		ExternalIDRepresentation id = c8yUtils.findExternalId(this.getId(), CODEC_ID);
		ManagedObjectRepresentation mor = null;
		if (id == null) {
			logger.info("Codec '{}' will be initialized in current tenant.", this.getId());
			mor = new ManagedObjectRepresentation();
			mor.set(new DeviceCodecRepresentation(this));
			mor.setType(CODEC_TYPE);
			mor.setName(getName());
			mor = inventoryApi.create(mor);
			
			id = c8yUtils.createExternalId(mor, this.getId(), CODEC_ID);		
		} else {
			mor = id.getManagedObject();
			mor.set(new DeviceCodecRepresentation(this));
			inventoryApi.update(mor);
		}
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
			logger.error("Error on clearing Alarm", e);
		}
	}
    
    protected void processData(C8YData c8yData) {
		for (MeasurementRepresentation m : c8yData.getMeasurements()) {
			measurementApi.create(m);
		}
		for (EventRepresentation e : c8yData.getEvents()) {
			eventApi.create(e);
		}
		for (AlarmRepresentation a : c8yData.getAlarms()) {
			alarmApi.create(a);
		}
		for (String t : c8yData.getAlarmsToClear()) {
			clearAlarm(t);
		}
		if (c8yData.getMorToUpdate() != null) {
			inventoryApi.update(c8yData.getMorToUpdate());
		}
    }
    
	public Result<String> decode(Decode data) {
		Result<String> result = new Result<String>(true, "Payload parsed with success", "OK");
		try {
			ManagedObjectRepresentation mor = c8yUtils.findExternalId(data.getDeveui(), DEVEUI_TYPE).getManagedObject();
			byte[] payload = BaseEncoding.base16().decode(data.getPayload().toUpperCase());
			C8YData c8yData = decode(mor, data.getModel(), data.getfPort(), new DateTime(data.getUpdateTime()), payload);
			logger.info("Processing payload {} from port {} for device {}", data.getPayload(), data.getfPort(), data.getDeveui());
			processData(c8yData);
		} catch (Exception e) {
			result = new Result<String>(false, e.getMessage(), "Couldn't process " + data.toString());
		}
		return result;
	}
	
	public Result<DownlinkData> encode(Encode encode) {
		Result<DownlinkData> result = null;
		try {
			DownlinkData data = null;
			ManagedObjectRepresentation mor = c8yUtils.findExternalId(encode.getDevEui(), DEVEUI_TYPE).getManagedObject();
	
			logger.info("Processing operation {} for device {}", encode.getOperation(), encode.getDevEui());
			
			if (encode.getOperation().startsWith("raw ")) {
				String[] tokens = encode.getOperation().split(" ");
				try {
					data = new DownlinkData(encode.getDevEui(), Integer.parseInt(tokens[1]), tokens[2]);
				} catch (Exception e) {
					e.printStackTrace();
					logger.error("Can't process {}. Expected syntax is \"raw <port number> <hex payload>\"", encode.getOperation());
				}
			} else if (encode.getOperation().contains("get config")) {
				data = askDeviceConfig(encode.getDevEui());
			} else {
				data = encode(mor, encode.getModel(), encode.getOperation());
				if (data != null) {
					data.setDevEui(encode.getDevEui());
				}
			}
			logger.info("Will send to LNS {}", data);
			result = new Result<DownlinkData>(true, "Operation parsed successfully", data);
		} catch (Exception e) {
			result = new Result<DownlinkData>(false, "Couldn't process " + encode.toString(), null);
		}
		
		return result;
	}
}
