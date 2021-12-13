package lora.ns.gateway;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import lombok.Data;

@Data
public class GatewayProvisioningResponse {
    private ManagedObjectRepresentation gateway;
	private String errorMessage;
}
