package lora.ns.${connectorPackage};

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import lora.ns.DeviceData;
import lora.ns.connector.PropertyDescription;
import lora.ns.connector.PropertyDescription.PropertyType;
import lora.ns.integration.LNSIntegrationService;
import lora.ns.operation.OperationData;

@Service
@Slf4j
public class ${integrationServiceClass} extends LNSIntegrationService<${connectorClass}> {
    @Override
	public DeviceData processUplinkEvent(String event) {
        DeviceData data = null;
        // Parse the event string here
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
		return "${connectorType}";
	}

	@Override
	public String getName() {
		return "${connectorName}";
	}

	@Override
	public String getVersion() {
		return "${connectorVersion}";
	}
}
