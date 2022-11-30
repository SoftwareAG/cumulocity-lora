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
	LNSResponse<List<EndDevice>> getDevices();
	void setProperties(Properties properties);
	Properties getProperties();
	LNSResponse<EndDevice> getDevice(String devEui);
	LNSResponse<String> sendDownlink(DownlinkData downlinkData);
	LNSResponse<Void> provisionDevice(DeviceProvisioning deviceProvisioning);
	LNSResponse<List<String>> configureRoutings(String url, String tenant, String login, String password);
	LNSResponse<Void> removeRoutings(String tenant, List<String> routeIds);
	LNSResponse<Void> deprovisionDevice(String deveui);
	LNSResponse<List<Gateway>> getGateways();
    Properties mergeProperties(Properties properties);
	LNSResponse<Void> provisionGateway(GatewayProvisioning gatewayProvisioning);
	LNSResponse<Void> deprovisionGateway(String id);
}
