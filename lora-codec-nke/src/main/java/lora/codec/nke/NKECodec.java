package lora.codec.nke;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import lora.codec.C8YData;
import lora.codec.DeviceCodec;
import lora.codec.DeviceOperation;
import lora.codec.DownlinkData;
import lora.codec.nke.ZCLDecoder.Decoded;

@Component
public class NKECodec extends DeviceCodec {
	
	public final static String _50_70_053 = "50-70-053";
	public final static String _50_70_085 = "50-70-085";
	public final static String _50_70_043 = "50-70-043";
	public final static String _50_70_014 = "50-70-014";
	public final static String _50_70_072 = "50-70-072";
	public final static String _50_70_016 = "50-70-016";
	public final static String _50_70_008 = "50-70-008";
	public final static String _50_70_080 = "50-70-080";
	
	private List<String> models = new ArrayList<>();
	{
		models.add(_50_70_053);
		models.add(_50_70_085);
		models.add(_50_70_043);
		models.add(_50_70_014);
		models.add(_50_70_072);
		models.add(_50_70_016);
		models.add(_50_70_008);
		models.add(_50_70_080);
	}
	
	@Autowired
	private ZCLDecoder decoder; 

	@Override
	public String getId() {
		return "nke";
	}

	@Override
	public String getName() {
		return "NKE Watteco";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}

	@Override
	protected C8YData decode(ManagedObjectRepresentation mor, String model, int fport, DateTime updateTime, byte[] payload) {
		C8YData c8yData = new C8YData();
		
		Decoded decoded = decoder.decode(payload, fport, model);
		if (decoded.zclheader.report == "standard") {
			if (decoded.data.temperature != null) {
				c8yData.addMeasurement(mor, "c8y_TemperatureMeasurement", "T", "°C", decoded.data.temperature, new DateTime());
			}
			if (decoded.data.humidity != null) {
				c8yData.addMeasurement(mor, "Humidity", "H", "%RH", decoded.data.humidity, new DateTime());
			}
			if (decoded.data.counter != null) {
				c8yData.addMeasurement(mor, "Counter", "C", "", decoded.data.counter, new DateTime());
			}
		} else if (decoded.batchRecord != null) {
			DateTime currentTime = new DateTime();
			if (model.equals(_50_70_053) || model.equals(_50_70_085)) {
				for (BatchDataSet dataset : decoded.batchRecord.dataset) {
					DateTime time = currentTime.plus((dataset.data_relative_timestamp - decoded.batchRecord.batch_relative_timestamp) * 1000);
					if (dataset.data.label == 0) {
						c8yData.addMeasurement(mor, "c8y_TemperatureMeasurement", "T", "°C", new BigDecimal(dataset.data.value).divide(new BigDecimal(100)), time);
					}
					if (dataset.data.label == 1) {
						c8yData.addMeasurement(mor, "Humidity", "H", "%RH", new BigDecimal(dataset.data.value).divide(new BigDecimal(100)), time);
					}
					if (dataset.data.label == 2) {
						BigDecimal battery = new BigDecimal(dataset.data.value).divide(new BigDecimal(100));
						c8yData.addMeasurement(mor, "c8y_Battery", "level", "%", battery, time);
						mor.setLastUpdatedDateTime(null);
						mor.setProperty("battery", battery);
						c8yData.setMorToUpdate(mor);
					}
				}
			} else {
				logger.error("Model {} is not supported yet", model);
			}
		}
		
		return c8yData;
	}

	@Override
	public List<String> getModels() {
		return models;
	}

	@Override
	protected DownlinkData encode(ManagedObjectRepresentation mor, String model, String operation) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DownlinkData askDeviceConfig(String devEui) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Map<String, DeviceOperation> getAvailableOperations(String model) {
		return new HashMap<String, DeviceOperation>();
	}

	@Override
	protected Map<String, String> getChildDevicesNames() {
		// TODO Auto-generated method stub
		return null;
	}

}
