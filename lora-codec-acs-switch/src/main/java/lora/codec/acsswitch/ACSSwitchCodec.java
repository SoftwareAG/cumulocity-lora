package lora.codec.acsswitch;

import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.google.common.io.BaseEncoding;

import lora.codec.C8YData;
import lora.codec.DeviceCodec;
import lora.codec.DownlinkData;

@Component
public class ACSSwitchCodec extends DeviceCodec {

	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	enum PARAMETER {
		PRESENCE_PERIOD("Presence period", (byte)0x01, (byte)0x02),
		PRESENCE_AND_ALARM_TYPE("Presence and alarm type", (byte)0x0D, (byte)0x01),
		ALARM_CONFIGURATION("Alarm configuration", (byte)0x13, (byte)0x01);
		
		public String label;
		public byte code;
		public byte length;

		private PARAMETER(String label, byte code, byte length) {
			this.label = label;
			this.code = code;
			this.length = length;
		}

		static final Map<Byte, PARAMETER> BY_VALUE = new HashMap<>();
		
		static {
			for(PARAMETER f : values()) {
				BY_VALUE.put(f.code, f);
			}
		}
		
		public String buildPayload(int value) {
			byte[] payload = new byte[2 + length];
			payload[0] = code;
			payload[1] = length;
			for (int i = 0; i < length; i++) {
				payload[2 + i] = (byte)(value);
				value >>= 8;
			}
			return BaseEncoding.base16().encode(payload);
		}
		
		public int getValue(ByteBuffer buffer) {
			byte length = buffer.get();
			int value = 0;
			for (int i = 0; i < length; i++) {
				value = (value << 8) + buffer.get(); 
			}
			return value;
		}
	}
	
	enum FRAME {
		PRESENCE_V1((byte)0x42),
		PRESENCE_V2((byte)0x62),
		NEW_ALARM_V1((byte)0x40),
		ALARM_STILL_ACTIVE_V1((byte)0x41),
		NEW_ALARM_V2((byte)0x60),
		ALARM_STILL_ACTIVE_V2((byte)0x61),
		PARAMETER_READING((byte)0x82);
		
		static final Map<Byte, FRAME> BY_VALUE = new HashMap<>();
		
		static {
			for(FRAME f : values()) {
				BY_VALUE.put(f.code, f);
			}
		}
		
		public byte code;
		
		private FRAME(byte code) {
			this.code = code;
		}
	}
	
	private enum EVENT_SOURCE {
		INTERNAL_REED((byte)0x00),
		EXTERNAL_REED((byte)0x01),
		MEMS((byte)0x03),
		EXTERNAL_MOTION_SENSOR((byte)0x04),
		TOF((byte)0x05),
		HUMIDITY_SENSOR((byte)0xef),
		TEMPERATURE_SENSOR((byte)0xff);
		
		private static final Map<Byte, EVENT_SOURCE> BY_VALUE = new HashMap<>();
		
		static {
			for(EVENT_SOURCE f : values()) {
				BY_VALUE.put(f.code, f);
			}
		}
	
		public byte code;
		
		private EVENT_SOURCE(byte code) {
			this.code = code;
		}
	}
	
	private enum SOURCE_CONFIG {
		BUTTON_PRESSED_OR_REED_CLOSED((short)0x0000),
		BUTTON_RELEASED_OR_REED_OPENED((short)0x0001),
		REED_CLOSED((short)0x0100),
		REED_OPENED((short)0x0101),
		MEMS_IN_MOVE_PROFILE_MOTION_ALGORITHM_DEACTIVATED((short)0x0300),
		MEMS_IN_MOVE_PROFILE_MOTION_ALGORITHM_ACTIVATED((short)0x0301),
		MEMS_IN_MOVE_PROFILE_MOTION_ALGORITHM_ACTIVATED_AND_INACTIVE_STATE_MANAGED((short)0x0302),
		MEMS_IN_TILT_PROFILE((short)0x0303),
		MEMS_IN_HEADING_PROFILE((short)0x0304),
		PIR_IN_MOVE_PROFILE_MOTION_ALGORITHM_DEACTIVATED((short)0x0400),
		PIR_IN_MOVE_PROFILE_MOTION_ALGORITHM_ACTIVATED((short)0x0401),
		PIR_IN_MOVE_PROFILE_MOTION_ALGORITHM_ACTIVATED_AND_INACTIVE_STATE_MANAGED((short)0x0402),
		TOF_CONFIGURED_IN_DISTANCE_MODE((short)0x0500);
		
		private static final Map<Short, SOURCE_CONFIG> BY_VALUE = new HashMap<>();
		
		static {
			for(SOURCE_CONFIG f : values()) {
				BY_VALUE.put(f.code, f);
			}
		}
	
		public short code;
		
		private SOURCE_CONFIG(short code) {
			this.code = code;
		}
	}
	
	private void presenceFrameV1(ByteBuffer buffer, ManagedObjectRepresentation mor, C8YData c8yData) {
		DateTime time = getTime(buffer.getInt());
		logger.info("Time: {}", time);
		EVENT_SOURCE eventSource = EVENT_SOURCE.BY_VALUE.get(buffer.get());
		c8yData.addEvent(mor, "Managed source", eventSource.name(), null, time);
		extractDataV1(buffer, mor, c8yData, time);
	}

	private void extractDataV1(ByteBuffer buffer, ManagedObjectRepresentation mor, C8YData c8yData, DateTime time) {
		String switchState = buffer.get() > 0 ? "Active" : "Inactive";
		c8yData.addEvent(mor, "Switch state", switchState, null, time);
		int switchActiveStateCounter = buffer.getInt();
		c8yData.addMeasurement(mor, "Switch active state counter", "c", "times", BigDecimal.valueOf(switchActiveStateCounter), time);
		int switchInactiveStateCounter = buffer.getInt();
		c8yData.addMeasurement(mor, "Switch inactive state counter", "c", "times", BigDecimal.valueOf(switchInactiveStateCounter), time);
		int battery = 100 - buffer.get();
		c8yData.addMeasurement(mor, "c8y_Battery", "level", "%", BigDecimal.valueOf(battery), time);
		logger.info("Battery level: {}%", battery);
		BigDecimal temperature = BigDecimal.valueOf(buffer.getShort()).divide(new BigDecimal(256));
		c8yData.addMeasurement(mor, "Temperature", "T", "°C", temperature, time);
		logger.info("Temperature: {}°C", temperature);
	}
	
	private void presenceFrameV2(ByteBuffer buffer, ManagedObjectRepresentation mor, C8YData c8yData) {
		DateTime time = getTime(buffer.getInt());
		EVENT_SOURCE eventSource = EVENT_SOURCE.BY_VALUE.get(buffer.get());
		SOURCE_CONFIG sourceConfiguration = SOURCE_CONFIG.BY_VALUE.get((short)((short)eventSource.code << 8 + (short)buffer.get()));
		c8yData.addEvent(mor, "Managed source configuration", sourceConfiguration.name(), null, time);
		extractDataV2(buffer, mor, c8yData, time, sourceConfiguration);
	}

	private void extractDataV2(ByteBuffer buffer, ManagedObjectRepresentation mor, C8YData c8yData, DateTime time,
			SOURCE_CONFIG sourceConfiguration) {
		extractDataV1(buffer, mor, c8yData, time);
		BigDecimal humidity = BigDecimal.valueOf(buffer.getShort()).divide(new BigDecimal(256));
		c8yData.addMeasurement(mor, "Humidity", "H", "%RH", humidity, time);
		logger.info("Humidity: {}%RH", humidity);
		short x = buffer.getShort();
		short y = buffer.getShort();
		short z = buffer.getShort();
		switch(sourceConfiguration) {
		case MEMS_IN_MOVE_PROFILE_MOTION_ALGORITHM_ACTIVATED:
		case MEMS_IN_MOVE_PROFILE_MOTION_ALGORITHM_ACTIVATED_AND_INACTIVE_STATE_MANAGED:
		case MEMS_IN_MOVE_PROFILE_MOTION_ALGORITHM_DEACTIVATED:
			c8yData.addMeasurement(mor, "Acceleration", new String[] {"x", "y", "z"}, new String[] {"g", "g", "g"}, new BigDecimal[] {BigDecimal.valueOf(x).divide(BigDecimal.valueOf(4000)), BigDecimal.valueOf(y).divide(BigDecimal.valueOf(4000)), BigDecimal.valueOf(z).divide(BigDecimal.valueOf(4000))}, time);
			break;
		case MEMS_IN_HEADING_PROFILE:
			c8yData.addMeasurement(mor, "Position", new String[] {"x", "y", "z"}, new String[] {"gauss", "gauss", "gauss"}, new BigDecimal[] {BigDecimal.valueOf(x).divide(BigDecimal.valueOf(1500)), BigDecimal.valueOf(y).divide(BigDecimal.valueOf(1500)), BigDecimal.valueOf(z).divide(BigDecimal.valueOf(1500))}, time);
			break;
		case MEMS_IN_TILT_PROFILE:
			c8yData.addMeasurement(mor, "Position in degree", new String[] {"x", "y", "z"}, new String[] {"°", "°", "°"}, new BigDecimal[] {BigDecimal.valueOf(x), BigDecimal.valueOf(y), BigDecimal.valueOf(z)}, time);
			break;
		case TOF_CONFIGURED_IN_DISTANCE_MODE:
			c8yData.addMeasurement(mor, "c8y_DistanceMeasurement", "distance", "mm", BigDecimal.valueOf(x), time);
			break;
		}
		int activeStatePercentage = buffer.get();
		c8yData.addMeasurement(mor, "Active state percentage", "level", "%", BigDecimal.valueOf(activeStatePercentage), time);
	}
	
	private void alarmFrameV1(ByteBuffer buffer, ManagedObjectRepresentation mor, C8YData c8yData) {
		DateTime time = getTime(buffer.getInt());
		EVENT_SOURCE eventSource = EVENT_SOURCE.BY_VALUE.get(buffer.get());
		int state = buffer.get();
	}
	
	private void alarmFrameV2(ByteBuffer buffer, ManagedObjectRepresentation mor, C8YData c8yData) {
		DateTime time = getTime(buffer.getInt());
		EVENT_SOURCE eventSource = EVENT_SOURCE.BY_VALUE.get(buffer.get());
		SOURCE_CONFIG sourceConfiguration = SOURCE_CONFIG.BY_VALUE.get((short)((short)eventSource.code << 8 + (short)buffer.get()));
	}
	
	private void alarmStillActiveFrameV1(ByteBuffer buffer, ManagedObjectRepresentation mor, C8YData c8yData) {
		DateTime time = getTime(buffer.getInt());
		EVENT_SOURCE eventSource = EVENT_SOURCE.BY_VALUE.get(buffer.get());
	}
	
	private void alarmStillActiveFrameV2(ByteBuffer buffer, ManagedObjectRepresentation mor, C8YData c8yData) {
		DateTime time = getTime(buffer.getInt());
		EVENT_SOURCE eventSource = EVENT_SOURCE.BY_VALUE.get(buffer.get());
		SOURCE_CONFIG sourceConfiguration = SOURCE_CONFIG.BY_VALUE.get((short)((short)eventSource.code << 8 + (short)buffer.get()));
	}
	
	private DateTime getTime(int timestamp) {
		return new DateTime(2010, 1, 1, 0, 0).plusSeconds(timestamp);
	}

	@Override
	protected C8YData decode(ManagedObjectRepresentation mor, String model, int fport, DateTime updateTime, byte[] payload) {
		C8YData c8yData = new C8YData();
		ByteBuffer buffer = ByteBuffer.wrap(payload).order(ByteOrder.BIG_ENDIAN);
		FRAME frame = FRAME.BY_VALUE.get(buffer.get());
		logger.info("Received frame {}", frame);
		switch(frame) {
		case PRESENCE_V1:
			presenceFrameV1(buffer, mor, c8yData);
			break;
		case NEW_ALARM_V1:
			alarmFrameV1(buffer, mor, c8yData);
			break;
		case ALARM_STILL_ACTIVE_V1:
			alarmStillActiveFrameV1(buffer, mor, c8yData);
			break;
		case PRESENCE_V2:
			presenceFrameV2(buffer, mor, c8yData);
			break;
		case NEW_ALARM_V2:
			alarmFrameV2(buffer, mor, c8yData);
			break;
		case ALARM_STILL_ACTIVE_V2:
			alarmStillActiveFrameV2(buffer, mor, c8yData);
			break;
		case PARAMETER_READING:
			int numberOfRegisters = buffer.get();
			for (int i=0;i<numberOfRegisters;i++) {
				PARAMETER parameter = PARAMETER.BY_VALUE.get(buffer.get());
				c8yData.addEvent(mor, "Parameter reading", parameter.label + ": " + parameter.getValue(buffer), null, DateTime.now());
			}
			break;
		}
		return c8yData;
	}

	@Override
	public String getId() {
		return "acsswitch";
	}

	@Override
	public String getName() {
		return "ACS Switch";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}

	@Override
	public List<String> getModels() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected DownlinkData encode(ManagedObjectRepresentation mor, String model, String operation) {
		// TODO Auto-generated method stub
		return null;
	}

}
