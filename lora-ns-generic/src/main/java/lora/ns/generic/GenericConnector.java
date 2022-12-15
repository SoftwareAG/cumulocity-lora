package lora.ns.generic;

import java.util.List;
import java.util.Properties;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import lombok.extern.slf4j.Slf4j;
import lora.codec.downlink.DownlinkData;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.connector.LNSResponse;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.gateway.Gateway;
import lora.ns.gateway.GatewayProvisioning;

@Slf4j
public class GenericConnector extends LNSAbstractConnector {

	public GenericConnector(Properties properties) {
		super(properties);
	}

	public GenericConnector(ManagedObjectRepresentation instance) {
		super(instance);
	}

	@Override
	protected void init() {
		// Configure LNS API access here
	}

	@Override
	public LNSResponse<List<EndDevice>> getDevices() {
		return new LNSResponse<List<EndDevice>>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<EndDevice> getDevice(String devEui) {
		return new LNSResponse<EndDevice>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<String> sendDownlink(DownlinkData operation) {
		return new LNSResponse<String>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<Void> provisionDevice(DeviceProvisioning deviceProvisioning) {
		return new LNSResponse<Void>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<Void> configureRoutings(String url, String tenant, String login, String password) {
		return new LNSResponse<Void>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<Void> removeRoutings() {
		return new LNSResponse<Void>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<Void> deprovisionDevice(String deveui) {
		return new LNSResponse<Void>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<List<Gateway>> getGateways() {
		return new LNSResponse<List<Gateway>>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<Void> provisionGateway(GatewayProvisioning gatewayProvisioning) {
		return new LNSResponse<Void>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<Void> deprovisionGateway(String id) {
		return new LNSResponse<Void>().withOk(false).withMessage("Not implemented.");
	}

	public boolean hasGatewayManagementCapability() {
		return false;
	}
}
