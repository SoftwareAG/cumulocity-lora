package lora.ns.objenious;
import java.util.HashMap;
import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import io.restassured.path.json.JsonPath;

@SpringBootTest
public class ObjeniousIntegrationServiceTest {
    private final Logger logger = LoggerFactory.getLogger(ObjeniousIntegrationServiceTest.class);

    @Autowired
    private ObjeniousIntegrationService is;

    public static final String DEVEUI = "0123456789ABCDEF";
    public static final String DEVICE_NAME = "My device";
    public static final String PAYLOAD = "0123456";

    @Test
    void testPayload() {
        Map<String, Object> fields = new HashMap<>();
        fields.put("deveui", DEVEUI);
        fields.put("name", DEVICE_NAME);
        fields.put("payload", PAYLOAD);
        String payload = is.getSimulatedPayload(fields);
        logger.info(payload);
        final JsonPath payloadJsonPath = JsonPath.with(payload);
        assertThat(payloadJsonPath.getString("device_properties.deveui"), is(DEVEUI));
        assertThat(payloadJsonPath.getString("device_properties.external_id"), is(DEVICE_NAME));
        assertThat(payloadJsonPath.getString("payload_cleartext"), is(PAYLOAD));
    }
}
