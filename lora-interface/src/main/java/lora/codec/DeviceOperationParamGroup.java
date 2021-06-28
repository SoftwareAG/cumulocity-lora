package lora.codec;

import java.util.ArrayList;
import java.util.List;

public class DeviceOperationParamGroup extends DeviceOperationParam {
    private List<DeviceOperationParam> params = new ArrayList<>();
    DeviceOperationParamGroup() {
        super();
        this.setType(ParamType.GROUP);
    }
    public DeviceOperationParamGroup(String id, String name) {
		super(id, name, ParamType.GROUP, null);
	}
	public List<DeviceOperationParam> getParams() {
		return params;
	}
	public void setParams(List<DeviceOperationParam> params) {
		this.params = params;
	}

	public DeviceOperationParamGroup addParam(DeviceOperationParam param) {
		this.params.add(param);
		return this;
	}
}
