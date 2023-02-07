package lora.ns.operation;

import com.cumulocity.model.operation.OperationStatus;

import lombok.Data;

@Data
public class OperationData {
	private String commandId;
	private String errorMessage;
	private OperationStatus status;
}
