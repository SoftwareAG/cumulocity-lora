package lora.codec.elsys;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Map;

import com.cumulocity.model.measurement.MeasurementValue;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;

import org.junit.jupiter.api.Test;

import lora.codec.uplink.C8YData;
import lora.codec.uplink.Decode;

public class TestDecode {

	@Test
	public void testPayload() {
		ElsysCodec codec = new ElsysCodec();

		C8YData c8yData = codec.decode(new ManagedObjectRepresentation(),
				new Decode("0", "-", 1, "010100022e040001050b070e41", 0L));

		System.out.println(c8yData.getMeasurements().iterator().next().toJSON());

		assertEquals(5, c8yData.getMeasurements().size());

		for (MeasurementRepresentation m : c8yData.getMeasurements()) {
			if (m.getType().equals("c8y_TemperatureMeasurement")) {
				assertEquals(25.6, ((Map<String, MeasurementValue>) m.get("c8y_TemperatureMeasurement")).get("T")
						.getValue().doubleValue());
			}
			if (m.getType().equals("Humidity")) {
				assertEquals(46, ((Map<String, MeasurementValue>) m.get("Humidity")).get("H").getValue().intValue());
			}
		}
	}

	@Test
	public void testSettings() {
		ElsysCodec codec = new ElsysCodec();
		C8YData c8yData = codec.decode(new ManagedObjectRepresentation(), new Decode("0", "desk", 5,
				"3E590701080509010A000B050D000C051101130000000014000000C81500000001160000000117000000011800000001190000000112001D000000001E000000011F0000000120000000002200000000250326002700F514FB00E8",
				0L));

		System.out.println(c8yData);
	}
}
