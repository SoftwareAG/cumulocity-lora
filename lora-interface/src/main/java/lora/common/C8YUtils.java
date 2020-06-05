package lora.common;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
import com.cumulocity.model.ID;
import com.cumulocity.rest.representation.identity.ExternalIDRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.sdk.client.SDKException;
import com.cumulocity.sdk.client.identity.IdentityApi;
import com.fasterxml.jackson.databind.ObjectMapper;

@org.springframework.stereotype.Component
public class C8YUtils {

	final protected Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private IdentityApi identityApi;

	@Autowired
	protected MicroserviceSubscriptionsService subscriptionsService;
	
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

	public String getTenantDomain() {
		String result = null;
		RestTemplate restTemplate = new RestTemplate();
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", subscriptionsService.getCredentials(subscriptionsService.getTenant()).get()
					.toCumulocityCredentials().getAuthenticationString());
			headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
			result = restTemplate.exchange(System.getenv("C8Y_BASEURL") + "/tenant/currentTenant", HttpMethod.GET,
					new HttpEntity<String>("", headers), String.class).getBody();
			ObjectMapper mapper = new ObjectMapper();
			result = mapper.readTree(result).get("domainName").asText();
		} catch (HttpClientErrorException e) {
			e.printStackTrace();
			logger.error(e.getResponseBodyAsString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}
}
