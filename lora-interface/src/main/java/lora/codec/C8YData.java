package lora.codec;

import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.cumulocity.model.event.CumulocitySeverities;
import com.cumulocity.model.measurement.MeasurementValue;
import com.cumulocity.rest.representation.alarm.AlarmRepresentation;
import com.cumulocity.rest.representation.event.EventRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class C8YData {
	private List<MeasurementRepresentation> measurements = new ArrayList<>();
	private List<EventRepresentation> events = new ArrayList<>();
	private List<AlarmRepresentation> alarms = new ArrayList<>();
	private List<String> alarmsToClear = new ArrayList<>();
	private Map<String, List<MeasurementRepresentation>> childMeasurements = new HashMap<>();
	private Map<String, List<EventRepresentation>> childEvents = new HashMap<>();
	private Map<String, List<AlarmRepresentation>> childAlarms = new HashMap<>();
	private Map<String, List<String>> childAlarmsToClear = new HashMap<>();
	private ManagedObjectRepresentation rootDevice;
	private boolean updateRootDevice = false;

    final private Logger logger = LoggerFactory.getLogger(getClass());

	public Number extractValue(ByteBuffer buffer, int size) {
		Number result = null;
		switch(size) {
		case 1:
			result = buffer.get();
			break;
		case 2:
			result = buffer.getShort();
			break;
		case 4:
			result = buffer.getInt();
			break;
		}
		
		logger.info("Value extracted: {}", result);
		
		return result;
	}

	private MeasurementRepresentation createMeasurement(ManagedObjectRepresentation mor, String fragment, String[] serieses, String[] units, BigDecimal[] values, DateTime time) {
		MeasurementRepresentation m = new MeasurementRepresentation();
		Map<String, MeasurementValue> measurementValueMap = new HashMap<>();
		int i = 0;
		for(String series: serieses) {
			MeasurementValue mv = new MeasurementValue();
			mv.setValue(values[i]);
			mv.setUnit(units[i]);
			measurementValueMap.put(series, mv);
			i++;
		}
		m.set(measurementValueMap, fragment);
		m.setType(fragment);
		m.setSource(mor);
		m.setDateTime(time);

		return m;
	}
	
	public void addMeasurement(ManagedObjectRepresentation mor, String fragment, String series, String unit, BigDecimal value, DateTime time) {

		measurements.add(createMeasurement(mor, fragment, new String[]{series}, new String[]{unit}, new BigDecimal[]{value}, time));
	}
	
	public void addMeasurement(ManagedObjectRepresentation mor, String fragment, String[] serieses, String[] units, BigDecimal[] values, DateTime time) {
		measurements.add(createMeasurement(mor, fragment, serieses, units, values, time));
	}
	
	public void addMeasurement(MeasurementRepresentation m) {
		measurements.add(m);
	}
	
	public void addChildMeasurement(String childPath, String fragment, String series, String unit, BigDecimal value, DateTime time) {
		addChildMeasurement(childPath, createMeasurement(null, fragment, new String[]{series}, new String[]{unit}, new BigDecimal[]{value}, time));
	}
	
	public void addChildMeasurement(String childPath, String fragment, String[] serieses, String[] units, BigDecimal[] values, DateTime time) {
		addChildMeasurement(childPath, createMeasurement(null, fragment, serieses, units, values, time));
	}
	
	public void addChildMeasurement(String childPath, MeasurementRepresentation m) {
		if (!childMeasurements.containsKey(childPath)) {
			childMeasurements.put(childPath, new ArrayList<>());
		}
		childMeasurements.get(childPath).add(m);
	}

	private EventRepresentation createEvent(ManagedObjectRepresentation mor, String eventType, String eventText, Map<String, Object> properties, DateTime dateTime) {
        EventRepresentation eventRepresentation = new EventRepresentation();
        eventRepresentation.setSource(mor);
        eventRepresentation.setDateTime(dateTime);
        eventRepresentation.setText(eventText);
        eventRepresentation.setType(eventType);
        if (properties != null) {
            for (Entry<String, Object> property: properties.entrySet()) {
            	eventRepresentation.setProperty(property.getKey(), property.getValue());
            }
		}
		
		return eventRepresentation;
	}

	public void addEvent(ManagedObjectRepresentation mor, String eventType, String eventText, Map<String, Object> properties, DateTime dateTime) {
        
        events.add(createEvent(mor, eventType, eventText, properties, dateTime));
    }
	
	public void addEvent(ManagedObjectRepresentation mor, EventRepresentation locationUpdate) {
		events.add(locationUpdate);
	}

	public void addChildEvent(String childPath, String eventType, String eventText, Map<String, Object> properties, DateTime dateTime) {
		if (!childEvents.containsKey(childPath)) {
			childEvents.put(childPath, new ArrayList<>());
		}
		childEvents.get(childPath).add(createEvent(null, eventType, eventText, properties, dateTime));
	}

	private AlarmRepresentation createAlarm(ManagedObjectRepresentation mor, String alarmType, String alarmText, CumulocitySeverities severity, DateTime dateTime) {
        AlarmRepresentation alarmRepresentation = new AlarmRepresentation();
        alarmRepresentation.setSource(mor);
        alarmRepresentation.setDateTime(dateTime);
        alarmRepresentation.setText(alarmText);
        alarmRepresentation.setType(alarmType);
        alarmRepresentation.setSeverity(severity.name());

		return alarmRepresentation;
	}

	public void addAlarm(ManagedObjectRepresentation mor, String alarmType, String alarmText, CumulocitySeverities severity, DateTime dateTime) {
        alarms.add(createAlarm(mor, alarmType, alarmText, severity, dateTime));
	}

	public void addChildAlarm(String childPath, String alarmType, String alarmText, CumulocitySeverities severity, DateTime dateTime) {
		if (!childAlarms.containsKey(childPath)) {
			childAlarms.put(childPath, new ArrayList<>());
		}
		childAlarms.get(childPath).add(createAlarm(null, alarmType, alarmText, severity, dateTime));
	}

	public void clearAlarm(String alarmType) {
		alarmsToClear.add(alarmType);
	}

	public void clearChildAlarm(String childPath, String alarmType) {
		if (!childAlarmsToClear.containsKey(childPath)) {
			childAlarmsToClear.put(childPath, new ArrayList<>());
		}
		childAlarmsToClear.get(childPath).add(alarmType);
	}

	@Deprecated
	public ManagedObjectRepresentation getMorToUpdate() {
		return rootDevice;
	}

	@Deprecated
	public void setMorToUpdate(ManagedObjectRepresentation morToUpdate) {
		this.rootDevice = morToUpdate;
		updateRootDevice = true;
	}

	public ManagedObjectRepresentation getRootDevice() {
		return rootDevice;
	}

	public void updateRootDevice(ManagedObjectRepresentation rootDevice) {
		this.rootDevice = rootDevice;
		updateRootDevice = true;
	}

	public boolean updateRootDeviceRequired() {
		return updateRootDevice;
	}

	public List<MeasurementRepresentation> getMeasurements() {
		return measurements;
	}

	public List<EventRepresentation> getEvents() {
		return events;
	}

	public List<AlarmRepresentation> getAlarms() {
		return alarms;
	}

	public List<String> getAlarmsToClear() {
		return alarmsToClear;
	}

	@Override
	public String toString() {
		return "C8YData [measurements=" + measurements + ", events=" + events + ", alarms=" + alarms
				+ ", alarmsToClear=" + alarmsToClear + ", rootDevice=" + rootDevice + "]";
	}

	public Map<String, List<MeasurementRepresentation>> getChildMeasurements() {
		return childMeasurements;
	}

	public Map<String, List<EventRepresentation>> getChildEvents() {
		return childEvents;
	}

	public Map<String, List<AlarmRepresentation>> getChildAlarms() {
		return childAlarms;
	}

	public Map<String, List<String>> getChildAlarmsToClear() {
		return childAlarmsToClear;
	}
}
