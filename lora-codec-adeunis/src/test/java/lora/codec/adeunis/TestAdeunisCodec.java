package lora.codec.adeunis;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.InputStreamReader;
import java.util.Map;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.joda.time.DateTime;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.cumulocity.model.measurement.MeasurementValue;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.google.common.io.BaseEncoding;

import lora.codec.C8YData;

public class TestAdeunisCodec {
	
	private final Logger logger = LoggerFactory.getLogger(getClass());

	@Test
	public void testComfort() {
		ScriptEngine engine;
		ScriptEngineManager manager = new ScriptEngineManager();
		engine = manager.getEngineByName("nashorn");
		try {
			engine.eval(new InputStreamReader(getClass().getResourceAsStream("/buffer-custom-shim.js")));
			engine.eval(new InputStreamReader(getClass().getResourceAsStream("/lib.js")));
			engine.eval("var decoder = new codec.Decoder();");
			engine.eval("decoder.setDeviceType('comfort');");
			//engine.eval("var result = decoder.decode('4C2000C52000C72000C82000CA1F00CC1F00CD20', '0018b200000204d9', 'lora868');");
			engine.eval("var result = decoder.decode('4c6000d319');");
			engine.eval("var payloadResult = JSON.stringify(result, null, 2);");
			String payloadResult = engine.get("payloadResult").toString();
			logger.info(payloadResult);
			Map result = (Map)engine.get("result");
			assertTrue(result.containsKey("temperature"));
			assertEquals(21.1, (double)((Map)((Map)result.get("temperature")).get("values")).get("0"));
		} catch (ScriptException e) {
			e.printStackTrace();
		}
	}

	@Test
	public void testGetModels() {
		assertTrue(new AdeunisCodec().getModels().contains("comfort"));
	}
	
	@Test
	public void testGetConfig() {
		ScriptEngine engine;
		ScriptEngineManager manager = new ScriptEngineManager();
		engine = manager.getEngineByName("nashorn");
		try {
			engine.eval(new InputStreamReader(getClass().getResourceAsStream("/buffer-custom-shim.js")));
			engine.eval(new InputStreamReader(getClass().getResourceAsStream("/lib.js")));
			engine.eval("var decoder = new codec.Decoder();");
			engine.eval("decoder.setDeviceType('comfort');");
			engine.eval("var result = decoder.decode('10A090010003000301020A');");
			engine.eval("var payloadResult = JSON.stringify(result, null, 2);");
			String payloadResult = engine.get("payloadResult").toString();
			logger.info(payloadResult);
			Map result = (Map)engine.get("result");
			assertTrue(result.containsKey("calculatedSendingPeriod"));
			assertEquals(4644.0, (double)((Map)result.get("calculatedSendingPeriod")).get("value"));
		} catch (ScriptException e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void testSetConfig() {
		ScriptEngine engine;
		ScriptEngineManager manager = new ScriptEngineManager();
		engine = manager.getEngineByName("nashorn");
		try {
			engine.eval(new InputStreamReader(getClass().getResourceAsStream("/buffer-custom-shim.js")));
			engine.eval(new InputStreamReader(getClass().getResourceAsStream("/lib.js")));
			engine.eval("var encoder = new codec.Encoder();");
			engine.eval("var result = encoder.getSupported();");
			engine.eval("var payloadResult = JSON.stringify(result, null, 2);");
			String payloadResult = engine.get("payloadResult").toString();
			logger.info(payloadResult);
			Map result = (Map)engine.get("result");
			assertTrue(((Map)result.get("0")).containsKey("deviceType"));
		} catch (ScriptException e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void testPulse() {
		AdeunisCodec codec = new AdeunisCodec();
		C8YData data = codec.decode(new ManagedObjectRepresentation(), "pulse", 1, new DateTime(), BaseEncoding.base16().decode("462000014B0B00000000"));
		
		assertTrue(data.getMeasurements().size() == 1);
		
		MeasurementRepresentation m = data.getMeasurements().get(0);
		assertNotNull(m);
		assertEquals(84747.0, ((Map<String, MeasurementValue>)m.get("Pulse")).get("Channel A").getValue().doubleValue());
	}
}
