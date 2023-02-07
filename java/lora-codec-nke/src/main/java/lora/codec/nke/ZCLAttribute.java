package lora.codec.nke;

import java.util.HashMap;
import java.util.Map;

import lora.codec.downlink.DeviceOperation;

public enum ZCLAttribute {
    FirmwareVersion(0x0002, ZCLCluster.Basic),
    KernelVersion(0x0003, ZCLCluster.Basic),
    Manufacturer(0x0004, ZCLCluster.Basic),
    ModelIdentifier(0x0005, ZCLCluster.Basic),
    DateCode(0x0006, ZCLCluster.Basic),
    MeasuredValue(0x0000, ZCLCluster.Temperature);

    private int attributeId;
    private ZCLCluster cluster;
    protected Map<ZCLCommand, DeviceOperation> operations = new HashMap<>();

    private static final Map<ZCLCluster, Map<Integer, ZCLAttribute>> attributesByClusterAndId = new HashMap<>();
    static {
        for(ZCLAttribute a: values()) {
            if (!attributesByClusterAndId.containsKey(a.cluster)) {
                attributesByClusterAndId.put(a.cluster, new HashMap<>());
            }
            attributesByClusterAndId.get(a.cluster).put(a.attributeId, a);
        }
    }

    ZCLAttribute(int attributeId, ZCLCluster cluster) {
        this.attributeId = attributeId;
        this.cluster = cluster;
    }

    public Map<ZCLCommand, DeviceOperation> getDeviceOperations() {
        return operations;
    }
}
