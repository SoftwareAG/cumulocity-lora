package lora.ns.connector;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
import com.google.common.collect.Maps;

import lombok.RequiredArgsConstructor;
import lora.ns.exception.ConnectorDoesNotExistException;

@Service
@RequiredArgsConstructor
public class LNSConnectorService {

	private Map<String, Map<String, LNSConnector>> connectors = new HashMap<>();

	private final MicroserviceSubscriptionsService subscriptionsService;

	public LNSConnector getConnector(String lnsConnectorId) {
		var lnsConnector = getConnectors().get(lnsConnectorId);
		if (lnsConnector == null) {
			throw new ConnectorDoesNotExistException(lnsConnectorId);
		}
		return lnsConnector;
	}

	public void removeConnector(String lnsConnectorId) {
		getConnectors().remove(lnsConnectorId);
	}

	public void addConnector(LNSConnector connector) {
		getConnectors().put(connector.getId(), connector);
	}

	public Map<String, LNSConnector> getConnectors() {
		if (!connectors.containsKey(subscriptionsService.getTenant())) {
			connectors.put(subscriptionsService.getTenant(), new HashMap<>());
		}
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
