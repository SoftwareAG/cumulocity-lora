package lora.codec.nke;

import java.util.HashMap;
import java.util.Map;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.google.common.io.BaseEncoding;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lora.codec.DeviceCodec;
import lora.codec.downlink.DeviceOperation;
import lora.codec.downlink.DownlinkData;
import lora.codec.downlink.Encode;
import lora.codec.uplink.C8YData;
import lora.codec.uplink.Decode;

@Component
public class NKECodec extends DeviceCodec {
	
	{
		models.put("50-70-011", "Sens'O (50-70-011)");
		models.put("50-70-014", "Pulse Sens'O (50-70-014/039/051/072/079/160)");
		models.put("50-70-016", "Press'O (50-70-016)");
		models.put("50-70-043", "Remote temperature (50-70-043/142)");
		models.put("50-70-053", "TH (50-70-053/080)");
		models.put("50-70-085", "T (50-70-085/167)");
		models.put("50-70-101", "Ventil'O (50-70-101/166)");
		models.put("50-70-108", "Clos'O (50-70-108)");
		models.put("50-70-139", "Remote temperature 2CTN (50-70-139/163)");
		//models.put("50-70-143", "Skydome (50-70-143)");
	}
	
	@Autowired
	private ZCLDecoder decoder; 

	@Autowired
	private ZCLEncoder encoder;

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
	protected C8YData decode(ManagedObjectRepresentation mor, Decode decode) {
		return decoder.decode(mor, BaseEncoding.base16().decode(decode.getPayload().toUpperCase()), decode.getFPort(), decode.getModel(), new DateTime(decode.getUpdateTime()));
	}

	@Override
	protected DownlinkData encode(ManagedObjectRepresentation mor, Encode encode) {
		DeviceOperation deviceOperation = convertJsonStringToDeviceOperation(encode.getOperation());
		switch(ZCLCluster.valueOf(deviceOperation.getId())) {
			case AnalogInput:
				break;
			case Basic:
				break;
			case BinaryInput:
				break;
			case Concentration:
				break;
			case Configuration:
				break;
			case DifferentialPressure:
				break;
			case EnergyPowerMetering:
				break;
			case Illuminance:
				break;
			case LoRaWAN:
				break;
			case MultiBinaryInput:
				break;
			case MultiMasterSlave:
				break;
			case MultiStateOutput:
				break;
			case Occupancy:
				break;
			case OnOff:
				break;
			case PowerQuality:
				break;
			case Pressure:
				break;
			case RelativeHumidity:
				break;
			case SensO:
				break;
			case SerialInterface:
				break;
			case SerialMasterSlave:
				break;
			case SimpleMetering:
				break;
			case TIC_CBE:
				break;
			case TIC_CJE:
				break;
			case TIC_ICE:
				break;
			case TIC_PMEPMI:
				break;
			case TIC_STD:
				break;
			case Temperature:
				break;
			case VoltageCurrentMetering:
				break;
			case VolumeMeter:
				break;
			default:
				break;}
		return null;
	}

	@Override
	public DownlinkData askDeviceConfig(String devEui) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Map<String, DeviceOperation> getAvailableOperations(String model) {
		Map<String, DeviceOperation> result = new HashMap<>();
		switch(model) {
			case "50-70-053":
				result.putAll(encoder.getDeviceOperations(ZCLCluster.Basic));
			break;
			default:
			break;
		}
		return result;
	}
}
