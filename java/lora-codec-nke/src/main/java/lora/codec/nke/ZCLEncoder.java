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
        operationGroups.get(ZCLCluster.Basic).put("Read firmware version",
                new DeviceOperation("Read firmware version", ZCLAttribute.BasicFirmwareVersion.name())
                        .addElement(new DeviceOperationElement("endpoint", "Endpoint", ParamType.INTEGER)));
        operationGroups.get(ZCLCluster.Basic).put("Read kernel version",
                new DeviceOperation("Read kernel version", ZCLAttribute.BasicKernelVersion.name())
                        .addElement(new DeviceOperationElement("endpoint", "Endpoint", ParamType.INTEGER)));
    }

    public Map<String, DeviceOperation> getDeviceOperations(ZCLCluster cluster) {
        return operationGroups.get(cluster);
    }

    public String encode(DeviceOperation command, int endpoint) {
        ZCLCommand zclCommand = ZCLCommand.valueOf(command.getId());
        String result = String.format("11%02x%02x", endpoint, zclCommand.getCommandId());
        for (DeviceOperationElement element : command.getElements()) {
            ZCLAttribute attr = ZCLAttribute.valueOf(element.getId());
            result += String.format("%02x%04x", attr.getCluster().getClusterId(), attr.getAttributeId());
        }
        return result;
    }
}
