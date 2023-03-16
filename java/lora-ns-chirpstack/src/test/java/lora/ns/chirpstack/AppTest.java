package lora.ns.chirpstack;

import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

/**
 * Unit test for simple App.
 */
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class AppTest {
    /**
     * Rigorous Test :-)
     */
    /*
     * @Test
     * public void shouldAnswerWithTrue() {
     * Properties properties = new Properties();
     * properties.setProperty("address", "45.87.250.4");
     * properties.setProperty("port", "8080");
     * properties.setProperty("ssl", "false");
     * properties.setProperty("apikey",
     * "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjaGlycHN0YWNrIiwiaXNzIjoiY2hpcnBzdGFjayIsInN1YiI6IjhkMGUzZmU1LTQ2OTUtNGVhMy05Nzk5LWU3NGE5MjFjYzVjMCIsInR5cCI6ImtleSJ9.3sV5FWGAXCkUkSfP8TrI3EWZGy49i00YhqL1L-ka-k8"
     * );
     * properties.setProperty("tenantid", "52f14cd4-c6f1-4fbd-8f87-4025e1d49242");
     * 
     * ChirpstackConnector connector = new ChirpstackConnector(properties);
     * System.out.println("List of applications: " + connector.getApplications());
     * System.out.println("List of device profiles: " +
     * connector.getDeviceProfiles());
     * properties.setProperty("application",
     * connector.getApplications().get(0).getId());
     * connector = new ChirpstackConnector(properties);
     * System.out.println(connector.sendDownlink(new
     * DownlinkData("70B3D56371385764", 1, "0203010202020304")));
     * }
     * 
     * @Test
     * public void testUplink() {
     * String event =
     * "{\"deduplicationId\":\"dfe1347a-6166-47ed-b257-19989ffd6f50\",\"time\":\"2023-02-21T08:28:02.300865126+00:00\",\"deviceInfo\":{\"tenantId\":\"52f14cd4-c6f1-4fbd-8f87-4025e1d49242\",\"tenantName\":\"ChirpStack\",\"applicationId\":\"274ec483-7c2c-47d6-823a-a58783d572f5\",\"applicationName\":\"Cumulocity\",\"deviceProfileId\":\"b8326b72-55e9-4cab-a5e7-6185b588c519\",\"deviceProfileName\":\"basic\",\"deviceName\":\"ACS-Switch 2\",\"devEui\":\"70b3d56371385764\",\"tags\":{}},\"devAddr\":\"0179cc11\",\"adr\":true,\"dr\":5,\"fCnt\":192,\"fPort\":1,\"confirmed\":false,\"data\":\"Qhi3RTQDAAAAkI4AAAAAZBYW\",\"rxInfo\":[{\"gatewayId\":\"1234567890abcdef\",\"uplinkId\":59760,\"rssi\":-67,\"snr\":11.0,\"channel\":6,\"location\":{\"latitude\":48.73955563887783,\"longitude\":1.9518036925618534},\"context\":\"RSpjVA==\",\"metadata\":{\"region_common_name\":\"EU868\",\"region_config_id\":\"eu868\"},\"crcStatus\":\"CRC_OK\"}],\"txInfo\":{\"frequency\":867700000,\"modulation\":{\"lora\":{\"bandwidth\":125000,\"spreadingFactor\":7,\"codeRate\":\"CR_4_5\"}}}}"
     * ;
     * ChirpstackIntegrationService service = new ChirpstackIntegrationService();
     * DeviceData data = service.processUplinkEvent(event);
     * System.out.println(data.toString());
     * }
     */

    @Autowired
    private ChirpstackIntegrationService service;

    @Test
    public void testSimulator() {
        String payload = service.getSimulatedPayload(Map.of("payload", "AABBCCDD"));
        System.out.println(payload);

    }
}
