rm image.tar
rm lora-codec-custom.zip
cd ..
docker build . -t lora-codec-custom -f lora-codec-custom/Dockerfile
cd lora-codec-custom
docker save lora-codec-custom -o image.tar
zip lora-codec-custom image.tar cumulocity.json
