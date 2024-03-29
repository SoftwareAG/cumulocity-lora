package lora.codec.nke;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.math.BigDecimal;

import org.joda.time.DateTime;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.google.common.io.BaseEncoding;

import lora.codec.downlink.DeviceOperation;
import lora.codec.downlink.DeviceOperationElement;
import lora.codec.uplink.C8YData;

public class TestZCLCodec {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	@Test
	void testDecodePayload() {
		byte[] payload = BaseEncoding.base16().decode("110a005000064107010536d80e4e01a059022ee0000001".toUpperCase());
		// Skydom
		// byte[] payload =
		// BaseEncoding.base16().decode("118a000c00553942fe23d798d0".toUpperCase());
		// byte[] payload =
		// BaseEncoding.base16().decode("118A040500002114C390D1B2".toUpperCase());
		// byte[] payload =
		// BaseEncoding.base16().decode("118A040200002901C298D2".toUpperCase());
		ZCLDecoder decoder = new ZCLDecoder();
		ManagedObjectRepresentation device = new ManagedObjectRepresentation();
		C8YData result = decoder.decode(device, payload, 125, null, new DateTime());
		logger.info(result.toString());
		assertEquals(3.662, ((BigDecimal) device.get("disposableBatteryVoltage")).doubleValue());
		assertEquals(14.04, ((BigDecimal) device.get("mainOrExternalVoltage")).doubleValue());
	}

	@Test
	void testBrUncompress() {
		byte[] payload = BaseEncoding.base16().decode("2285408380A80272B46F400A0108D009A44A76B302".toUpperCase());
		ZCLDecoder decoder = new ZCLDecoder();
		C8YData result = decoder.decode(new ManagedObjectRepresentation(), payload, 125, "50-70-053", new DateTime());
		logger.info(result.toString());
		assertNotNull(result.getMeasurements());
		// assertEquals(2760, result.batchRecord.dataset[0].data.value);
	}

	@Test
	void testEncode() {
		ZCLEncoder encoder = new ZCLEncoder();
		DeviceOperation command = new DeviceOperation(ZCLCommand.ReadAttribute.name(), "Read Attribute").addElement(
				new DeviceOperationElement(ZCLAttribute.BasicFirmwareVersion.name(), "Read firmware version"));
		logger.info(
				encoder.encode(command, 0));
	}
}
