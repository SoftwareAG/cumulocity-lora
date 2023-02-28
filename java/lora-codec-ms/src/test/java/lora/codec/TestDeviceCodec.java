package lora.codec;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import lora.codec.downlink.DeviceOperation;
import lora.codec.downlink.DeviceOperationElement;
import lora.codec.downlink.DownlinkData;
import lora.codec.downlink.Encode;
import lora.codec.uplink.C8YData;
import lora.codec.uplink.Decode;

public class TestDeviceCodec {
    @Test
    public void testJsonconvert() {
        DeviceCodec codec = new DeviceCodec() {
            @Override
            public String getId() {
                return "";
            }

            @Override
            public String getName() {
                return "";
            }

            @Override
            public String getVersion() {
                return "";
            }

            @Override
            public DownlinkData askDeviceConfig(String model) {
                return null;
            }

            @Override
            public C8YData decode(ManagedObjectRepresentation mor, Decode decode) {
                return null;
            }

            @Override
            public DownlinkData encode(ManagedObjectRepresentation mor, Encode encode) {
                return null;
            }
        };

        DeviceOperation op = codec
                .convertJsonStringToDeviceOperation("{\"op\":{\"key1\": \"value\", \"key2\": [1,2,3,4]}}");
        System.out.println(op);
        Map<String, DeviceOperationElement> elementsMap = new HashMap<>();
        for (DeviceOperationElement element : op.getElements()) {
            elementsMap.put(element.getId(), element);
        }
        assertEquals(List.of(Integer.valueOf(1), Integer.valueOf(2), Integer.valueOf(3), Integer.valueOf(4)),
                elementsMap.get("key2").getValue());
    }
}
