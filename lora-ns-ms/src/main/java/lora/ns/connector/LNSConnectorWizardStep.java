package lora.ns.connector;

import java.util.LinkedList;

public interface LNSConnectorWizardStep {
	String getName();
	LinkedList<PropertyDescription> getPropertyDescriptions();
}
