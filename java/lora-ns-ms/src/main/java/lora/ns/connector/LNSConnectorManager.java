package lora.ns.connector;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
import com.google.common.collect.Maps;

@Component
public class LNSConnectorManager {

	private Map<String, Map<String, LNSConnector>> connectors = new HashMap<>();

	@Autowired
	private MicroserviceSubscriptionsService subscriptionsService;

	public Optional<LNSConnector> getConnector(String lnsConnectorId) {
		LNSConnector result = null;
		if (connectors.containsKey(subscriptionsService.getTenant())
				&& connectors.get(subscriptionsService.getTenant()).containsKey(lnsConnectorId)) {
			result = connectors.get(subscriptionsService.getTenant()).get(lnsConnectorId);
		}
		return Optional.ofNullable(result);
	}

	public void removeConnector(String lnsConnectorId) {
		connectors.get(subscriptionsService.getTenant()).remove(lnsConnectorId);
	}
	
	public void addConnector(LNSConnector connector) {
		if (!connectors.containsKey(subscriptionsService.getTenant())) {
			connectors.put(subscriptionsService.getTenant(), new HashMap<>());
		}
		connectors.get(subscriptionsService.getTenant()).put(connector.getId(), connector);
	}
	
	public Map<String, LNSConnector> getConnectors() {
		return connectors.get(subscriptionsService.getTenant());
	}

	public Map<String, LNSConnectorRepresentation> getConnectorRepresentations() {
		return Maps.transformValues(connectors.get(subscriptionsService.getTenant()), v -> {
			LNSConnectorRepresentation connectorRepresentation = new LNSConnectorRepresentation();
			connectorRepresentation.setName(v.getName());
			connectorRepresentation.setProperties(v.getProperties());
			return connectorRepresentation;
		});
	}
}
