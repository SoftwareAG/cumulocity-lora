package lora.ns.connector;

import java.util.List;
import java.util.Properties;

import lora.codec.downlink.DownlinkData;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.gateway.Gateway;
import lora.ns.gateway.GatewayProvisioning;

public interface LNSConnector {
	String getId();

	String getType();

	String getName();

	boolean hasGatewayManagementCapability();

	List<EndDevice> getDevices();

	void setProperties(Properties properties);

	Properties getProperties();

	EndDevice getDevice(String devEui);

	String sendDownlink(DownlinkData downlinkData);

	void provisionDevice(DeviceProvisioning deviceProvisioning);

	void configureRoutings(String url, String tenant, String login, String password);

	void removeRoutings();

	void deprovisionDevice(String deveui);

	List<Gateway> getGateways();

	Properties mergeProperties(Properties properties);

	void provisionGateway(GatewayProvisioning gatewayProvisioning);

	void deprovisionGateway(String id);
}
