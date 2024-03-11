package lora.ns.exception;

public class ConnectorDoesNotExistException extends LoraException {

    public ConnectorDoesNotExistException(String loraConnectorId) {
        super("LoRa connector with ID " + loraConnectorId + " does not exist");
    }

}
