package lora.ns;

import java.util.LinkedList;

import lora.ns.PropertyDescription.PropertyType;

public abstract class LNSInstanceWizardInitialStep implements LNSInstanceWizardStep {
	protected LinkedList<PropertyDescription> propertyDescriptions = new LinkedList<>();
	{
		propertyDescriptions.add(new PropertyDescription("id", "Network Server instance ID", true, null, null, null, null, null, null, null, PropertyType.STRING));
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
