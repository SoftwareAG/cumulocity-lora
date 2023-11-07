rm image.tar
rm lora-codec-sampol.zip
cd ..
docker build . -t lora-codec-sampol -f lora-codec-sampol/Dockerfile
cd lora-codec-sampol
docker save lora-codec-sampol -o image.tar
zip lora-codec-sampol image.tar cumulocity.json
