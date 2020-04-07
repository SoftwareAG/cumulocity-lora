package lora.ns.objenious;

import java.util.LinkedList;

import lora.ns.LNSInstanceWizardStep;
import lora.ns.PropertyDescription;
import lora.ns.PropertyDescription.PropertyType;

public class InstanceWizardStep2 implements LNSInstanceWizardStep {
	protected LinkedList<PropertyDescription> propertyDescriptions = new LinkedList<>();
	{
		propertyDescriptions.add(new PropertyDescription("groupId", "Group", true, null, "/groups", null, null, null, null, null, PropertyType.LIST));
	}

	@Override
	public String getName() {
		return "Select a group";
	}

	@Override
	public LinkedList<PropertyDescription> getPropertyDescriptions() {
		return propertyDescriptions;
	}

}
