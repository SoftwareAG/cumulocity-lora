package lora.codec.nke;

public class BatchDataSet {
	public long data_absolute_timestamp;
	public long data_relative_timestamp;
	public BatchData data;

	public BatchDataSet() {
	}

	@Override
	public String toString() {
		return "BatchDataSet [data=" + data + ", data_absolute_timestamp=" + data_absolute_timestamp
				+ ", data_relative_timestamp=" + data_relative_timestamp + "]";
	}
}