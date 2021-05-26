package lora.codec.nke;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import org.joda.time.DateTime;

import lora.codec.C8YData;

public interface C8YDataType {
    public void sendToCumulocity(ManagedObjectRepresentation device, C8YData c8yData, int value, DateTime time);
    public C8YDataType setAsDeviceProperty(String propertyName);
}
