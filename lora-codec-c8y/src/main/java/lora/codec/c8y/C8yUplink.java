package lora.codec.c8y;

import com.cumulocity.lpwan.payload.uplink.model.UplinkMessage;

import org.joda.time.DateTime;

public class C8yUplink extends UplinkMessage {
    private String payloadHex;
    private DateTime dateTime;
    private String externalId;
    private int port;

    public C8yUplink(String payloadHex, DateTime dateTime, String externalId, int port) {
        this.payloadHex = payloadHex;
        this.dateTime = dateTime;
        this.externalId = externalId;
        this.port = port;
    }

    @Override
    public DateTime getDateTime() {
        return dateTime;
    }

    @Override
    public String getExternalId() {
        return externalId;
    }

    @Override
    public String getPayloadHex() {
        return payloadHex;
    }
    
    public int getPort() {
        return port;
    }
 }
