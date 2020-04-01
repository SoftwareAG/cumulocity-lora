package lora.codec.adeunis;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.InputStreamReader;
import java.util.Map;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
}
