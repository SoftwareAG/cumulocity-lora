package lora.ns.connector;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;

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
	
	public void addConnector(String lnsConnectorId, LNSConnector connector) {
		if (!connectors.containsKey(subscriptionsService.getTenant())) {
			connectors.put(subscriptionsService.getTenant(), new HashMap<String, LNSConnector>());
		}
		connectors.get(subscriptionsService.getTenant()).put(lnsConnectorId, connector);
	}
	
	public Map<String, LNSConnector> getConnectors() {
		return connectors.get(subscriptionsService.getTenant());
	}
}
