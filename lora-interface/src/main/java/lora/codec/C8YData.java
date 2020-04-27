package lora.codec;

import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.cumulocity.model.event.CumulocitySeverities;
import com.cumulocity.model.measurement.MeasurementValue;
import com.cumulocity.rest.representation.alarm.AlarmRepresentation;
import com.cumulocity.rest.representation.event.EventRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;

public class C8YData {
	private List<MeasurementRepresentation> measurements = new ArrayList<>();
	private List<EventRepresentation> events = new ArrayList<>();
	private List<AlarmRepresentation> alarms = new ArrayList<>();
	private List<String> alarmsToClear = new ArrayList<>();
	private ManagedObjectRepresentation morToUpdate;

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
	
	public void addMeasurement(ManagedObjectRepresentation mor, String fragment, String series, String unit, BigDecimal value, DateTime time) {
		MeasurementRepresentation m = new MeasurementRepresentation();
		MeasurementValue mv = new MeasurementValue();
		Map<String, MeasurementValue> measurementValueMap = new HashMap<>();
		mv.setValue(value);
		mv.setUnit(unit);
		measurementValueMap.put(series, mv);
		m.set(measurementValueMap, fragment);
		m.setType(fragment);
		m.setSource(mor);
		m.setDateTime(time);

		measurements.add(m);
	}
	
	public void addMeasurement(ManagedObjectRepresentation mor, String fragment, String[] serieses, String[] units, BigDecimal[] values, DateTime time) {
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

		measurements.add(m);
	}
	
	public void addMeasurement(MeasurementRepresentation m) {
		measurements.add(m);
	}

	public void addEvent(ManagedObjectRepresentation mor, String eventType, String eventText, Map<String, Object> properties, DateTime dateTime) {
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
        
        events.add(eventRepresentation);
    }
	
	public void addEvent(ManagedObjectRepresentation mor, EventRepresentation locationUpdate) {
		events.add(locationUpdate);
	}

	public void addAlarm(ManagedObjectRepresentation mor, String alarmType, String alarmText, CumulocitySeverities severity, DateTime dateTime) {
        AlarmRepresentation alarmRepresentation = new AlarmRepresentation();
        alarmRepresentation.setSource(mor);
        alarmRepresentation.setDateTime(dateTime);
        alarmRepresentation.setText(alarmText);
        alarmRepresentation.setType(alarmType);
        alarmRepresentation.setSeverity(severity.name());
        
        alarms.add(alarmRepresentation);
	}

	public void clearAlarm(String alarmType) {
		alarmsToClear.add(alarmType);
	}

	public ManagedObjectRepresentation getMorToUpdate() {
		return morToUpdate;
	}

	public void setMorToUpdate(ManagedObjectRepresentation morToUpdate) {
		this.morToUpdate = morToUpdate;
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
				+ ", alarmsToClear=" + alarmsToClear + ", morToUpdate=" + morToUpdate + "]";
	}
}
