package lora.ns;

import java.util.List;
import java.util.Properties;

import com.cumulocity.rest.representation.operation.OperationRepresentation;

import lora.codec.DownlinkData;

public interface LNSInstance {
	String getId();
	String getType();
	String getName();
	List<EndDevice> getDevices();
	void setProperties(Properties properties);
	Properties getProperties();
	EndDevice getDevice(String devEui);
	String processOperation(DownlinkData operation, OperationRepresentation c8yOperation);
	boolean provisionDevice(DeviceProvisioning deviceProvisioning);
	void configureRoutings(String url, String tenant, String login, String password);
	void removeRoutings();
	boolean deprovisionDevice(String deveui);
}
