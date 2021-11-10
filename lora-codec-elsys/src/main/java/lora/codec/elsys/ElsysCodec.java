package lora.codec.elsys;

import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.google.common.io.BaseEncoding;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import lora.codec.DeviceCodec;
import lora.codec.downlink.DownlinkData;
import lora.codec.downlink.Encode;
import lora.codec.uplink.C8YData;
import lora.codec.uplink.Decode;

@Component
public class ElsysCodec extends DeviceCodec {

	private final Logger logger = LoggerFactory.getLogger(ElsysCodec.class);

	{
		models.put("default", "default");
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
		TEMPERATURE((byte)0x01) {
			@Override
			public void process(ManagedObjectRepresentation mor, ByteBuffer buffer, C8YData c8yData, DateTime time, int offsetSize) {
				BigDecimal temp = BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(10));
				c8yData.addMeasurement(mor, "c8y_TemperatureMeasurement", "T", "°C", temp, getTime(buffer, time, offsetSize));
			}
		},
		HUMIDITY((byte)0x02) {

			@Override
			public void process(ManagedObjectRepresentation mor, ByteBuffer buffer, C8YData c8yData, DateTime time, int offsetSize) {
				BigDecimal humidity = BigDecimal.valueOf(buffer.get());
				c8yData.addMeasurement(mor, "Humidity", "H", "%RH", humidity, getTime(buffer, time, offsetSize));
			}
		},
		LIGHT((byte)0x04) {

			@Override
			public void process(ManagedObjectRepresentation mor, ByteBuffer buffer, C8YData c8yData, DateTime time, int offsetSize) {
				BigDecimal light = BigDecimal.valueOf(buffer.getShort());
				c8yData.addMeasurement(mor, "Light", "L", "Lux", light, getTime(buffer, time, offsetSize));
			}
		},
		MOTION((byte)0x05) {

			@Override
			public void process(ManagedObjectRepresentation mor, ByteBuffer buffer, C8YData c8yData, DateTime time, int offsetSize) {
				BigDecimal motion = BigDecimal.valueOf(buffer.get());
				c8yData.addMeasurement(mor, "Motion", "count", "", motion, getTime(buffer, time, offsetSize));
			}
		},
        CO2((byte)0x06) {

            @Override
            public void process(ManagedObjectRepresentation mor, ByteBuffer buffer, C8YData c8yData, DateTime time, int offsetSize) {
                BigDecimal motion = BigDecimal.valueOf(buffer.getShort());
                c8yData.addMeasurement(mor, "CO2", "ppm", "", motion, getTime(buffer, time, offsetSize));
            }
        },
		BATTERY((byte)0x07) {

			@Override
			public void process(ManagedObjectRepresentation mor, ByteBuffer buffer, C8YData c8yData, DateTime time, int offsetSize) {
				BigDecimal battery = BigDecimal.valueOf(buffer.getShort());
				c8yData.addMeasurement(mor, "Battery", "power", "mV", battery, getTime(buffer, time, offsetSize));
			}
		},
        PULSECOUNT2((byte)0x10) {

            @Override
            public void process(ManagedObjectRepresentation mor, ByteBuffer buffer, C8YData c8yData, DateTime time, int offsetSize) {
                BigDecimal pc2 = BigDecimal.valueOf(buffer.getShort());
                c8yData.addMeasurement(mor, "Pulse Count", "count", "", pc2, getTime(buffer, time, offsetSize));
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
			long offset = offsetSize == 4 ? buffer.getInt() : offsetSize == 2 ? buffer.getShort() : offsetSize == 1 ? buffer.get() : 0;
			return time.minus(offset*1000);
		}
		
		public abstract void process(ManagedObjectRepresentation mor, ByteBuffer buffer, C8YData c8yData, DateTime time, int offsetSize);
	}

	@Override
	protected C8YData decode(ManagedObjectRepresentation mor, Decode decode) {
		C8YData c8yData = new C8YData();
		
		ByteBuffer buffer = ByteBuffer.wrap(BaseEncoding.base16().decode(decode.getPayload().toUpperCase()));
		while (buffer.hasRemaining()) {
			byte type = buffer.get();
			int offsetSize = (type >> 6) & 0x03;
			type = (byte)(type & 0x3f);
			TYPE.BY_VALUE.get(type).process(mor, buffer, c8yData, new DateTime(decode.getUpdateTime()), offsetSize);
		}
		
		return c8yData;
	}

	@Override
	protected DownlinkData encode(ManagedObjectRepresentation mor, Encode encode) {
		return null;
	}

	@Override
	public DownlinkData askDeviceConfig(String devEui) {
		return null;
	}
}
