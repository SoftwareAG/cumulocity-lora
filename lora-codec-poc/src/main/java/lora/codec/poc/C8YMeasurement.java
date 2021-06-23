package lora.codec.nke;

import java.math.BigDecimal;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import org.joda.time.DateTime;

import lora.codec.C8YData;

public class C8YMeasurement implements C8YDataType {

    private String fragment;
    private String series;
    private String unit;
    private BigDecimal divisor = BigDecimal.valueOf(1);
    private boolean setAsDeviceProperty = false;
    private String deviceProperty;

    public C8YMeasurement fragment(String fragment) {
        this.fragment = fragment;
        return this;
    }

    public C8YMeasurement series(String series) {
        this.series = series;
        return this;
    }

    public C8YMeasurement unit(String unit) {
        this.unit = unit;
        return this;
    }

    public C8YMeasurement divisor(BigDecimal divisor) {
        this.divisor = divisor;
        return this;
    }

    public C8YMeasurement divisor(int divisor) {
        return this.divisor(BigDecimal.valueOf(divisor));
    }

    @Override
    public void sendToCumulocity(ManagedObjectRepresentation device, C8YData c8yData, float value, DateTime time) {
        c8yData.addMeasurement(device, fragment, series, unit, BigDecimal.valueOf(value).divide(divisor), time);
        if (setAsDeviceProperty) {
            device.set(BigDecimal.valueOf(value).divide(divisor), this.deviceProperty);
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
