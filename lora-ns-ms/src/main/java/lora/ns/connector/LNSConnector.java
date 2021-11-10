package lora.ns.connector;

import java.util.List;
import java.util.Optional;
import java.util.Properties;

import lora.codec.downlink.DownlinkData;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.gateway.Gateway;

public interface LNSConnector {
	String getId();
	String getType();
	String getName();
	List<EndDevice> getDevices();
	void setProperties(Properties properties);
	Properties getProperties();
	Optional<EndDevice> getDevice(String devEui);
	String sendDownlink(DownlinkData downlinkData);
	boolean provisionDevice(DeviceProvisioning deviceProvisioning);
	void configureRoutings(String url, String tenant, String login, String password);
	void removeRoutings(String tenant);
	boolean deprovisionDevice(String deveui);
	List<Gateway> getGateways();
    Properties mergeProperties(Properties properties);
}
