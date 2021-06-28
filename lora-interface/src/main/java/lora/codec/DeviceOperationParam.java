package lora.codec;

public class DeviceOperationParam {
	private String id;
	private String name;
	private ParamType type;
	private Object value;
	public enum ParamType {
		STRING, INTEGER, FLOAT, BOOL, DATE, ENUM, SEPARATOR, GROUP;
	}
	public DeviceOperationParam() {}
	public DeviceOperationParam(String id, String name, ParamType type, Object value) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
		this.value = value;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public ParamType getType() {
		return type;
	}
	public void setType(ParamType type) {
		this.type = type;
	}
	public Object getValue() {
		return value;
	}
	public void setValue(Object value) {
		this.value = value;
	}
}
