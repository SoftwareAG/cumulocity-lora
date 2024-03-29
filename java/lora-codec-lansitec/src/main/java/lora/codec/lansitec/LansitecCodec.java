package lora.codec.lansitec;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cumulocity.rest.representation.event.EventRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.BaseEncoding;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import c8y.Configuration;
import c8y.Position;
import c8y.RequiredAvailability;
import lora.codec.DeviceCodec;
import lora.codec.downlink.DeviceOperation;
import lora.codec.downlink.DeviceOperationElement;
import lora.codec.downlink.DeviceOperationElement.ParamType;
import lora.codec.downlink.DownlinkData;
import lora.codec.downlink.Encode;
import lora.codec.uplink.C8YData;
import lora.codec.uplink.Decode;

@Component
public class LansitecCodec extends DeviceCodec {

	/**
	 *
	 */
	private static final String SET_CONFIG = "set config";

	/**
	 *
	 */
	private static final String DEVICE_REQUEST = "device request";

	/**
	 *
	 */
	private static final String REGISTER_REQUEST = "register request";

	/**
	 *
	 */
	private static final String POSITION_REQUEST = "position request";

	/**
	 *
	 */
	private static final String GET_CONFIG = "get config";

	private final Logger logger = LoggerFactory.getLogger(LansitecCodec.class);

	private static final String ASSET_TRACKER = "Asset Tracker";

	{
		models.put(ASSET_TRACKER, ASSET_TRACKER);
	}

	enum MODE {
		AU920((byte) 0x1, (byte) 0x01), CLAA((byte) 0x2, (byte) 0x02), CN470((byte) 0x3, (byte) 0x04),
		AS923((byte) 0x4, (byte) 0x08), EU433((byte) 0x5, (byte) 0x10), EU868((byte) 0x6, (byte) 0x20),
		US915((byte) 0x7, (byte) 0x40);

		byte mode;
		byte smode;

		private MODE(byte mode, byte smode) {
			this.mode = mode;
			this.smode = smode;
		}

		static final Map<Byte, MODE> BY_MODE = new HashMap<>();
		static final Map<Byte, MODE> BY_SMODE = new HashMap<>();

		static {
			for (MODE f : values()) {
				BY_MODE.put(f.mode, f);
				BY_SMODE.put(f.smode, f);
			}
		}

		static List<String> getSupportedModes(byte smode) {
			List<String> result = new ArrayList<>();

			for (MODE m : values()) {
				if ((m.smode & smode) != 0) {
					result.add(m.name());
				}
			}

			return result;
		}
	}

	enum GPSSTATE {
		OFF((byte) 0), BOOT_GPS((byte) 1), LOCATING((byte) 2), LOCATED((byte) 3), NO_SIGNAL((byte) 9);

		byte value;

		private GPSSTATE(byte value) {
			this.value = value;
		}

		static final Map<Byte, GPSSTATE> BY_VALUE = new HashMap<>();

		static {
			for (GPSSTATE f : values()) {
				BY_VALUE.put(f.value, f);
			}
		}
	}

	enum CHGSTATE {
		POWER_CABLE_DISCONNECTED((byte) 0), CHARGING((byte) 5), CHARGE_COMPLETE((byte) 6);

		byte value;

		private CHGSTATE(byte value) {
			this.value = value;
		}

		static final Map<Byte, CHGSTATE> BY_VALUE = new HashMap<>();

		static {
			for (CHGSTATE f : values()) {
				BY_VALUE.put(f.value, f);
			}
		}
	}

	enum TYPE {
		REGISTER((byte) 0x10) {
			@Override
			public void process(ManagedObjectRepresentation mor, byte type, ByteBuffer buffer, C8YData c8yData,
					DateTime updateTime, Algo algo) {
				String adr = (type & 8) != 0 ? "ON" : "OFF";
				MODE mode = MODE.BY_MODE.get((byte) (type & 0x7));
				byte smode = buffer.get();
				List<String> supportedModes = MODE.getSupportedModes(smode);
				byte power = (byte) (buffer.get() >> 4);
				byte cfg = buffer.get();
				String dr = "DR" + (byte) (cfg >> 4);
				String breakpoint = (cfg & 8) != 0 ? ENABLE : DISABLE;
				String selfadapt = (cfg & 4) != 0 ? ENABLE : DISABLE;
				String oneoff = (cfg & 2) != 0 ? ENABLE : DISABLE;
				String alreport = (cfg & 1) != 0 ? ENABLE : DISABLE;
				int pos = buffer.getShort() * 10;
				int hb = buffer.get() / 2;
				short crc = buffer.getShort();

				Configuration config = new Configuration(String.format(
						"ADR: %s%nMODE: %s%nSMODE: %s%nPOWER: %ddBm%nDR: %s%nBREAKPOINT: %s%nSELFADAPT: %s%nONEOFF: %s%nALREPORT: %s%nPOS: %ds%nHB: %dmn%nCRC: %d",
						adr, mode.name(), String.join(",", supportedModes), power, dr, breakpoint, selfadapt, oneoff,
						alreport, pos, hb, crc));
				mor.set(config);
				mor.set(new RequiredAvailability(hb));
				c8yData.updateRootDevice(mor);
			}
		},
		HEARTBEAT((byte) 0x20) {
			@Override
			public void process(ManagedObjectRepresentation mor, byte type, ByteBuffer buffer, C8YData c8yData,
					DateTime updateTime, Algo algo) {
				long vol = buffer.get();
				long rssi = -buffer.get();
				long snr = 0;
				if ((type & 0x07) > 0) {
					snr = buffer.getShort();
				}
				byte gpsstat = buffer.get();
				GPSSTATE gpsState = GPSSTATE.BY_VALUE.get((byte) ((gpsstat & 0xff) >> 4));
				int vibState = gpsstat & 0xf;
				byte chgstat = buffer.get();
				CHGSTATE chgState = CHGSTATE.BY_VALUE.get((byte) ((chgstat & 0xff) >> 4));
				c8yData.addEvent(mor, "Tracker status", String.format("GPSSTATE: %s\nVIBSTATE: %d\nCHGSTATE: %s",
						gpsState != null ? gpsState.name() : "UNKNOWN(" + gpsstat + ")", vibState,
						chgState != null ? chgState.name() : "UNKNOWN(" + chgstat + ")"), null, new DateTime());
				c8yData.addMeasurement(mor, "c8y_Battery", "level", "%", BigDecimal.valueOf(vol), new DateTime());
				c8yData.addMeasurement(mor, "Tracker Signal Strength", "rssi", "dBm", BigDecimal.valueOf(rssi),
						updateTime);
				c8yData.addMeasurement(mor, "Tracker Signal Strength", "snr", "dBm",
						BigDecimal.valueOf(snr).divide(BigDecimal.valueOf(100)), updateTime);
			}
		},
		PERIODICAL_POSITION((byte) 0x30) {
			@Override
			public void process(ManagedObjectRepresentation mor, byte type, ByteBuffer buffer, C8YData c8yData,
					DateTime updateTime, Algo algo) {
				float lng = buffer.getFloat();
				float lat = buffer.getFloat();
				long time = buffer.getInt() * 1000L;
				Position p = new Position();
				p.setLat(BigDecimal.valueOf(lat));
				p.setLng(BigDecimal.valueOf(lng));
				mor.set(p);
				c8yData.updateRootDevice(mor);
				EventRepresentation locationUpdate = new EventRepresentation();
				locationUpdate.setSource(mor);
				locationUpdate.setType("c8y_LocationUpdate");
				locationUpdate.set(p);
				locationUpdate.setText("Location updated");
				locationUpdate.setDateTime(new DateTime(time));
				c8yData.addEvent(locationUpdate);
			}
		},
		ON_DEMAND_POSITION((byte) 0x40) {
			@Override
			public void process(ManagedObjectRepresentation mor, byte type, ByteBuffer buffer, C8YData c8yData,
					DateTime updateTime, Algo algo) {
				buffer.get();
				float lng = buffer.getFloat();
				float lat = buffer.getFloat();
				long time = buffer.getInt() * 1000L;
				Position p = new Position();
				p.setLat(BigDecimal.valueOf(lat));
				p.setLng(BigDecimal.valueOf(lng));
				mor.set(p);
				c8yData.updateRootDevice(mor);
				EventRepresentation locationUpdate = new EventRepresentation();
				locationUpdate.setSource(mor);
				locationUpdate.setType("c8y_LocationUpdate");
				locationUpdate.set(p);
				locationUpdate.setText("Location updated");
				locationUpdate.setDateTime(new DateTime(time));
				c8yData.addEvent(locationUpdate);
			}
		},
		HISTORY_POSITION((byte) 0x50) {
			@Override
			public void process(ManagedObjectRepresentation mor, byte type, ByteBuffer buffer, C8YData c8yData,
					DateTime updateTime, Algo algo) {
				// TODO Auto-generated method stub

			}
		},
		ALARM((byte) 0x60) {
			@Override
			public void process(ManagedObjectRepresentation mor, byte type, ByteBuffer buffer, C8YData c8yData,
					DateTime updateTime, Algo algo) {
				// TODO Auto-generated method stub

			}
		},
		BLE_COORDINATE((byte) 0x70) {
			@Override
			public void process(ManagedObjectRepresentation mor, byte type, ByteBuffer buffer, C8YData c8yData,
					DateTime updateTime, Algo algo) {
				Beacon beacon = null;
				byte move = buffer.get();
				buffer.getInt();
				// boolean beaconChanged = false;
				List<Beacon> beacons = new ArrayList<>();
				while (buffer.hasRemaining()) {
					short major = buffer.getShort();
					short minor = buffer.getShort();
					byte rssi = buffer.get();
					c8yData.addEvent(mor, "BLE coordinate",
							String.format("MOVE: %d\nMAJOR: %04X\nMINOR: %04X\nRSSI: %d", move, major, minor, rssi),
							null, updateTime);
					beacon = new Beacon(String.format("%04X", major), String.format("%04X", minor), rssi);
					beacons.add(beacon);
					c8yData.addMeasurement(mor, "Max rssi", "rssi", "dBm", BigDecimal.valueOf(beacon.getRssi()),
							updateTime);
					c8yData.addMeasurement(mor, String.format("%04X", major) + "-" + String.format("%04X", minor),
							"rssi", "dBm", BigDecimal.valueOf(rssi), updateTime);
				}

				mor.set(algo.getPosition(mor, beacons));
				c8yData.updateRootDevice(mor);
				/*
				 * if (beacon != null) {
				 * if (beacon.getMajor().equals(newBeacon.getMajor()) &&
				 * beacon.getMinor().equals(newBeacon.getMinor()) || newBeacon.getRssi() >
				 * beacon.getRssi()) {
				 * mor.set(newBeacon);
				 * c8yData.setMorToUpdate(mor);
				 * beaconChanged = true;
				 * beacon = newBeacon;
				 * }
				 * } else {
				 * mor.set(newBeacon);
				 * c8yData.setMorToUpdate(mor);
				 * beaconChanged = true;
				 * beacon = newBeacon;
				 * }
				 * if (beaconChanged) {
				 * c8yData.addEvent(mor, "Nearest beacon changed",
				 * String.format("MAJOR: %s\nMINOR: %s\nRSSI: %d", beacon.getMajor(),
				 * beacon.getMinor(), beacon.getRssi()), null, updateTime);
				 * }
				 */

			}
		},
		ACKNOWLEDGE((byte) 0xF0) {
			@Override
			public void process(ManagedObjectRepresentation mor, byte type, ByteBuffer buffer, C8YData c8yData,
					DateTime updateTime, Algo algo) {
				mor.set(new Configuration("Configuration requested..."));
				c8yData.updateRootDevice(mor);
			}
		};

		/**
		 *
		 */
		private static final String DISABLE = "Disable";
		/**
		 *
		 */
		private static final String ENABLE = "Enable";
		byte type;

		private TYPE(byte type) {
			this.type = type;
		}

		static final Map<Byte, TYPE> BY_VALUE = new HashMap<>();

		static {
			for (TYPE f : values()) {
				BY_VALUE.put(f.type, f);
			}
		}

		public abstract void process(ManagedObjectRepresentation mor, byte type, ByteBuffer buffer, C8YData c8yData,
				DateTime updateTime, Algo algo);

	}

	@Override
	public String getId() {
		return "lansitec";
	}

	@Override
	public String getName() {
		return "Lansitec";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}

	@Override
	protected C8YData decode(ManagedObjectRepresentation mor, Decode decode) {
		C8YData c8yData = new C8YData();
		setAlgo("maxrssi");

		ByteBuffer buffer = ByteBuffer.wrap(BaseEncoding.base16().decode(decode.getPayload().toUpperCase()));

		if (decode.getModel().equals(ASSET_TRACKER)) {
			byte type = buffer.get();
			TYPE t = TYPE.BY_VALUE.get((byte) (type & 0xf0));
			logger.info("Frame type: {}", t.name());
			try {
				t.process(mor, type, buffer, c8yData, new DateTime(decode.getUpdateTime()), currentAlgo);
			} catch (Exception e) {
				logger.error("Couldn't process uplink: {}", decode.getPayload(), e.getMessage());
			}
		}

		return c8yData;
	}

	@Override
	protected DownlinkData encode(ManagedObjectRepresentation mor, Encode encode) {
		if (encode.getOperation().contains(GET_CONFIG)) {
			return askDeviceConfig(null);
		}
		String payload = null;
		ObjectMapper mapper = new ObjectMapper();
		try {
			JsonNode root = mapper.readTree(encode.getOperation());
			String command = root.fieldNames().next();
			if (command.equals(POSITION_REQUEST)) {
				payload = "A1FF";
			} else if (command.equals(REGISTER_REQUEST)) {
				payload = "A2FF";
			} else if (command.equals(DEVICE_REQUEST)) {
				payload = "A3FF";
			} else if (command.equals(SET_CONFIG)) {
				JsonNode params = root.get(command);
				ByteBuffer buffer = ByteBuffer.allocate(4).order(ByteOrder.BIG_ENDIAN);
				byte breakpoint = params.get("breakpoint").asBoolean() ? (byte) 8 : 0;
				byte selfadapt = params.get("selfadapt").asBoolean() ? (byte) 4 : 0;
				byte oneoff = params.get("oneoff").asBoolean() ? (byte) 2 : 0;
				byte alreport = params.get("alreport").asBoolean() ? (byte) 1 : 0;
				buffer.put(
						(byte) ((byte) 0x90 | (byte) breakpoint | (byte) selfadapt | (byte) oneoff | (byte) alreport));
				buffer.putShort((short) params.get("pos").asInt());
				buffer.put((byte) params.get("hb").asInt());
				payload = BaseEncoding.base16().encode(buffer.array());
			}
		} catch (IOException e) {
			logger.error("Couldn't process operation {}", encode.getOperation(), e);
		}
		return new DownlinkData(null, 1, payload);
	}

	@Override
	public DownlinkData askDeviceConfig(String devEui) {
		return new DownlinkData(devEui, 1, "A2FF");
	}

	@Override
	public Map<String, DeviceOperation> getAvailableOperations(String model) {
		Map<String, DeviceOperation> result = new HashMap<>();

		result.put(GET_CONFIG, new DeviceOperation(GET_CONFIG, GET_CONFIG, null));
		result.put(POSITION_REQUEST, new DeviceOperation(POSITION_REQUEST, "Position request", null));
		result.put(REGISTER_REQUEST, new DeviceOperation(REGISTER_REQUEST, "Register request", null));
		result.put(DEVICE_REQUEST, new DeviceOperation(DEVICE_REQUEST, "Device request", null));
		List<DeviceOperationElement> params = new ArrayList<>();
		params.add(new DeviceOperationElement("breakpoint", "Breakpoint", ParamType.BOOL));
		params.add(new DeviceOperationElement("selfadapt", "Selfadapt", ParamType.BOOL));
		params.add(new DeviceOperationElement("oneoff", "OneOff", ParamType.BOOL));
		params.add(new DeviceOperationElement("alreport", "Alreport", ParamType.BOOL));
		params.add(new DeviceOperationElement("pos", "Position report", ParamType.INTEGER));
		params.add(new DeviceOperationElement("hb", "Heartbeat", ParamType.INTEGER));
		result.put(SET_CONFIG, new DeviceOperation(SET_CONFIG, "Set config", params));

		return result;
	}

	@Override
	protected Map<String, String> getChildDevicesNames() {
		// TODO Auto-generated method stub
		return null;
	}

	// UGLY!!!!!! not scalable!!!!!
	// Need to store that in a managed object!!!
	private Algo currentAlgo;

	@Autowired
	private List<Algo> algos;

	public List<Algo> getAlgos() {
		return algos;
	}

	public void setAlgo(String id) {
		if (algos != null) {
			for (Algo algo : algos) {
				logger.info("Algo {} found", algo.getLabel());
				if (algo.getId().equals(id)) {
					logger.info("Algo found: {}", algo.getLabel());
					currentAlgo = algo;
				}
			}
		} else {
			logger.info("No algorithms available!!!");
		}
	}
}
