package lora.common;

import java.io.IOException;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
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
import com.cumulocity.sdk.client.inventory.InventoryApi;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@org.springframework.stereotype.Component
@RequiredArgsConstructor
public class C8YUtils {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	private final IdentityApi identityApi;

	private final InventoryApi inventoryApi;

	private final MicroserviceSubscriptionsService subscriptionsService;

	@Value("${C8Y.baseURL}")
	private String c8yBaseUrl;

	public static final String DEVEUI_TYPE = "LoRa devEUI";
	public static final String CHILD_DEVICE_TYPE = "LoRa child device ID";

	public static final String CODEC_TYPE = "Device Codec";
	public static final String CODEC_ID = "Codec ID";

	public Optional<ExternalIDRepresentation> findExternalId(String externalId, String type) {
		ID id = new ID();
		id.setType(type);
		id.setValue(externalId);
		ExternalIDRepresentation extId = null;
		try {
			extId = identityApi.getExternalId(id);
		} catch (SDKException e) {
			logger.info("External ID {} with type {} not found", externalId, type);
		}
		return Optional.ofNullable(extId);
	}

	public ExternalIDRepresentation createExternalId(ManagedObjectRepresentation mor, String externalId, String type) {
		ExternalIDRepresentation id = new ExternalIDRepresentation();
		id.setExternalId(externalId);
		id.setType(type);
		id.setManagedObject(mor);
		identityApi.create(id);

		return id;
	}

	public ManagedObjectRepresentation getOrCreateDevice(String externalId, ManagedObjectRepresentation device) {
		return findExternalId(externalId.toLowerCase(), DEVEUI_TYPE)
						.map(extId -> inventoryApi.get(extId.getManagedObject().getId())).orElseGet(() -> {
							ManagedObjectRepresentation result = inventoryApi.create(device);
							createExternalId(result, externalId, DEVEUI_TYPE);
							return result;
						});
	}

	public Optional<ManagedObjectRepresentation> getDevice(String externalId) {
		return Optional.ofNullable(findExternalId(externalId.toLowerCase(), DEVEUI_TYPE)
						.map(extId -> inventoryApi.get(extId.getManagedObject().getId())).orElse(null));
	}

	public Optional<ManagedObjectRepresentation> getChildDevice(String externalId) {
		return Optional.ofNullable(findExternalId(externalId.toLowerCase(), CHILD_DEVICE_TYPE)
						.map(extId -> inventoryApi.get(extId.getManagedObject().getId())).orElse(null));
	}

	public ManagedObjectRepresentation createChildDevice(ManagedObjectRepresentation parentDevice,
					String childExternalId, String name) {
		return findExternalId(childExternalId, CHILD_DEVICE_TYPE).map(extId -> extId.getManagedObject())
						.orElseGet(() -> {
							ManagedObjectRepresentation childDevice = new ManagedObjectRepresentation();
							childDevice.setName(name);
							childDevice.setType("LoRa child device");
							childDevice = inventoryApi.create(childDevice);
							createExternalId(childDevice, childExternalId, CHILD_DEVICE_TYPE);
							inventoryApi.getManagedObjectApi(parentDevice.getId()).addChildDevice(childDevice.getId());
							return childDevice;
						});
	}

	public String getTenantDomain() {
		String result = null;
		RestTemplate restTemplate = new RestTemplate();
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", subscriptionsService.getCredentials(subscriptionsService.getTenant()).get()
							.toCumulocityCredentials().getAuthenticationString());
			headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
			result = restTemplate.exchange(c8yBaseUrl + "/tenant/currentTenant", HttpMethod.GET,
							new HttpEntity<String>("", headers), String.class).getBody();
			ObjectMapper mapper = new ObjectMapper();
			result = mapper.readTree(result).get("domainName").asText();
		} catch (IOException | HttpClientErrorException e) {
			logger.error("Couldn't get tenant domain", e);
		}
		return result;
	}
}
