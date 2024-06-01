package lora.ns.loriot;

import java.util.List;
import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.connector.PropertyDescription;
import lora.ns.connector.PropertyDescription.PropertyType;

public class ConnectorWizardStep2 implements LNSConnectorWizardStep {

	private final List<PropertyDescription> propertyDescriptions = List.of(
			new PropertyDescription("appid", "Application", true, null, "/apps", null, null, null, null, null, PropertyType.LIST, false));

	@Override
	public String getName() {
		return "Select an app";
	}

	@Override
	public List<PropertyDescription> getPropertyDescriptions() {
		return propertyDescriptions;
	}
}
