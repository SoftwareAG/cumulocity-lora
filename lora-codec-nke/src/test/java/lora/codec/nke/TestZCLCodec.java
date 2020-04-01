package lora.codec.nke;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.net.URISyntaxException;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.joda.time.DateTime;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.svenson.JSON;

import com.google.common.io.BaseEncoding;

import lora.codec.nke.ZCLDecoder.Decoded;

public class TestZCLCodec {
	
	private final Logger logger = LoggerFactory.getLogger(getClass());

	@Test
	void testDecodePayload() {
		byte[] payload = BaseEncoding.base16().decode("110a005000064107010536d80e4e01a059022ee0000001".toUpperCase());
		//byte[] payload = BaseEncoding.base16().decode("118A040200002901C298D2".toUpperCase());
		ZCLDecoder decoder = new ZCLDecoder();
		Decoded result = decoder.decode(payload, 125, null);
		logger.info(JSON.defaultJSON().dumpObjectFormatted(result));
		assertEquals(3.662, result.data.disposable_battery_voltage.doubleValue());
		assertEquals(14.04, result.data.main_or_external_voltage.doubleValue());
	}
	
	@Test
	void testBrUncompress() {
		byte[] payload = BaseEncoding.base16().decode("2285408380A80272B46F400A0108D009A44A76B302".toUpperCase());
		ZCLDecoder decoder = new ZCLDecoder();
		Decoded result = decoder.decode(payload, 125, "50-70-053");
		assertNotNull(result.batchRecord);
		assertEquals(2760, result.batchRecord.dataset[0].data.value);
	}
}
