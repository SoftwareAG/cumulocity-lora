package lora.ns.liveobjects;

import java.util.List;
import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.connector.PropertyDescription;

class ConnectorWizardStep2 implements LNSConnectorWizardStep {

    private final List<PropertyDescription> propertyDescriptions = List.of(
            PropertyDescription.list("groupId", "Group", "/groups", true));

    public String getName() {
        return "step2";
    }

    public List<PropertyDescription> getPropertyDescriptions() {
        return propertyDescriptions;
    }
}
