package lora.ns.connector;

import java.util.Properties;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lora.ns.integration.LNSIntegrationService;

public abstract class LNSAbstractConnector implements LNSConnector {

	protected final Logger logger = LoggerFactory.getLogger(LNSAbstractConnector.class);

	protected Properties properties = new Properties();
	protected String id;
	protected String name;
	protected String type;

	protected LNSAbstractConnector(Properties properties) {
		this.setProperties(properties);
	}
	
	protected LNSAbstractConnector(ManagedObjectRepresentation instance) {
		this.id = instance.getId().getValue();
		this.name = instance.getName();
		this.type = instance.getProperty(LNSIntegrationService.LNS_TYPE).toString();
	}

	@Override
	public String getId() {
		return this.id;
	}

	protected abstract void init();

	@Override
	public void setProperties(Properties properties) {
		this.properties = properties;
		try {
			init();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("Couldn't start connector.", e);
		}
	}

	@Override
	public Properties getProperties() {
		return properties;
	}

	@Override
	public Properties mergeProperties(Properties properties) {
		Properties result = new Properties(this.properties);
		properties.forEach((k, v) -> result.setProperty(k.toString(), v.toString()));
		return result;
	}

	@Override
	public String getType() {
		return type;
	}

	@Override
	public String getName() {
		return name;
	}
}
