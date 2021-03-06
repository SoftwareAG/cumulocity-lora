package lora.codec;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cumulocity.microservice.subscription.model.MicroserviceSubscriptionAddedEvent;
import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
import com.cumulocity.model.event.CumulocityAlarmStatuses;
import com.cumulocity.rest.representation.alarm.AlarmRepresentation;
import com.cumulocity.rest.representation.event.EventRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.cumulocity.sdk.client.SDKException;
import com.cumulocity.sdk.client.alarm.AlarmApi;
import com.cumulocity.sdk.client.alarm.AlarmFilter;
import com.cumulocity.sdk.client.event.EventApi;
import com.cumulocity.sdk.client.inventory.InventoryApi;
import com.cumulocity.sdk.client.measurement.MeasurementApi;
import com.google.common.io.BaseEncoding;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;

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
		
	protected List<String> models = new ArrayList<>();
	protected Map<String, String> childrenNames = new HashMap<>();
	protected Map<String, Map<String, DeviceOperation>> operations = new HashMap<>();

	public static final String CODEC_TYPE = "Device Codec";
	public static final String CODEC_ID = "Codec ID";
	
    abstract protected C8YData decode(ManagedObjectRepresentation mor, String model, int fport, DateTime updateTime, byte[] payload);
	abstract protected DownlinkData encode(ManagedObjectRepresentation mor, String model, String operation);
	public List<String> getModels() {
		return models;
	}
	public abstract DownlinkData askDeviceConfig(String devEui);
	public Map<String, DeviceOperation> getAvailableOperations(String model) {
		return operations.get(model);
	}
	protected Map<String, String> getChildDevicesNames() {
		return childrenNames;
	}
	
	@EventListener
	private void registerCodec(MicroserviceSubscriptionAddedEvent event) {
		c8yUtils.findExternalId(this.getId(), CODEC_ID).map(extId -> {
			ManagedObjectRepresentation mor = extId.getManagedObject();
			mor.set(new DeviceCodecRepresentation(this));
			return inventoryApi.update(mor);
		}).orElseGet(() -> {
			logger.info("Codec '{}' will be initialized in current tenant.", this.getId());
			ManagedObjectRepresentation mor = new ManagedObjectRepresentation();
			mor.set(new DeviceCodecRepresentation(this));
			mor.setType(CODEC_TYPE);
			mor.setName(getName());
			mor = inventoryApi.create(mor);
			
			c8yUtils.createExternalId(mor, this.getId(), CODEC_ID);

			return mor;
		});
	}

	protected void clearAlarm(ManagedObjectRepresentation device, String alarmType) {
		try {
			AlarmFilter filter = new AlarmFilter();
			filter.byType(alarmType);
			filter.bySource(device.getId());
			filter.byStatus(CumulocityAlarmStatuses.ACTIVE);
			for (AlarmRepresentation alarmRepresentation : alarmApi.getAlarmsByFilter(filter).get().allPages()) {
				alarmRepresentation.setStatus(CumulocityAlarmStatuses.CLEARED.toString());
				alarmApi.update(alarmRepresentation);
			}
		} catch (SDKException e) {
			logger.error("Error on clearing Alarm", e);
		}
	}
    
    protected void processData(String deveui, ManagedObjectRepresentation rootDevice, C8YData c8yData) {
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
			clearAlarm(rootDevice, t);
		}
		if (c8yData.updateRootDeviceRequired()) {
			c8yData.getRootDevice().setLastUpdatedDateTime(null);
			logger.info("Upadating root device {}", c8yData.getRootDevice().toJSON());
			inventoryApi.update(c8yData.getRootDevice());
		}
		for (String childPath : c8yData.getChildMeasurements().keySet()) {
			ManagedObjectRepresentation childDevice = getChildDevice(deveui, rootDevice, childPath);

			for (MeasurementRepresentation m : c8yData.getChildMeasurements().get(childPath)) {
				m.setSource(childDevice);
				measurementApi.create(m);
			}
		}
		for (String childPath : c8yData.getChildEvents().keySet()) {
			ManagedObjectRepresentation childDevice = getChildDevice(deveui, rootDevice, childPath);

			for (EventRepresentation e : c8yData.getChildEvents().get(childPath)) {
				e.setSource(childDevice);
				eventApi.create(e);
			}
		}
		for (String childPath : c8yData.getChildAlarms().keySet()) {
			ManagedObjectRepresentation childDevice = getChildDevice(deveui, rootDevice, childPath);

			for (AlarmRepresentation a : c8yData.getChildAlarms().get(childPath)) {
				a.setSource(childDevice);
				alarmApi.create(a);
			}
		}
		for (String childPath : c8yData.getChildAlarmsToClear().keySet()) {
			ManagedObjectRepresentation childDevice = getChildDevice(deveui, rootDevice, childPath);

			for (String t : c8yData.getChildAlarmsToClear().get(childPath)) {
				clearAlarm(childDevice, t);
			}
		}
	}
	
	private ManagedObjectRepresentation getChildDevice(String deveui, ManagedObjectRepresentation rootDevice, String childPath) {
		String[] childIds = childPath.split("/");
		ManagedObjectRepresentation currentDevice = rootDevice;

		String currentChild = "";
		for (String childId : childIds) {
			currentChild +=  (currentChild.isEmpty() ? "" : "/") + childId;
			logger.info("Getting device {}.", currentChild);
			currentDevice = c8yUtils.getChildDevice(currentChild).orElse(
				c8yUtils.createChildDevice(currentDevice, deveui + "/" + currentChild, getChildDevicesNames().getOrDefault(currentChild, currentChild))
			);
		}

		return currentDevice;
	}
    
	public Result<String> decode(Decode data) {
		Result<String> result = new Result<String>(true, "Payload parsed with success", "OK");
		try {
			ManagedObjectRepresentation mor = c8yUtils.getDevice(data.getDeveui()).get();
			byte[] payload = BaseEncoding.base16().decode(data.getPayload().toUpperCase());
			C8YData c8yData = decode(mor, data.getModel(), data.getfPort(), new DateTime(data.getUpdateTime()), payload);
			logger.info("Processing payload {} from port {} for device {}", data.getPayload(), data.getfPort(), data.getDeveui());
			processData(data.getDeveui(), mor, c8yData);
		} catch (Exception e) {
			e.printStackTrace();
			result = new Result<String>(false, e.getMessage(), "Couldn't process " + data.toString());
		}
		return result;
	}
	
	public Result<DownlinkData> encode(Encode encode) {
		Result<DownlinkData> result = null;
		try {
			DownlinkData data = null;
			ManagedObjectRepresentation mor = c8yUtils.getDevice(encode.getDevEui()).get();
	
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
