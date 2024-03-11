package lora.ns.exception;

public class CannotDeprovisionDeviceException extends LoraException {

    public CannotDeprovisionDeviceException(String deviceEUI) {
        super("Cannot deprovision device identified by EUI " + deviceEUI);
    }

    public CannotDeprovisionDeviceException(String deviceEUI, Throwable cause) {
        super("Cannot deprovision device identified by EUI " + deviceEUI, cause);
    }
}
