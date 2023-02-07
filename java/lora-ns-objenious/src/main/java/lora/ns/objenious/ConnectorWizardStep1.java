package lora.ns.objenious;

import java.util.LinkedList;

import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.connector.PropertyDescription;
import lora.ns.connector.PropertyDescription.PropertyType;

public class ConnectorWizardStep1 implements LNSConnectorWizardStep {
	protected LinkedList<PropertyDescription> propertyDescriptions = new LinkedList<>();
	{
		propertyDescriptions.add(new PropertyDescription("apikey", "API Key", true, null, null, null, null, null, null, null, PropertyType.TEXT, true));
		//propertyDescriptions.add(new PropertyDescription("proxy-host", "Proxy Host", false, null, null, null, null, null, null, null, PropertyType.TEXT, false));
		//propertyDescriptions.add(new PropertyDescription("proxy-port", "Proxy Port", false, null, null, null, null, null, null, null, PropertyType.NUMBER, false));
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
