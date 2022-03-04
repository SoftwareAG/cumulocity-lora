package lora.ns.${connectorPackage};

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import lombok.extern.slf4j.Slf4j;
import lora.codec.downlink.DownlinkData;
import lora.codec.uplink.C8YData;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.DeviceProvisioning.ProvisioningMode;
import lora.ns.device.EndDevice;
import lora.ns.gateway.Gateway;
import lora.ns.gateway.GatewayProvisioning;

@Slf4j
public class ${connectorClass} extends LNSAbstractConnector {

	public ${connectorClass}(Properties properties) {
		super(properties);
	}

	public ${connectorClass}(ManagedObjectRepresentation instance) {
		super(instance);
	}
    @Override
	protected void init() {
        // Configure LNS API access here
    }

    @Override
	public List<EndDevice> getDevices() {
		List<EndDevice> result = new ArrayList<EndDevice>();
		return result;
	}

	@Override
	public Optional<EndDevice> getDevice(String devEui) {
		EndDevice result = null;
		return Optional.ofNullable(result);
    }

	@Override
	public String sendDownlink(DownlinkData operation) {
		return "unique correlation id goes here";
	}

	@Override
	public boolean provisionDevice(DeviceProvisioning deviceProvisioning) {
        return false;
	}

	@Override
	public void configureRoutings(String url, String tenant, String login, String password) {
	}

	@Override
	public void removeRoutings(String tenant) {
	}

	@Override
	public boolean deprovisionDevice(String deveui) {
        return false;
	}

	@Override
	public List<Gateway> getGateways() {
		List<Gateway> result = new ArrayList<>();

        return result;
	}

    @Override
	public boolean provisionGateway(GatewayProvisioning gatewayProvisioning) {
        return false;
	}

    @Override
	public boolean deprovisionGateway(String id) {
        return false;
	}
}
