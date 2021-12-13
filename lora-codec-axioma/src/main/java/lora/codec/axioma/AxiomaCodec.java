package lora.codec.axioma;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cumulocity.model.idtype.GId;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.google.common.io.BaseEncoding;

import org.apache.commons.codec.binary.Hex;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import c8y.Configuration;
import c8y.RequiredAvailability;
import lora.codec.DeviceCodec;
import lora.codec.downlink.DeviceOperation;
import lora.codec.downlink.DownlinkData;
import lora.codec.downlink.Encode;
import lora.codec.uplink.C8YData;
import lora.codec.uplink.Decode;

@Component
public class AxiomaCodec extends DeviceCodec {

	private final Logger logger = LoggerFactory.getLogger(AxiomaCodec.class);

	private enum DIF {
		DWORD((byte)0x04, 4, "32 bits"),
		WORD((byte)0x02, 2, "16 bits"),
		BYTE((byte)0x31, 1, "8 bits");
		
		public final byte value;
		public final int size;
		public final String text;
		
		private static final Map<Byte, DIF> BY_VALUE = new HashMap<>();
		
		static {
			for(DIF d : values()) {
				BY_VALUE.put(d.value, d);
			}
		}
		
		private DIF(byte value, int size, String text) {
			this.value = value;
			this.size = size;
			this.text = text;
		}
	}
	
	private enum VIF {
		DATE_TIME(new byte[] {(byte)0xFF, (byte)0x89, 0x13}),
		STATUS_CODE(new byte[] {(byte)0xFD, 0x17}),
		VOLUME(new byte[] {0x13}),
		PERIOD(new byte[] {(byte)0xFD, 0x2C});
		
		public final byte[] value;
		
		private static final Map<byte[], VIF> BY_VALUE = new HashMap<>();
		public static final Map<Byte, Object> TREEMAP = new HashMap<>(); 
		
		static {
			for(VIF v : values()) {
				BY_VALUE.put(v.value, v);
				Map<Byte, Object> currentNode = TREEMAP;
				Map<Byte, Object> parentNode = null;
				int c=0;
				for(c=0;c<v.value.length;c++) {
					if (!currentNode.containsKey(v.value[c])) {
						Map<Byte, Object> newNode = new HashMap<>();
						currentNode.put(v.value[c], newNode);
						parentNode = currentNode;
						currentNode = newNode;
					} else {
						currentNode = (Map<Byte, Object>)currentNode.get(v.value[c]);
					}
				}
				parentNode.put(v.value[c-1], v);
			}
		}
		
		private VIF(byte[] value) {
			this.value = value;
		}
	}
	
	private enum STATUS {
		LOW_BATTERY((byte)0x04, "Low Battery"),
		PERMANENT((byte)0x08, "Permanent"),
		DRY((byte)0x10, "Dry"),
		BACKFLOW((byte)0x70, "Backflow"),
		MANIPULATION((byte)0xD0, "Manipulation"),
		BURST((byte)0xB0, "Burst"),
		LEAKAGE((byte)0x30, "Leakage"),
		LOW_TEMPERATURE((byte)0x90, "Low Temperature");
		
		public final byte value;
		public final String label;
		
		private static final Map<Byte, STATUS> BY_VALUE = new HashMap<>();
		
		static {
			for(STATUS s : values()) {
				BY_VALUE.put(s.value, s);
			}
		}
		
		private STATUS(byte value, String label) {
			this.value = value;
			this.label = label;
		}
	}
	
	private final class Config {
		DIF dif;
		VIF vif;
		
		public Config(DIF dif, VIF vif) {
			this.dif = dif;
			this.vif = vif;
		}
		
		@Override
		public String toString() {
			return vif.toString() + "(" + dif.text + ")";
		}
	}
	
	private Map<GId, List<Config>> deviceConfig = new HashMap<>();
	
	private List<Config> defaultConfig = new ArrayList<>();
	
	{
		// Default config;
		defaultConfig.add(new Config(DIF.DWORD, VIF.DATE_TIME));
		defaultConfig.add(new Config(DIF.BYTE, VIF.STATUS_CODE));
		defaultConfig.add(new Config(DIF.DWORD, VIF.VOLUME));
		defaultConfig.add(new Config(DIF.DWORD, VIF.PERIOD));
	}

	private void readAlarm(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload) {
		logger.info("Reading alarm...");
		// TODO Auto-generated method stub
		
	}

	private void readConfig(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload) {
		logger.info("Reading new config...");
		logger.info("TREEMAP: {}", VIF.TREEMAP);
		
		List<Config> deviceConfig = new ArrayList<>();
		
		for(int c=0;c<payload.length;) {
			DIF dif = DIF.BY_VALUE.get(payload[c]);
			logger.info("DIF: {}", dif);
			VIF vif = match(payload, c+1);
			logger.info("VIF: {}", vif);
			Config config = new Config(dif, vif);
			deviceConfig.add(config);
			c += vif.value.length + 1;
		}
		
		Configuration configuration = new Configuration(Hex.encodeHexString(payload) + "\n" + deviceConfig.toString());
		mor.set(configuration);
		c8yData.updateRootDevice(mor);
	}

	private void readData(C8YData c8yData, ManagedObjectRepresentation mor, byte[] payload) {
		logger.info("Reading data...");
		DateTime date = null;
		ByteBuffer buffer = ByteBuffer.wrap(payload).order(ByteOrder.LITTLE_ENDIAN);
		List<Config> configs = deviceConfig.containsKey(mor.getId()) ? deviceConfig.get(mor.getId()) : defaultConfig;
		for (Config config : configs) {
			logger.info("Reading data of type {} and size {}", config.vif, config.dif.size);
			switch(config.vif) {
			case DATE_TIME:
				date = new DateTime(c8yData.extractValue(buffer, config.dif.size).longValue() * 1000L);
				logger.info("Date is {}", date);
				break;
			case STATUS_CODE:
				STATUS status = STATUS.BY_VALUE.get(c8yData.extractValue(buffer, config.dif.size).byteValue());
				logger.info("Status: {}", status);
				c8yData.addEvent(mor, "statusUpdate", status.label, new HashMap<String, Object>(), date);
				break;
			case VOLUME:
				buffer.getInt();
				break;
			case PERIOD:
				int period = c8yData.extractValue(buffer, config.dif.size).intValue();
				logger.info("Period: {}s", period);
				RequiredAvailability requiredAvailability = new RequiredAvailability(period / 60 + 1);
				mor.set(requiredAvailability);
				c8yData.updateRootDevice(mor);
				break;
			}
		}
	}
	
	public VIF match(byte[] bytes, int position) {
		VIF vif = null;
		int c = 0;
		Object currentMap = VIF.TREEMAP.get(bytes[position]);
		while(currentMap != null && !(currentMap instanceof VIF)) {
			c++;
			currentMap = ((Map<?, ?>)currentMap).get(bytes[position + c]);
		}
		if (currentMap instanceof VIF) {
			vif = (VIF)currentMap;
		}
		return vif;
	}

	@Override
	public String getId() {
		return "axiomaCodec";
	}

	@Override
	public String getName() {
		return "Axioma";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}

	@Override
	protected C8YData decode(ManagedObjectRepresentation mor, Decode decode) {
		C8YData c8yData = new C8YData();
		byte[] payload = BaseEncoding.base16().decode(decode.getPayload().toUpperCase());

		logger.info("Decoding Axioma payload...");
		switch(decode.getFPort()) {
		case 100:
			readData(c8yData, mor, payload);
			break;
		case 101:
			readConfig(c8yData, mor, payload);
			break;
		case 103:
			readAlarm(c8yData, mor, payload);
			break;
		default:
			break;
		}
		return null;
	}

	@Override
	public Map<String, String> getModels() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected DownlinkData encode(ManagedObjectRepresentation mor, Encode encode) {
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
