package lora.ns.connector;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;

import com.cumulocity.model.idtype.GId;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.tenant.OptionRepresentation;
import com.cumulocity.sdk.client.inventory.BinariesApi;
import com.cumulocity.sdk.client.inventory.InventoryApi;
import com.cumulocity.sdk.client.option.TenantOptionApi;

import lombok.extern.slf4j.Slf4j;
import lora.ns.integration.LNSIntegrationService;

@Slf4j
public abstract class LNSAbstractConnector implements LNSConnector, InitializingBean {

	protected Properties properties = new Properties();
	protected String id;
	protected String name;
	protected String type;

	@Autowired
	protected InventoryApi inventoryApi;

	@Autowired
	private TenantOptionApi tenantOptionApi;

	@Autowired
	private BinariesApi binariesApi;

	protected LNSAbstractConnector(Properties properties) {
		this.setProperties(properties);
	}

	protected LNSAbstractConnector(ManagedObjectRepresentation instance) {
		this.id = instance.getId().getValue();
		this.name = instance.getName();
		this.type = instance.getProperty(LNSIntegrationService.LNS_TYPE).toString();
	}

	protected Optional<Object> getProperty(String key) {
		Object result = null;
		if (properties.containsKey(key)) {
			result = properties.get(key);
		} else {
			ManagedObjectRepresentation mor = inventoryApi.get(GId.asGId(this.getId()));
			if (mor.hasProperty(key)) {
				result = mor.getProperty(key);
				properties.put(key, result);
			}
		}
		return Optional.ofNullable(result);
	}

	protected void removeProperty(String key) {
		if (properties.containsKey(key)) {
			properties.remove(key);
			ManagedObjectRepresentation mor = new ManagedObjectRepresentation();
			mor.setId(GId.asGId(this.getId()));
			mor.setProperty(key, null);
			this.inventoryApi.update(mor);
		}
	}

	protected void setProperty(String key, Object value) {
		ManagedObjectRepresentation mor = new ManagedObjectRepresentation();
		mor.setId(GId.asGId(this.getId()));
		mor.setProperty(key, value);
		this.inventoryApi.update(mor);
		this.properties.put(key, value);
	}

	@Override
	public void afterPropertiesSet() {
		log.info("Connector initialized, loading properties from tenant...");
		for (OptionRepresentation option : tenantOptionApi.getAllOptionsForCategory(this.getId())) {
			this.properties.setProperty(option.getKey(), option.getValue());
		}
		init();
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
			log.error("Couldn't start connector.", e);
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

	public void trustCertificates() throws KeyManagementException, CertificateException, KeyStoreException,
			NoSuchAlgorithmException, IOException {
		var certificates = inventoryApi.get(GId.asGId(this.getId())).get("certificates");
		if (certificates != null && certificates instanceof List<?> certificateList) {
			for (var certificate : certificateList) {
				trustCertificate(GId.asGId(certificate));
			}
		}
	}

	public void trustCertificate(GId fileId) throws CertificateException, KeyStoreException, NoSuchAlgorithmException,
			IOException, KeyManagementException {
		binariesApi.downloadFile(fileId);
		X509Certificate ca = (X509Certificate) CertificateFactory.getInstance("X.509")
				.generateCertificate(new BufferedInputStream(binariesApi.downloadFile(fileId)));
		KeyStore ks = KeyStore.getInstance(KeyStore.getDefaultType());
		ks.load(null, null);
		ks.setCertificateEntry(Integer.toString(1), ca);

		TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
		tmf.init(ks);

		SSLContext context = SSLContext.getInstance("TLS");
		context.init(null, tmf.getTrustManagers(), null);
	}
}
