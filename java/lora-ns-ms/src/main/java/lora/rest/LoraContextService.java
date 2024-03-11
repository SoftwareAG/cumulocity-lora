package lora.rest;

import org.joda.time.DateTime;
import org.slf4j.helpers.MessageFormatter;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;

import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
import com.cumulocity.model.event.CumulocitySeverities;
import com.cumulocity.model.idtype.GId;
import com.cumulocity.rest.representation.alarm.AlarmRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.sdk.client.alarm.AlarmApi;
import com.cumulocity.sdk.client.inventory.InventoryApi;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoraContextService {
    private static final String REQUEST_SCOPE_MESSAGE_FORMAT = "{} - {} - {} - {}";
    private static final String NO_REQUEST_SCOPE_MESSAGE_FORMAT = "{} - {}";
    private final InventoryApi inventoryApi;
    private final AlarmApi alarmApi;
    private final MicroserviceSubscriptionsService subscriptionsService;
    private final LoraContext loraContext;

    public void sendAlarm(String type, String text, CumulocitySeverities severity) {
        ManagedObjectRepresentation source = null;
        if (loraContext.getDevice() != null) {
            source = loraContext.getDevice();
        }
        if (source == null && loraContext.getConnector() != null) {
            source = inventoryApi.get(GId.asGId(loraContext.getConnector().getId()));
        }
        var alarm = new AlarmRepresentation();
        alarm.setType(type);
        alarm.setText(text);
        alarm.setSource(source);
        alarm.setDateTime(new DateTime());
        alarm.setSeverity(severity.name());
        alarmApi.create(alarm);
    }

    public void log(String message) {
        if (RequestContextHolder.getRequestAttributes() != null) {
            log.info(REQUEST_SCOPE_MESSAGE_FORMAT, subscriptionsService.getTenant(),
                    loraContext.getConnector().getName(),
                    loraContext.getConnector().getId(),
                    message);
        } else {
            log.info(NO_REQUEST_SCOPE_MESSAGE_FORMAT, subscriptionsService.getTenant(),
                    message);
        }
    }

    public void error(String message) {
        if (RequestContextHolder.getRequestAttributes() != null) {
            log.error(REQUEST_SCOPE_MESSAGE_FORMAT, subscriptionsService.getTenant(),
                    loraContext.getConnector().getName(),
                    loraContext.getConnector().getId(),
                    message);
        } else {
            log.error(NO_REQUEST_SCOPE_MESSAGE_FORMAT, subscriptionsService.getTenant(),
                    message);
        }
    }

    public void error(String message, Throwable t) {
        if (RequestContextHolder.getRequestAttributes() != null) {
            log.error(REQUEST_SCOPE_MESSAGE_FORMAT, subscriptionsService.getTenant(),
                    loraContext.getConnector().getName(),
                    loraContext.getConnector().getId(), message,
                    t);
        } else {
            log.error(NO_REQUEST_SCOPE_MESSAGE_FORMAT, subscriptionsService.getTenant(), message,
                    t);
        }
    }

    public void log(String message, Object argument) {
        log(MessageFormatter.format(message, argument).getMessage());
    }

    public void log(String message, Object... arguments) {
        log(MessageFormatter.arrayFormat(message, arguments).getMessage());
    }
}
