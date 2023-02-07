package lora.codec.atim;

import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;

import com.cumulocity.model.event.CumulocitySeverities;
import com.cumulocity.model.measurement.MeasurementValue;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.google.common.io.BaseEncoding;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import lora.codec.DeviceCodec;
import lora.codec.downlink.DeviceOperation;
import lora.codec.downlink.DownlinkData;
import lora.codec.downlink.Encode;
import lora.codec.uplink.C8YData;
import lora.codec.uplink.Decode;

@Component
public class AtimTM2DCodec extends DeviceCodec {

	private final Logger logger = LoggerFactory.getLogger(AtimTM2DCodec.class);

	private enum FRAME {
		KEEP_ALIVE(0x01) {
			@Override
			void process(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload, DateTime dateTime) {
				ByteBuffer buffer = ByteBuffer.wrap(payload);
				buffer.get();
				short supplyVoltageIDLE = buffer.getShort();
				short supplyVoltageTX = buffer.getShort();
				c8yData.addMeasurement(mor, "SupplyVoltageIDLE", "V", "V", BigDecimal.valueOf(supplyVoltageIDLE), dateTime);
				if (supplyVoltageIDLE < 2900) {
					c8yData.addAlarm(mor, "LowBattery", "Supply Voltage IDLE is below 2.9V", CumulocitySeverities.MAJOR, dateTime);
				}
				c8yData.addMeasurement(mor, "SupplyVoltageTX", "V", "V", BigDecimal.valueOf(supplyVoltageTX), dateTime);
				if (supplyVoltageIDLE < 2900) {
					c8yData.addAlarm(mor, "LowBattery", "Supply Voltage TX is below 2.9V", CumulocitySeverities.MAJOR, dateTime);
				}
			}
		},
		TEST(0x05) {
			@Override
			void process(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload, DateTime dateTime) {
				ByteBuffer buffer = ByteBuffer.wrap(payload);
				buffer.get();
				byte counter = buffer.get();
				c8yData.addMeasurement(mor, "Counter", "C", "", BigDecimal.valueOf(counter), dateTime);
			}
		},
		TEMP_2(0x57) {
			@Override
			void process(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload, DateTime dateTime) {
				ByteBuffer buffer = ByteBuffer.wrap(payload);
				buffer.get();
				BigDecimal t1 = BigDecimal.valueOf(buffer.getShort()).multiply(BigDecimal.valueOf(0.0625));
				BigDecimal t2 = BigDecimal.valueOf(buffer.getShort()).multiply(BigDecimal.valueOf(0.0625));
				createTemperatures(c8yData, mor, t1, t2, dateTime);
			}
		},
		LOW_1_LOW_2(0x53) {
			@Override
			void process(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload, DateTime dateTime) {
				ByteBuffer buffer = ByteBuffer.wrap(payload);
				buffer.get();
				BigDecimal t1 = BigDecimal.valueOf(buffer.getShort()).multiply(BigDecimal.valueOf(0.0625));
				BigDecimal t2 = BigDecimal.valueOf(buffer.getShort()).multiply(BigDecimal.valueOf(0.0625));
				c8yData.addAlarm(mor, "LowTemperature1", "Temperature 1 is too low: " + t1.toString() + " °C", CumulocitySeverities.MAJOR, dateTime);
				c8yData.addAlarm(mor, "LowTemperature2", "Temperature 2 is too low: " + t2.toString() + " °C", CumulocitySeverities.MAJOR, dateTime);
				createTemperatures(c8yData, mor, t1, t2, dateTime);
			}
		},
		LOW_1(0x54) {
			@Override
			void process(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload, DateTime dateTime) {
				ByteBuffer buffer = ByteBuffer.wrap(payload);
				buffer.get();
				BigDecimal t1 = BigDecimal.valueOf(buffer.getShort()).multiply(BigDecimal.valueOf(0.0625));
				BigDecimal t2 = BigDecimal.valueOf(buffer.getShort()).multiply(BigDecimal.valueOf(0.0625));
				c8yData.addAlarm(mor, "LowTemperature1", "Temperature 1 is too low: " + t1.toString() + " °C", CumulocitySeverities.MAJOR, dateTime);
				createTemperatures(c8yData, mor, t1, t2, dateTime);
			}
		},
		LOW_1_HIGH_2(0x55) {
			@Override
			void process(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload, DateTime dateTime) {
				ByteBuffer buffer = ByteBuffer.wrap(payload);
				buffer.get();
				BigDecimal t1 = BigDecimal.valueOf(buffer.getShort()).multiply(BigDecimal.valueOf(0.0625));
				BigDecimal t2 = BigDecimal.valueOf(buffer.getShort()).multiply(BigDecimal.valueOf(0.0625));
				c8yData.addAlarm(mor, "LowTemperature1", "Temperature 1 is too low: " + t1.toString() + " °C", CumulocitySeverities.MAJOR, dateTime);
				c8yData.addAlarm(mor, "HighTemperature2", "Temperature 2 is too high: " + t2.toString() + " °C", CumulocitySeverities.MAJOR, dateTime);
				createTemperatures(c8yData, mor, t1, t2, dateTime);
			}
		},
		LOW_2(0x56) {
			@Override
			void process(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload, DateTime dateTime) {
				ByteBuffer buffer = ByteBuffer.wrap(payload);
				buffer.get();
				BigDecimal t1 = BigDecimal.valueOf(buffer.getShort()).multiply(BigDecimal.valueOf(0.0625));
				BigDecimal t2 = BigDecimal.valueOf(buffer.getShort()).multiply(BigDecimal.valueOf(0.0625));
				c8yData.addAlarm(mor, "LowTemperature2", "Temperature 2 is too low: " + t2.toString() + " °C", CumulocitySeverities.MAJOR, dateTime);
				createTemperatures(c8yData, mor, t1, t2, dateTime);
			}
		},
		HIGH_2(0x58) {
			@Override
			void process(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload, DateTime dateTime) {
				ByteBuffer buffer = ByteBuffer.wrap(payload);
				buffer.get();
				BigDecimal t1 = BigDecimal.valueOf(buffer.getShort()).multiply(BigDecimal.valueOf(0.0625));
				BigDecimal t2 = BigDecimal.valueOf(buffer.getShort()).multiply(BigDecimal.valueOf(0.0625));
				c8yData.addAlarm(mor, "HighTemperature2", "Temperature 2 is too high: " + t2.toString() + " °C", CumulocitySeverities.MAJOR, dateTime);
				createTemperatures(c8yData, mor, t1, t2, dateTime);
			}
		},
		HIGH_1_LOW_2(0x59) {
			@Override
			void process(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload, DateTime dateTime) {
				ByteBuffer buffer = ByteBuffer.wrap(payload);
				buffer.get();
				BigDecimal t1 = BigDecimal.valueOf(buffer.getShort()).multiply(BigDecimal.valueOf(0.0625));
				BigDecimal t2 = BigDecimal.valueOf(buffer.getShort()).multiply(BigDecimal.valueOf(0.0625));
				c8yData.addAlarm(mor, "HighTemperature1", "Temperature 1 is too high: " + t1.toString() + " °C", CumulocitySeverities.MAJOR, dateTime);
				c8yData.addAlarm(mor, "LowTemperature2", "Temperature 2 is too low: " + t2.toString() + " °C", CumulocitySeverities.MAJOR, dateTime);
				createTemperatures(c8yData, mor, t1, t2, dateTime);
			}
		},
		HIGH_1(0x5A) {
			@Override
			void process(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload, DateTime dateTime) {
				ByteBuffer buffer = ByteBuffer.wrap(payload);
				buffer.get();
				BigDecimal t1 = BigDecimal.valueOf(buffer.getShort()).multiply(BigDecimal.valueOf(0.0625));
				BigDecimal t2 = BigDecimal.valueOf(buffer.getShort()).multiply(BigDecimal.valueOf(0.0625));
				c8yData.addAlarm(mor, "HighTemperature1", "Temperature 1 is too high: " + t1.toString() + " °C", CumulocitySeverities.MAJOR, dateTime);
				createTemperatures(c8yData, mor, t1, t2, dateTime);
			}
		},
		HIGH_1_HIGH_2(0x5B) {
			@Override
			void process(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload, DateTime dateTime) {
				ByteBuffer buffer = ByteBuffer.wrap(payload);
				buffer.get();
				BigDecimal t1 = BigDecimal.valueOf(buffer.getShort()).multiply(BigDecimal.valueOf(0.0625));
				BigDecimal t2 = BigDecimal.valueOf(buffer.getShort()).multiply(BigDecimal.valueOf(0.0625));
				c8yData.addAlarm(mor, "HighTemperature1", "Temperature 1 is too high: " + t1.toString() + " °C", CumulocitySeverities.MAJOR, dateTime);
				c8yData.addAlarm(mor, "HighTemperature2", "Temperature 2 is too high: " + t2.toString() + " °C", CumulocitySeverities.MAJOR, dateTime);
				createTemperatures(c8yData, mor, t1, t2, dateTime);
			}
		};

		private static final Map<Integer, FRAME> BY_VALUE = new HashMap<>();
		
		static {
			for(FRAME f : values()) {
				BY_VALUE.put(f.code, f);
			}
		}
		
		public int code;
		
		private FRAME(int code) {
			this.code = code;
		}
		
		abstract void process(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload, DateTime dateTime);

		private static void createTemperatures(C8YData c8yData, ManagedObjectRepresentation mor, BigDecimal t1, BigDecimal t2, DateTime time) {
			MeasurementRepresentation m = new MeasurementRepresentation();
			Map<String, MeasurementValue> measurementValueMap = new HashMap<>();
			MeasurementValue mv = new MeasurementValue();
			mv.setValue(t1);
			mv.setUnit("°C");
			measurementValueMap.put("T1", mv);
			if (t2 != null) {
				mv = new MeasurementValue();
				mv.setValue(t2);
				mv.setUnit("°C");
				measurementValueMap.put("T2", mv);
			}
			m.set(measurementValueMap, "Temperature");
			m.setType("Temperature");
			m.setSource(mor);
			m.setDateTime(time);
			c8yData.addMeasurement(m);
		}
	}

	@Override
	public String getId() {
		return "atimTM2DCodec";
	}

	@Override
	public String getName() {
		return "Atim TM2D";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}

	@Override
	protected C8YData decode(ManagedObjectRepresentation mor, Decode decode) {
		C8YData c8yData = new C8YData();
		byte[] payload = BaseEncoding.base16().decode(decode.getPayload().toUpperCase());

		int code = payload[0];

		FRAME frame = FRAME.BY_VALUE.get(code);
		
		logger.info("Received frame {}", frame);
		
		if (frame != null) {
			frame.process(c8yData, mor, payload, new DateTime(decode.getUpdateTime()));
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
