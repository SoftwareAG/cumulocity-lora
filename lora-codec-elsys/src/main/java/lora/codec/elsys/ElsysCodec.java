package lora.codec.elsys;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.BaseEncoding;

import lora.codec.C8YData;
import lora.codec.DeviceCodec;
import lora.codec.DeviceOperation;
import lora.codec.DeviceOperationParam;
import lora.codec.DeviceOperationParam.ParamType;
import lora.codec.DownlinkData;

@Component
public class ElsysCodec extends DeviceCodec {

	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	private List<String> models = new ArrayList<String>();

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
			public void process(ManagedObjectRepresentation mor, ByteBuffer buffer, C8YData c8yData, int offsetSize) {
				BigDecimal temp = BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(10));
				c8yData.addMeasurement(mor, "c8y_TemperatureMeasurement", "T", "°C", temp, getTime(buffer, offsetSize));
			}
		},
		HUMIDITY((byte)0x02) {

			@Override
			public void process(ManagedObjectRepresentation mor, ByteBuffer buffer, C8YData c8yData, int offsetSize) {
				BigDecimal humidity = BigDecimal.valueOf(buffer.get());
				c8yData.addMeasurement(mor, "Humidity", "H", "%RH", humidity, getTime(buffer, offsetSize));
			}
		},
		LIGHT((byte)0x04) {

			@Override
			public void process(ManagedObjectRepresentation mor, ByteBuffer buffer, C8YData c8yData, int offsetSize) {
				BigDecimal light = BigDecimal.valueOf(buffer.getShort());
				c8yData.addMeasurement(mor, "Light", "L", "Lux", light, getTime(buffer, offsetSize));
			}
		},
		MOTION((byte)0x05) {

			@Override
			public void process(ManagedObjectRepresentation mor, ByteBuffer buffer, C8YData c8yData, int offsetSize) {
				BigDecimal motion = BigDecimal.valueOf(buffer.get());
				c8yData.addMeasurement(mor, "Motion", "count", "", motion, getTime(buffer, offsetSize));
			}
		},
        CO2((byte)0x06) {

            @Override
            public void process(ManagedObjectRepresentation mor, ByteBuffer buffer, C8YData c8yData, int offsetSize) {
                BigDecimal motion = BigDecimal.valueOf(buffer.getShort());
                c8yData.addMeasurement(mor, "CO2", "ppm", "", motion, getTime(buffer, offsetSize));
            }
        },
		BATTERY((byte)0x07) {

			@Override
			public void process(ManagedObjectRepresentation mor, ByteBuffer buffer, C8YData c8yData, int offsetSize) {
				BigDecimal battery = BigDecimal.valueOf(buffer.getShort());
				c8yData.addMeasurement(mor, "Battery", "power", "mV", battery, getTime(buffer, offsetSize));
			}
		},
        PULSECOUNT2((byte)0x10) {

            @Override
            public void process(ManagedObjectRepresentation mor, ByteBuffer buffer, C8YData c8yData, int offsetSize) {
                BigDecimal pc2 = BigDecimal.valueOf(buffer.getShort());
                c8yData.addMeasurement(mor, "Pulse Count", "count", "", pc2, getTime(buffer, offsetSize));
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

		private static DateTime getTime(ByteBuffer buffer, int offsetSize) {
			long offset = offsetSize == 4 ? buffer.getInt() : offsetSize == 2 ? buffer.getShort() : offsetSize == 1 ? buffer.get() : 0;
			DateTime time = new DateTime().minus(offset*1000);
			return time;
		}
		
		public abstract void process(ManagedObjectRepresentation mor, ByteBuffer buffer, C8YData c8yData, int offsetSize);
	}

	@Override
	protected C8YData decode(ManagedObjectRepresentation mor, String model, int fport, DateTime updateTime, byte[] payload) {
		C8YData c8yData = new C8YData();
		
		ByteBuffer buffer = ByteBuffer.wrap(payload);
		while (buffer.hasRemaining()) {
			byte type = buffer.get();
			int offsetSize = (type >> 6) & 0x03;
			type = (byte)(type & 0x3f);
			TYPE.BY_VALUE.get(type).process(mor, buffer, c8yData, offsetSize);
		}
		
		return c8yData;
	}

	@Override
	public List<String> getModels() {
		return models;
	}

	@Override
	protected DownlinkData encode(ManagedObjectRepresentation mor, String model, String operation) {
		String payload = null;
		ObjectMapper mapper = new ObjectMapper();
		try {
			JsonNode root = mapper.readTree(operation);
			byte[] bytes = new byte[11];
			payload = BaseEncoding.base16().encode(bytes);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new DownlinkData(null, 1, payload);
	}

	@Override
	public DownlinkData askDeviceConfig(String devEui) {
		return null;
	}


	@Override
	public Map<String, DeviceOperation> getAvailableOperations(String model) {
		Map<String, DeviceOperation> result = new HashMap<String, DeviceOperation>();
		
		List<DeviceOperationParam> params = new ArrayList<DeviceOperationParam>();
		
		return result;
	}

	@Override
	protected Map<String, String> getChildDevicesNames() {
		// TODO Auto-generated method stub
		return null;
	}

}
