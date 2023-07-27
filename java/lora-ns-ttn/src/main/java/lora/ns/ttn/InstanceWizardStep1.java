package lora.ns.ttn;

import java.util.LinkedList;

import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.connector.PropertyDescription;
import lora.ns.connector.PropertyDescription.PropertyType;

public class InstanceWizardStep1 implements LNSConnectorWizardStep {
	protected LinkedList<PropertyDescription> propertyDescriptions = new LinkedList<>();
	{
		propertyDescriptions.add(new PropertyDescription("address", "Address", true, null, null, null, null, null, null,
				null, PropertyType.TEXT, false));
		propertyDescriptions.add(new PropertyDescription("apikey", "API Key", true, null, null, null, null, null, null,
				null, PropertyType.TEXT, true));
	}

	@Override
	public String getName() {
		return "Initial step";
	}

	@Override
	public LinkedList<PropertyDescription> getPropertyDescriptions() {
		return propertyDescriptions;
	}

}
