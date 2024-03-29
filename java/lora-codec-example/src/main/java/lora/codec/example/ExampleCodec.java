package lora.codec.example;

import java.math.BigDecimal;
import java.nio.ByteBuffer;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.google.common.io.BaseEncoding;

import org.joda.time.DateTime;
import org.springframework.stereotype.Component;

import lora.codec.DeviceCodec;
import lora.codec.downlink.DownlinkData;
import lora.codec.downlink.Encode;
import lora.codec.uplink.C8YData;
import lora.codec.uplink.Decode;

@Component
public class ExampleCodec extends DeviceCodec {

	{
		childrenNames.put("0", "Master 1");
		childrenNames.put("0/0", "Slave 1");
	}

	@Override
	public String getId() {
		return "example";
	}

	@Override
	public String getName() {
		return "Example";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}
	
	@Override
	protected C8YData decode(ManagedObjectRepresentation mor, Decode decode) {
		C8YData c8yData = new C8YData();
		
		ByteBuffer buffer = ByteBuffer.wrap(BaseEncoding.base16().decode(decode.getPayload().toUpperCase()));
		byte l1 = buffer.get();
		byte l2 = buffer.get();
		byte v = buffer.get();
		c8yData.addChildMeasurement(l1 + "/" + l2, "Measurement", "series", "unit", BigDecimal.valueOf(v), new DateTime(decode.getUpdateTime()));
		
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
