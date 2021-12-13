package lora.ns.device;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import lombok.Data;

@Data
public class DeviceProvisioningResponse {
	private ManagedObjectRepresentation device;
	private String errorMessage;
}
