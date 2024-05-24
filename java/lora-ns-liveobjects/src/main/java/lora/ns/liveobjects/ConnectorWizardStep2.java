package lora.ns.liveobjects;

import java.util.LinkedList;
import java.util.List;
import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.connector.PropertyDescription;

class ConnectorWizardStep2 implements LNSConnectorWizardStep {

    protected LinkedList<PropertyDescription> propertyDescriptions = new LinkedList<>(
            List.of(PropertyDescription.list("groupId", "Group", "/groups", true)));

    public String getName() {
        return "step2";
    }

    public LinkedList<PropertyDescription> getPropertyDescriptions() {
        return propertyDescriptions;
    }
}
