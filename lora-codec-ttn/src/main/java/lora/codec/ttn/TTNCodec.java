package lora.codec.ttn;

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
public class TTNCodec extends DeviceCodec {

	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Override
	public String getId() {
		return "ttn";
	}

	@Override
	public String getName() {
		return "TTN";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}
	
	enum EVENT_TYPE {
		SETUP(1),
		INTERVAL(2),
		MOTION(3),
		BUTTON(4);
		
		int value;
		
		private EVENT_TYPE(int value) {
			this.value = value;
		}
		static final Map<Integer, EVENT_TYPE> BY_VALUE = new HashMap<>();

		static {
			for (EVENT_TYPE f : values()) {
				BY_VALUE.put(f.value, f);
			}
		}
	}

	@Override
	protected C8YData decode(ManagedObjectRepresentation mor, String model, int fport, DateTime updateTime, byte[] payload) {
		C8YData c8yData = new C8YData();
		
		ByteBuffer buffer = ByteBuffer.wrap(payload);
		String event = EVENT_TYPE.BY_VALUE.get(fport).toString();
		int battery = buffer.getShort();
		int light = buffer.getShort();
		int temperature = buffer.getShort();
		c8yData.addEvent(mor, event, event, null, updateTime);
		c8yData.addMeasurement(mor, "c8y_Battery", "level", "%", BigDecimal.valueOf(battery), updateTime);
		c8yData.addMeasurement(mor, "light", "l", "lux", BigDecimal.valueOf(light), updateTime);
		c8yData.addMeasurement(mor, "c8y_TemperatureMeasurement", "T", "°C", BigDecimal.valueOf(temperature).divide(BigDecimal.valueOf(100)), updateTime);
		
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
