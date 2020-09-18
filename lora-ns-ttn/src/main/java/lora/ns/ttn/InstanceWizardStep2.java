package lora.ns.ttn;

import java.util.LinkedList;

import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.connector.PropertyDescription;
import lora.ns.connector.PropertyDescription.PropertyType;

public class InstanceWizardStep2 implements LNSConnectorWizardStep {
	protected LinkedList<PropertyDescription> propertyDescriptions = new LinkedList<>();
	{
		propertyDescriptions.add(new PropertyDescription("app", "Application", true, null, "/applications", null, null, null, null, null, PropertyType.LIST, false));
	}

	@Override
	public String getName() {
		return "Select application";
	}

	@Override
	public LinkedList<PropertyDescription> getPropertyDescriptions() {
		return propertyDescriptions;
	}

}
