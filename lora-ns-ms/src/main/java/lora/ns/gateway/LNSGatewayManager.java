package lora.ns.gateway;

import java.util.Optional;

import com.cumulocity.rest.representation.event.EventRepresentation;
import com.cumulocity.rest.representation.identity.ExternalIDRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.sdk.client.event.EventApi;
import com.cumulocity.sdk.client.identity.IdentityApi;
import com.cumulocity.sdk.client.inventory.InventoryApi;
import com.cumulocity.sdk.client.inventory.ManagedObject;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import c8y.Hardware;
import c8y.IsDevice;
import c8y.Position;
import lora.common.C8YUtils;
import lora.ns.Gateway;
import lora.ns.connector.LNSConnector;
import lora.ns.connector.LNSConnectorManager;

@Component
public class LNSGatewayManager {

    final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    protected C8YUtils c8yUtils;

    @Autowired
    protected IdentityApi identityApi;

    @Autowired
    private LNSConnectorManager lnsConnectorManager;

    @Autowired
    private InventoryApi inventoryApi;

    @Autowired
    private EventApi eventApi;

    public static final String GATEWAY_ID_TYPE = "LoRa Gateway Id";

    public void upsertGateways(ManagedObjectRepresentation connectorMor) {
        Optional<LNSConnector> connector = lnsConnectorManager.getConnector(connectorMor.getId().getValue());
        if (connector.isPresent()) {
            for (Gateway gateway : connector.get().getGateways()) {
                ManagedObjectRepresentation mor = getGateway(gateway.getId());
                if (mor == null) {
                    mor = createGateway(gateway, connectorMor);
                }
                mor.setLastUpdatedDateTime(null);
                if (gateway.getLat() != null && gateway.getLng() != null) {
                    Position p = new Position();
                    p.setLat(gateway.getLat());
                    p.setLng(gateway.getLng());
                    mor.set(p);
                    inventoryApi.update(mor);
                    EventRepresentation locationUpdate = new EventRepresentation();
                    locationUpdate.setSource(mor);
                    locationUpdate.setType("c8y_LocationUpdate");
                    locationUpdate.set(p);
                    locationUpdate.setText("Location updated");
                    locationUpdate.setDateTime(new DateTime());
                    eventApi.create(locationUpdate);
                }
                ManagedObject connectorMorApi = inventoryApi.getManagedObjectApi(connectorMor.getId());
                try {
                    connectorMorApi.getChildDevice(mor.getId());
                } catch (Exception e) {
                    connectorMorApi.addChildDevice(mor.getId());
                }
            }
        }
    }

    private ManagedObjectRepresentation createGateway(Gateway gateway, ManagedObjectRepresentation connectorMor) {
        ManagedObjectRepresentation mor = new ManagedObjectRepresentation();
        mor.setName(gateway.getName());
        mor.setType("c8y_LoRaGateway");
        Hardware hardware = new Hardware(gateway.getType(), null, null);
        mor.set(hardware);
        mor.set(new IsDevice());
        mor = inventoryApi.create(mor);
        c8yUtils.createExternalId(mor, gateway.getId(), GATEWAY_ID_TYPE);
        return mor;
    }

    private ManagedObjectRepresentation getGateway(String id) {
        ManagedObjectRepresentation result = null;
        Optional<ExternalIDRepresentation> extId = c8yUtils.findExternalId(id, GATEWAY_ID_TYPE);
        if (extId.isPresent()) {
            result = inventoryApi.get(extId.get().getManagedObject().getId());
            result.setLastUpdatedDateTime(null);
        }
        return result;
    }
}