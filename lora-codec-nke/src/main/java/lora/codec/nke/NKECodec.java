package lora.codec.nke;

import java.util.HashMap;
import java.util.Map;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lora.codec.C8YData;
import lora.codec.DeviceCodec;
import lora.codec.DeviceOperation;
import lora.codec.DownlinkData;

@Component
public class NKECodec extends DeviceCodec {
	
	{
		models.put("50-70-053", "TH (50-70-053)");
		models.put("50-70-085", "T (50-70-085)");
		models.put("50-70-043", "Remote temperature (50-70-043)");
		models.put("50-70-014", "Pulse Sens'O (50-70-014)");
		models.put("50-70-072", "Pulse Sens'O (50-70-072)");
		models.put("50-70-016", "Press'O (50-70-016)");
		models.put("50-70-008", "50-70-008");
		models.put("50-70-080", "50-70-080");
		models.put("50-70-143", "Skydome");
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
		return decoder.decode(mor, payload, fport, model, updateTime);
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
}
