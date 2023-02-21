package lora.codec.nke;

import java.util.HashMap;
import java.util.Map;

public enum ZCLCommand {
    ReadAttribute(0x00),
    ReadAttributeResponse(0x01),
    WriteAttribute(0x02),
    WriteAttributeResponse(0x04),
    WriteAttributeNoResponse(0x05),
    ConfigureReporting(0x06),
    ConfigureReportingResponse(0x07),
    ReadReportingConfiguration(0x08),
    ReadReportingConfigurationResponse(0x09),
    ReportAttributes(0x0A),
    ReportAttributesAlarm(0x8A),
    ClusterSpecificCommand(0x50);

    private int commandId;

    private static Map<Integer, ZCLCommand> commandsById = new HashMap<>();
    static {
        for (ZCLCommand c : values()) {
            commandsById.put(c.commandId, c);
        }
    }

    private ZCLCommand(int commandId) {
        this.commandId = commandId;
    }

    public int getCommandId() {
        return commandId;
    }

    public static ZCLCommand getCommandById(int id) {
        return commandsById.get(id);
    }
}
