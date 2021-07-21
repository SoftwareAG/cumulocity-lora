package lora.ns;

import lora.ns.integration.LNSIntegrationService;
import lora.ns.objenious.ObjeniousConnector;
import lora.ns.operation.OperationData;

public class JsonIntegrationService extends LNSIntegrationService<ObjeniousConnector> {

    @Override
    public String getType() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public String getName() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public String getVersion() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public DeviceData processUplinkEvent(String eventString) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public OperationData processDownlinkEvent(String eventString) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public boolean isOperationUpdate(String eventString) {
        // TODO Auto-generated method stub
        return false;
    }
    
}
