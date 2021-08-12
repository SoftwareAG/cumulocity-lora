package lora.codec.lansitec;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.google.common.io.BaseEncoding;

import org.joda.time.DateTime;
import org.junit.jupiter.api.Test;

import lora.codec.C8YData;
import lora.codec.Decode;
import lora.codec.DownlinkData;
import lora.codec.Encode;

public class TestCodec {
	@Test
	public void testHearbeat() {
		LansitecCodec codec = new LansitecCodec();
		
		C8YData c8yData = codec.decode(new ManagedObjectRepresentation(), new Decode("0", "Asset Tracker", 1, "21640000009000FCA9", 0L));
		
		System.out.println(c8yData.getEvents().iterator().next().getText());
		for (MeasurementRepresentation m : c8yData.getMeasurements()) {
			System.out.println(m);
		}

	}
	
	@Test
	public void testEncode() {
		String operation = "{\"set config\":{\"breakpoint\":\"false\",\"selfadapt\":\"true\",\"oneoff\":\"false\",\"alreport\":\"false\",\"pos\":\"0\",\"hb\":\"10\"}}";
		
		LansitecCodec codec = new LansitecCodec();

		DownlinkData data = codec.encode(new ManagedObjectRepresentation(), new Encode("0", operation, ""));
		
		assertEquals("9400000A", data.getPayload());
	}
}
