module lora.ns.ms {
    requires transitive lora_interface;
    requires org.apache.commons.codec;
    requires rest.representation;
    requires org.joda.time;
    requires core.model;
    requires device.capability.model;
    requires org.slf4j;
    requires svenson;
    requires java.client;
    requires com.fasterxml.jackson.core;
    requires com.fasterxml.jackson.databind;
    requires microservice.subscription;
    requires microservice.context;
    requires spring.beans;
    requires spring.web;
    requires spring.core;
    requires spring.context;
    requires spring.security.core;
    requires spring.security.config;
    requires spring.security.web;
    requires com.google.common;

    exports lora.codec.ms;
    exports lora.ns.integration;
    exports lora.ns.connector;
}
