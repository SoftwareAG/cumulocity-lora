module lora.ns.ms {
    requires transitive lora_interface;
    requires org.apache.commons.codec;
    requires transitive spring.security.core;
    requires transitive spring.security.config;
    requires transitive spring.security.web;
    requires transitive thymeleaf;
    requires transitive thymeleaf.spring5;

    exports lora.codec.ms;
    exports lora.ns.integration;
    exports lora.ns.connector;
    exports lora.ns.device;
    exports lora.ns.gateway;
    exports lora.ns.operation;
}
