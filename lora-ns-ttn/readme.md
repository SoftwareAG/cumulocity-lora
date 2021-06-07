# The Things Network (TTN) LNS Integration
This is a LNS intgration for the Cumulocity LoRa framework (https://github.com/SoftwareAG/cumulocity-lora) to support the The Things Network LNS (https://www.thethingsnetwork.org/). It is implemented as a Spring Boot application in Java.

## Build & Deploy
The TTN Lora LNS implementation requires an installation of Go to compile the Google Protocol Buffer schemas. The "setenv.sh" script configures the Go environment and needs to be run before building the microservice:

```
. ./setenv.sh
mvn package
```

The resulting microservice can be deployed either 
* manually via the Cumulocity Administration application or 
* automated using the Cumulocity Microservice Maven Plugin's upload task (https://cumulocity.com/guides/microservice-sdk/java/#maven-plugin) or
* automated using the Cumulocity Microservice Utility tool (https://cumulocity.com/guides/microservice-sdk/concept/#ms-utility-tool).


