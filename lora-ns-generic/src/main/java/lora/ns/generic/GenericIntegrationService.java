package lora.ns.generic;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.BaseEncoding;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import lora.ns.DeviceData;
import lora.ns.connector.LNSConnectorRepresentation;
import lora.ns.integration.LNSIntegrationService;
import lora.ns.operation.OperationData;

@Service
@Slf4j
public class GenericIntegrationService extends LNSIntegrationService<GenericConnector> {
    @Override
	public DeviceData processUplinkEvent(String event) {
		DeviceData data = null;
		ObjectMapper mapper = new ObjectMapper();
		try {
			UplinkEvent uplinkEvent = mapper.readValue(event, UplinkEvent.class);
			data = new DeviceData(uplinkEvent.getDeveui(), uplinkEvent.getDeveui(), null, null, uplinkEvent.getFport(), BaseEncoding.base16().decode(uplinkEvent.getPayload().toUpperCase()), uplinkEvent.getTime(), new ArrayList<>(), null, null);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
        return data;
    }

    @Override
	public OperationData processDownlinkEvent(String event) {
        OperationData data = null;
        // parse the event string here;
        return data;
    }
	@Override
	public boolean isOperationUpdate(String eventString) {
        return false;
    }

	@Override
	public String getType() {
		return "generic";
	}

	@Override
	public String getName() {
		return "generic";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}

	@Override
	public ManagedObjectRepresentation addLnsConnector(LNSConnectorRepresentation connectorRepresentation) {
		ManagedObjectRepresentation mor = super.addLnsConnector(connectorRepresentation);

		c8yUtils.createExternalId(mor, connectorRepresentation.getProperties().getProperty("c8y_Serial"), "c8y_Serial");
		ManagedObjectRepresentation update = new ManagedObjectRepresentation();
		update.setId(mor.getId());
		log.info("Setting owner of connector {} to {}", mor.getId(), connectorRepresentation.getProperties().getProperty("owner"));
		update.setOwner(connectorRepresentation.getProperties().getProperty("owner"));
		update = inventoryApi.update(update);
		return update;
	}
}
