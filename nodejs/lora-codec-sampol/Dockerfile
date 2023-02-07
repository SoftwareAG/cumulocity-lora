FROM node:alpine

WORKDIR /usr/app

COPY ./c8y-codec-interface/package.json ./c8y-codec-interface/package.json
COPY ./c8y-codec-interface/tsconfig.json ./c8y-codec-interface/tsconfig.json
COPY ./c8y-codec-interface/src ./c8y-codec-interface/src
WORKDIR /usr/app/c8y-codec-interface
RUN npm install && npm install typescript -g && tsc
WORKDIR /usr/app
COPY ./lora-codec-sampol/package.json ./lora-codec-sampol/package.json
COPY ./lora-codec-sampol/tsconfig.json ./lora-codec-sampol/tsconfig.json
COPY ./lora-codec-sampol/src ./lora-codec-sampol/src
WORKDIR /usr/app/lora-codec-sampol
RUN npm install && tsc
CMD ["npm", "start"]
