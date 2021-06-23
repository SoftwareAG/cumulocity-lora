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
public class POCCodec extends DeviceCodec {
	
	{
		models.put("eget-1.0", "eget (1.0)");
	}
	
	@Autowired
	private ZCLDecoder decoder; 

	@Override
	public String getId() {
		return "eget";
	}

	@Override
	public String getName() {
		return "eget Poc";
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
