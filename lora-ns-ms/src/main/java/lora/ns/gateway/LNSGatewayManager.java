package lora.ns.gateway;

import java.util.Date;
import java.util.Optional;

import com.cumulocity.model.event.CumulocityAlarmStatuses;
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
import com.cumulocity.sdk.client.inventory.ManagedObject;
import com.cumulocity.sdk.client.measurement.MeasurementApi;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import c8y.Availability;
import c8y.Hardware;
import c8y.IsDevice;
import c8y.Position;
import lora.codec.C8YData;
import lora.common.C8YUtils;
import lora.ns.agent.AgentService;
import lora.ns.connector.LNSConnector;

@Component
public class LNSGatewayManager {

    final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    protected C8YUtils c8yUtils;

    @Autowired
    protected IdentityApi identityApi;

    @Autowired
    private AgentService agentService;

    @Autowired
    private InventoryApi inventoryApi;

    @Autowired
    private EventApi eventApi;

	@Autowired
	protected AlarmApi alarmApi;

	@Autowired
	protected MeasurementApi measurementApi;

    public static final String GATEWAY_ID_TYPE = "LoRa Gateway Id";

    public void upsertGateways(LNSConnector connector) {
            for (Gateway gateway : connector.getGateways()) {
                ManagedObjectRepresentation mor = getGateway(gateway.getId());
                if (mor == null) {
                    mor = createGateway(gateway);
                }
                mor.setLastUpdatedDateTime(null);
                mor.set(new Availability(new Date(), gateway.getStatus()));
                if (gateway.getLat() != null && gateway.getLng() != null) {
                    logger.info("Updating position of gateway {}: {}, {}", gateway.getName(), gateway.getLat(), gateway.getLng());
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
                logger.info("Processing data for gateway {}", gateway.getName());
                processData(mor, gateway.getData());
            }
    }

    private ManagedObjectRepresentation createGateway(Gateway gateway) {
        logger.info("Creating gateway {}", gateway.getName());
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
			logger.error("Error on clearing Alarm", e);
		}
	}
}