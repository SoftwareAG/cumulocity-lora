package lora.codec.atim;

import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;

import com.cumulocity.model.event.CumulocitySeverities;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
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
public class AtimTHCodec extends DeviceCodec {

	private final Logger logger = LoggerFactory.getLogger(AtimTHCodec.class);

	private enum FRAME {
		KEEP_ALIVE(0x01) {
			@Override
			void process(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload, DateTime dateTime) {
				ByteBuffer buffer = ByteBuffer.wrap(payload);
				buffer.get();
				short supplyVoltageIDLE = buffer.getShort();
				short supplyVoltageTX = buffer.getShort();
				c8yData.addMeasurement(mor, "SupplyVoltageIDLE", "V", "V", BigDecimal.valueOf(supplyVoltageIDLE),
						dateTime);
				if (supplyVoltageIDLE < 2900) {
					c8yData.addAlarm(mor, "LowBattery", "Supply Voltage IDLE is below 2.9V", CumulocitySeverities.MAJOR,
							dateTime);
				}
				c8yData.addMeasurement(mor, "SupplyVoltageTX", "V", "V", BigDecimal.valueOf(supplyVoltageTX), dateTime);
				if (supplyVoltageIDLE < 2900) {
					c8yData.addAlarm(mor, "LowBattery", "Supply Voltage TX is below 2.9V", CumulocitySeverities.MAJOR,
							dateTime);
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
		TH_DATA(0x17) {
			@Override
			void process(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload, DateTime dateTime) {
				ByteBuffer buffer = ByteBuffer.wrap(payload);
				buffer.get();
				BigDecimal t = BigDecimal.valueOf(buffer.getShort())
						.multiply(BigDecimal.valueOf(175.72).divide(BigDecimal.valueOf(65536)))
						.subtract(BigDecimal.valueOf(46.85));
				BigDecimal h = BigDecimal.valueOf(buffer.getShort())
						.multiply(BigDecimal.valueOf(125).divide(BigDecimal.valueOf(65536)))
						.subtract(BigDecimal.valueOf(6));
				c8yData.addMeasurement(mor, "c8y_TemperatureMeasurement", "T", "°C", t, dateTime);
				c8yData.addMeasurement(mor, "Humidity", "H", "%RH", h, dateTime);
			}
		},
		TH_LOW_THRESHOLD(0x0F) {
			@Override
			void process(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload, DateTime dateTime) {
				ByteBuffer buffer = ByteBuffer.wrap(payload);
				buffer.get();
				BigDecimal t = BigDecimal.valueOf(buffer.getShort())
						.multiply(BigDecimal.valueOf(175.72).divide(BigDecimal.valueOf(65536)))
						.subtract(BigDecimal.valueOf(46.85));
				BigDecimal h = BigDecimal.valueOf(buffer.getShort())
						.multiply(BigDecimal.valueOf(125).divide(BigDecimal.valueOf(65536)))
						.subtract(BigDecimal.valueOf(6));
				c8yData.addAlarm(mor, "LowTemperature",
						"Temperature is too low: " + t.toString() + " °C, " + h.toString() + " %RH",
						CumulocitySeverities.MAJOR, dateTime);
			}
		},
		TH_HIGH_THRESHOLD(0x11) {
			@Override
			void process(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload, DateTime dateTime) {
				ByteBuffer buffer = ByteBuffer.wrap(payload);
				buffer.get();
				BigDecimal t = BigDecimal.valueOf(buffer.getShort())
						.multiply(BigDecimal.valueOf(175.72).divide(BigDecimal.valueOf(65536)))
						.subtract(BigDecimal.valueOf(46.85));
				BigDecimal h = BigDecimal.valueOf(buffer.getShort())
						.multiply(BigDecimal.valueOf(125).divide(BigDecimal.valueOf(65536)))
						.subtract(BigDecimal.valueOf(6));
				c8yData.addAlarm(mor, "HighTemperature",
						"Temperature is too high: " + t.toString() + " °C, " + h.toString() + " %RH",
						CumulocitySeverities.MAJOR, dateTime);
			}
		};

		private static final Map<Integer, FRAME> BY_VALUE = new HashMap<>();

		static {
			for (FRAME f : values()) {
				BY_VALUE.put(f.code, f);
			}
		}

		public int code;

		private FRAME(int code) {
			this.code = code;
		}

		abstract void process(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload, DateTime dateTime);
	}

	@Override
	public String getId() {
		return "atim-th";
	}

	@Override
	public String getName() {
		return "Atim TH";
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
