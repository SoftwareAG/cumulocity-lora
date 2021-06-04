# Custom Codec
This is a device codec for the Cumulocity LoRa framework (https://github.com/SoftwareAG/cumulocity-lora) to allow for the implementation of custom codecs in Typescript at runtime. 

Custom codec implementations using this codec need to be self-contained and cannot use external dependencies. This codec is recommended mainly to rapidly prototype new codecs and investigate capabilities of devices.

## Build & Deploy
The device codec is a Cumulocity microservice. It can build using the following steps, which first build the node.js program, then build a Docker container image, and finally create a zip containing the Docker container image and the microservice manifest:

```
rm -f image.tar lora-codec-custom.zip
npm install
npm run-script build
docker build . -t lora-codec-custom
docker save lora-codec-custom > "image.tar"
zip lora-codec-custom.zip cumulocity.json image.tar
```

The resulting microservice can be deployed either manually via the Cumulocity Administration application or automated using the Cumulocity Microservice Utility tool (https://cumulocity.com/guides/microservice-sdk/concept/#ms-utility-tool).