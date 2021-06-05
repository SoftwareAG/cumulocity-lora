# Adeunis Codec
This is a device codec for the Cumulocity LoRa framework (https://github.com/SoftwareAG/cumulocity-lora) to support Adeunis devices (https://www.adeunis.com). It is implemented as Node.js program in TypeScript.

## Supported devices

* Adeunis Pulse
* Adeunis Pulse 3
* Adeunis Pulse 4
* Adeunis Temp  
* Adeunis Temp 3
* Adeunis Temp 4
* Adeunis Comfort 
* Adeunis Comfort 2

## Build & Deploy
The device codec is a Cumulocity microservice. It can build using the following steps, which first build the node.js program, then build a Docker container image, and finally create a zip containing the Docker container image and the microservice manifest:

```
rm -f image.tar lora-codec-adeunis.zip
npm install
npm run-script build
docker build . -t lora-codec-adeunis
docker save lora-codec-adeunis > "image.tar"
zip lora-codec-adeunis.zip cumulocity.json image.tar
```

The resulting microservice can be deployed either manually via the Cumulocity Administration application or automated using the Cumulocity Microservice Utility tool (https://cumulocity.com/guides/microservice-sdk/concept/#ms-utility-tool).