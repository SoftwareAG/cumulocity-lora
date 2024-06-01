package lora.ns.objenious;

import java.util.List;
import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.connector.PropertyDescription;
import lora.ns.connector.PropertyDescription.PropertyType;

public class ConnectorWizardStep2 implements LNSConnectorWizardStep {

	private final List<PropertyDescription> propertyDescriptions = List.of(
			new PropertyDescription("groupId", "Group", true, null, "/groups", null, null, null, null, null, PropertyType.LIST, false));

	@Override
	public String getName() {
		return "Select a group";
	}

	@Override
	public List<PropertyDescription> getPropertyDescriptions() {
		return propertyDescriptions;
	}
}
