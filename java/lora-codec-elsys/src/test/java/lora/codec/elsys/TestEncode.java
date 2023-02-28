package lora.codec.elsys;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import lora.codec.downlink.DownlinkData;
import lora.codec.downlink.Encode;

public class TestEncode {
    @Test
    public void testSetSettings() {
        String settings = "{\"setsettings\":{\"PORT\":5,\"MODE\":1,\"ACCCFG\": [1,2,3,4]}}";
        ElsysCodec codec = new ElsysCodec();
        DownlinkData result = codec.encode(new ManagedObjectRepresentation(), new Encode("0", settings, "desk"));
        System.out.println(result.getPayload());
        assertEquals("3E09080509011301020304", result.getPayload());
    }
}
