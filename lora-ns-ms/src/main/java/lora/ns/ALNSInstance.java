package lora.ns;

import java.util.Properties;

public abstract class ALNSInstance implements LNSInstance {

	protected Properties properties;
	
	protected ALNSInstance(String id) {
		properties.setProperty("id", id);
	}

	protected ALNSInstance(LNSInstanceRepresentation instance) {
		setProperties(instance.getProperties());
	}

	@Override
	public String getId() {
		return properties.getProperty("id");
	}
	
	abstract protected void init();

	@Override
	public void setProperties(Properties properties) {
		this.properties = properties;
		init();
	}

	@Override
	public Properties getProperties() {
		return properties;
	}
}
