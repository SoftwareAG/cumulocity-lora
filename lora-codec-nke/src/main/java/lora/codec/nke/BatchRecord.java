package lora.codec.nke;

public class BatchRecord {
	public int batch_counter;
	public long batch_relative_timestamp;
	public BatchDataSet[] dataset;

	public BatchRecord() {
	}
}