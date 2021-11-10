package lora.codec.nke;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import org.joda.time.DateTime;

import lora.codec.uplink.C8YData;

public class C8YEvent implements C8YDataType {

    private String eventType;
    private boolean setAsDeviceProperty = false;
    private String deviceProperty;

    public C8YEvent eventType(String eventType) {
        this.eventType = eventType;
        return this;
    }

    @Override
    public void sendToCumulocity(ManagedObjectRepresentation device, C8YData c8yData, float value, DateTime time) {
        c8yData.addEvent(device, eventType, eventType + " " + value, null, time);
        if (setAsDeviceProperty) {
            device.set(value, this.deviceProperty);
            c8yData.updateRootDevice(device);
        }
    }

    @Override
    public C8YDataType setAsDeviceProperty(String propertyName) {
        this.setAsDeviceProperty = true;
        this.deviceProperty = propertyName;
        return this;
    }
}
