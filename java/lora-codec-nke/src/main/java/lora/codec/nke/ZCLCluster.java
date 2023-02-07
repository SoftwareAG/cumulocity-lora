package lora.codec.nke;

import java.util.HashMap;
import java.util.Map;

public enum ZCLCluster {
	Basic(0x0000),
	OnOff(0x0006),
	SimpleMetering(0x0052),
	PowerQuality(0x8052),
	Occupancy(0x0406),
	Temperature(0x0402),
	Pressure(0x0403),
	RelativeHumidity(0x0405),
	AnalogInput(0x000C),
	BinaryInput(0x000F),
	Illuminance(0x0400),
	MultiStateOutput(0x0013),
	Configuration(0x0050),
	VolumeMeter(0x8002),
	SensO(0x8003),
	LoRaWAN(0x8004),
	MultiBinaryInput(0x8005),
	SerialInterface(0x8006), 
	SerialMasterSlave(0x8007),
	DifferentialPressure(0x8008),
	MultiMasterSlave(0x8009),
	TIC_ICE(0x0053),
	TIC_CBE(0x0054),
	TIC_CJE(0x0055),
	TIC_STD(0x0056),
	TIC_PMEPMI(0x0057),
	EnergyPowerMetering(0x800A),
	VoltageCurrentMetering(0x800B),
	Concentration(0x800C);

    private int clusterId;
    private static final Map<Integer, ZCLCluster> clustersById = new HashMap<>();
    static {
        for (ZCLCluster c: values()) {
            clustersById.put(c.clusterId, c);
        }
    }

    ZCLCluster(int clusterId) {
        this.clusterId = clusterId;
    }

    public static ZCLCluster getClusterById(int clusterId) {
        return clustersById.get(clusterId);
    }
}
