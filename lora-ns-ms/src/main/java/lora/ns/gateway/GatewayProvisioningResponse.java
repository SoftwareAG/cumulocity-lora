package lora.ns.gateway;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

public class GatewayProvisioningResponse {
    private ManagedObjectRepresentation gateway;
	private String errorMessage;
	public ManagedObjectRepresentation getGateway() {
		return gateway;
	}
	public void setGateway(ManagedObjectRepresentation gateway) {
		this.gateway = gateway;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

}
