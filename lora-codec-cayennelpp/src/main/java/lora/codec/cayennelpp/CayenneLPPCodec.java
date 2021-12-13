package lora.codec.cayennelpp;

import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.HashMap;
import java.util.Map;

import com.cumulocity.model.measurement.MeasurementValue;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.google.common.io.BaseEncoding;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import c8y.Position;
import c8y.RequiredAvailability;
import lora.codec.DeviceCodec;
import lora.codec.downlink.DeviceOperation;
import lora.codec.downlink.DownlinkData;
import lora.codec.downlink.Encode;
import lora.codec.uplink.C8YData;
import lora.codec.uplink.Decode;

@Component
public class CayenneLPPCodec extends DeviceCodec {
	
	private final Logger logger = LoggerFactory.getLogger(CayenneLPPCodec.class);
	
	private enum LPP_TYPE {
		DIGITAL_INPUT((byte)0x00) {
			@Override
			void process(byte channel, C8YData c8yData, ManagedObjectRepresentation mor, ByteBuffer buffer, DateTime dateTime) {
				BigDecimal value = BigDecimal.valueOf(0xff & buffer.get());
				c8yData.addMeasurement(mor, DATA + channel, this.name().toLowerCase(), "", value, dateTime);
			}
		},
		DIGITAL_OUTPUT((byte)0x01) {
			@Override
			void process(byte channel, C8YData c8yData, ManagedObjectRepresentation mor, ByteBuffer buffer, DateTime dateTime) {
				BigDecimal value = BigDecimal.valueOf(0xff & buffer.get());
				c8yData.addMeasurement(mor, DATA + channel, this.name().toLowerCase(), "", value, dateTime);
			}
		},
		ANALOG_INPUT((byte)0x02) {
			@Override
			void process(byte channel, C8YData c8yData, ManagedObjectRepresentation mor, ByteBuffer buffer, DateTime dateTime) {
				BigDecimal value = BigDecimal.valueOf(0xffff & buffer.order(ByteOrder.BIG_ENDIAN).getShort()).divide(BigDecimal.valueOf(100.0));
				c8yData.addMeasurement(mor, DATA + channel, this.name().toLowerCase(), "", value, dateTime);
			}
		},
		ANALOG_OUTPUT((byte)0x03) {
			@Override
			void process(byte channel, C8YData c8yData, ManagedObjectRepresentation mor, ByteBuffer buffer, DateTime dateTime) {
				BigDecimal value = BigDecimal.valueOf(0xffff & buffer.order(ByteOrder.BIG_ENDIAN).getShort()).divide(BigDecimal.valueOf(100.0));
				c8yData.addMeasurement(mor, DATA + channel, this.name().toLowerCase(), "", value, dateTime);
			}
		},
		ILLUMINANCE_SENSOR((byte)0x65) {
			@Override
			void process(byte channel, C8YData c8yData, ManagedObjectRepresentation mor, ByteBuffer buffer, DateTime dateTime) {
				BigDecimal value = BigDecimal.valueOf(0xffff & buffer.order(ByteOrder.LITTLE_ENDIAN).getShort());
				c8yData.addMeasurement(mor, DATA + channel, this.name().toLowerCase(), "", value, dateTime);
			}
		},
		PRESENCE_SENSOR((byte)0x66) {
			@Override
			void process(byte channel, C8YData c8yData, ManagedObjectRepresentation mor, ByteBuffer buffer, DateTime dateTime) {
				BigDecimal value = BigDecimal.valueOf(0xff & buffer.get());
				c8yData.addMeasurement(mor, DATA + channel, this.name().toLowerCase(), "", value, dateTime);
			}
		},
		TEMPERATURE_SENSOR((byte)0x67) {
			@Override
			void process(byte channel, C8YData c8yData, ManagedObjectRepresentation mor, ByteBuffer buffer, DateTime dateTime) {
				BigDecimal value = BigDecimal.valueOf(buffer.order(ByteOrder.BIG_ENDIAN).getShort()).divide(BigDecimal.valueOf(10.0));
				c8yData.addMeasurement(mor, "Temperature_" + channel, "T", "°C", value, dateTime);
			}
		},
		HUMIDITY_SENSOR((byte)0x68) {
			@Override
			void process(byte channel, C8YData c8yData, ManagedObjectRepresentation mor, ByteBuffer buffer, DateTime dateTime) {
				c8yData.addMeasurement(mor, "Humidity_" + channel, "h", "%RH", BigDecimal.valueOf(0xff & buffer.get()).divide(BigDecimal.valueOf(2.0)), dateTime);
			}
		},
		ACCELEROMETER((byte)0x71) {
			@Override
			void process(byte channel, C8YData c8yData, ManagedObjectRepresentation mor, ByteBuffer buffer, DateTime dateTime) {
				BigDecimal x = BigDecimal.valueOf(buffer.order(ByteOrder.BIG_ENDIAN).getShort()).divide(BigDecimal.valueOf(1000.0));
				BigDecimal y = BigDecimal.valueOf(buffer.order(ByteOrder.BIG_ENDIAN).getShort()).divide(BigDecimal.valueOf(1000.0));
				BigDecimal z = BigDecimal.valueOf(buffer.order(ByteOrder.BIG_ENDIAN).getShort()).divide(BigDecimal.valueOf(1000.0));

				MeasurementRepresentation m = new MeasurementRepresentation();
	    		Map<String, MeasurementValue> measurementValueMap = new HashMap<>();
	    		
	    		MeasurementValue mv = new MeasurementValue();
	    		mv.setValue(x);
	    		mv.setUnit("m/s²");
	    		measurementValueMap.put("x", mv);
	    		
	    		mv = new MeasurementValue();
	    		mv.setValue(y);
	    		mv.setUnit("m/s²");
	    		measurementValueMap.put("y", mv);
	    		
	    		mv = new MeasurementValue();
	    		mv.setValue(z);
	    		mv.setUnit("m/s²");
	    		measurementValueMap.put("z", mv);

	    		m.set(measurementValueMap, "Acceleration_" + channel);
	    		m.setType("Acceleration_" + channel);
	    		m.setDateTime(dateTime);
	    		c8yData.addMeasurement(m);
			}
		},
		MAGNETOMETER((byte)0x72) {
			@Override
			void process(byte channel, C8YData c8yData, ManagedObjectRepresentation mor, ByteBuffer buffer, DateTime dateTime) {
				BigDecimal x = BigDecimal.valueOf(buffer.order(ByteOrder.BIG_ENDIAN).getShort()).divide(BigDecimal.valueOf(1000.0));
				BigDecimal y = BigDecimal.valueOf(buffer.order(ByteOrder.BIG_ENDIAN).getShort()).divide(BigDecimal.valueOf(1000.0));
				BigDecimal z = BigDecimal.valueOf(buffer.order(ByteOrder.BIG_ENDIAN).getShort()).divide(BigDecimal.valueOf(1000.0));

				MeasurementRepresentation m = new MeasurementRepresentation();
	    		Map<String, MeasurementValue> measurementValueMap = new HashMap<>();
	    		
	    		MeasurementValue mv = new MeasurementValue();
	    		mv.setValue(x);
	    		mv.setUnit("µT");
	    		measurementValueMap.put("x", mv);
	    		
	    		mv = new MeasurementValue();
	    		mv.setValue(y);
	    		mv.setUnit("µT");
	    		measurementValueMap.put("y", mv);
	    		
	    		mv = new MeasurementValue();
	    		mv.setValue(z);
	    		mv.setUnit("µT");
	    		measurementValueMap.put("z", mv);

	    		m.set(measurementValueMap, "MagneticField_" + channel);
	    		m.setType("MagneticField_" + channel);
	    		m.setDateTime(dateTime);
	    		
	    		c8yData.addMeasurement(m);
			}
		},
		BAROMETER((byte)0x73) {
			@Override
			void process(byte channel, C8YData c8yData, ManagedObjectRepresentation mor, ByteBuffer buffer, DateTime dateTime) {
				BigDecimal value = BigDecimal.valueOf(buffer.order(ByteOrder.BIG_ENDIAN).getShort()).divide(BigDecimal.valueOf(10.0));
				c8yData.addMeasurement(mor, "Pressure_" + channel, "P", "Pa", value, dateTime);
			}
		},
		GYROMETER((byte)0x86) {
			@Override
			void process(byte channel, C8YData c8yData, ManagedObjectRepresentation mor, ByteBuffer buffer, DateTime dateTime) {
				BigDecimal x = BigDecimal.valueOf(buffer.order(ByteOrder.BIG_ENDIAN).getShort()).divide(BigDecimal.valueOf(100.0));
				BigDecimal y = BigDecimal.valueOf(buffer.order(ByteOrder.BIG_ENDIAN).getShort()).divide(BigDecimal.valueOf(100.0));
				BigDecimal z = BigDecimal.valueOf(buffer.order(ByteOrder.BIG_ENDIAN).getShort()).divide(BigDecimal.valueOf(100.0));

				MeasurementRepresentation m = new MeasurementRepresentation();
	    		Map<String, MeasurementValue> measurementValueMap = new HashMap<>();
	    		
	    		MeasurementValue mv = new MeasurementValue();
	    		mv.setValue(x);
	    		mv.setUnit("°/s");
	    		measurementValueMap.put("x", mv);
	    		
	    		mv = new MeasurementValue();
	    		mv.setValue(y);
	    		mv.setUnit("°/s");
	    		measurementValueMap.put("y", mv);
	    		
	    		mv = new MeasurementValue();
	    		mv.setValue(z);
	    		mv.setUnit("°/s");
	    		measurementValueMap.put("z", mv);

	    		m.set(measurementValueMap, "Gyroscope_" + channel);
	    		m.setType("Gyroscope_" + channel);
	    		m.setDateTime(dateTime);
	    		
	    		c8yData.addMeasurement(m);
			}
		},
		GPS_LOCATION((byte)0x88) {
			@Override
			void process(byte channel, C8YData c8yData, ManagedObjectRepresentation mor, ByteBuffer buffer, DateTime dateTime) {
				BigDecimal lat = BigDecimal.valueOf(buffer.order(ByteOrder.BIG_ENDIAN).getInt()).divide(BigDecimal.valueOf(10000.0));
				BigDecimal lng = BigDecimal.valueOf(buffer.order(ByteOrder.BIG_ENDIAN).getInt()).divide(BigDecimal.valueOf(10000.0));
				
				Position p = new Position();
				p.setLat(lat);
				p.setLng(lng);
				
				mor.set(p);
				
				c8yData.updateRootDevice(mor);
			}
		};
		
		/**
		 *
		 */
		private static final String DATA = "data_";

		byte value;
		
		private static final Map<Byte, LPP_TYPE> BY_VALUE = new HashMap<>();
		
		static {
			for(LPP_TYPE t : values()) {
				BY_VALUE.put(t.value, t);
			}
		}
		
		private LPP_TYPE(byte value) {
			this.value = value;
		}

		abstract void process(byte channel, C8YData c8yData, ManagedObjectRepresentation mor, ByteBuffer buffer, DateTime dateTime);
	}

	@Override
	public String getId() {
		return "cayennelpp";
	}

	@Override
	public String getName() {
		return "Cayenne LPP";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}

	@Override
	protected C8YData decode(ManagedObjectRepresentation mor, Decode decode) {
		C8YData c8yData = new C8YData();
		ByteBuffer buffer = ByteBuffer.wrap(BaseEncoding.base16().decode(decode.getPayload().toUpperCase()));

		byte channel = 0;
		
		switch(decode.getFPort()) {
		case 1:
		case 2:
			while (buffer.hasRemaining()) {
				if (decode.getFPort() == 1) {
					channel = buffer.get();
				}
				logger.info("Channel is: {}", channel);
				byte value = buffer.get();
				LPP_TYPE type = LPP_TYPE.BY_VALUE.get(value);
				if (type != null) {
					type.process(channel, c8yData, mor, buffer, new DateTime(decode.getUpdateTime()));
					logger.info("Data decoded: {}", c8yData);
				} else {
					logger.info("{} is not a valid value", value);
				}
				if (decode.getFPort() == 2) {
					channel++;
				}
			}
			break;
		case 3:
			channel = buffer.get();
			BigDecimal lat = BigDecimal.valueOf(buffer.order(ByteOrder.BIG_ENDIAN).getInt()).divide(BigDecimal.valueOf(10000.0));
			BigDecimal lng = BigDecimal.valueOf(buffer.order(ByteOrder.BIG_ENDIAN).getInt()).divide(BigDecimal.valueOf(10000.0));
			BigDecimal alt = BigDecimal.valueOf(buffer.order(ByteOrder.BIG_ENDIAN).getShort()).divide(BigDecimal.valueOf(10000.0));
			Position p = new Position();
			p.setLat(lat);
			p.setLng(lng);
			p.setAlt(alt);
			mor.set(p);
			c8yData.updateRootDevice(mor);
			break;
		case 11:
			short mask = buffer.getShort();
			if ((mask & 0x01) > 0) {
				DateTime utcTime = new DateTime(Long.valueOf(buffer.order(ByteOrder.BIG_ENDIAN).getInt()) * 1000L);
				logger.info("Current device time is {}", utcTime);
			}
			if ((mask & 0x02) > 0) {
				int period = buffer.order(ByteOrder.BIG_ENDIAN).getInt();
				RequiredAvailability requiredAvailability = new RequiredAvailability(period / 60 + 1);
				mor.set(requiredAvailability);
				c8yData.updateRootDevice(mor);
			}
			if ((mask & 0x04) > 0) {
				int readingPeriod = buffer.order(ByteOrder.BIG_ENDIAN).getInt();
				logger.info("Device reading period is {} minutes", readingPeriod / 60);
			}
			break;
		default:
			break;
		}
		
		return c8yData;
	}

	@Override
	public Map<String, String> getModels() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected DownlinkData encode(ManagedObjectRepresentation mor, Encode encode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DownlinkData askDeviceConfig(String devEui) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Map<String, DeviceOperation> getAvailableOperations(String model) {
		return new HashMap<String, DeviceOperation>();
	}

	@Override
	protected Map<String, String> getChildDevicesNames() {
		// TODO Auto-generated method stub
		return null;
	}

}
