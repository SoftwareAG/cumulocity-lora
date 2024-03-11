package lora.ns.generic;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.apache.commons.lang3.NotImplementedException;
import org.springframework.beans.factory.annotation.Autowired;

import com.cumulocity.model.idtype.GId;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.operation.OperationRepresentation;
import com.cumulocity.sdk.client.devicecontrol.DeviceControlApi;

import c8y.Command;
import lora.codec.downlink.DownlinkData;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.gateway.Gateway;
import lora.ns.gateway.GatewayProvisioning;

public class GenericConnector extends LNSAbstractConnector {

	public GenericConnector(Properties properties) {
		super(properties);
	}

	public GenericConnector(ManagedObjectRepresentation instance) {
		super(instance);
	}

	@Autowired
	private DeviceControlApi deviceControlApi;

	@Override
	protected void init() {
		// Configure LNS API access here
	}

	@Override
	public List<EndDevice> getDevices() {
		return new ArrayList<>();
	}

	@Override
	public EndDevice getDevice(String devEui) {
		return null;
	}

	@Override
	public String sendDownlink(DownlinkData operation) {
		return null;
	}

	@Override
	public void provisionDevice(DeviceProvisioning deviceProvisioning) {
		OperationRepresentation op = new OperationRepresentation();
		op.setDeviceId(GId.asGId(this.getId()));
		op.set(new Command("{'provision':{'deveui':'" + deviceProvisioning.getDevEUI() + "', 'appeui': '"
				+ deviceProvisioning.getAppEUI() + "', 'appkey': '" + deviceProvisioning.getAppKey()
				+ "'}}"));
		deviceControlApi.create(op);
	}

	@Override
	public void configureRoutings(String url, String tenant, String login, String password) {
		throw new NotImplementedException();
	}

	@Override
	public void removeRoutings() {
		throw new NotImplementedException();
	}

	@Override
	public void deprovisionDevice(String deveui) {
		OperationRepresentation op = new OperationRepresentation();
		op.setDeviceId(GId.asGId(this.getId()));
		op.set(new Command("{'deprovision':{'deveui':'" + deveui + "'}}"));
		deviceControlApi.create(op);
	}

	@Override
	public List<Gateway> getGateways() {
		return new ArrayList<>();
	}

	@Override
	public void provisionGateway(GatewayProvisioning gatewayProvisioning) {
		throw new NotImplementedException();
	}

	@Override
	public void deprovisionGateway(String id) {
		throw new NotImplementedException();
	}

	public boolean hasGatewayManagementCapability() {
		return false;
	}
}
