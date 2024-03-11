package lora.ns.exception;

public class CannotSendDownlinkException extends LoraException {

    public CannotSendDownlinkException(String message) {
        super(message);
    }

    public CannotSendDownlinkException(String message, Throwable cause) {
        super(message, cause);
    }
}
