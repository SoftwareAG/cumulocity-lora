package lora.codec.elsys;

import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;

import org.joda.time.DateTime;
import org.springframework.stereotype.Component;

import com.cumulocity.model.event.CumulocitySeverities;
import com.cumulocity.rest.representation.event.EventRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.google.common.io.BaseEncoding;

import c8y.Position;
import lombok.extern.slf4j.Slf4j;
import lora.codec.DeviceCodec;
import lora.codec.downlink.DeviceOperation;
import lora.codec.downlink.DownlinkData;
import lora.codec.downlink.Encode;
import lora.codec.uplink.C8YData;
import lora.codec.uplink.Decode;

@Slf4j
@Component
public class ElsysCodec extends DeviceCodec {

	Map<String, DeviceOperation> ops = new HashMap<>();
	{
		models.put("default", "default");
		models.put("desk", "ERS Desk");
		models.put("eye", "ERS Eye");

		ops.put("reboot", new DeviceOperation("reboot", "Reboot"));
		ops.put("getsettings", new DeviceOperation("getsettings", "Get settings"));
	}

	@Override
	public String getId() {
		return "elsys";
	}

	@Override
	public String getName() {
		return "Elsys";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}

	enum TYPE {
		TEMPERATURE((byte) 0x01) {
			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				BigDecimal temp = BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(10));
				c8yData.addMeasurement(mor, "c8y_TemperatureMeasurement", "T", "°C", temp,
						getTime(buffer, time, offsetSize));
			}
		},
		HUMIDITY((byte) 0x02) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				BigDecimal humidity = BigDecimal.valueOf(buffer.get());
				c8yData.addMeasurement(mor, "Humidity", "H", "%RH", humidity, getTime(buffer, time, offsetSize));
			}
		},
		ACCELERATION((byte) 0x03) {
			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				BigDecimal x = BigDecimal.valueOf(buffer.get()).divide(BigDecimal.valueOf(63));
				BigDecimal y = BigDecimal.valueOf(buffer.get()).divide(BigDecimal.valueOf(63));
				BigDecimal z = BigDecimal.valueOf(buffer.get()).divide(BigDecimal.valueOf(63));
				c8yData.addMeasurement(mor, "Aceleration", new String[] { "X", "Y", "Z" },
						new String[] { "G", "G", "G" }, new BigDecimal[] { x, y, z },
						getTime(buffer, time, offsetSize));
			}
		},
		LIGHT((byte) 0x04) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				BigDecimal light = BigDecimal.valueOf(buffer.getShort());
				c8yData.addMeasurement(mor, "Light", "L", "Lux", light, getTime(buffer, time, offsetSize));
			}
		},
		MOTION_PIR((byte) 0x05) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				BigDecimal motion = BigDecimal.valueOf(buffer.get());
				c8yData.addMeasurement(mor, "Motion PIR", "count", "", motion, getTime(buffer, time, offsetSize));
			}
		},
		CO2((byte) 0x06) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				BigDecimal motion = BigDecimal.valueOf(buffer.getShort());
				c8yData.addMeasurement(mor, "CO2", "ppm", "", motion, getTime(buffer, time, offsetSize));
			}
		},
		BATTERY((byte) 0x07) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				BigDecimal battery = BigDecimal.valueOf(buffer.getShort());
				c8yData.addMeasurement(mor, "Battery", "T", "mV", battery, getTime(buffer, time, offsetSize));
			}
		},
		ANALOG1((byte) 0x08) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				BigDecimal battery = BigDecimal.valueOf(buffer.getShort());
				c8yData.addMeasurement(mor, "Analog 1", "T", "mV", battery, getTime(buffer, time, offsetSize));
			}
		},
		GPS((byte) 0x09) {
			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				int b0 = buffer.get() & 0xff;
				int b1 = buffer.get() & 0xff;
				int b2 = buffer.get() & 0xff;
				int b3 = buffer.get() & 0xff;
				int b4 = buffer.get() & 0xff;
				int b5 = buffer.get() & 0xff;
				BigDecimal lat = BigDecimal.valueOf(b0 | b1 << 8 | b2 << 16 | ((b2 & 0x80) != 0 ? 0xff << 24 : 0))
						.divide(BigDecimal.valueOf(10000));
				BigDecimal lng = BigDecimal.valueOf(b3 | b4 << 8 | b5 << 16 | ((b5 & 0x80) != 0 ? 0xff << 24 : 0))
						.divide(BigDecimal.valueOf(10000));
				Position p = new Position();
				p.setLat(lat);
				p.setLng(lng);
				EventRepresentation locationUpdate = new EventRepresentation();
				locationUpdate.setSource(mor);
				locationUpdate.setType("c8y_LocationUpdate");
				locationUpdate.set(p);
				locationUpdate.setText("Location updated");
				locationUpdate.setDateTime(getTime(buffer, time, offsetSize));
				c8yData.addEvent(locationUpdate);
			}
		},
		REL_PULSE_COUNT((byte) 0x0A) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				c8yData.addMeasurement(mor, "Relative Pulse Count", "count", "", BigDecimal.valueOf(buffer.getShort()),
						getTime(buffer, time, offsetSize));
			}
		},
		ABS_PULSE_COUNT((byte) 0x0B) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				c8yData.addMeasurement(mor, "Absolute Pulse Count", "count", "", BigDecimal.valueOf(buffer.getInt()),
						getTime(buffer, time, offsetSize));
			}
		},
		EXT_TEMP1((byte) 0x0C) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				BigDecimal temp = BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(10));
				c8yData.addMeasurement(mor, "External Temperature 1", "T", "°C", temp,
						getTime(buffer, time, offsetSize));
			}
		},
		EXT_BUTTON((byte) 0x0D) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				Map<String, Object> properties = new HashMap<>();
				byte button = buffer.get();
				properties.put("value", button);
				c8yData.addEvent(mor, "ext_button", "External button: " + button, new HashMap<>(),
						getTime(buffer, time, offsetSize));
			}
		},
		EXT_DIST((byte) 0x0E) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				int dist = buffer.getShort() & 0xffff;
				c8yData.addMeasurement(mor, "External Distance", "D", "mm", BigDecimal.valueOf(dist),
						getTime(buffer, time, offsetSize));
			}
		},
		MOTION_ACC_MVT((byte) 0x0F) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				int motion = buffer.get() & 0xff;
				c8yData.addMeasurement(mor, "Motion", "M", "", BigDecimal.valueOf(motion),
						getTime(buffer, time, offsetSize));
			}
		},
		EXT_IR_TEMP((byte) 0x10) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				BigDecimal internal = BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(10));
				BigDecimal external = BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(10));
				c8yData.addMeasurement(mor, "IR Temperature", new String[] { "Internal", "External" },
						new String[] { "°C", "°C" }, new BigDecimal[] { internal, external },
						getTime(buffer, time, offsetSize));
			}
		},
		OCCUPANCY((byte) 0x11) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				int occupancy = buffer.get();
				String text = "No body";
				if (model.equals("desk")) {
					text = occupancy == 1 ? "Pending (Entering/Leaving)" : occupancy == 2 ? "Occupied" : text;
				} else if (model.equals("eye")) {
					text = occupancy == 1 ? "PIR Triggered" : occupancy == 2 ? "Heat Triggered" : text;
				} else {
					text = occupancy != 0 ? "Body" : text;
				}
				c8yData.addEvent(mor, "Occupancy", text, new HashMap<>(), getTime(buffer, time, offsetSize));
			}
		},
		EXT_WATER_LEAK((byte) 0x12) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				int moisture = buffer.get() & 0xff;
				c8yData.addMeasurement(mor, "External Water Leak", "M", "", BigDecimal.valueOf(moisture),
						getTime(buffer, time, offsetSize));
			}
		},
		GRIDEYE((byte) 0x13) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				int ref = buffer.get() & 0xff;
				int[] grideye = new int[64];
				for (int i = 0; i < 64; i++) {
					int v = buffer.get() & 0xff;
					grideye[i] = ref + v;
				}
				Map<String, Object> properties = new HashMap<>();
				properties.put("grideye", grideye);
				c8yData.addEvent(mor, "grideye", "grideye", properties, getTime(buffer, time, offsetSize));
			}
		},
		PRESSURE((byte) 0x14) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				BigDecimal pressure = BigDecimal.valueOf(buffer.getInt()).divide(BigDecimal.valueOf(1000));
				c8yData.addMeasurement(mor, "Pressure", "P", "hPa", pressure,
						getTime(buffer, time, offsetSize));
			}
		},
		SOUND((byte) 0x15) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				int peak = buffer.get() & 0xff;
				int avg = buffer.get() & 0xff;
				c8yData.addMeasurement(mor, "Sound", new String[] { "peak", "avg" }, new String[] { "dB", "dB" },
						new BigDecimal[] { BigDecimal.valueOf(peak), BigDecimal.valueOf(avg) },
						getTime(buffer, time, offsetSize));
			}
		},
		REL_PULSE_COUNT2((byte) 0x16) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				BigDecimal temp = BigDecimal.valueOf(buffer.getShort());
				c8yData.addMeasurement(mor, "Relative Pulse Count 2", "count", "", temp,
						getTime(buffer, time, offsetSize));
			}
		},
		ABS_PULSE_COUNT2((byte) 0x17) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				BigDecimal temp = BigDecimal.valueOf(buffer.getInt());
				c8yData.addMeasurement(mor, "Absolute Pulse Count 2", "count", "", temp,
						getTime(buffer, time, offsetSize));
			}
		},
		ANALOG2((byte) 0x18) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				int t = buffer.getShort() & 0xffff;
				c8yData.addMeasurement(mor, "Analog 2", "T", "mV", BigDecimal.valueOf(t),
						getTime(buffer, time, offsetSize));
			}
		},
		EXT_TEMP2((byte) 0x19) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				BigDecimal temp = BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(10));
				c8yData.addMeasurement(mor, "External Temperature 2", "T", "°C", temp,
						getTime(buffer, time, offsetSize));
			}
		},
		EXT_DIGITAL2((byte) 0x1A) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				Map<String, Object> properties = new HashMap<>();
				byte button = buffer.get();
				properties.put("value", button);
				c8yData.addEvent(mor, "ext_button2", "External button 2: " + button, new HashMap<>(),
						getTime(buffer, time, offsetSize));
			}
		},
		EXT_ANALOG_UV((byte) 0x1B) {

			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
				BigDecimal temp = BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(10));
				c8yData.addMeasurement(mor, "External Temperature 1", "T", "°C", temp,
						getTime(buffer, time, offsetSize));
			}
		},
		DEBUG((byte) 0x3D) {
			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
			}
		},
		SENSOR_SETTINGS((byte) 0x3E) {
			@Override
			public void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
					DateTime time,
					int offsetSize) {
			}
		};

		byte value;
		int size;

		private TYPE(byte value) {
			this.value = value;
		}

		static final Map<Byte, TYPE> BY_VALUE = new HashMap<>();

		static {
			for (TYPE f : values()) {
				BY_VALUE.put(f.value, f);
			}
		}

		private static DateTime getTime(ByteBuffer buffer, DateTime time, int offsetSize) {
			long offset = offsetSize == 4 ? buffer.getInt()
					: offsetSize == 2 ? buffer.getShort() : offsetSize == 1 ? buffer.get() : 0;
			return time.minus(offset * 1000);
		}

		public abstract void process(ManagedObjectRepresentation mor, String model, ByteBuffer buffer, C8YData c8yData,
				DateTime time,
				int offsetSize);
	}

	@Override
	protected C8YData decode(ManagedObjectRepresentation mor, Decode decode) {
		C8YData c8yData = new C8YData();

		ByteBuffer buffer = ByteBuffer.wrap(BaseEncoding.base16().decode(decode.getPayload().toUpperCase()));
		while (buffer.hasRemaining()) {
			byte type = buffer.get();
			int offsetSize = (type >> 6) & 0x03;
			type = (byte) (type & 0x3f);
			TYPE eventType = TYPE.BY_VALUE.get(type);
			if (eventType != null) {
				try {
					eventType.process(mor, decode.getModel(), buffer, c8yData,
							new DateTime(decode.getUpdateTime()), offsetSize);
				} catch (Exception e) {
					e.printStackTrace();
					log.error("Couldn't handle event {}", eventType);
					c8yData.addAlarm(mor, "Event decoding error", "Error while decoding event: " + eventType,
							CumulocitySeverities.WARNING,
							new DateTime(decode.getUpdateTime()));
				}
			} else {
				log.error("Unknown event type: {}", type);
				c8yData.addAlarm(mor, "Unknown event", "Unknown event type: " + type, CumulocitySeverities.WARNING,
						new DateTime(decode.getUpdateTime()));
			}
		}

		return c8yData;
	}

	@Override
	protected DownlinkData encode(ManagedObjectRepresentation mor, Encode encode) {
		DownlinkData result = new DownlinkData();
		DeviceOperation op = this.convertJsonStringToDeviceOperation(encode.getOperation());
		if (op.getId().equals("reboot")) {
			result.setDevEui(encode.getDevEui());
			result.setFport(6);
			result.setPayload("3E01FE");
		}
		return result;
	}

	@Override
	public DownlinkData askDeviceConfig(String devEui) {
		return new DownlinkData(devEui, 6, "3E01F9");
	}

	@Override
	public Map<String, DeviceOperation> getAvailableOperations(String model) {
		return ops;
	}
}
