package lora.codec.nke;

import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.google.common.io.BaseEncoding;

@Service
public class ZCLDecoder {
	private final Logger logger = LoggerFactory.getLogger(getClass());
	private ScriptEngine engine;

	private Map<String, String> models = new HashMap<>();
	{
		models.put(NKECodec._50_70_053,
				"2,[{taglbl: 0,resol: 1,sampletype: 7},{taglbl: 1,resol: 1,sampletype: 6},{taglbl: 2,resol: 1,sampletype: 6}]");
		models.put(NKECodec._50_70_085, "2,[{taglbl: 0,resol: 1,sampletype: 7},{taglbl: 2,resol: 1,sampletype: 6}]");
		models.put(NKECodec._50_70_043, "1,[{taglbl: 0,resol: 1,sampletype: 7},{taglbl: 1,resol: 1,sampletype: 6}]");
		models.put(NKECodec._50_70_014,
				"4,[{taglbl: 0,resol: 1,sampletype: 10},{taglbl: 1,resol: 1,sampletype: 10},{taglbl: 2,resol: 1,sampletype: 10},{taglbl: 3,resol: 1,sampletype: 1},{taglbl: 4,resol: 1,sampletype: 1},{taglbl: 5,resol: 1,sampletype: 1},{taglbl: 6,resol: 1,sampletype: 6},{taglbl: 7,resol: 1,sampletype: 6}]");
		models.put(NKECodec._50_70_072,
				"4,[{taglbl: 0,resol: 1,sampletype: 10},{taglbl: 1,resol: 1,sampletype: 10},{taglbl: 2,resol: 1,sampletype: 10},{taglbl: 3,resol: 1,sampletype: 1},{taglbl: 4,resol: 1,sampletype: 1},{taglbl: 5,resol: 1,sampletype: 1},{taglbl: 6,resol: 1,sampletype: 6},{taglbl: 7,resol: 1,sampletype: 6}]]");
		models.put(NKECodec._50_70_016,
				"3,[{taglbl: 0,resol: 0.004,sampletype: 12},{taglbl: 1,resol: 1,sampletype: 12},{taglbl: 2,resol: 1,sampletype: 6},{taglbl: 3,resol: 1,sampletype: 6}]");
		models.put(NKECodec._50_70_008,
				"1,[{taglbl: 0,resol: 1,sampletype: 6}]");
		models.put(NKECodec._50_70_080,
				"2,[{taglbl: 0,resol: 1,sampletype: 7},{taglbl: 1,resol: 1,sampletype: 6},{taglbl: 2,resol: 1,sampletype: 6}]");
		ScriptEngineManager manager = new ScriptEngineManager();
		engine = manager.getEngineByName("nashorn");
		try {
			engine.eval(new InputStreamReader(getClass().getResourceAsStream("/br_uncompress.js")));
		} catch (ScriptException e) {
			e.printStackTrace();
		}
	}

	public class ZclHeader {
		public String report;
		public int endpoint;
		public int cmdID;
		public int clusterdID;
		public int alarm;
		public int attributID;
		public int status;
		public int batch;
		public int attribut_type;
		public MinMax min;
		public MinMax max;

		public String getReport() {
			return report;
		}

		public void setReport(String report) {
			this.report = report;
		}

		public int getEndpoint() {
			return endpoint;
		}

		public void setEndpoint(int endpoint) {
			this.endpoint = endpoint;
		}

		public int getCmdID() {
			return cmdID;
		}

		public void setCmdID(int cmdID) {
			this.cmdID = cmdID;
		}

		public int getClusterdID() {
			return clusterdID;
		}

		public void setClusterdID(int clusterdID) {
			this.clusterdID = clusterdID;
		}

		public int getAlarm() {
			return alarm;
		}

		public void setAlarm(int alarm) {
			this.alarm = alarm;
		}

		public int getAttributID() {
			return attributID;
		}

		public void setAttributID(int attributID) {
			this.attributID = attributID;
		}

		public int getStatus() {
			return status;
		}

		public void setStatus(int status) {
			this.status = status;
		}

		public int getBatch() {
			return batch;
		}

		public void setBatch(int batch) {
			this.batch = batch;
		}

		public int getAttribut_type() {
			return attribut_type;
		}

		public void setAttribut_type(int attribut_type) {
			this.attribut_type = attribut_type;
		}

		public MinMax getMin() {
			return min;
		}

		public void setMin(MinMax min) {
			this.min = min;
		}

		public MinMax getMax() {
			return max;
		}

		public void setMax(MinMax max) {
			this.max = max;
		}
	}

	public class ZclData {
		public BigDecimal temperature;
		public BigDecimal humidity;
		public BigDecimal counter;
		public boolean pin_state;
		public boolean pin_state_1;
		public boolean pin_state_2;
		public boolean pin_state_3;
		public boolean pin_state_4;
		public boolean pin_state_5;
		public boolean pin_state_6;
		public boolean pin_state_7;
		public boolean pin_state_8;
		public boolean pin_state_9;
		public boolean pin_state_10;
		public BigDecimal value;
		public String state;
		public BigDecimal analog;
		public BigDecimal active_energy_Wh;
		public BigDecimal reactive_energy_Varh;
		public BigDecimal nb_samples;
		public BigDecimal active_power_W;
		public BigDecimal reactive_power_VAR;
		public String message_type;
		public int nb_retry;
		public int period_in_minutes;
		public int nb_err_frames;
		public BigDecimal main_or_external_voltage;
		public BigDecimal rechargeable_battery_voltage;
		public BigDecimal disposable_battery_voltage;
		public BigDecimal solar_harvesting_voltage;
		public BigDecimal tic_harvesting_voltage;
		public BigDecimal sum_positive_active_energy_Wh;
		public BigDecimal sum_negative_active_energy_Wh;
		public BigDecimal sum_positive_reactive_energy_Wh;
		public BigDecimal sum_negative_reactive_energy_Wh;
		public BigDecimal positive_active_power_W;
		public BigDecimal negative_active_power_W;
		public BigDecimal positive_reactive_power_W;
		public BigDecimal negative_reactive_power_W;
		public BigDecimal Vrms;
		public BigDecimal Irms;
		public BigDecimal phase_angle;

		public BigDecimal getTemperature() {
			return temperature;
		}

		public void setTemperature(BigDecimal temperature) {
			this.temperature = temperature;
		}

		public BigDecimal getHumidity() {
			return humidity;
		}

		public void setHumidity(BigDecimal humidity) {
			this.humidity = humidity;
		}

		public BigDecimal getCounter() {
			return counter;
		}

		public void setCounter(BigDecimal counter) {
			this.counter = counter;
		}

		public boolean isPin_state() {
			return pin_state;
		}

		public void setPin_state(boolean pin_state) {
			this.pin_state = pin_state;
		}

		public boolean isPin_state_1() {
			return pin_state_1;
		}

		public void setPin_state_1(boolean pin_state_1) {
			this.pin_state_1 = pin_state_1;
		}

		public boolean isPin_state_2() {
			return pin_state_2;
		}

		public void setPin_state_2(boolean pin_state_2) {
			this.pin_state_2 = pin_state_2;
		}

		public boolean isPin_state_3() {
			return pin_state_3;
		}

		public void setPin_state_3(boolean pin_state_3) {
			this.pin_state_3 = pin_state_3;
		}

		public boolean isPin_state_4() {
			return pin_state_4;
		}

		public void setPin_state_4(boolean pin_state_4) {
			this.pin_state_4 = pin_state_4;
		}

		public boolean isPin_state_5() {
			return pin_state_5;
		}

		public void setPin_state_5(boolean pin_state_5) {
			this.pin_state_5 = pin_state_5;
		}

		public boolean isPin_state_6() {
			return pin_state_6;
		}

		public void setPin_state_6(boolean pin_state_6) {
			this.pin_state_6 = pin_state_6;
		}

		public boolean isPin_state_7() {
			return pin_state_7;
		}

		public void setPin_state_7(boolean pin_state_7) {
			this.pin_state_7 = pin_state_7;
		}

		public boolean isPin_state_8() {
			return pin_state_8;
		}

		public void setPin_state_8(boolean pin_state_8) {
			this.pin_state_8 = pin_state_8;
		}

		public boolean isPin_state_9() {
			return pin_state_9;
		}

		public void setPin_state_9(boolean pin_state_9) {
			this.pin_state_9 = pin_state_9;
		}

		public boolean isPin_state_10() {
			return pin_state_10;
		}

		public void setPin_state_10(boolean pin_state_10) {
			this.pin_state_10 = pin_state_10;
		}

		public BigDecimal getValue() {
			return value;
		}

		public void setValue(BigDecimal value) {
			this.value = value;
		}

		public String getState() {
			return state;
		}

		public void setState(String state) {
			this.state = state;
		}

		public BigDecimal getAnalog() {
			return analog;
		}

		public void setAnalog(BigDecimal analog) {
			this.analog = analog;
		}

		public BigDecimal getActive_energy_Wh() {
			return active_energy_Wh;
		}

		public void setActive_energy_Wh(BigDecimal active_energy_Wh) {
			this.active_energy_Wh = active_energy_Wh;
		}

		public BigDecimal getReactive_energy_Varh() {
			return reactive_energy_Varh;
		}

		public void setReactive_energy_Varh(BigDecimal reactive_energy_Varh) {
			this.reactive_energy_Varh = reactive_energy_Varh;
		}

		public BigDecimal getNb_samples() {
			return nb_samples;
		}

		public void setNb_samples(BigDecimal nb_samples) {
			this.nb_samples = nb_samples;
		}

		public BigDecimal getActive_power_W() {
			return active_power_W;
		}

		public void setActive_power_W(BigDecimal active_power_W) {
			this.active_power_W = active_power_W;
		}

		public BigDecimal getReactive_power_VAR() {
			return reactive_power_VAR;
		}

		public void setReactive_power_VAR(BigDecimal reactive_power_VAR) {
			this.reactive_power_VAR = reactive_power_VAR;
		}

		public String getMessage_type() {
			return message_type;
		}

		public void setMessage_type(String message_type) {
			this.message_type = message_type;
		}

		public int getNb_retry() {
			return nb_retry;
		}

		public void setNb_retry(int nb_retry) {
			this.nb_retry = nb_retry;
		}

		public int getPeriod_in_minutes() {
			return period_in_minutes;
		}

		public void setPeriod_in_minutes(int period_in_minutes) {
			this.period_in_minutes = period_in_minutes;
		}

		public int getNb_err_frames() {
			return nb_err_frames;
		}

		public void setNb_err_frames(int nb_err_frames) {
			this.nb_err_frames = nb_err_frames;
		}

		public BigDecimal getMain_or_external_voltage() {
			return main_or_external_voltage;
		}

		public void setMain_or_external_voltage(BigDecimal main_or_external_voltage) {
			this.main_or_external_voltage = main_or_external_voltage;
		}

		public BigDecimal getRechargeable_battery_voltage() {
			return rechargeable_battery_voltage;
		}

		public void setRechargeable_battery_voltage(BigDecimal rechargeable_battery_voltage) {
			this.rechargeable_battery_voltage = rechargeable_battery_voltage;
		}

		public BigDecimal getDisposable_battery_voltage() {
			return disposable_battery_voltage;
		}

		public void setDisposable_battery_voltage(BigDecimal disposable_battery_voltage) {
			this.disposable_battery_voltage = disposable_battery_voltage;
		}

		public BigDecimal getSolar_harvesting_voltage() {
			return solar_harvesting_voltage;
		}

		public void setSolar_harvesting_voltage(BigDecimal solar_harvesting_voltage) {
			this.solar_harvesting_voltage = solar_harvesting_voltage;
		}

		public BigDecimal getTic_harvesting_voltage() {
			return tic_harvesting_voltage;
		}

		public void setTic_harvesting_voltage(BigDecimal tic_harvesting_voltage) {
			this.tic_harvesting_voltage = tic_harvesting_voltage;
		}

		public BigDecimal getSum_positive_active_energy_Wh() {
			return sum_positive_active_energy_Wh;
		}

		public void setSum_positive_active_energy_Wh(BigDecimal sum_positive_active_energy_Wh) {
			this.sum_positive_active_energy_Wh = sum_positive_active_energy_Wh;
		}

		public BigDecimal getSum_negative_active_energy_Wh() {
			return sum_negative_active_energy_Wh;
		}

		public void setSum_negative_active_energy_Wh(BigDecimal sum_negative_active_energy_Wh) {
			this.sum_negative_active_energy_Wh = sum_negative_active_energy_Wh;
		}

		public BigDecimal getSum_positive_reactive_energy_Wh() {
			return sum_positive_reactive_energy_Wh;
		}

		public void setSum_positive_reactive_energy_Wh(BigDecimal sum_positive_reactive_energy_Wh) {
			this.sum_positive_reactive_energy_Wh = sum_positive_reactive_energy_Wh;
		}

		public BigDecimal getSum_negative_reactive_energy_Wh() {
			return sum_negative_reactive_energy_Wh;
		}

		public void setSum_negative_reactive_energy_Wh(BigDecimal sum_negative_reactive_energy_Wh) {
			this.sum_negative_reactive_energy_Wh = sum_negative_reactive_energy_Wh;
		}

		public BigDecimal getPositive_active_power_W() {
			return positive_active_power_W;
		}

		public void setPositive_active_power_W(BigDecimal positive_active_power_W) {
			this.positive_active_power_W = positive_active_power_W;
		}

		public BigDecimal getNegative_active_power_W() {
			return negative_active_power_W;
		}

		public void setNegative_active_power_W(BigDecimal negative_active_power_W) {
			this.negative_active_power_W = negative_active_power_W;
		}

		public BigDecimal getPositive_reactive_power_W() {
			return positive_reactive_power_W;
		}

		public void setPositive_reactive_power_W(BigDecimal positive_reactive_power_W) {
			this.positive_reactive_power_W = positive_reactive_power_W;
		}

		public BigDecimal getNegative_reactive_power_W() {
			return negative_reactive_power_W;
		}

		public void setNegative_reactive_power_W(BigDecimal negative_reactive_power_W) {
			this.negative_reactive_power_W = negative_reactive_power_W;
		}

		public BigDecimal getVrms() {
			return Vrms;
		}

		public void setVrms(BigDecimal vrms) {
			Vrms = vrms;
		}

		public BigDecimal getIrms() {
			return Irms;
		}

		public void setIrms(BigDecimal irms) {
			Irms = irms;
		}

		public BigDecimal getPhase_angle() {
			return phase_angle;
		}

		public void setPhase_angle(BigDecimal phase_angle) {
			this.phase_angle = phase_angle;
		}
	}

	public class MinMax {
		int value;
		String unity;

		public int getValue() {
			return value;
		}

		public void setValue(int value) {
			this.value = value;
		}

		public String getUnity() {
			return unity;
		}

		public void setUnity(String unity) {
			this.unity = unity;
		}
	}

	public class Decoded {
		public ZclHeader zclheader = new ZclHeader();
		public ZclData data = new ZclData();
		public BatchRecord batchRecord;

		public ZclHeader getZclheader() {
			return zclheader;
		}

		public void setZclheader(ZclHeader zclheader) {
			this.zclheader = zclheader;
		}

		public ZclData getData() {
			return data;
		}

		public void setData(ZclData data) {
			this.data = data;
		}
	}

	public Decoded decode(byte[] bytes, int port, String model) {
		// Decode an uplink message from a buffer
		// (array) of bytes to an object of fields.
		Decoded decoded = new Decoded();

		if (port == 125) {
			// batch
			int batch = 1 - (bytes[0] & 0x01);

			// trame standard
			if (batch == 0) {
				decoded.zclheader.report = "standard";
				int attributID = -1;
				int cmdID = -1;
				int clusterdID = -1;
				// endpoint
				decoded.zclheader.endpoint = ((bytes[0] & 0xE0) >> 5) | ((bytes[0] & 0x06) << 2);
				// command ID
				cmdID = bytes[1];
				decoded.zclheader.cmdID = cmdID;
				// Cluster ID
				clusterdID = bytes[2] * 256 + bytes[3];
				decoded.zclheader.clusterdID = clusterdID;

				// decode report and read atrtribut response
				if ((cmdID == 0x0a) | (cmdID == 0x8a) | (cmdID == 0x01)) {
					// Attribut ID
					attributID = bytes[4] * 256 + bytes[5];
					decoded.zclheader.attributID = attributID;

					if (cmdID == 0x8a)
						decoded.zclheader.alarm = 1;
					// data index start
					int index = 0;
					if ((cmdID == 0x0a) | (cmdID == 0x8a))
						index = 7;
					if (cmdID == 0x01) {
						index = 8;
						decoded.zclheader.status = bytes[6];
					}

					ByteBuffer buffer = ByteBuffer.wrap(bytes, index, 2);
					// temperature
					if ((clusterdID == 0x0402) & (attributID == 0x0000))
						decoded.data.temperature = new BigDecimal(buffer.getShort()).divide(new BigDecimal(100));
					// humidity
					if ((clusterdID == 0x0405) & (attributID == 0x0000))
						decoded.data.humidity = new BigDecimal(buffer.getShort()).divide(new BigDecimal(100));
					// binary input counter
					if ((clusterdID == 0x000f) & (attributID == 0x0402)) {
						buffer = ByteBuffer.wrap(bytes, index, 4);
						decoded.data.counter = new BigDecimal(buffer.getInt());
					}
					// binary input present value
					if ((clusterdID == 0x000f) & (attributID == 0x0055))
						decoded.data.pin_state = bytes[index] > 0;
					// multistate output
					if ((clusterdID == 0x0013) & (attributID == 0x0055))
						decoded.data.value = new BigDecimal(bytes[index]);
					// on/off present value
					if ((clusterdID == 0x0006) & (attributID == 0x0000)) {
						int state = bytes[index];
						if (state == 1)
							decoded.data.state = "ON";
						else
							decoded.data.state = "OFF";
					}
					// multibinary input present value
					if ((clusterdID == 0x8005) & (attributID == 0x0000)) {
						decoded.data.pin_state_1 = ((bytes[index + 1] & 0x01) == 0x01);
						decoded.data.pin_state_2 = ((bytes[index + 1] & 0x02) == 0x02);
						decoded.data.pin_state_3 = ((bytes[index + 1] & 0x04) == 0x04);
						decoded.data.pin_state_4 = ((bytes[index + 1] & 0x08) == 0x08);
						decoded.data.pin_state_5 = ((bytes[index + 1] & 0x10) == 0x10);
						decoded.data.pin_state_6 = ((bytes[index + 1] & 0x20) == 0x20);
						decoded.data.pin_state_7 = ((bytes[index + 1] & 0x40) == 0x40);
						decoded.data.pin_state_8 = ((bytes[index + 1] & 0x80) == 0x80);
						decoded.data.pin_state_9 = ((bytes[index] & 0x01) == 0x01);
						decoded.data.pin_state_10 = ((bytes[index] & 0x02) == 0x02);
					}
					// analog input
					if ((clusterdID == 0x000c) & (attributID == 0x0055))
						decoded.data.analog = new BigDecimal(buffer.getFloat());

					// simple metering
					if ((clusterdID == 0x0052) & (attributID == 0x0000)) {
						buffer = ByteBuffer.wrap(bytes, index, 4);
						decoded.data.active_energy_Wh = new BigDecimal(buffer.getInt() & 0xffffff);
						buffer = ByteBuffer.wrap(bytes, index + 3, 10);
						decoded.data.reactive_energy_Varh = new BigDecimal(buffer.getInt() & 0xffffff);
						decoded.data.nb_samples = new BigDecimal(buffer.getShort());
						decoded.data.active_power_W = new BigDecimal(buffer.getShort());
						decoded.data.reactive_power_VAR = new BigDecimal(buffer.getShort());
					}
					// lorawan message type
					if ((clusterdID == 0x8004) & (attributID == 0x0000)) {
						if (bytes[index] == 1)
							decoded.data.message_type = "confirmed";
						if (bytes[index] == 0)
							decoded.data.message_type = "unconfirmed";
					}

					// lorawan retry
					if ((clusterdID == 0x8004) & (attributID == 0x0001)) {
						decoded.data.nb_retry = bytes[index];
					}

					// lorawan reassociation
					if ((clusterdID == 0x8004) & (attributID == 0x0002)) {
						buffer = ByteBuffer.wrap(bytes, index + 1, 4);
						decoded.data.period_in_minutes = buffer.getShort();
						decoded.data.nb_err_frames = buffer.getShort();
					}
					// configuration node power desc
					if ((clusterdID == 0x0050) & (attributID == 0x0006)) {
						int index2 = index + 3;
						buffer = ByteBuffer.wrap(bytes, index2, bytes.length - index2);
						if ((bytes[index + 2] & 0x01) == 0x01) {
							decoded.data.main_or_external_voltage = new BigDecimal(buffer.getShort())
									.divide(new BigDecimal(1000));
						}
						if ((bytes[index + 2] & 0x02) == 0x02) {
							decoded.data.rechargeable_battery_voltage = new BigDecimal(buffer.getShort())
									.divide(new BigDecimal(1000));
						}
						if ((bytes[index + 2] & 0x04) == 0x04) {
							decoded.data.disposable_battery_voltage = new BigDecimal(buffer.getShort())
									.divide(new BigDecimal(1000));
						}
						if ((bytes[index + 2] & 0x08) == 0x08) {
							decoded.data.solar_harvesting_voltage = new BigDecimal(buffer.getShort())
									.divide(new BigDecimal(1000));
						}
						if ((bytes[index + 2] & 0x10) == 0x10) {
							decoded.data.tic_harvesting_voltage = new BigDecimal(buffer.getShort())
									.divide(new BigDecimal(1000));
						}
					}
					// energy and power metering
					if ((clusterdID == 0x800a) & (attributID == 0x0000)) {
						int index2 = index;
						buffer = ByteBuffer.wrap(bytes, index2 + 1, bytes.length - index2 - 1);
						decoded.data.sum_positive_active_energy_Wh = new BigDecimal(buffer.getInt());
						decoded.data.sum_negative_active_energy_Wh = new BigDecimal(buffer.getInt());
						decoded.data.sum_positive_reactive_energy_Wh = new BigDecimal(buffer.getInt());
						decoded.data.sum_negative_reactive_energy_Wh = new BigDecimal(buffer.getInt());
						decoded.data.positive_active_power_W = new BigDecimal(buffer.getInt());
						decoded.data.negative_active_power_W = new BigDecimal(buffer.getInt());
						decoded.data.positive_reactive_power_W = new BigDecimal(buffer.getInt());
						decoded.data.negative_reactive_power_W = new BigDecimal(buffer.getInt());
					}
					// energy and power metering
					if ((clusterdID == 0x800b) & (attributID == 0x0000)) {
						int index2 = index;
						buffer = ByteBuffer.wrap(bytes, index2 + 1, bytes.length - index2 - 1);
						decoded.data.Vrms = new BigDecimal(buffer.getShort()).divide(new BigDecimal(10));
						decoded.data.Irms = new BigDecimal(buffer.getShort()).divide(new BigDecimal(10));
						decoded.data.phase_angle = new BigDecimal(buffer.getShort());
					}
				}

				// decode configuration response
				if (cmdID == 0x07) {
					// AttributID
					ByteBuffer buffer = ByteBuffer.wrap(bytes, 6, 2);
					attributID = buffer.getShort();
					decoded.zclheader.attributID = attributID;
					// status
					decoded.zclheader.status = bytes[4];
					// batch
					decoded.zclheader.batch = bytes[5];
				}

				// decode read configuration response
				if (cmdID == 0x09) {
					// AttributID
					ByteBuffer buffer = ByteBuffer.wrap(bytes, 6, 2);
					attributID = buffer.getShort();
					decoded.zclheader.attributID = attributID;
					// status
					decoded.zclheader.status = bytes[4];
					// batch
					decoded.zclheader.batch = bytes[5];

					// AttributType
					decoded.zclheader.attribut_type = bytes[8];
					// min
					decoded.zclheader.min = new MinMax();
					buffer = ByteBuffer.wrap(bytes, 9, 2);
					if ((bytes[9] & 0x80) == 0x80) {
						decoded.zclheader.min.value = buffer.getShort() & 0x7fff;
						decoded.zclheader.min.unity = "minutes";
					} else {
						decoded.zclheader.min.value = buffer.getShort();
						decoded.zclheader.min.unity = "seconds";
					}
					// max
					decoded.zclheader.max = new MinMax();
					if ((bytes[9] & 0x80) == 0x80) {
						decoded.zclheader.max.value = buffer.getShort() & 0x7fff;
						decoded.zclheader.max.unity = "minutes";
					} else {
						decoded.zclheader.max.value = buffer.getShort();
						decoded.zclheader.max.unity = "seconds";
					}

				}

			} else {
				decoded.zclheader.report = "batch";
				if (model != null) {
					try {
						logger.info("Model detected: {}", model);
						String js = "record = brUncompress(" + models.get(model) + ",\""
								+ BaseEncoding.base16().encode(bytes) + "\");";
						logger.info("Will use these args: {}", js);
						engine.eval(js);
						decoded.batchRecord = (BatchRecord) engine.get("record");
					} catch (ScriptException e) {
						e.printStackTrace();
					}
				} else {
					logger.error("Device model needs to be provided!");
				}
			}
		}

		return decoded;
	}

}
