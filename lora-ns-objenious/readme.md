# Objenious LNS Integration
This is a LNS intgration for the Cumulocity LoRa framework (https://github.com/SoftwareAG/cumulocity-lora) to support the Objenius LNS (https://objenious.com). It is implemented as a Spring Boot application in Java.

## Setup routes in Objenius
If the microservice has the necessary to create routes to push the data from Objenious to the microservice it will create the routes itself. This is the recommended approach. If this is not the case, you will need to manually create the routes (https://api.objenious.com/doc/doc-routing.html). You will need to create two separate routes: one for uplink and one for downlink. The target url of the routings are:

```
https://<<tenant>>/service/lora-ns-objenious/<<lnsid>>/uplink
https://<<tenant>>/service/lora-ns-objenious/<<lnsid>>/downlink
```

## Build & Deploy

```
mvn package
```

The resulting microservice can be deployed either 
* manually via the Cumulocity Administration application or 
* automated using the Cumulocity Microservice Maven Plugin's upload task (https://cumulocity.com/guides/microservice-sdk/java/#maven-plugin) or
* automated using the Cumulocity Microservice Utility tool (https://cumulocity.com/guides/microservice-sdk/concept/#ms-utility-tool).


