package lora.codec.pyrescom;

import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.ArrayList;
import java.util.List;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import lora.codec.C8YData;
import lora.codec.DeviceCodec;
import lora.codec.DownlinkData;

@Component
public class PyrescomCodec extends DeviceCodec {

	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	private static final String CLASS_AIR = "Class'Air";
	
	private List<String> models = new ArrayList<String>();
	{
		models.add(CLASS_AIR);
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
	protected C8YData decode(ManagedObjectRepresentation mor, String model, int fport, DateTime updateTime, byte[] payload) {
		C8YData c8yData = new C8YData();
		
		ByteBuffer buffer = ByteBuffer.wrap(payload).order(ByteOrder.LITTLE_ENDIAN);
		
		if (model.equals(CLASS_AIR)) {
			byte status = payload[2];
			byte header = buffer.get();
			if (header == 0x56) {
				BigDecimal battery = new BigDecimal(buffer.get());
				c8yData.addMeasurement(mor, "c8y_Battery", "level", "%", battery, new DateTime());
				mor.setLastUpdatedDateTime(null);
				mor.setProperty("battery", battery);
				c8yData.setMorToUpdate(mor);
				buffer.get();
				c8yData.addMeasurement(mor, "Humidity", "H", "%RH", new BigDecimal(buffer.get()), new DateTime());
				c8yData.addMeasurement(mor, "Pressure", "P", "hPa", new BigDecimal(buffer.getShort()), new DateTime());
				c8yData.addMeasurement(mor, "Mean CO2 Moyen", "C", "ppm", new BigDecimal(buffer.getShort()), new DateTime());
				c8yData.addMeasurement(mor, "Mean Temperature", "T", "°C", new BigDecimal(buffer.getShort()).divide(new BigDecimal(10)), new DateTime());
				c8yData.addMeasurement(mor, "Max CO2 Moyen", "C", "ppm", new BigDecimal(buffer.getShort()), new DateTime());
				c8yData.addMeasurement(mor, "Max Temperature", "T", "°C", new BigDecimal(buffer.getShort()).divide(new BigDecimal(10)), new DateTime());
				c8yData.addMeasurement(mor, "Signal Quality", "SQ", "dB", new BigDecimal(buffer.getShort()), new DateTime());
			}
		}
		
		return c8yData;
	}

	@Override
	public List<String> getModels() {
		return models;
	}

	@Override
	protected DownlinkData encode(ManagedObjectRepresentation mor, String model, String operation) {
		// TODO Auto-generated method stub
		return null;
	}

}
