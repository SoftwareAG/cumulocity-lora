package lora.ns.exception;

public class CannotProvisionDeviceException extends LoraException {

    public CannotProvisionDeviceException(String deviceEUI) {
        super("Cannot provision device identified by EUI " + deviceEUI);
    }

    public CannotProvisionDeviceException(String deviceEUI, Throwable cause) {
        super("Cannot provision device identified by EUI " + deviceEUI, cause);
    }
}
