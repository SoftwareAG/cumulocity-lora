package lora.codec.acsswitch;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;

import org.junit.jupiter.api.Test;

import com.google.common.io.BaseEncoding;

import io.kaitai.struct.ByteBufferKaitaiStream;

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
	void testKaitai() {
		byte[] payload = BaseEncoding.base16().decode("421332b955030000004c6300000000101430".toUpperCase());
		AcsSwitch acsSwitch = new AcsSwitch(new ByteBufferKaitaiStream(payload));
		assertEquals(AcsSwitch.PresenceV1.class, acsSwitch.body().getClass(), "Wrong temperature");
		assertEquals(new Double(20.1875), ((AcsSwitch.PresenceV1)acsSwitch.body()).temperature(), "Wrong temperature");
	}
}
