package lora.ns.connector;

import java.util.List;

public interface LNSConnectorWizardStep {
	String getName();
	List<PropertyDescription> getPropertyDescriptions();
}
