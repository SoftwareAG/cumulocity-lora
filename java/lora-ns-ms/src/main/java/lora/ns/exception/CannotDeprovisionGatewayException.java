package lora.ns.exception;

public class CannotDeprovisionGatewayException extends LoraException {

    public CannotDeprovisionGatewayException(String message) {
        super(message);
    }

    public CannotDeprovisionGatewayException(String message, Throwable cause) {
        super(message, cause);
    }

}
