# nke WATTECO Codec
This is a device codec for the Cumulocity LoRa framework (https://github.com/SoftwareAG/cumulocity-lora) to support nke WATTECO devices (https://www.nke-watteco.com). It is implemented as a Spring Boot application in Java.

## Supported devices

* nke WATTECO Sens'O (50-70-011)
* nke WATTECO Pulse Sens'O (50-70-014/039/051/072/079/160)
* nke WATTECO Press'O (50-70-016)
* nke WATTECO Remote temperature (50-70-043/142)
* nke WATTECO TH (50-70-053/080)
* nke WATTECO T (50-70-085/167)
* nke WATTECO Ventil'O (50-70-101/166)
* nke WATTECO Clos'O (50-70-108)
* nke WATTECO Remote temperature 2CTN (50-70-139/163)

## Build & Deploy

```
mvn package
```

The resulting microservice can be deployed either 
* manually via the Cumulocity Administration application or 
* automated using the Cumulocity Microservice Maven Plugin's upload task (https://cumulocity.com/guides/microservice-sdk/java/#maven-plugin) or
* automated using the Cumulocity Microservice Utility tool (https://cumulocity.com/guides/microservice-sdk/concept/#ms-utility-tool).


