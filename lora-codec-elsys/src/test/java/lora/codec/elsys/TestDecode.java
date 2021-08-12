package lora.codec.elsys;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Map;

import com.cumulocity.model.measurement.MeasurementValue;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.google.common.io.BaseEncoding;

import org.junit.jupiter.api.Test;

import lora.codec.C8YData;
import lora.codec.Decode;

public class TestDecode {
	
	@Test
	public void testPayload() {
		ElsysCodec codec = new ElsysCodec();

		C8YData c8yData = codec.decode(new ManagedObjectRepresentation(), new Decode("0", "-", 1, "010100022e040001050b070e41", 0L));
		
		System.out.println(c8yData.getMeasurements().iterator().next().toJSON());
		
		assertEquals(5, c8yData.getMeasurements().size());
		
		for (MeasurementRepresentation m: c8yData.getMeasurements()) {
			if (m.getType().equals("c8y_TemperatureMeasurement")) {
				assertEquals(25.6, ((Map<String, MeasurementValue>)m.get("c8y_TemperatureMeasurement")).get("T").getValue().doubleValue());
			}
			if (m.getType().equals("Humidity")) {
				assertEquals(46, ((Map<String, MeasurementValue>)m.get("Humidity")).get("H").getValue().intValue());
			}
		}
	}
}
