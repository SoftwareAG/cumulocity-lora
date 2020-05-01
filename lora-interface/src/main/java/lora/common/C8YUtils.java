package lora.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.cumulocity.model.ID;
import com.cumulocity.rest.representation.identity.ExternalIDRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.sdk.client.SDKException;
import com.cumulocity.sdk.client.identity.IdentityApi;

@org.springframework.stereotype.Component
public class C8YUtils {

	final protected Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private IdentityApi identityApi;
	
    public ExternalIDRepresentation findExternalId(String externalId, String type) {
        ID id = new ID();
        id.setType(type);
        id.setValue(externalId);
        ExternalIDRepresentation extId = null;
        try {
            extId = identityApi.getExternalId(id);
        } catch (SDKException e) {
            logger.info("External ID {} not found", externalId);
        }
        return extId;
    }
    
    public ExternalIDRepresentation createExternalId(ManagedObjectRepresentation mor, String externalId, String type) {
    	ExternalIDRepresentation id = new ExternalIDRepresentation();
		id.setExternalId(externalId);
		id.setType(type);
		id.setManagedObject(mor);
		identityApi.create(id);
		
		return id;
    }
}
