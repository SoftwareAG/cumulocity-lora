package lora.codec.adeunis;

import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.google.common.collect.Lists;
import com.google.common.io.BaseEncoding;

import lora.codec.C8YData;
import lora.codec.DeviceCodec;
import lora.codec.DownlinkData;

@Component
public class AdeunisCodec extends DeviceCodec {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	private ScriptEngine engine;
	{
		ScriptEngineManager manager = new ScriptEngineManager();
		engine = manager.getEngineByName("nashorn");
		try {
			engine.eval(new InputStreamReader(getClass().getResourceAsStream("/buffer-custom-shim.js")));
			engine.eval(new InputStreamReader(getClass().getResourceAsStream("/lib.js")));
			engine.eval("var decoder = new codec.Decoder();");
			engine.eval("var encoder = new codec.Encoder();");
		} catch (ScriptException e) {
			e.printStackTrace();
		}
	}

	@Override
	public String getId() {
		return "adeunis";
	}

	@Override
	public String getName() {
		return "Adeunis";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}

	@Override
	protected C8YData decode(ManagedObjectRepresentation mor, String model, int fport, DateTime updateTime, byte[] payload) {
		C8YData c8yData = new C8YData();
		
		try {
			engine.eval("decoder.setDeviceType('" + model + "');");
			engine.eval("var result = decoder.decode('" + BaseEncoding.base16().encode(payload) +"');");
			engine.eval("var payloadResult = JSON.stringify(result, null, 2);");
			Map result = (Map)engine.get("result");
			String payloadResult = engine.get("payloadResult").toString();
			logger.info(payloadResult);
			if (result.containsKey("temperature")) {
				String unit = ((Map)result.get("temperature")).get("unit").toString();
				Object intermediateValue = ((Map)((Map)result.get("temperature")).get("values")).get("0");
				BigDecimal value = intermediateValue instanceof Double ? BigDecimal.valueOf((double)intermediateValue) : intermediateValue instanceof Integer ? BigDecimal.valueOf((int)intermediateValue) : null;
				String series = "T";
				c8yData.addMeasurement(mor, "c8y_TemperatureMeasurement", series, unit, value, new DateTime());
			}
			if (result.containsKey("temperatures")) {
				Map<String, Map> temperatures = (Map)result.get("temperatures");
				for (Map temperature: temperatures.values()) {
					String unit = temperature.get("unit").toString();
					Object intermediateValue = temperature.get("value");
					BigDecimal value = intermediateValue instanceof Double ? BigDecimal.valueOf((double)intermediateValue) : intermediateValue instanceof Integer ? BigDecimal.valueOf((int)intermediateValue) : null;
					String series = temperature.get("name").toString();
					c8yData.addMeasurement(mor, "Temperature", series, unit, value, new DateTime());
				}
			}
			if (result.containsKey("humidity")) {
				String unit = ((Map)result.get("humidity")).get("unit").toString();
				Object intermediateValue = ((Map)((Map)result.get("humidity")).get("values")).get("0");
				BigDecimal value = intermediateValue instanceof Double ? BigDecimal.valueOf((double)intermediateValue) : intermediateValue instanceof Integer ? BigDecimal.valueOf((int)intermediateValue) : null;
				String series = "H";
				c8yData.addMeasurement(mor, "Humidity", series, unit, value, new DateTime());
			}
		} catch (ScriptException e) {
			e.printStackTrace();
		}

		
		return c8yData;
	}

	@Override
	public List<String> getModels() {
		List<String> models = new ArrayList<String>();
		try {
			engine.eval("var intermediate = codec.DecoderProducts;");
			Map intermediate = (Map)engine.get("intermediate");
			models = Lists.newArrayList(intermediate.keySet());
		} catch (ScriptException e) {
			e.printStackTrace();
		}
		return models;
	}

	@Override
	protected DownlinkData encode(ManagedObjectRepresentation mor, String model, String operation) {
		DownlinkData data = new DownlinkData();
		try {
			engine.eval("encoder.setDeviceType('" + model + "');");
			engine.eval("var result = encoder.encode('" + operation + ","+ mor.getId().getValue() +"');");
			engine.eval("var payloadResult = JSON.stringify(result, null, 2);");
			String result = (String)engine.get("payloadResult");
			data.setPayload(result);
		} catch (ScriptException e) {
			e.printStackTrace();
		}
		return data;
	}

}
