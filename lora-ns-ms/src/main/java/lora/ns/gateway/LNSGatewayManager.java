package lora.ns.gateway;

import java.util.List;
import java.util.Optional;

import com.cumulocity.model.event.CumulocityAlarmStatuses;
import com.cumulocity.model.event.CumulocitySeverities;
import com.cumulocity.rest.representation.alarm.AlarmRepresentation;
import com.cumulocity.rest.representation.event.EventRepresentation;
import com.cumulocity.rest.representation.identity.ExternalIDRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.measurement.MeasurementRepresentation;
import com.cumulocity.sdk.client.SDKException;
import com.cumulocity.sdk.client.alarm.AlarmApi;
import com.cumulocity.sdk.client.alarm.AlarmFilter;
import com.cumulocity.sdk.client.event.EventApi;
import com.cumulocity.sdk.client.identity.IdentityApi;
import com.cumulocity.sdk.client.inventory.InventoryApi;
import com.cumulocity.sdk.client.measurement.MeasurementApi;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import c8y.Hardware;
import c8y.IsDevice;
import c8y.Position;
import c8y.RequiredAvailability;
import lombok.extern.slf4j.Slf4j;
import lora.codec.uplink.C8YData;
import lora.common.C8YUtils;
import lora.ns.agent.AgentService;
import lora.ns.connector.LNSConnector;
import lora.ns.connector.LNSConnectorManager;
import lora.ns.connector.LNSResponse;
import lora.ns.integration.LNSIntegrationService;

@Component
@Slf4j
public class LNSGatewayManager {

    @Autowired
    protected C8YUtils c8yUtils;

    @Autowired
    protected IdentityApi identityApi;

    @Autowired
    private InventoryApi inventoryApi;

    @Autowired
    private EventApi eventApi;

	@Autowired
	protected AlarmApi alarmApi;

	@Autowired
	protected MeasurementApi measurementApi;

    @Autowired
    private AgentService agentService;

    @Autowired
    private LNSConnectorManager lnsConnectorManager;

    public static final String GATEWAY_ID_TYPE = "LoRa Gateway Id";

    public void upsertGateways(LNSConnector connector) {
        LNSResponse<List<Gateway>> gateways = connector.getGateways();
        if (gateways.isOk()) {
            for (Gateway gateway : gateways.getResult()) {
                ManagedObjectRepresentation mor = getGateway(gateway.getGwEUI());
                if (mor == null) {
                    mor = createGateway(connector.getId(), gateway);
                }
                mor.setLastUpdatedDateTime(null);
                mor.setProperty("gatewayAvailability", gateway.getStatus());
                if (gateway.getLat() != null && gateway.getLng() != null) {
                    log.info("Updating position of gateway {}: {}, {}", gateway.getName(), gateway.getLat(), gateway.getLng());
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
                /*ManagedObject connectorMorApi = inventoryApi.getManagedObjectApi(agentService.getAgent().getId());
                try {
                    connectorMorApi.getChildDevice(mor.getId());
                } catch (Exception e) {
                    connectorMorApi.addChildDevice(mor.getId());
                }*/
                log.info("Processing data for gateway {}", gateway.getName());
                processData(mor, gateway.getData());
            }
        }
    }

    private ManagedObjectRepresentation createGateway(String lnsConnectorId, Gateway gateway) {
        log.info("Creating gateway {}", gateway.getName());
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
        return createGateway(lnsConnectorId, new Gateway(gatewayProvisioning.getGwEUI(),
            gatewayProvisioning.getSerial(),
            gatewayProvisioning.getName(),
            gatewayProvisioning.getLat(),
            gatewayProvisioning.getLng(),
            gatewayProvisioning.getType(),
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
		try {
			AlarmFilter filter = new AlarmFilter();
			filter.byType(alarmType);
			filter.bySource(gateway.getId());
			filter.byStatus(CumulocityAlarmStatuses.ACTIVE);
			for (AlarmRepresentation alarmRepresentation : alarmApi.getAlarmsByFilter(filter).get().allPages()) {
				alarmRepresentation.setStatus(CumulocityAlarmStatuses.CLEARED.toString());
				alarmApi.update(alarmRepresentation);
			}
		} catch (SDKException e) {
			log.error("Error on clearing Alarm", e);
		}
	}

	public LNSResponse<ManagedObjectRepresentation> provisionGateway(String lnsConnectorId, GatewayProvisioning gatewayProvisioning) {
		LNSResponse<ManagedObjectRepresentation> response = new LNSResponse<ManagedObjectRepresentation>().withOk(true);
		ManagedObjectRepresentation mor;
		Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsConnectorId);
		if (connector.isPresent()) {
            LNSResponse<Void> lnsResponse = connector.get().provisionGateway(gatewayProvisioning);
            if (lnsResponse.isOk()) {
                mor = getGateway(gatewayProvisioning.getGwEUI().toLowerCase());
                if (mor == null) {
                    mor = createGateway(lnsConnectorId, gatewayProvisioning);
                }
                response.setResult(mor);
                EventRepresentation event = new EventRepresentation();
                event.setType("Gateway provisioned");
                event.setText("Gateway has been provisioned");
                event.setDateTime(new DateTime());
                event.setSource(mor);
                eventApi.create(event);
            } else {
                response.setOk(false);
                response.setMessage(lnsResponse.getMessage());
            }
		} else {
            response.setOk(false);
			AlarmRepresentation alarm = new AlarmRepresentation();
			alarm.setType("Gateway provisioning error");
			if (connector.isPresent()) {
				response.setMessage("Couldn't provision gateway " + gatewayProvisioning.getGwEUI() + " in LNS connector "
						+ lnsConnectorId);
			} else {
				response.setMessage("LNS connector Id '" + lnsConnectorId
						+ "' doesn't exist. Please use a valid managed object Id.");
			}
			log.error(response.getMessage());
			alarm.setText(response.getMessage());
			alarm.setDateTime(new DateTime());
			alarm.setSeverity(CumulocitySeverities.CRITICAL.name());
			mor = getGateway(gatewayProvisioning.getGwEUI().toLowerCase());
			if (mor != null) {
				alarm.setSource(mor);
			} else {
				alarm.setSource(agentService.getAgent());
			}
			alarmApi.create(alarm);
		}

		return response;
	}

	public LNSResponse<Void> deprovisionGateway(String lnsConnectorId, String id) {
		LNSResponse<Void> result = new LNSResponse<>();
		Optional<LNSConnector> connector = lnsConnectorManager.getConnector(lnsConnectorId);
		if (connector.isPresent()) {
            result = connector.get().deprovisionGateway(id);
		} else {
            result.setOk(false);
            result.setMessage("No connector found with id " + lnsConnectorId);
        }

		return result;
	}
}