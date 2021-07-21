package lora.codec.elsys;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Map;

import com.cumulocity.model.measurement.MeasurementValue;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.google.common.io.BaseEncoding;

import org.joda.time.DateTime;
import org.junit.jupiter.api.Test;

import lora.codec.C8YData;

public class TestDecode {
	
	@Test
	public void testPayload() {
		byte[] payload = BaseEncoding.base16().decode("010100022e040001050b070e41".toUpperCase());

		ElsysCodec codec = new ElsysCodec();

		C8YData c8yData = codec.decode(new ManagedObjectRepresentation(), "-", 1, new DateTime(), payload);
		
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
