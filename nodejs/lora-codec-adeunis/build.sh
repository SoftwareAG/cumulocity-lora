rm image.tar
rm lora-codec-adeunis.zip
cd ..
docker build . -t lora-codec-adeunis -f lora-codec-adeunis/Dockerfile
cd lora-codec-adeunis
docker save lora-codec-adeunis -o image.tar
zip lora-codec-adeunis image.tar cumulocity.json
