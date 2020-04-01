package lora.ns;

import java.util.Properties;

public class LNSInstanceRepresentation {
	public LNSInstanceRepresentation() {}
	
	public LNSInstanceRepresentation(LNSInstance instance, String type) {
		this.properties = instance.getProperties();
		this.type = type;
	}
	
	private Properties properties;
	private String type;
	
	public void setProperties(Properties properties) {
		this.properties = properties;
	}

	public Properties getProperties() {
		return properties;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}
