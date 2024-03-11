package lora.ns.agent;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
import com.cumulocity.model.Agent;
import com.cumulocity.model.idtype.GId;
import com.cumulocity.rest.representation.identity.ExternalIDRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.rest.representation.operation.OperationRepresentation;
import com.cumulocity.sdk.client.SDKException;
import com.cumulocity.sdk.client.devicecontrol.DeviceControlApi;
import com.cumulocity.sdk.client.identity.IdentityApi;
import com.cumulocity.sdk.client.inventory.InventoryApi;
import com.cumulocity.sdk.client.notification.Subscription;
import com.cumulocity.sdk.client.notification.SubscriptionListener;

import c8y.IsDevice;
import c8y.RequiredAvailability;
import lombok.RequiredArgsConstructor;
import lora.common.C8YUtils;
import lora.ns.connector.LNSConnector;
import lora.ns.integration.LNSIntegrationService;
import lora.ns.operation.LNSOperationService;

@Service
@RequiredArgsConstructor
public class AgentService {
	private static final String GATEWAY_SCAN_START_DELAY = "gatewayScanStartDelay";
	private static final String GATEWAY_SCAN_RATE = "gatewayScanRate";
	protected Logger logger = LoggerFactory.getLogger(AgentService.class);
	private final C8YUtils c8yUtils;
	private final InventoryApi inventoryApi;
	private final IdentityApi identityApi;
	private final DeviceControlApi deviceControlApi;
	private final MicroserviceSubscriptionsService subscriptionsService;
	private final LNSOperationService lnsOperationManager;

	private final Map<String, ManagedObjectRepresentation> agents = new HashMap<>();

	public void registerAgent(LNSIntegrationService<? extends LNSConnector> lnsIntegrationService) {
		Optional<ExternalIDRepresentation> extId = c8yUtils.findExternalId(lnsIntegrationService.getType(),
				LNSIntegrationService.LNS_EXT_ID);
		ManagedObjectRepresentation agent = null;
		if (!extId.isPresent()) {
			agent = new ManagedObjectRepresentation();
			agent.setType(LNSIntegrationService.LNS_MO_TYPE);
			agent.setName(lnsIntegrationService.getName());
			agent.setProperty("version", lnsIntegrationService.getVersion());
			agent.setProperty(LNSIntegrationService.LNS_TYPE, lnsIntegrationService.getType());
			agent.set(new RequiredAvailability(5));
			agent.set(new Agent());
			agent.set(new IsDevice());
			agent = inventoryApi.create(agent);

			ExternalIDRepresentation externalId = new ExternalIDRepresentation();
			externalId.setExternalId(lnsIntegrationService.getType());
			externalId.setType(LNSIntegrationService.LNS_EXT_ID);
			externalId.setManagedObject(agent);
			identityApi.create(externalId);
		} else {
			agent = inventoryApi.get(extId.get().getManagedObject().getId());
			agent.setLastUpdatedDateTime(null);
			agent.setName(lnsIntegrationService.getName());
			agent.setProperty("version", lnsIntegrationService.getVersion());
			agent.setProperty(LNSIntegrationService.LNS_TYPE, lnsIntegrationService.getType());
			agent.set(new RequiredAvailability(5));
			if (agent.get(Agent.class) == null) {
				agent.set(new Agent());
			}
			if (agent.get(IsDevice.class) == null) {
				agent.set(new IsDevice());
			}
			inventoryApi.update(agent);
			if (agent.hasProperty(GATEWAY_SCAN_RATE)) {
				lnsIntegrationService
						.setGatewayScanRate(Integer.valueOf(agent.getProperty(GATEWAY_SCAN_RATE).toString()));
			}
			if (agent.hasProperty(GATEWAY_SCAN_START_DELAY)) {
				lnsIntegrationService.setGatewayScanStartDelay(
						Integer.valueOf(agent.getProperty(GATEWAY_SCAN_START_DELAY).toString()));
			}
		}
		agents.put(subscriptionsService.getTenant(), agent);
		// We don't want the event listener to crash just because we can't subscribe to
		// operation
		// (we're polling them anyway)
		try {
			deviceControlApi.getNotificationsSubscriber().subscribe(agent.getId(),
					new OperationDispatcherSubscriptionListener(subscriptionsService.getTenant()));
		} catch (Exception e) {
			logger.error("Can't subscribe to operation", e);
		}
	}

	public ManagedObjectRepresentation getAgent() {
		return agents.get(subscriptionsService.getTenant());
	}

	public void setGatewayScanRate(Integer gatewayScanRate) {
		ManagedObjectRepresentation agent = new ManagedObjectRepresentation();
		agent.setId(getAgent().getId());
		agent.setProperty(GATEWAY_SCAN_RATE, gatewayScanRate);
		inventoryApi.update(agent);
	}

	public void setGatewayScanStartDelay(Integer gatewayScanStartDelay) {
		ManagedObjectRepresentation agent = new ManagedObjectRepresentation();
		agent.setId(getAgent().getId());
		agent.setProperty(GATEWAY_SCAN_START_DELAY, gatewayScanStartDelay);
		inventoryApi.update(agent);
	}

	public class OperationDispatcherSubscriptionListener
			implements SubscriptionListener<GId, OperationRepresentation> {

		public OperationDispatcherSubscriptionListener(String tenant) {
			this.tenant = tenant;
		}

		private String tenant;

		@Override
		public void onError(Subscription<GId> sub, Throwable e) {
			logger.error("OperationDispatcher error!", e);
		}

		@Override
		public void onNotification(Subscription<GId> sub, OperationRepresentation operation) {
			try {
				subscriptionsService.runForTenant(tenant, () -> lnsOperationManager.executePending(operation));
			} catch (SDKException e) {
				logger.error("OperationDispatcher error!", e);
			}
		}
	}

}