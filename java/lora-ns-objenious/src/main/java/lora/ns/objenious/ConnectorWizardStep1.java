package lora.ns.objenious;

import java.util.List;
import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.connector.PropertyDescription;
import lora.ns.connector.PropertyDescription.PropertyType;

public class ConnectorWizardStep1 implements LNSConnectorWizardStep {

	private final List<PropertyDescription> propertyDescriptions = List.of(
			new PropertyDescription("apikey", "API Key", true, null, null, null, null, null, null, null, PropertyType.TEXT, true));

	@Override
	public String getName() {
		return "Initial step";
	}

	@Override
	public List<PropertyDescription> getPropertyDescriptions() {
		return propertyDescriptions;
	}
}
