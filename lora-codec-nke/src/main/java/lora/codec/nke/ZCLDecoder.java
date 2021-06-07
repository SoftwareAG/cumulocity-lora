package lora.codec.nke;

import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import lora.codec.C8YData;

@Service
public class ZCLDecoder {
	/**
	 *
	 */
	private static final String STATUS_CHANGED_TO = "Status changed to ";
	/**
	 *
	 */
	private static final String ENERGY_AND_POWER = "EnergyAndPower";
	/**
	 *
	 */
	private static final String POWER = "Power";
	/**
	 *
	 */
	private static final String SIMPLE_METERING = "SimpleMetering";
	/**
	 *
	 */
	private static final String POWER_CONFIGURATION = "Power Configuration";
	private final Logger logger = LoggerFactory.getLogger(getClass());

	private Map<String, NKEBatch> dataTypes = new HashMap<>();
	{
		dataTypes.put("50-70-011",
			new NKEBatch(3, new BatchRecord.Arg[]{new BatchRecord.Arg(0,1,4),new BatchRecord.Arg(1,1,11),new BatchRecord.Arg(2,1,5),new BatchRecord.Arg(3,1,5)})
			.add(new C8YEvent().eventType("Status"))
			.add(new C8YMeasurement().fragment("Index").series("i").unit(""))
			.add(new C8YMeasurement().fragment("Flow").series("MinFlow").unit(""))
			.add(new C8YMeasurement().fragment("Flow").series("MaxFlow").unit(""))
		);
		dataTypes.put("50-70-053",
			new NKEBatch(2,new BatchRecord.Arg[]{new BatchRecord.Arg(0,10,7),new BatchRecord.Arg(1,100,6),new BatchRecord.Arg(2,1,6),new BatchRecord.Arg(3,1,1)})
			.add(new C8YMeasurement().fragment("Temperature").series("T").unit("°C").divisor(100))
			.add(new C8YMeasurement().fragment("Humidity").series("RH").unit("%RH").divisor(100))
			.add(new C8YMeasurement().fragment("Battery").series("T").unit("mV").setAsDeviceProperty("Battery"))
			.add(new C8YEvent().eventType("OpenCase").setAsDeviceProperty("OpenCase"))
		);
		dataTypes.put("50-70-085",
			new NKEBatch(2,new BatchRecord.Arg[]{new BatchRecord.Arg(0,10,7),new BatchRecord.Arg(2,1,6),new BatchRecord.Arg(3,1,1)})
			.add(new C8YMeasurement().fragment("Temperature").series("T").unit("°C").divisor(100))
			.add(new C8YMeasurement().fragment("Battery").series("T").unit("mV").setAsDeviceProperty("Battery"))
			.add(new C8YEvent().eventType("OpenCase").setAsDeviceProperty("OpenCase"))
		);
		dataTypes.put("50-70-043",
			new NKEBatch(1,new BatchRecord.Arg[]{new BatchRecord.Arg(0,10,7),new BatchRecord.Arg(1,100,6)})
			.add(new C8YMeasurement().fragment("Temperature").series("T").unit("°C").divisor(100))
			.add(new C8YMeasurement().fragment("Battery").series("T").unit("mV").setAsDeviceProperty("Battery"))
		);
		dataTypes.put("50-70-014",
			new NKEBatch(4,new BatchRecord.Arg[]{new BatchRecord.Arg(0,1,10),new BatchRecord.Arg(1,1,10),new BatchRecord.Arg(2,1,10),new BatchRecord.Arg(3,1,1),new BatchRecord.Arg(4,1,1),new BatchRecord.Arg(5,1,1),new BatchRecord.Arg(6,1,6),new BatchRecord.Arg(7,1,6)})
			.add(new C8YMeasurement().fragment("Index").series("i1").unit(""))
			.add(new C8YMeasurement().fragment("Index").series("i2").unit(""))
			.add(new C8YMeasurement().fragment("Index").series("i3").unit(""))
			.add(new C8YEvent().eventType("State1"))
			.add(new C8YEvent().eventType("State2"))
			.add(new C8YEvent().eventType("State3"))
			.add(new C8YMeasurement().fragment("Battery").series("T").unit("mV").setAsDeviceProperty("Battery"))
			.add(new C8YEvent().eventType("MultiState"))
		);
		dataTypes.put("50-70-016",
			new NKEBatch(3,new BatchRecord.Arg[]{new BatchRecord.Arg(0,0.004f,12),new BatchRecord.Arg(1,1,12),new BatchRecord.Arg(2,100,6),new BatchRecord.Arg(3,100,6),new BatchRecord.Arg(4,1,10)})
			.add(new C8YMeasurement().fragment("Intensity").series("I").unit("mA"))
			.add(new C8YMeasurement().fragment("Tension").series("T").unit("V"))
			.add(new C8YMeasurement().fragment("Battery").series("T").unit("mV").setAsDeviceProperty("Battery"))
			.add(new C8YMeasurement().fragment("ExternalPowerLevel").series("P").unit("W"))
			.add(new C8YMeasurement().fragment("Index").series("i").unit(""))
		);
		dataTypes.put("50-70-101",
			new NKEBatch(3,new BatchRecord.Arg[]{new BatchRecord.Arg(0,1,7),new BatchRecord.Arg(1,1,7),new BatchRecord.Arg(2,1,7),new BatchRecord.Arg(3,1,6),new BatchRecord.Arg(4,10,7),new BatchRecord.Arg(5,1,7),new BatchRecord.Arg(6,1,10),new BatchRecord.Arg(7,1,1)})
			.add(new C8YMeasurement().fragment("Pressure").series("Mean differential pressure since last report").unit("Pa"))
			.add(new C8YMeasurement().fragment("Pressure").series("Max differential pressure since last report").unit("Pa"))
			.add(new C8YMeasurement().fragment("Pressure").series("Min differential pressure since last report").unit("Pa"))
			.add(new C8YMeasurement().fragment("Pressure").series("Differential pressure").unit("Pa"))
			.add(new C8YMeasurement().fragment("Battery").series("T").unit("mV").setAsDeviceProperty("Battery"))
			.add(new C8YMeasurement().fragment("Temperature").series("T").unit("°C").divisor(100))
			.add(new C8YMeasurement().fragment("Index").series("i").unit(""))
			.add(new C8YEvent().eventType("Status"))
		);
		dataTypes.put("50-70-108",
			new NKEBatch(3,new BatchRecord.Arg[]{new BatchRecord.Arg(0,0.004f,12),new BatchRecord.Arg(1,1,12),new BatchRecord.Arg(2,1,6),new BatchRecord.Arg(3,1,6)})
			.add(new C8YEvent().eventType("OpenClose").setAsDeviceProperty("OpenClose"))
			.add(new C8YMeasurement().fragment("Battery").series("T").unit("mV").setAsDeviceProperty("Battery"))
		);
		dataTypes.put("50-70-139",
			new NKEBatch(3,new BatchRecord.Arg[]{new BatchRecord.Arg(0,10,7),new BatchRecord.Arg(1,10,7)})
			.add(new C8YMeasurement().fragment("Temperature").series("T1").unit("°C").divisor(100))
			.add(new C8YMeasurement().fragment("Temperature").series("T2").unit("°C").divisor(100))
		);
		/*dataTypes.put("50-70-143",
			new NKEBatch("3,[{taglbl: 0,resol: 10,sampletype: 7},{taglbl: 1,resol: 10,sampletype: 7}")
			.add(0, new C8YMeasurement().fragment("Temperature").series("T1").unit("°C").divisor(100))
			.add(1, new C8YMeasurement().fragment("Temperature").series("T2").unit("°C").divisor(100))
		);*/
	}

	public class MinMax {
		public int value;
		public String unity;
	}

	public void changeDeviceState(ManagedObjectRepresentation device, C8YData c8yData, String eventType, String eventText, String propertyName, Object propertyValue, DateTime time) {
		c8yData.addEvent(device, eventType, eventText, null, time);
		device.setProperty(propertyName,propertyValue);
		c8yData.updateRootDevice(device);
	}

	enum ClusterAndAttribute {
		TEMPERATURE(0x0402, 0, "Temperature", "T", "°C") {
			@Override
			void createMeasurement(ManagedObjectRepresentation device, int endpoint, C8YData c8yData, byte[] bytes, int index, DateTime time) {
				ByteBuffer buffer = ByteBuffer.wrap(bytes, index, 2);
				c8yData.addChildMeasurement("endpoint " + endpoint, "Temperature", "T", "°C", BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(100)), time);
			}
		},
		HUMIDITY(0x0405, 0, "Humidity", "RH", "%RH") {
			@Override
			void createMeasurement(ManagedObjectRepresentation device, int endpoint, C8YData c8yData, byte[] bytes, int index, DateTime time) {
				ByteBuffer buffer = ByteBuffer.wrap(bytes, index, 2);
				c8yData.addChildMeasurement("endpoint " + endpoint, "Humidity", "RH", "%RH", BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(100)), time);
			}
		};

		int clusterId;
		int attributeId;
		String fragment;
		String series;
		String unit;
		ClusterAndAttribute(int clusterId, int attributeId, String fragment, String series, String unit) {
			this.clusterId = clusterId;
			this.attributeId = attributeId;
			this.fragment = fragment;
			this.series = series;
			this.unit = unit;
		}

		abstract void createMeasurement(ManagedObjectRepresentation device, int endpoint, C8YData c8yData, byte[] bytes, int index, DateTime time);

		static final Map<Integer, Map<Integer, ClusterAndAttribute>> map = new HashMap<>();
		static {
			for (ClusterAndAttribute e: values()) {
				if (!map.containsKey(e.clusterId)) {
					map.put(e.clusterId, new HashMap<>());
				}
				map.get(e.clusterId).put(e.attributeId, e);
			}
		}
	}

	public C8YData decode(ManagedObjectRepresentation device, byte[] bytes, int port, String model, DateTime time) {
		// Decode an uplink message from a buffer
		// (array) of bytes to an object of fields.

		C8YData c8yData = new C8YData();

		if (port == 125) {
			// batch
			boolean isBatch = (bytes[0] & 0x01) == 0x00;

			// trame standard
			if (!isBatch) {
				int attributID = -1;
				int cmdID = -1;
				int clusterdID = -1;
				int status;

				boolean isAlarm = false;
				// endpoint
				int endpoint = ((bytes[0] & 0xE0) >> 5) | ((bytes[0] & 0x06) << 2);
				// command ID
				cmdID = bytes[1]&0xff;
				// Cluster ID
				clusterdID = (bytes[2]&0xff) * 256 + (bytes[3]&0xff);
				
				logger.info("Endpoint: {}", endpoint);
				logger.info("CmdID: {}", cmdID);
				logger.info("ClusterID: {}", clusterdID);

				// decode report and read attribute response
				if ((cmdID == 0x0a) || (cmdID == 0x8a) || (cmdID == 0x01)) {
					// Attribut ID
					attributID = (bytes[4]&0xff) * 256 + (bytes[5]&0xff);
					logger.info("AttributeID: {}", attributID);

					if (cmdID == 0x8a)
						isAlarm = true;
					// data index start
					int index = 0;
					if ((cmdID == 0x0a) || (cmdID == 0x8a))
						index = 7;
					if (cmdID == 0x01) {
						index = 8;
						status = bytes[6];
					}

					ByteBuffer buffer = ByteBuffer.wrap(bytes, index, 2);
					// temperature
					if ((clusterdID == 0x0402) && (attributID == 0x0000))
						c8yData.addMeasurement(device, "Temperature", "T", "°C", BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(100)), time);
					// humidity
					if ((clusterdID == 0x0405) && (attributID == 0x0000))
						c8yData.addMeasurement(device, "Humidity", "RH", "%RH", BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(100)), time);
					// binary input counter
					if ((clusterdID == 0x000f) && (attributID == 0x0402)) {
						buffer = ByteBuffer.wrap(bytes, index, 4);
						c8yData.addMeasurement(device, "Counter", "C", "", BigDecimal.valueOf(buffer.getInt()), time);
					}
					// binary input present value
					if ((clusterdID == 0x000f) && (attributID == 0x0055)) {
						changeDeviceState(device, c8yData, "PIN", STATUS_CHANGED_TO + (bytes[index] > 0), "pinState", bytes[index] > 0, time);
					}

					// multistate output
					if ((clusterdID == 0x0013) && (attributID == 0x0055)) {
						changeDeviceState(device, c8yData, "Multistate output", "Value is " + bytes[index], "multistateOutput", bytes[index], time);
					}
					// on/off present value
					if ((clusterdID == 0x0006) && (attributID == 0x0000)) {
						String state = bytes[index] == 1 ? "ON" : "OFF";
						changeDeviceState(device, c8yData, "Switch", STATUS_CHANGED_TO + state, "switchStatus", state, time);
					}
					// multibinary input present value
					if ((clusterdID == 0x8005) && (attributID == 0x0000)) {
						changeDeviceState(device, c8yData, "PIN 1", STATUS_CHANGED_TO + ((bytes[index + 1] & 0x01) == 0x01), "pinState1", ((bytes[index + 1] & 0x01) == 0x01), time);
						changeDeviceState(device, c8yData, "PIN 2", STATUS_CHANGED_TO + ((bytes[index + 1] & 0x02) == 0x02), "pinState2", ((bytes[index + 1] & 0x02) == 0x02), time);
						changeDeviceState(device, c8yData, "PIN 3", STATUS_CHANGED_TO + ((bytes[index + 1] & 0x04) == 0x04), "pinState3", ((bytes[index + 1] & 0x04) == 0x04), time);
						changeDeviceState(device, c8yData, "PIN 4", STATUS_CHANGED_TO + ((bytes[index + 1] & 0x08) == 0x08), "pinState4", ((bytes[index + 1] & 0x08) == 0x08), time);
						changeDeviceState(device, c8yData, "PIN 5", STATUS_CHANGED_TO + ((bytes[index + 1] & 0x10) == 0x10), "pinState5", ((bytes[index + 1] & 0x10) == 0x10), time);
						changeDeviceState(device, c8yData, "PIN 6", STATUS_CHANGED_TO + ((bytes[index + 1] & 0x20) == 0x20), "pinState6", ((bytes[index + 1] & 0x20) == 0x20), time);
						changeDeviceState(device, c8yData, "PIN 7", STATUS_CHANGED_TO + ((bytes[index + 1] & 0x40) == 0x40), "pinState7", ((bytes[index + 1] & 0x40) == 0x40), time);
						changeDeviceState(device, c8yData, "PIN 8", STATUS_CHANGED_TO + ((bytes[index + 1] & 0x80) == 0x80), "pinState8", ((bytes[index + 1] & 0x80) == 0x80), time);
						changeDeviceState(device, c8yData, "PIN 9", STATUS_CHANGED_TO + ((bytes[index] & 0x01) == 0x01), "pinState9", ((bytes[index] & 0x01) == 0x01), time);
						changeDeviceState(device, c8yData, "PIN 10", STATUS_CHANGED_TO + ((bytes[index] & 0x02) == 0x02), "pinState10", ((bytes[index] & 0x02) == 0x02), time);
					}
					// analog input
					if ((clusterdID == 0x000c) && (attributID == 0x0055)) {
						buffer = ByteBuffer.wrap(bytes, index, 4);
						c8yData.addMeasurement(device, "analog", "a", "", BigDecimal.valueOf(buffer.getFloat()), time);
					}

					// simple metering
					if ((clusterdID == 0x0052) && (attributID == 0x0000)) {
						buffer = ByteBuffer.wrap(bytes, index, 4);
						c8yData.addMeasurement(device, SIMPLE_METERING, "ActiveEnergy", "Wh", BigDecimal.valueOf(buffer.getInt() & 0xffffff), time);
						buffer = ByteBuffer.wrap(bytes, index + 3, 10);
						c8yData.addMeasurement(device, SIMPLE_METERING, "ReactiveEnergy", "varh", BigDecimal.valueOf(buffer.getInt() & 0xffffff), time);
						c8yData.addMeasurement(device, SIMPLE_METERING, "NbSamples", "", BigDecimal.valueOf(buffer.getShort()), time);
						c8yData.addMeasurement(device, SIMPLE_METERING, "ActivePower", "W", BigDecimal.valueOf(buffer.getShort()), time);
						c8yData.addMeasurement(device, SIMPLE_METERING, "ReactivePower", "var", BigDecimal.valueOf(buffer.getShort()), time);
					}
					// lorawan message type
					/*if ((clusterdID == 0x8004) && (attributID == 0x0000)) {
						if (bytes[index] == 1)
							decoded.data.messageType = "confirmed";
						if (bytes[index] == 0)
							decoded.data.messageType = "unconfirmed";
					}

					// lorawan retry
					if ((clusterdID == 0x8004) && (attributID == 0x0001)) {
						decoded.data.nbRetry = bytes[index];
					}

					// lorawan reassociation
					if ((clusterdID == 0x8004) && (attributID == 0x0002)) {
						buffer = ByteBuffer.wrap(bytes, index + 1, 4);
						decoded.data.periodInMinutes = buffer.getShort();
						decoded.data.nbErrFrames = buffer.getShort();
					}*/
					// configuration node power desc
					if ((clusterdID == 0x0050) && (attributID == 0x0006)) {
						int index2 = index + 3;
						buffer = ByteBuffer.wrap(bytes, index2, bytes.length - index2);
						if ((bytes[index + 2] & 0x01) == 0x01) {
							BigDecimal value = BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(1000));
							changeDeviceState(device, c8yData, POWER_CONFIGURATION, "Main or external voltage is " + value, "mainOrExternalVoltage", value, time);
						}
						if ((bytes[index + 2] & 0x02) == 0x02) {
							BigDecimal value = BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(1000));
							changeDeviceState(device, c8yData, POWER_CONFIGURATION, "Rechargeable battery voltage is " + value, "rechargeableBatteryVoltage", value, time);
						}
						if ((bytes[index + 2] & 0x04) == 0x04) {
							BigDecimal value = BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(1000));
							changeDeviceState(device, c8yData, POWER_CONFIGURATION, "Disposable battery voltage is " + value, "disposableBatteryVoltage", value, time);
						}
						if ((bytes[index + 2] & 0x08) == 0x08) {
							BigDecimal value = BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(1000));
							changeDeviceState(device, c8yData, POWER_CONFIGURATION, "Solar harvesting voltage is " + value, "solarHarvestingVoltage", value, time);
						}
						if ((bytes[index + 2] & 0x10) == 0x10) {
							BigDecimal value = BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(1000));
							changeDeviceState(device, c8yData, POWER_CONFIGURATION, "TIC harvesting voltage is " + value, "ticHarvestingVoltage", value, time);
						}
					}
					// energy and power metering
					if ((clusterdID == 0x800a) && (attributID == 0x0000)) {
						int index2 = index;
						buffer = ByteBuffer.wrap(bytes, index2 + 1, bytes.length - index2 - 1);
						c8yData.addMeasurement(device, POWER, "sumPositiveActiveEnergy", "Wh", BigDecimal.valueOf(buffer.getInt()), time);
						c8yData.addMeasurement(device, POWER, "sumNegativeActiveEnergy", "Wh", BigDecimal.valueOf(buffer.getInt()), time);
						c8yData.addMeasurement(device, POWER, "sumPositiveReactiveEnergy", "Wh", BigDecimal.valueOf(buffer.getInt()), time);
						c8yData.addMeasurement(device, POWER, "sumNegativeReactiveEnergy", "Wh", BigDecimal.valueOf(buffer.getInt()), time);
						c8yData.addMeasurement(device, POWER, "positiveActivePower", "W", BigDecimal.valueOf(buffer.getInt()), time);
						c8yData.addMeasurement(device, POWER, "negativeActivePower", "W", BigDecimal.valueOf(buffer.getInt()), time);
						c8yData.addMeasurement(device, POWER, "positiveReactivePower", "W", BigDecimal.valueOf(buffer.getInt()), time);
						c8yData.addMeasurement(device, POWER, "negativeReactivePower", "W", BigDecimal.valueOf(buffer.getInt()), time);
					}
					// energy and power metering
					if ((clusterdID == 0x800b) && (attributID == 0x0000)) {
						int index2 = index;
						buffer = ByteBuffer.wrap(bytes, index2 + 1, bytes.length - index2 - 1);
						c8yData.addMeasurement(device, ENERGY_AND_POWER, "vrms", "V", BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(10)), time);
						c8yData.addMeasurement(device, ENERGY_AND_POWER, "irms", "A", BigDecimal.valueOf(buffer.getShort()).divide(BigDecimal.valueOf(10)), time);
						c8yData.addMeasurement(device, ENERGY_AND_POWER, "PhaseAngle", "Rad", BigDecimal.valueOf(buffer.getShort()), time);
					}
				}

				// decode configuration response
				if (cmdID == 0x07) {
					// AttributID
					ByteBuffer buffer = ByteBuffer.wrap(bytes, 6, 2);
					attributID = buffer.getShort();

					Map<String, Object> properties = new HashMap<>();
					properties.put("AttributeID", attributID);
					properties.put("Status", bytes[4]);
					properties.put("Batch", bytes[5]);
					c8yData.addEvent(device, "Decode configuration response", "Decode configuration response:", properties, time);
				}

				// decode read configuration response
				if (cmdID == 0x09) {
					// AttributID
					ByteBuffer buffer = ByteBuffer.wrap(bytes, 6, 2);
					attributID = buffer.getShort();
					Map<String, Object> properties = new HashMap<>();
					properties.put("AttributeID", attributID);
					properties.put("Status", bytes[4]);
					properties.put("Batch", bytes[5]);

					// AttributType
					properties.put("AttributeType", bytes[8]);
					// min
					MinMax min = new MinMax();
					buffer = ByteBuffer.wrap(bytes, 9, 2);
					if ((bytes[9] & 0x80) == 0x80) {
						min.value = buffer.getShort() & 0x7fff;
						min.unity = "minutes";
					} else {
						min.value = buffer.getShort();
						min.unity = "seconds";
					}
					properties.put("Min", min.value + " " + min.unity);
					// max
					MinMax max = new MinMax();
					if ((bytes[9] & 0x80) == 0x80) {
						max.value = buffer.getShort() & 0x7fff;
						max.unity = "minutes";
					} else {
						max.value = buffer.getShort();
						max.unity = "seconds";
					}
					properties.put("Max", max.value + " " + max.unity);
					c8yData.addEvent(device, "Decode read configuration response", "Decode read configuration response:", properties, time);
				}

			} else {
				if (model != null) {
					try {
						logger.info("Model detected: {}", model);
						if (dataTypes.containsKey(model)) {
							BatchRecord batchRecord = new BatchRecord(); //(BatchRecord) engine.get("record");
							batchRecord.uncompress(dataTypes.get(model).getTagsz(), dataTypes.get(model).getArgs(), bytes, null);
							for (BatchDataSet dataset : batchRecord.dataset) {
								DateTime datasettime = time.plus((dataset.data_relative_timestamp - batchRecord.batch_relative_timestamp) * 1000);
								if (dataTypes.get(model).isLabelDefined(dataset.data.label)) {
									dataTypes.get(model).get(dataset.data.label).sendToCumulocity(device, c8yData, dataset.data.value, datasettime);
								} else {
									logger.error("Label {} is not defined.", dataset.data.label);
								}
							}
						} else {
							logger.error("Model {} is not supported yet", model);
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
				} else {
					logger.error("Device model needs to be provided!");
				}
			}
		}

		return c8yData;
	}

}
