package lora.ns.chirpstack;

import static org.assertj.core.api.Assertions.*;

import java.util.Base64;
import java.util.HexFormat;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.support.StaticApplicationContext;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.templatemode.TemplateMode;

import io.restassured.path.json.JsonPath;
import lora.ns.DeviceData;
import lora.rest.LoraContextService;

/**
 * Unit test for simple App.
 */
@ExtendWith(MockitoExtension.class)
class AppTest {
    /*
     * @Test void shouldAnswerWithTrue() { Properties properties = new Properties();
     * properties.setProperty("address", "45.87.250.4");
     * properties.setProperty("port", "8080"); properties.setProperty("ssl",
     * "false"); properties.setProperty("apikey",
     * "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjaGlycHN0YWNrIiwiaXNzIjoiY2hpcnBzdGFjayIsInN1YiI6IjhkMGUzZmU1LTQ2OTUtNGVhMy05Nzk5LWU3NGE5MjFjYzVjMCIsInR5cCI6ImtleSJ9.3sV5FWGAXCkUkSfP8TrI3EWZGy49i00YhqL1L-ka-k8"
     * ); properties.setProperty("tenantid",
     * "52f14cd4-c6f1-4fbd-8f87-4025e1d49242");
     * 
     * ChirpstackConnector connector = new ChirpstackConnector(properties);
     * System.out.println("List of applications: " + connector.getApplications());
     * System.out.println("List of device profiles: " +
     * connector.getDeviceProfiles()); properties.setProperty("application",
     * connector.getApplications().get(0).getId()); connector = new
     * ChirpstackConnector(properties);
     * System.out.println(connector.sendDownlink(new
     * DownlinkData("70B3D56371385764", 1, "0203010202020304"))); }
     */
    @Test
    void testUplink() {
        String event = "{\"deduplicationId\":\"dfe1347a-6166-47ed-b257-19989ffd6f50\",\"time\":\"2023-02-21T08:28:02.300865126+00:00\",\"deviceInfo\":{\"tenantId\":\"52f14cd4-c6f1-4fbd-8f87-4025e1d49242\",\"tenantName\":\"ChirpStack\",\"applicationId\":\"274ec483-7c2c-47d6-823a-a58783d572f5\",\"applicationName\":\"Cumulocity\",\"deviceProfileId\":\"b8326b72-55e9-4cab-a5e7-6185b588c519\",\"deviceProfileName\":\"basic\",\"deviceName\":\"ACS-Switch 2\",\"devEui\":\"70b3d56371385764\",\"tags\":{}},\"devAddr\":\"0179cc11\",\"adr\":true,\"dr\":5,\"fCnt\":192,\"fPort\":1,\"confirmed\":false,\"data\":\"Qhi3RTQDAAAAkI4AAAAAZBYW\",\"rxInfo\":[{\"gatewayId\":\"1234567890abcdef\",\"uplinkId\":59760,\"rssi\":-67,\"snr\":11.0,\"channel\":6,\"location\":{\"latitude\":48.73955563887783,\"longitude\":1.9518036925618534},\"context\":\"RSpjVA==\",\"metadata\":{\"region_common_name\":\"EU868\",\"region_config_id\":\"eu868\"},\"crcStatus\":\"CRC_OK\"}],\"txInfo\":{\"frequency\":867700000,\"modulation\":{\"lora\":{\"bandwidth\":125000,\"spreadingFactor\":7,\"codeRate\":\"CR_4_5\"}}}}";
        ChirpstackIntegrationService service = new ChirpstackIntegrationService();
        DeviceData data = service.processUplinkEvent(event);
        assertThat(data.getDevEui()).isEqualTo("70b3d56371385764");
    }

    @Mock
    protected LoraContextService loraContextService;

    @InjectMocks
    private ChirpstackIntegrationService service;

    @Spy
    private SpringTemplateEngine mMessageTemplateEngine = createTemplateEngine();

    @Test
    void testSimulator() {
        String payload = service.getSimulatedPayload(Map.of("payload", "AABBCCDD"));
        System.out.println(payload);
        final JsonPath payloadJsonPath = JsonPath.with(payload);
        assertThat(payloadJsonPath.getString("deviceInfo.devEui")).isEqualTo("0000000000000000");
        String base64payload = Base64.getEncoder().encodeToString(HexFormat.of().parseHex("AABBCCDD"));
        assertThat(payloadJsonPath.getString("data")).isEqualTo(base64payload);
    }

    private SpringTemplateEngine createTemplateEngine() {
        SpringResourceTemplateResolver templateResolver = new SpringResourceTemplateResolver();
        templateResolver.setApplicationContext(new StaticApplicationContext());
        templateResolver.setPrefix("classpath:/templates/");
        templateResolver.setSuffix(".xml");
        templateResolver.setTemplateMode(TemplateMode.HTML);

        var templateEngine = new SpringTemplateEngine();
        templateEngine.setEnableSpringELCompiler(true);
        templateEngine.setTemplateResolver(templateResolver);

        return templateEngine;
    }
}
