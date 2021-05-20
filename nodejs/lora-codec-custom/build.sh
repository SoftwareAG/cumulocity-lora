rm image.tar
rm lora-codec-custom.zip
docker build . -t lora-codec-custom
docker save lora-codec-custom -o image.tar
zip lora-codec-custom image.tar cumulocity.json
