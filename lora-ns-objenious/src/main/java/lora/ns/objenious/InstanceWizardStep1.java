package lora.ns.objenious;

import java.util.LinkedList;

import lora.ns.LNSInstanceWizardInitialStep;
import lora.ns.PropertyDescription;
import lora.ns.PropertyDescription.PropertyType;

public class InstanceWizardStep1 extends LNSInstanceWizardInitialStep {
	{
		propertyDescriptions.add(new PropertyDescription("apikey", "API Key", true, null, null, null, null, null, null, null, PropertyType.STRING));
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
