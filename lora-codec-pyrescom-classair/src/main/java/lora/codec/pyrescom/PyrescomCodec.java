package lora.codec.pyrescom;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.BaseEncoding;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import c8y.RequiredAvailability;
import lora.codec.DeviceCodec;
import lora.codec.downlink.DeviceOperation;
import lora.codec.downlink.DeviceOperationElement;
import lora.codec.downlink.DeviceOperationElement.ParamType;
import lora.codec.downlink.DownlinkData;
import lora.codec.downlink.Encode;
import lora.codec.uplink.C8YData;
import lora.codec.uplink.Decode;

@Component
public class PyrescomCodec extends DeviceCodec {

	private final Logger logger = LoggerFactory.getLogger(PyrescomCodec.class);
	
	private static final String CLASS_AIR = "Class'Air";
	
	{
		models.put(CLASS_AIR, CLASS_AIR);
	}

	@Override
	public String getId() {
		return "pyrescom";
	}

	@Override
	public String getName() {
		return "Pyrescom";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}

	@Override
	protected C8YData decode(ManagedObjectRepresentation mor, Decode decode) {
		C8YData c8yData = new C8YData();
		
		ByteBuffer buffer = ByteBuffer.wrap(BaseEncoding.base16().decode(decode.getPayload().toUpperCase())).order(ByteOrder.LITTLE_ENDIAN);
		
		if (decode.getModel().equals(CLASS_AIR)) {
			byte header = buffer.get();
			if (header == 0x56) {
				BigDecimal battery = BigDecimal.valueOf(buffer.get());
				c8yData.addMeasurement(mor, "c8y_Battery", "level", "%", battery, new DateTime());
				mor.setLastUpdatedDateTime(null);
				mor.setProperty("battery", battery);
				c8yData.updateRootDevice(mor);
				buffer.get();
				c8yData.addMeasurement(mor, "Humidity", "H", "%RH", BigDecimal.valueOf(buffer.get()), new DateTime());
				c8yData.addMeasurement(mor, "Pressure", "P", "hPa", BigDecimal.valueOf(buffer.getShort()), new DateTime());
				c8yData.addMeasurement(mor, "Mean CO2 Moyen", "C", "ppm", BigDecimal.valueOf(buffer.getShort()), new DateTime());
				c8yData.addMeasurement(mor, "Mean Temperature", "T", "°C", BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(10)), new DateTime());
				c8yData.addMeasurement(mor, "Max CO2 Moyen", "C", "ppm", BigDecimal.valueOf(buffer.getShort()), new DateTime());
				c8yData.addMeasurement(mor, "Max Temperature", "T", "°C", BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(10)), new DateTime());
				c8yData.addMeasurement(mor, "Signal Quality", "SQ", "dB", BigDecimal.valueOf(buffer.getShort()), new DateTime());
				mor.set(new RequiredAvailability(60));
				c8yData.updateRootDevice(mor);
			}
		}
		
		return c8yData;
	}

	@Override
	public Map<String, String> getModels() {
		return models;
	}

	@Override
	protected DownlinkData encode(ManagedObjectRepresentation mor, Encode encode) {
		String payload = null;
		ObjectMapper mapper = new ObjectMapper();
		try {
			JsonNode root = mapper.readTree(encode.getOperation()).get("config");
			boolean leds_enabled = root.get("leds_enabled").asBoolean();
			boolean back_light_enabled = root.get("back_light_enabled").asBoolean();
			int orange_threshold = root.get("orange_threshold").asInt();
			int red_threshold = root.get("red_threshold").asInt();
			int day_hour = root.get("day_hour").asInt();
			int night_hour = root.get("night_hour").asInt();
			int hour_diff = root.get("hour_diff").asInt();
			byte[] bytes = new byte[11];
			bytes[0] = 0x43;
			bytes[1] = (byte)((leds_enabled ? (byte)(1<<6) : 0) & (back_light_enabled ? (byte)(1<<5) : 0));
			bytes[2] = (byte)(orange_threshold & 0xff);
			bytes[3] = (byte)((orange_threshold >> 8) & 0xff);
			bytes[4] = (byte)(red_threshold & 0xff);
			bytes[5] = (byte)((red_threshold >> 8) & 0xff);
			bytes[6] = (byte)(day_hour & 0xff);
			bytes[7] = (byte)(night_hour & 0xff);
			bytes[8] = (byte)(hour_diff & 0xff);
			bytes[9] = (byte)((hour_diff >> 8) & 0xff);
			bytes[10] = (byte)((hour_diff >> 16) & 0xff);
			payload = BaseEncoding.base16().encode(bytes);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new DownlinkData(null, 3, payload);
	}

	@Override
	public DownlinkData askDeviceConfig(String devEui) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Map<String, DeviceOperation> getAvailableOperations(String model) {
		Map<String, DeviceOperation> result = new HashMap<>();
		
		List<DeviceOperationElement> params = new ArrayList<>();
		params.add(new DeviceOperationElement("leds_enabled", "Leds enabled", ParamType.BOOL));
		params.add(new DeviceOperationElement("back_light_enabled", "Back light enabled", ParamType.BOOL));
		params.add(new DeviceOperationElement("orange_threshold", "Orange threshold", ParamType.INTEGER));
		params.add(new DeviceOperationElement("red_threshold", "Red threshold", ParamType.INTEGER));
		params.add(new DeviceOperationElement("day_hour", "Day hour", ParamType.INTEGER));
		params.add(new DeviceOperationElement("night_hour", "Night hour", ParamType.INTEGER));
		params.add(new DeviceOperationElement("hour_diff", "Hour diff in seconds", ParamType.INTEGER));
		result.put("config", new DeviceOperation("config", "Config"));
		result.get("config").getElements().addAll(params);
		
		return result;
	}

	@Override
	protected Map<String, String> getChildDevicesNames() {
		// TODO Auto-generated method stub
		return null;
	}

}
