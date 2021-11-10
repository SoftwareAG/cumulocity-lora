package lora.codec.downlink;

public class Encode {
	private String devEui;
	private String operation;
	private String model;

	public Encode() {
	}

	public Encode(String devEui, String operation, String model) {
		super();
		this.devEui = devEui;
		this.operation = operation;
		this.model = model;
	}
	
	public void setDevEui(String devEui) {
		this.devEui = devEui;
	}
	
	public void setOperation(String operation) {
		this.operation = operation;
	}

	public String getDevEui() {
		return devEui;
	}

	public String getOperation() {
		return operation;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	@Override
	public String toString() {
		return "Encode [devEui=" + devEui + ", operation=" + operation + ", model=" + model + "]";
	}
}