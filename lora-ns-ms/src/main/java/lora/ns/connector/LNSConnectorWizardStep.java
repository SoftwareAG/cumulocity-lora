package lora.ns.connector;

import java.util.LinkedList;

public interface LNSInstanceWizardStep {
	String getName();
	LinkedList<PropertyDescription> getPropertyDescriptions();
}
