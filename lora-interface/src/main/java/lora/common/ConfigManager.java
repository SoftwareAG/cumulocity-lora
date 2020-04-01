package lora.common;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.cumulocity.microservice.subscription.model.core.PlatformProperties;
import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.sdk.client.PlatformParameters;
import com.cumulocity.sdk.client.SDKException;
import com.cumulocity.sdk.client.cep.notification.InventoryRealtimeDeleteAwareNotificationsSubscriber;
import com.cumulocity.sdk.client.cep.notification.ManagedObjectDeleteAwareNotification;
import com.cumulocity.sdk.client.inventory.InventoryApi;
import com.cumulocity.sdk.client.inventory.InventoryFilter;
import com.cumulocity.sdk.client.inventory.ManagedObjectCollection;
import com.cumulocity.sdk.client.inventory.PagedManagedObjectCollectionRepresentation;
import com.cumulocity.sdk.client.notification.Subscription;
import com.cumulocity.sdk.client.notification.SubscriptionListener;

public abstract class ConfigManager<T> {

	final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private PlatformProperties platformProperties;
	
	@Autowired
	private MicroserviceSubscriptionsService subscriptionsService;
	
	@Autowired
	private InventoryApi inventoryApi;
	
	@Autowired
	private PlatformParameters parameters;
	
	private String mainTenantId;
	
	private ManagedObjectRepresentation config;
	
	private Class<T> clazz;
	
	@SuppressWarnings("unchecked")
	public void readConfig(String configName) {
		Type type = getClass().getGenericSuperclass();
		while(!(type instanceof ParameterizedType)) {
			if (type instanceof Class) {
				type = ((Class<?>)type).getGenericSuperclass();
			} else {
				logger.error("Unexpected instance type: {}", type.getTypeName());
				return;
			}
		}
		
		logger.info("{}", ((ParameterizedType)type).getActualTypeArguments()[0]);
        this.clazz = (Class<T>)((ParameterizedType)type).getActualTypeArguments()[0];
		mainTenantId = platformProperties.getMicroserviceBoostrapUser().getTenant();
		logger.info("Microservice {} is deployed in tenant {}",platformProperties.getApplicationName(), mainTenantId);
    	subscriptionsService.runForTenant(mainTenantId, () -> {
    		T result = null;
    		InventoryFilter filter = new InventoryFilter().byFragmentType(clazz);
    		ManagedObjectCollection col = inventoryApi.getManagedObjectsByFilter(filter);
    		PagedManagedObjectCollectionRepresentation pages = col.get();
    		if (pages != null && pages.allPages() != null && col.get().allPages().iterator().hasNext()) {
    			config = col.get().allPages().iterator().next();
    			result = config.get(clazz);
    		} else {
    			config = new ManagedObjectRepresentation();
    			config.setName(configName);
    			try {
					result = clazz.newInstance();
					config.set(result);
					config = inventoryApi.create(config);
				} catch (InstantiationException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				}
    		}
    		config.setLastUpdatedDateTime(null);
    		InventoryRealtimeDeleteAwareNotificationsSubscriber subscriber = new InventoryRealtimeDeleteAwareNotificationsSubscriber(parameters);
    		subscriber.subscribe(config.getId().getValue(), new ConfigChangeListener());
    		logger.info("Retrieved global config: {}", config);
    	});
	}
	
	public void writeConfig() {
		mainTenantId = platformProperties.getMicroserviceBoostrapUser().getTenant();
    	subscriptionsService.runForTenant(mainTenantId, () -> {
    		inventoryApi.update(config);
    	});
	}

    private class ConfigChangeListener implements SubscriptionListener<String, ManagedObjectDeleteAwareNotification> {

        @Override
        public void onError(Subscription<String> sub, Throwable e) {
            logger.error("OperationDispatcher error!", e);
        }

        @Override
        public void onNotification(Subscription<String> sub, ManagedObjectDeleteAwareNotification mor) {
            try {
                updateConfig(mor);
            } catch (SDKException e) {
                logger.error("OperationDispatcher error!", e);
            }
        }
    }
    
    @SuppressWarnings("unchecked")
	protected void updateConfig(ManagedObjectDeleteAwareNotification mor) {
    	if (mor.isUpdateNotification()) {
    		config.setAttrs((Map<String, Object>)mor.getData());
    		logger.info("Config updated: {}", config.toString());
    	}
    }

    public T getConfig() {
    	return config.get(clazz);
    }
	
	public void updateConfig() {
    	subscriptionsService.runForTenant(mainTenantId, () -> {
    		inventoryApi.update(config);
    	});
	}
}
