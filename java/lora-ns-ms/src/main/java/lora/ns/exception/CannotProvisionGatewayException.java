package lora.ns.exception;

public class CannotProvisionGatewayException extends LoraException {

    public CannotProvisionGatewayException(String message) {
        super(message);
    }

    public CannotProvisionGatewayException(String message, Throwable cause) {
        super(message, cause);
    }
}
