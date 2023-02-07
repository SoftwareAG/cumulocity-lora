package lora.codec.nke;

import java.util.EnumMap;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import lora.codec.downlink.DeviceOperation;
import lora.codec.downlink.DeviceOperationElement;
import lora.codec.downlink.DeviceOperationElement.ParamType;

@Service
public class ZCLEncoder {
    private EnumMap<ZCLCluster, Map<String, DeviceOperation>> operationGroups = new EnumMap<>(ZCLCluster.class);
    {
        operationGroups.put(ZCLCluster.Basic, new HashMap<>());
        operationGroups.get(ZCLCluster.Basic).put("Read firmware version", new DeviceOperation("Read firmware version", ZCLAttribute.FirmwareVersion.name()).addElement(new DeviceOperationElement("endpoint", "Endpoint", ParamType.INTEGER)));
        operationGroups.get(ZCLCluster.Basic).put("Read kernel version", new DeviceOperation("Read kernel version", ZCLAttribute.KernelVersion.name()).addElement(new DeviceOperationElement("endpoint", "Endpoint", ParamType.INTEGER)));
    }

    public Map<String, DeviceOperation> getDeviceOperations(ZCLCluster cluster) {
        return operationGroups.get(cluster);
    }
}
