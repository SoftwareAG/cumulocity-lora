package lora.codec.acsswitch;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.Calendar;

import org.junit.jupiter.api.Test;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.google.common.io.BaseEncoding;

import lora.codec.downlink.DownlinkData;
import lora.codec.downlink.Encode;
import lora.codec.uplink.C8YData;
import lora.codec.uplink.Decode;

public class TestACSSwitchCodec {

	@Test
	void receiveOneParameter() {
		byte[] payload = BaseEncoding.base16().decode("82010102003C");
		ByteBuffer buffer = ByteBuffer.wrap(payload).order(ByteOrder.BIG_ENDIAN);
		ACSSwitchCodec.FRAME frame = ACSSwitchCodec.FRAME.BY_VALUE.get(buffer.get());
		assertEquals(ACSSwitchCodec.FRAME.PARAMETER_READING, frame, "Wrong frame");
		int numberOfRegisters = buffer.get();
		assertEquals(1, numberOfRegisters, "Wrong number of parameters");
		ACSSwitchCodec.PARAMETER parameter = ACSSwitchCodec.PARAMETER.BY_VALUE.get(buffer.get());
		assertEquals(ACSSwitchCodec.PARAMETER.PRESENCE_PERIOD, parameter, "Wrong parameter");
		int value = parameter.getValue(buffer);
		assertEquals(60, value, "Wrong value");
	}

	@Test
	void receiveTwoParameters() {
		byte[] payload = BaseEncoding.base16().decode("82020102003C0D0101");
		ByteBuffer buffer = ByteBuffer.wrap(payload).order(ByteOrder.BIG_ENDIAN);
		ACSSwitchCodec.FRAME frame = ACSSwitchCodec.FRAME.BY_VALUE.get(buffer.get());
		assertEquals(ACSSwitchCodec.FRAME.PARAMETER_READING, frame, "Wrong frame");
		int numberOfRegisters = buffer.get();

		assertEquals(2, numberOfRegisters, "Wrong number of parameters");
		ACSSwitchCodec.PARAMETER parameter = ACSSwitchCodec.PARAMETER.BY_VALUE.get(buffer.get());
		assertEquals(ACSSwitchCodec.PARAMETER.PRESENCE_PERIOD, parameter, "Wrong parameter");
		int value = parameter.getValue(buffer);
		assertEquals(60, value, "Wrong value");

		parameter = ACSSwitchCodec.PARAMETER.BY_VALUE.get(buffer.get());
		assertEquals(ACSSwitchCodec.PARAMETER.PRESENCE_AND_ALARM_TYPE, parameter, "Wrong parameter");
		value = parameter.getValue(buffer);
		assertEquals(1, value, "Wrong value");
	}

	@Test
	void receiveTwoParameters2() {
		byte[] payload = BaseEncoding.base16().decode("82020102003c020201f0".toUpperCase());
		ByteBuffer buffer = ByteBuffer.wrap(payload).order(ByteOrder.BIG_ENDIAN);
		ACSSwitchCodec.FRAME frame = ACSSwitchCodec.FRAME.BY_VALUE.get(buffer.get());
		assertEquals(ACSSwitchCodec.FRAME.PARAMETER_READING, frame, "Wrong frame");
		int numberOfRegisters = buffer.get();

		assertEquals(2, numberOfRegisters, "Wrong number of parameters");
		ACSSwitchCodec.PARAMETER parameter = ACSSwitchCodec.PARAMETER.BY_VALUE.get(buffer.get());
		assertEquals(ACSSwitchCodec.PARAMETER.PRESENCE_PERIOD, parameter, "Wrong parameter");
		int value = parameter.getValue(buffer);
		assertEquals(60, value, "Wrong value");

		parameter = ACSSwitchCodec.PARAMETER.BY_VALUE.get(buffer.get());
		assertEquals(ACSSwitchCodec.PARAMETER.PRESENCE_RANDOM_DELAY, parameter, "Wrong parameter");
		parameter.getValues(buffer);
		assertEquals(1, parameter.values[0].value, "Wrong value for min");
		assertEquals(240, parameter.values[1].value, "Wrong value for max");
	}

	@Test
	void testNormalPayload() {
		ACSSwitchCodec codec = new ACSSwitchCodec();
		C8YData data = codec.decode(null, new Decode("0", null, 1, "4200000a4c03000000001700000000611508",
				Calendar.getInstance().getTimeInMillis()));
		System.out.println(data);
	}

	@Test
	void testSetConfig() {
		ACSSwitchCodec codec = new ACSSwitchCodec();
		Encode encode = new Encode("000000000000000",
				"{\"set config\": {\"RTC\":415211437,\"PRESENCE_RANDOM_DELAY\":{\"min\":5,\"max\":6},\"PRESENCE_PERIOD\":55}}",
				"default");
		DownlinkData data = codec.encode(new ManagedObjectRepresentation(), encode);
		System.out.println(data.getPayload());
		assertEquals("0303030418BF9FAD0202050601020037", data.getPayload());
	}
}
