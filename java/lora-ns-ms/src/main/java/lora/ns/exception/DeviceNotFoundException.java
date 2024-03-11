package lora.ns.exception;

public class DeviceNotFoundException extends LoraException {

    public DeviceNotFoundException(String deviceEUI) {
        super("Device identified by EUI " + deviceEUI + " does not exist.");
    }

}
