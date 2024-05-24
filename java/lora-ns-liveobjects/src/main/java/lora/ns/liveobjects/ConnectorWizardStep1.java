package lora.ns.liveobjects;

import java.util.LinkedList;
import java.util.List;
import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.connector.PropertyDescription;

class ConnectorWizardStep1 implements LNSConnectorWizardStep {

    protected LinkedList<PropertyDescription> propertyDescriptions = new LinkedList<>(
            List.of(PropertyDescription.text("apikey", "API Key", true).withEncrypted(true)));

    public String getName() {
        return "step1";
    }

    public LinkedList<PropertyDescription> getPropertyDescriptions() {
        return propertyDescriptions;
    }
}
