package lora.ns.connector;

import java.util.List;
import java.util.Optional;
import java.util.Properties;

import lora.codec.DownlinkData;
import lora.ns.DeviceProvisioning;
import lora.ns.EndDevice;
import lora.ns.Gateway;

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
	void removeRoutings();
	boolean deprovisionDevice(String deveui);
	List<Gateway> getGateways();
}
