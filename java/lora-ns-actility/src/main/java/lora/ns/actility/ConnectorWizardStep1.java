package lora.ns.actility;

import java.util.List;
import lora.ns.connector.LNSConnectorWizardStep;
import lora.ns.connector.PropertyDescription;

public class ConnectorWizardStep1 implements LNSConnectorWizardStep {

	protected List<PropertyDescription> propertyDescriptions = List.of(
			PropertyDescription.text("url", "URL", true),
			PropertyDescription.text("username", "Username", true),
			PropertyDescription.password("password", "Password"),
			PropertyDescription.text("domain", "Domain", false),
			PropertyDescription.text("group", "Group", false),
			PropertyDescription.text("webhook-url", "Webhook URL", false));

	@Override
	public String getName() {
		return "Initial step";
	}

	@Override
	public List<PropertyDescription> getPropertyDescriptions() {
		return propertyDescriptions;
	}
}
