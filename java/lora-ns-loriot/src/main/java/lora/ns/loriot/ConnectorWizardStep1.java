package lora.ns.loriot;

import java.util.List;
import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.connector.PropertyDescription;
import lora.ns.connector.PropertyDescription.PropertyType;

public class ConnectorWizardStep1 implements LNSConnectorWizardStep {

	private final List<PropertyDescription> propertyDescriptions = List.of(
			new PropertyDescription("url", "URL", true, null, null, null, null, null, null, null, PropertyType.TEXT, true),
			new PropertyDescription("user", "Username", true, null, null, null, null, null, null, null, PropertyType.TEXT, true),
			new PropertyDescription("pwd", "Password", true, null, null, null, null, null, null, null, PropertyType.PASSWORD, true));

	@Override
	public String getName() {
		return "Initial step";
	}

	@Override
	public List<PropertyDescription> getPropertyDescriptions() {
		return propertyDescriptions;
	}
}
