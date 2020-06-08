package lora.ns.connector;

import java.util.Properties;

public class LNSConnectorRepresentation {
	private String name;
	private Properties properties;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Properties getProperties() {
		return properties;
	}
	public void setProperties(Properties properties) {
		this.properties = properties;
	}
}
