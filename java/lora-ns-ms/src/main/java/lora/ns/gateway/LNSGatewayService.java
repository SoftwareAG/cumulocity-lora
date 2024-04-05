package lora.ns.gateway;

import java.util.List;
import java.util.Optional;

import org.joda.time.DateTime;
import org.springframework.stereotype.Service;

import com.cumulocity.model.event.CumulocityAlarmStatuses;
import com.cumulocity.rest.representation.alarm.AlarmRepresentation;
import com.cumulocity.rest.representation.event.EventRepresentation;
import com.cumulocity.rest.representation.identity.ExternalIDRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.cumulocity.sdk.client.alarm.AlarmApi;
import com.cumulocity.sdk.client.alarm.AlarmFilter;
import com.cumulocity.sdk.client.event.EventApi;
import com.cumulocity.sdk.client.inventory.InventoryApi;
import com.cumulocity.sdk.client.measurement.MeasurementApi;

import c8y.Hardware;
import c8y.IsDevice;
import c8y.Position;
import c8y.RequiredAvailability;
import lombok.RequiredArgsConstructor;
import lora.codec.uplink.C8YData;
import lora.common.C8YUtils;
import lora.ns.connector.LNSConnector;
import lora.ns.connector.LNSConnectorService;
import lora.ns.exception.CannotDeprovisionGatewayException;
import lora.ns.exception.CannotProvisionGatewayException;
import lora.ns.integration.LNSIntegrationService;
import lora.rest.LoraContextService;

@Service
@RequiredArgsConstructor
public class LNSGatewayService {

    private final C8YUtils c8yUtils;
    private final InventoryApi inventoryApi;
    private final EventApi eventApi;
    private final AlarmApi alarmApi;
    private final MeasurementApi measurementApi;
    private final LNSConnectorService lnsConnectorManager;
    private final LoraContextService loraContextService;
    public static final String GATEWAY_ID_TYPE = "LoRa Gateway Id";

    public void upsertGateways(LNSConnector connector) {
        List<Gateway> gateways = connector.getGateways();
        for (Gateway gateway : gateways) {
            var gw = getGateway(gateway.getGwEUI());
            var mor = new ManagedObjectRepresentation();
            if (gw == null) {
                mor.setId(createGateway(connector.getId(), gateway).getId());
            } else {
                mor.setId(gw.getId());
            }
            mor.setProperty("gatewayAvailability", gateway.getStatus());
            if (gateway.getLat() != null && gateway.getLng() != null) {
                loraContextService.log("Updating position of gateway {}: {}, {}", gateway.getName(), gateway.getLat(),
                                gateway.getLng());
                Position p = new Position();
                p.setLat(gateway.getLat());
                p.setLng(gateway.getLng());
                mor.set(p);
                EventRepresentation locationUpdate = new EventRepresentation();
                locationUpdate.setSource(mor);
                locationUpdate.setType("c8y_LocationUpdate");
                locationUpdate.set(p);
                locationUpdate.setText("Location updated");
                locationUpdate.setDateTime(new DateTime());
                eventApi.create(locationUpdate);
            }
            inventoryApi.update(mor);
            loraContextService.log("Processing data for gateway {}", gateway.getName());
            processData(mor, gateway.getData());
        }
    }

    private ManagedObjectRepresentation createGateway(String lnsConnectorId, Gateway gateway) {
        loraContextService.log("Creating gateway {}", gateway.getName());
        ManagedObjectRepresentation mor = new ManagedObjectRepresentation();
        mor.setName(gateway.getName());
        mor.set(new LoRaGateway());
        mor.set(new RequiredAvailability(600));
        mor.setProperty(LNSIntegrationService.LNS_CONNECTOR_REF, lnsConnectorId);
        Hardware hardware = new Hardware(gateway.getType(), null, null);
        mor.set(hardware);
        mor.set(new IsDevice());
        mor = inventoryApi.create(mor);
        c8yUtils.createExternalId(mor, gateway.getGwEUI(), GATEWAY_ID_TYPE);
        return mor;
    }

    public ManagedObjectRepresentation createGateway(String lnsConnectorId, GatewayProvisioning gatewayProvisioning) {
        return createGateway(lnsConnectorId,
                        new Gateway(gatewayProvisioning.getGwEUI(), gatewayProvisioning.getSerial(),
                                        gatewayProvisioning.getName(), gatewayProvisioning.getLat(),
                                        gatewayProvisioning.getLng(), gatewayProvisioning.getType(),
                                        gatewayProvisioning.getStatus(), null));
    }

    public ManagedObjectRepresentation getGateway(String id) {
        ManagedObjectRepresentation result = null;
        Optional<ExternalIDRepresentation> extId = c8yUtils.findExternalId(id, GATEWAY_ID_TYPE);
        if (extId.isPresent()) {
            result = inventoryApi.get(extId.get().getManagedObject().getId());
            result.setLastUpdatedDateTime(null);
        }
        return result;
    }

    private void processData(ManagedObjectRepresentation gateway, C8YData c8yData) {
        for (MeasurementRepresentation m : c8yData.getMeasurements()) {
            m.setSource(gateway);
            measurementApi.create(m);
        }
        for (EventRepresentation e : c8yData.getEvents()) {
            e.setSource(gateway);
            eventApi.create(e);
        }
        for (AlarmRepresentation a : c8yData.getAlarms()) {
            a.setSource(gateway);
            alarmApi.create(a);
        }
        for (String t : c8yData.getAlarmsToClear()) {
            clearAlarm(gateway, t);
        }
    }

    private void clearAlarm(ManagedObjectRepresentation gateway, String alarmType) {
        AlarmFilter filter = new AlarmFilter();
        filter.byType(alarmType);
        filter.bySource(gateway.getId());
        filter.byStatus(CumulocityAlarmStatuses.ACTIVE);
        for (AlarmRepresentation alarmRepresentation : alarmApi.getAlarmsByFilter(filter).get().allPages()) {
            alarmRepresentation.setStatus(CumulocityAlarmStatuses.CLEARED.toString());
            alarmApi.update(alarmRepresentation);
        }
    }

    public ManagedObjectRepresentation provisionGateway(String lnsConnectorId,
                    GatewayProvisioning gatewayProvisioning) {
        ManagedObjectRepresentation mor;
        try {
            lnsConnectorManager.getConnector(lnsConnectorId).provisionGateway(gatewayProvisioning);
        } catch (Exception e) {
            throw new CannotProvisionGatewayException("Cannot provision gateway " + gatewayProvisioning.getGwEUI(), e);
        }
        mor = getGateway(gatewayProvisioning.getGwEUI().toLowerCase());
        if (mor == null) {
            mor = createGateway(lnsConnectorId, gatewayProvisioning);
        }
        EventRepresentation event = new EventRepresentation();
        event.setType("Gateway provisioned");
        event.setText("Gateway has been provisioned");
        event.setDateTime(new DateTime());
        event.setSource(mor);
        eventApi.create(event);
        return mor;
    }

    public void deprovisionGateway(String lnsConnectorId, String id) {
        try {
            lnsConnectorManager.getConnector(lnsConnectorId).deprovisionGateway(id);
        } catch (Exception e) {
            throw new CannotDeprovisionGatewayException(id, e);
        }
    }
}