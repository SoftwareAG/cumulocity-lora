package lora.codec.acsswitch;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cumulocity.model.event.CumulocitySeverities;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.BaseEncoding;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import c8y.Configuration;
import c8y.RequiredAvailability;
import lora.codec.C8YData;
import lora.codec.Decode;
import lora.codec.DeviceCodec;
import lora.codec.DeviceOperation;
import lora.codec.DeviceOperationParam;
import lora.codec.DownlinkData;
import lora.codec.Encode;

@Component
public class ACSSwitchCodec extends DeviceCodec {

	private final Logger logger = LoggerFactory.getLogger(ACSSwitchCodec.class);
	
	public static class ParamValue {
		public int offset;
		public int length;
		public String name;
		public int value;
		public ParamValue(int offset, int length, String name, int value) {
			super();
			this.offset = offset;
			this.length = length;
			this.name = name;
			this.value = value;
		}
	}
	
	enum PARAMETER {
		PRESENCE_PERIOD("Presence period", (byte)0x01, (byte)0x02, null),
		PRESENCE_AND_ALARM_TYPE("Presence and alarm type", (byte)0x0D, (byte)0x01, null),
		ALARM_CONFIGURATION("Alarm configuration", (byte)0x13, (byte)0x01, null),
		PRESENCE_RANDOM_DELAY("Presence random delay", (byte)0x02, (byte)0x02, new ParamValue[]{new ParamValue(8,8,"min",1), new ParamValue(0,8,"max",60)});
		
		public String label;
		public byte code;
		public byte length;
		public ParamValue[] values;

		private PARAMETER(String label, byte code, byte length, ParamValue[] values) {
			this.label = label;
			this.code = code;
			this.length = length;
			this.values = values;
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
				payload[1 + length - i] = (byte)(value);
				value >>= 8;
			}
			return BaseEncoding.base16().encode(payload);
		}
		
		public String buildPayload() {
			int value = 0;
			for (ParamValue v: values) {
				value |= (v.value & ((1 << v.length) - 1)) << v.offset;
			}
			return buildPayload(value);
		}
		
		public int getValue(ByteBuffer buffer) {
			byte length = buffer.get();
			int value = 0;
			for (int i = 0; i < length; i++) {
				value = (value << 8) | (buffer.get() & 0xff);
			}
			return value;
		}
		
		public void getValues(ByteBuffer buffer) {
			int value = getValue(buffer);
			for (ParamValue v: values) {
				v.value = (value >> v.offset) & ((1 << v.length) - 1);
			}
		}
	}
	
	enum FRAME {
		PRESENCE_V1((byte)0x42),
		PRESENCE_V2((byte)0x62),
		NEW_ALARM_V1((byte)0x40),
		ALARM_STILL_ACTIVE_V1((byte)0x41),
		NEW_ALARM_V2((byte)0x60),
		ALARM_STILL_ACTIVE_V2((byte)0x61),
		PARAMETER_READING((byte)0x82),
		WRITE_PARAMETER_ANSWER((byte)0x83);
		
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
		BigDecimal temperature = BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(256));
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
		BigDecimal humidity = BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(256));
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
	protected C8YData decode(ManagedObjectRepresentation mor, Decode decode) {
		C8YData c8yData = new C8YData();
		byte[] payload = BaseEncoding.base16().decode(decode.getPayload().toUpperCase());
		ByteBuffer buffer = ByteBuffer.wrap(payload).order(ByteOrder.BIG_ENDIAN);
		FRAME frame = FRAME.BY_VALUE.get(buffer.get());
		int numberOfRegisters = 0;
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
			numberOfRegisters = buffer.get();
			RequiredAvailability ra = new RequiredAvailability(0);
			for (int i=0;i<numberOfRegisters;i++) {
				PARAMETER parameter = PARAMETER.BY_VALUE.get(buffer.get());
				if (parameter.values == null) {
					int value = parameter.getValue(buffer);
					c8yData.addEvent(mor, "Parameter reading", parameter.label + ": " + value, null, DateTime.now());
					if (parameter == PARAMETER.PRESENCE_PERIOD) {
						ra.setResponseInterval(ra.getResponseInterval() + value * 4 / 60);
					}
					mor.set(new Configuration(BaseEncoding.base16().encode(payload)));
				} else {
					parameter.getValues(buffer);
					String values = "";
					for (ParamValue v: parameter.values) {
						values += parameter.label + "." + v.name + ": " + v.value + "\n";
						if (parameter == PARAMETER.PRESENCE_RANDOM_DELAY && v.name.equals("max")) {
							ra.setResponseInterval(ra.getResponseInterval() + v.value / 60);
						}
					}
					c8yData.addEvent(mor, "Parameter reading", values, null, DateTime.now());
				}
			}
			if (ra.getResponseInterval() > 0) {
				mor.set(ra);
				c8yData.updateRootDevice(mor);
			}
			break;
		case WRITE_PARAMETER_ANSWER:
			numberOfRegisters = buffer.get();
			for (int i=0;i<numberOfRegisters;i++) {
				byte param = buffer.get();
				if (param == (byte)0xff) {
					c8yData.addAlarm(mor, "Parameter writing result", "error", CumulocitySeverities.WARNING, DateTime.now());
				} else {
					PARAMETER parameter = PARAMETER.BY_VALUE.get(param);
					String value = parameter.getValue(buffer) == 0 ? "SUCCESS" : "ERROR";
					c8yData.addEvent(mor, "Parameter writing result", parameter.label + ": " + value, null, DateTime.now());
				}
			}
		}
		return c8yData;
	}

	@Override
	public String getId() {
		return "acs-switch";
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
	protected DownlinkData encode(ManagedObjectRepresentation mor, Encode encode) {
		if (encode.getOperation().contains("get config")) {
			return askDeviceConfig(null);
		}
		DownlinkData data = new DownlinkData();
		ObjectMapper mapper = new ObjectMapper();
		JsonNode root;
		try {
			root = mapper.readTree(encode.getOperation());
			String command = root.fieldNames().next();
			PARAMETER param = PARAMETER.valueOf(command);
			JsonNode params = root.get(command);
			if (param.values == null) {
				data.setPayload("0301" + param.buildPayload(params.get(command).asInt()));
			} else {
				for (ParamValue v: param.values) {
					v.value = params.get(v.name).asInt();
				}
				data.setPayload("0301" + param.buildPayload());
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		data.setFport(1);
		return data;
	}

	@Override
	public DownlinkData askDeviceConfig(String devEui) {
		return new DownlinkData(devEui, 1, "020201020202");
	}

	@Override
	public Map<String, DeviceOperation> getAvailableOperations(String model) {
		Map<String, DeviceOperation> result = new HashMap<String, DeviceOperation>();
		
		result.put("get config", new DeviceOperation("get config", "get config", null));
		
		for(PARAMETER param: PARAMETER.values()) {
			List<DeviceOperationParam> params = new ArrayList<DeviceOperationParam>();
			if (param.values == null) {
				params.add(new DeviceOperationParam(param.name(), param.label, DeviceOperationParam.ParamType.INTEGER, null));
			} else {
				for (ParamValue value: param.values) {
					params.add(new DeviceOperationParam(value.name, value.name, DeviceOperationParam.ParamType.INTEGER, null));
				}
			}
			result.put(param.name(), new DeviceOperation(param.name(), param.label, params));
		}
		
		return result;
	}

}
