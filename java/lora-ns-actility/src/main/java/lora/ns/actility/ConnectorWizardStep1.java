package lora.ns.actility;

import java.util.LinkedList;

import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.connector.PropertyDescription;
import lora.ns.connector.PropertyDescription.PropertyType;

public class ConnectorWizardStep1 implements LNSConnectorWizardStep {
	protected LinkedList<PropertyDescription> propertyDescriptions = new LinkedList<>();
	{
		propertyDescriptions.add(new PropertyDescription("url", "URL", true, null, null, null, null, null, null, null, PropertyType.TEXT, false));
		propertyDescriptions.add(new PropertyDescription("username", "Username", true, null, null, null, null, null, null, null, PropertyType.TEXT, false));
		propertyDescriptions.add(new PropertyDescription("password", "Password", true, null, null, null, null, null, null, null, PropertyType.PASSWORD, true));
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
