# Inno PoC Codec
This is a device codec for the Cumulocity LoRa framework (https://github.com/SoftwareAG/cumulocity-lora) to support a custom device sending ground moisture values encoded on 2 bytes

Moisture (2 Bytes) | Other1 (2 Bytes) | Other2 (2 Bytes) | Other3 (2 Bytes)

6 bytes reserved for future usages

## Build & Deploy

```
mvn package
```

The resulting microservice can be deployed either 
* manually via the Cumulocity Administration application or 
* automated using the Cumulocity Microservice Maven Plugin's upload task (https://cumulocity.com/guides/microservice-sdk/java/#maven-plugin) or
* automated using the Cumulocity Microservice Utility tool (https://cumulocity.com/guides/microservice-sdk/concept/#ms-utility-tool).


