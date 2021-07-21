package lora.ns.operation;

import com.cumulocity.model.operation.OperationStatus;

public class OperationData {
	private String commandId;
	private String errorMessage;
	private OperationStatus status;
	public OperationStatus getStatus() {
		return status;
	}
	public void setStatus(OperationStatus status) {
		this.status = status;
	}
	public String getCommandId() {
		return commandId;
	}
	public void setCommandId(String commandId) {
		this.commandId = commandId;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
}
