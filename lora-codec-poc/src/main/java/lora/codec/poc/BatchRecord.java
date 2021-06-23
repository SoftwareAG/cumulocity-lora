package lora.codec.nke;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BatchRecord {
	public int batch_counter;
	public long batch_relative_timestamp;
	public long batch_absolute_timestamp;
	public BatchDataSet[] dataset;

	@Override
	public String toString() {
		return "BatchRecord [batch_absolute_timestamp=" + batch_absolute_timestamp + ", batch_counter=" + batch_counter
				+ ", batch_relative_timestamp=" + batch_relative_timestamp + ", dataset=" + Arrays.toString(dataset)
				+ "]";
	}

	private final int BR_HUFF_MAX_INDEX_TABLE = 14;
	private final int NUMBER_OF_SERIES = 16;

	private final Logger logger = LoggerFactory.getLogger(getClass());

	public BatchRecord() {
	}

	public void uncompress(int tagsz, Arg[] argList, byte[] payload, Integer batch_absolute_timestamp) throws Exception {
		Output out = initResult();
		BitBuffer buffer = new BitBuffer(payload);
		Flag flag = new Flag(buffer.getNextSample(BitBuffer.ST_U8));

		out.batch_counter = buffer.getNextSample(BitBuffer.ST_U8, 3);
		buffer.getNextSample(BitBuffer.ST_U8, 1);

		FirstSample temp = prePopulateOutput(out, buffer, argList, flag, tagsz);
		int last_timestamp = temp.last_timestamp;
		int index_of_the_first_sample = temp.index_of_the_first_sample;

		if (flag.hasSample) {
			last_timestamp = uncompressSamplesData(out, buffer, index_of_the_first_sample, argList, last_timestamp,
					flag, tagsz);
		}

		out.batch_relative_timestamp = extractTimestampFromBuffer(buffer, last_timestamp);
		adaptToExpectedFormat(out, argList, batch_absolute_timestamp);
	}

	private void adaptToExpectedFormat(Output out, Arg[] argList, Integer batchAbsoluteTimestamp) {
		this.batch_counter = out.batch_counter;
		this.batch_relative_timestamp = out.batch_relative_timestamp;

		if (batchAbsoluteTimestamp != null) {
			this.batch_absolute_timestamp = batchAbsoluteTimestamp;
		}
		List<UncompressSample> datasets = new ArrayList<>();
		int index = 0;
		for (Series s : out.series) {
			for (UncompressSample item : s.uncompressSamples) {
				UncompressSample returned = new UncompressSample(item.data_relative_timestamp, new Data(
						argList[index].divide != null ? item.data.value / argList[index].divide : item.data.value,
						argList[index].taglbl));
				if (batchAbsoluteTimestamp != null) {
					returned.data_absolute_timestamp = computeDataAbsoluteTimestamp(batchAbsoluteTimestamp,
							out.batch_relative_timestamp, item.data_relative_timestamp);
				}
				datasets.add(returned);
			}
			index++;
		}
		this.dataset = new BatchDataSet[datasets.size()];
		for(int i=0;i<datasets.size();i++) {
			this.dataset[i] = new BatchDataSet();
			this.dataset[i].data_relative_timestamp = datasets.get(i).data_relative_timestamp;
			this.dataset[i].data_absolute_timestamp = datasets.get(i).data_absolute_timestamp;
			this.dataset[i].data = new BatchData();
			this.dataset[i].data.value = datasets.get(i).data.value;
			this.dataset[i].data.label = datasets.get(i).data.label;
		}
		logger.info(this.toString());
	}

	private long computeDataAbsoluteTimestamp(Integer bat, int brt, int drt) {
		return new DateTime(new DateTime(bat).getMillis() - (brt - drt) * 1000).toDateTimeISO().getMillis();
	}

	private int uncompressSamplesData(Output out, BitBuffer buffer, int index_of_the_first_sample, Arg[] argList,
			int last_timestamp, Flag flag, int tagsz) throws Exception {
		if (flag.isCommonTimestamp) {
			return handleCommonTimestamp(out, buffer, index_of_the_first_sample, argList, flag, tagsz);
		}
		return handleSeparateTimestamp(out, buffer, argList, last_timestamp, flag, tagsz);
	}

	private int handleSeparateTimestamp(Output out, BitBuffer buffer, Arg[] argList, int last_timestamp, Flag flag,
			int tagsz) throws Exception {
		Tag tag = new Tag(tagsz, 0);
		for (int i = 0; i < flag.nb_of_type_measure; i++) {
			tag.lbl = buffer.getNextSample(BitBuffer.ST_U8, tagsz);
			int sampleIndex = findIndexFromArgList(argList, tag);
			int compressSampleNb = buffer.getNextSample(BitBuffer.ST_U8, 8);
			if (compressSampleNb != 0) {
				int timestampCoding = buffer.getNextSample(BitBuffer.ST_U8, 2);
				for (int j = 0; j < compressSampleNb; j++) {
					int precedingRelativeTimestamp = out.series.get(sampleIndex).uncompressSamples
							.get(out.series.get(sampleIndex).uncompressSamples.size() - 1).data_relative_timestamp;
					UncompressSample currentMeasure = new UncompressSample(0, new Data(0, 0));
					int bi = buffer.getNextBifromHi(timestampCoding);
					currentMeasure.data_relative_timestamp = computeTimestampFromBi(buffer, precedingRelativeTimestamp,
							bi);
					if (currentMeasure.data_relative_timestamp > last_timestamp) {
						last_timestamp = currentMeasure.data_relative_timestamp;
					}
					bi = buffer.getNextBifromHi(out.series.get(sampleIndex).codingTable);
					if (bi <= BR_HUFF_MAX_INDEX_TABLE) {
						float precedingValue = out.series.get(sampleIndex).uncompressSamples
								.get(out.series.get(sampleIndex).uncompressSamples.size() - 1).data.value;
						if (bi > 0) {
							currentMeasure.data.value = completeCurrentMeasure(buffer, precedingValue,
									out.series.get(sampleIndex).codingType, argList[sampleIndex].resol, bi);
						} else {
							// bi <= 0
							currentMeasure.data.value = precedingValue;
						}
					} else {
						// bi > BR_HUFF_MAX_INDEX_TABLE
						currentMeasure.data.value = buffer.getNextSample(argList[sampleIndex].sampletype);
					}
					out.series.get(sampleIndex).uncompressSamples.add(currentMeasure);
				}
			}
		}
		return last_timestamp;
	}

	private int handleCommonTimestamp(Output out, BitBuffer buffer, int index_of_the_first_sample, Arg[] argList,
			Flag flag, int tagsz) throws Exception {
		// number of sample
		int nb_sample_to_parse = buffer.getNextSample(BitBuffer.ST_U8, 8);
		Tag tag = new Tag(tagsz, 0);

		TimestampTable temp = initTimestampCommonTable(out, buffer, nb_sample_to_parse, index_of_the_first_sample);
		List<Integer> timestampCommon = temp.timestampCommon;
		int lastTimestamp = temp.lastTimestamp;

		for (int j = 0; j < flag.nb_of_type_measure; j++) {
			int first_null_delta_value = 1;
			tag.lbl = buffer.getNextSample(BitBuffer.ST_U8, tagsz);
			int sampleIndex = findIndexFromArgList(argList, tag);
			for (int i = 0; i < nb_sample_to_parse; i++) {
				// Available bit
				int available = buffer.getNextSample(BitBuffer.ST_U8, 1);
				if (available != 0) {
					// Delta value
					int bi = buffer.getNextBifromHi(out.series.get(sampleIndex).codingTable);
					UncompressSample currentMeasure = new UncompressSample(0, new Data(0, 0));
					if (bi <= BR_HUFF_MAX_INDEX_TABLE) {
						float precedingValue = out.series.get(sampleIndex).uncompressSamples
								.get(out.series.get(sampleIndex).uncompressSamples.size() - 1).data.value;
						if (bi > 0) {
							currentMeasure.data.value = completeCurrentMeasure(buffer, precedingValue,
									out.series.get(sampleIndex).codingType, argList[sampleIndex].resol, bi);
						} else {
							// (bi <= 0)
							if (first_null_delta_value != 0) {
								// First value is yet recorded starting from the header
								first_null_delta_value = 0;
								continue;
							} else {
								currentMeasure.data.value = precedingValue;
							}
						}
					} else {
						// bi > BR_HUFF_MAX_INDEX_TABLE
						currentMeasure.data.value = buffer.getNextSample(argList[sampleIndex].sampletype);
					}
					currentMeasure.data_relative_timestamp = timestampCommon.get(i);
					out.series.get(sampleIndex).uncompressSamples.add(currentMeasure);
				}
			}
		}
		return lastTimestamp;
	}

	private float completeCurrentMeasure(BitBuffer buffer, float precedingValue, int codingType, float resol, int bi)
			throws Exception {
		float currentValue = buffer.getNextSample(BitBuffer.ST_U16, bi);
		if (codingType == 0) {
			// ADLC
			return computeAdlcValue(currentValue, resol, precedingValue, bi);
		}
		if (codingType == 1) {
			// Positive
			return (currentValue + (1 << bi) - 1) * resol + precedingValue;
		}
		// Negative
		return precedingValue - (currentValue + ((1 << bi) - 1)) * resol;
	}

	private float computeAdlcValue(float currentValue, float resol, float precedingValue, int bi) {
		if (currentValue >= Math.pow(2, bi - 1)) {
			return currentValue * resol + precedingValue;
		}
		return (currentValue + 1 - (1 << bi)) * resol + precedingValue;
	}

	private TimestampTable initTimestampCommonTable(Output out, BitBuffer buffer, int nb_sample_to_parse,
			int index_of_the_first_sample) throws Exception {
		List<Integer> timestampCommon = new ArrayList<>();
		int lastTimestamp = 0;
		int timestampCoding = buffer.getNextSample(BitBuffer.ST_U8, 2);
		for (int i = 0; i < nb_sample_to_parse; i++) {
			// delta timestamp
			int bi = buffer.getNextBifromHi(timestampCoding);
			if (bi <= BR_HUFF_MAX_INDEX_TABLE) {
				if (i == 0) {
					timestampCommon.add(
							out.series.get(index_of_the_first_sample).uncompressSamples.get(0).data_relative_timestamp);
				} else {
					int precedingTimestamp = timestampCommon.get(i - 1);
					if (bi > 0) {
						timestampCommon
								.add(buffer.getNextSample(BitBuffer.ST_U32, bi) + precedingTimestamp + (1 << bi) - 1);
					} else {
						timestampCommon.add(precedingTimestamp);
					}
				}
			} else {
				timestampCommon.add(buffer.getNextSample(BitBuffer.ST_U32));
			}
			lastTimestamp = timestampCommon.get(i);
		}
		return new TimestampTable(timestampCommon, lastTimestamp);
	}

	private class TimestampTable {
		List<Integer> timestampCommon = new ArrayList<>();
		int lastTimestamp;

		public TimestampTable(List<Integer> timestampCommon, int lastTimestamp) {
			this.timestampCommon = timestampCommon;
			this.lastTimestamp = lastTimestamp;
		}
	}

	private class Flag {
		boolean isCommonTimestamp;
		boolean hasSample;
		boolean batch_req;
		int nb_of_type_measure;

		public Flag(int flag) {
			this.isCommonTimestamp = (flag & 2) > 0;
			this.hasSample = (flag & 4) == 0;
			this.batch_req = (flag & 8) > 0;
			this.nb_of_type_measure = (flag & 0xf0) >> 4;
		}
	}

	private class FirstSample {
		int last_timestamp;
		int index_of_the_first_sample;

		public FirstSample(int last_timestamp, int index_of_the_first_sample) {
			this.last_timestamp = last_timestamp;
			this.index_of_the_first_sample = index_of_the_first_sample;
		}

		@Override
		public String toString() {
			return "FirstSample [index_of_the_first_sample=" + index_of_the_first_sample + ", last_timestamp="
					+ last_timestamp + "]";
		}
	}

	private class Tag {
		int tagsz;
		int lbl;

		public Tag(int tagsz, int lbl) {
			this.tagsz = tagsz;
			this.lbl = lbl;
		}
	}

	private FirstSample prePopulateOutput(Output out, BitBuffer buffer, Arg[] argList, Flag flag, int tagsz)
			throws Exception {
		int currentTimestamp = 0;
		int index_of_the_first_sample = 0;
		for (int i = 0; i < flag.nb_of_type_measure; i++) {
			Tag tag = new Tag(tagsz, buffer.getNextSample(BitBuffer.ST_U8, tagsz));
			int sampleIndex = findIndexFromArgList(argList, tag);

			if (i == 0) {
				index_of_the_first_sample = sampleIndex;
			}

			currentTimestamp = extractTimestampFromBuffer(buffer, currentTimestamp);
			out.series.set(sampleIndex,
					computeSeries(buffer, argList[sampleIndex].sampletype, tag.lbl, currentTimestamp));
			if (flag.hasSample) {
				out.series.get(sampleIndex).codingType = buffer.getNextSample(BitBuffer.ST_U8, 2);
				out.series.get(sampleIndex).codingTable = buffer.getNextSample(BitBuffer.ST_U8, 2);
			}
		}
		return new FirstSample(currentTimestamp, index_of_the_first_sample);
	}

	private Series computeSeries(BitBuffer buffer, int sampletype, int lbl, int currentTimestamp) throws Exception {
		List<UncompressSample> uncompressSamples = new ArrayList<>();
		uncompressSamples.add(new UncompressSample(currentTimestamp, new Data(getMeasure(buffer, sampletype), lbl)));
		return new Series(0, 0, null, uncompressSamples);
	}

	private float getMeasure(BitBuffer buffer, int sampletype) throws Exception {
		int v = buffer.getNextSample(sampletype);
		return sampletype == BitBuffer.ST_FL ? Float.intBitsToFloat(v) : v;
	}

	private int extractTimestampFromBuffer(BitBuffer buffer, Integer baseTimestamp) throws Exception {
		if (baseTimestamp != null && baseTimestamp != 0) {
			int bi = buffer.getNextBifromHi(1);
			return computeTimestampFromBi(buffer, baseTimestamp, bi);
		}
		return buffer.getNextSample(BitBuffer.ST_U32);
	}

	private int computeTimestampFromBi(BitBuffer buffer, Integer baseTimestamp, int bi) throws Exception {
		if (bi > BR_HUFF_MAX_INDEX_TABLE) {
			return buffer.getNextSample(BitBuffer.ST_U32);
		}
		if (bi > 0) {
			return computeTimestampFromPositiveBi(buffer, baseTimestamp, bi);
		}
		return baseTimestamp;
	}

	private int computeTimestampFromPositiveBi(BitBuffer buffer, Integer baseTimestamp, int bi) throws Exception {
		//logger.info("In computeTimestampFromPositiveBi");
		int sample = buffer.getNextSample(BitBuffer.ST_U32, bi);
		logger.info("computeTimestampFromPositiveBi: {}", sample);
		return sample + baseTimestamp + (1 << bi) - 1;
	}

	private int findIndexFromArgList(Arg[] argList, Tag tag) throws Exception {
		for (int i = 0; i < argList.length; i++) {
			if (argList[i].taglbl == tag.lbl) {
				return i;
			}
		}
		throw new Exception("Cannot find index in argList");
	}

	public static class Arg {
		int taglbl;
		float resol;
		int sampletype;
		Float divide = null;

		public Arg(int taglbl, float resol, int sampletype) {
			this.taglbl = taglbl;
			this.resol = resol;
			this.sampletype = sampletype;
			this.divide = null;
		}

		public Arg(int taglbl, float resol, int sampletype, Float divide) {
			this.taglbl = taglbl;
			this.resol = resol;
			this.sampletype = sampletype;
			this.divide = divide;
		}
	}

	private class Data {
		float value;
		int label;

		public Data(float value, int label) {
			this.value = value;
			this.label = label;
		}

		@Override
		public String toString() {
			return "Data [label=" + label + ", value=" + value + "]";
		}
	}

	private class UncompressSample {
		int data_relative_timestamp;
		long data_absolute_timestamp;
		Data data;

		public UncompressSample(int data_relative_timestamp, Data data) {
			this.data_relative_timestamp = data_relative_timestamp;
			this.data = data;
		}

		@Override
		public String toString() {
			return "UncompressSample [data=" + data + ", data_absolute_timestamp=" + data_absolute_timestamp
					+ ", data_relative_timestamp=" + data_relative_timestamp + "]";
		}
	}

	private class Series {
		int codingType;
		int codingTable;
		Float resolution;
		List<UncompressSample> uncompressSamples;

		public Series(int codingType, int codingTable, Float resolution, List<UncompressSample> uncompressSamples) {
			this.codingType = codingType;
			this.codingTable = codingTable;
			this.resolution = resolution;
			this.uncompressSamples = uncompressSamples;
		}

		@Override
		public String toString() {
			return "Series [codingTable=" + codingTable + ", codingType=" + codingType + ", resolution=" + resolution
					+ ", uncompressSamples=" + uncompressSamples + "]";
		}
	}

	private class Output {
		int batch_counter;
		int batch_relative_timestamp;
		List<Series> series = new ArrayList<>();
		@Override
		public String toString() {
			return "Output [batch_counter=" + batch_counter + ", batch_relative_timestamp=" + batch_relative_timestamp
					+ ", series=" + series + "]";
		}
	}

	public Output initResult() {
		Output out = new Output();
		out.batch_counter = 0;
		out.batch_relative_timestamp = 0;
		for (int i = 0; i < NUMBER_OF_SERIES; i++) {
			out.series.add(new Series(0, 0, null, new ArrayList<>()));
		}
		return out;
	}
}