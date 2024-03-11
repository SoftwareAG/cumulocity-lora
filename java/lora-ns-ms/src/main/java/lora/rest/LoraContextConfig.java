package lora.rest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.annotation.RequestScope;

@Configuration
public class LoraContextConfig {
    @Bean
    @RequestScope
    public LoraContext loraContext() {
        return new LoraContext();
    }
}
