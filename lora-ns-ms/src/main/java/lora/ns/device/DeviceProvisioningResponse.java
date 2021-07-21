package lora.ns.device;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

public class DeviceProvisioningResponse {
	private ManagedObjectRepresentation device;
	private String errorMessage;
	public ManagedObjectRepresentation getDevice() {
		return device;
	}
	public void setDevice(ManagedObjectRepresentation device) {
		this.device = device;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
}
