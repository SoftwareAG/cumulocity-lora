# Objenius LNS Integration
This is a LNS intgration for the Cumulocity LoRa framework (https://github.com/SoftwareAG/cumulocity-lora) to support the Objenius LNS (https://objenious.com). It is implemented as a Spring Boot application in Java.

## Build & Deploy

```
mvn package
```

The resulting microservice can be deployed either 
* manually via the Cumulocity Administration application or 
* automated using the Cumulocity Microservice Maven Plugin's upload task (https://cumulocity.com/guides/microservice-sdk/java/#maven-plugin) or
* automated using the Cumulocity Microservice Utility tool (https://cumulocity.com/guides/microservice-sdk/concept/#ms-utility-tool).


