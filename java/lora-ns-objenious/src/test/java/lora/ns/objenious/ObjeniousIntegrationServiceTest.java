package lora.ns.objenious;

import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.StaticApplicationContext;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.templatemode.TemplateMode;

import io.restassured.path.json.JsonPath;
import lora.rest.LoraContextService;

@ExtendWith(MockitoExtension.class)
public class ObjeniousIntegrationServiceTest {
    private final Logger logger = LoggerFactory.getLogger(ObjeniousIntegrationServiceTest.class);

    @Mock
    protected LoraContextService loraContextService;

    @InjectMocks
    private ObjeniousIntegrationService is;

    @Spy
    private SpringTemplateEngine mMessageTemplateEngine = createTemplateEngine();

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
