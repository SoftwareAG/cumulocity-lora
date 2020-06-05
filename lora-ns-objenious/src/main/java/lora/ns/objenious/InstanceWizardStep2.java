package lora.ns.objenious;

import java.util.LinkedList;

import lora.ns.connector.LNSInstanceWizardStep;
import lora.ns.connector.PropertyDescription;
import lora.ns.connector.PropertyDescription.PropertyType;

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
