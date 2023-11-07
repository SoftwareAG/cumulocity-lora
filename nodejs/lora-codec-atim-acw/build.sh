rm image.tar
rm lora-codec-atim-acw.zip
cd ..
docker build . -t lora-codec-atim-acw -f lora-codec-atim-acw/Dockerfile
cd lora-codec-atim-acw
docker save lora-codec-atim-acw -o image.tar
zip lora-codec-atim-acw image.tar cumulocity.json
