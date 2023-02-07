FROM node:alpine

WORKDIR /usr/app

COPY ./c8y-codec-interface/package.json ./c8y-codec-interface/package.json
COPY ./c8y-codec-interface/tsconfig.json ./c8y-codec-interface/tsconfig.json
COPY ./c8y-codec-interface/src ./c8y-codec-interface/src
WORKDIR /usr/app/c8y-codec-interface
RUN npm install && npm install typescript -g && tsc
WORKDIR /usr/app
COPY ./lora-codec-custom/package.json ./lora-codec-custom/package.json
COPY ./lora-codec-custom/tsconfig.json ./lora-codec-custom/tsconfig.json
COPY ./lora-codec-custom/src ./lora-codec-custom/src
WORKDIR /usr/app/lora-codec-custom
RUN npm install && tsc
CMD ["npm", "start"]
