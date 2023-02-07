package lora.codec.nke;

public class BatchData {
	public float value;
	public int label;
	public String data_absolute_timestamp;

	public BatchData() {
	}

	@Override
	public String toString() {
		return "BatchData [data_absolute_timestamp=" + data_absolute_timestamp + ", label=" + label + ", value=" + value
				+ "]";
	}
}