package lora.codec.nke;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import lora.codec.DeviceOperation;
import lora.codec.DeviceOperationParam;
import lora.codec.DeviceOperationParam.ParamType;

@Service
public class ZCLEncoder {
    private Map<ZCLCluster, Map<String, DeviceOperation>> operationGroups = new HashMap<>();
    {
        operationGroups.put(ZCLCluster.Basic, new HashMap<>());
        operationGroups.get(ZCLCluster.Basic).put("Read firmware version", new DeviceOperation("Read firmware version", ZCLAttribute.FirmwareVersion.name()).addParam(new DeviceOperationParam("endpoint", "Endpoint", ParamType.INTEGER, 0)));
        operationGroups.get(ZCLCluster.Basic).put("Read kernel version", new DeviceOperation("Read kernel version", ZCLAttribute.KernelVersion.name()).addParam(new DeviceOperationParam("endpoint", "Endpoint", ParamType.INTEGER, 0)));
    }

    public Map<String, DeviceOperation> getDeviceOperations(ZCLCluster cluster) {
        return operationGroups.get(cluster);
    }
}
