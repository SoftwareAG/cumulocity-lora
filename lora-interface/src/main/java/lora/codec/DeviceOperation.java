package lora.codec;

import java.util.ArrayList;
import java.util.List;

public class DeviceOperation {
	private String id;
	private String name;
	private List<DeviceOperationParam> params = new ArrayList<>();
	public DeviceOperation() {}
	public DeviceOperation(String id, String name, List<DeviceOperationParam> params) {
		super();
		this.id = id;
		this.name = name;
		this.params = params;
	}
	public DeviceOperation(String id, String name) {
		this(id, name, new ArrayList<>());
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
	public List<DeviceOperationParam> getParams() {
		return params;
	}
	public void setParams(List<DeviceOperationParam> params) {
		this.params = params;
	}

	public DeviceOperation addParam(DeviceOperationParam param) {
		this.params.add(param);
		return this;
	}
}
