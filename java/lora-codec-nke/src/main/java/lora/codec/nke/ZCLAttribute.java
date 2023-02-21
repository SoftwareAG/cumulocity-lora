package lora.codec.nke;

import java.util.EnumMap;
import java.util.HashMap;
import java.util.Map;

public enum ZCLAttribute {
    BasicFirmwareVersion(0x0002, ZCLCluster.Basic, ZCLCommand.ReadAttribute),
    BasicKernelVersion(0x0003, ZCLCluster.Basic, ZCLCommand.ReadAttribute),
    BasicManufacturer(0x0004, ZCLCluster.Basic, ZCLCommand.ReadAttribute),
    BasicModelIdentifier(0x0005, ZCLCluster.Basic, ZCLCommand.ReadAttribute),
    BasicDateCode(0x0006, ZCLCluster.Basic, ZCLCommand.ReadAttribute),
    TemperatureMeasuredValue(0x0000, ZCLCluster.Temperature, ZCLCommand.ReadAttribute);

    private int attributeId;
    private ZCLCluster cluster;
    private ZCLCommand[] commands;

    private static final Map<ZCLCluster, Map<Integer, ZCLAttribute>> attributesByClusterAndId = new EnumMap<>(
            ZCLCluster.class);
    static {
        for (ZCLAttribute a : values()) {
            if (!attributesByClusterAndId.containsKey(a.cluster)) {
                attributesByClusterAndId.put(a.cluster, new HashMap<>());
            }
            attributesByClusterAndId.get(a.cluster).put(a.attributeId, a);
        }
    }

    ZCLAttribute(int attributeId, ZCLCluster cluster, ZCLCommand... commands) {
        this.attributeId = attributeId;
        this.cluster = cluster;
        this.commands = commands;
    }

    public ZCLCommand[] getAvailableCommands() {
        return commands;
    }

    public int getAttributeId() {
        return attributeId;
    }

    public ZCLCluster getCluster() {
        return cluster;
    }
}
