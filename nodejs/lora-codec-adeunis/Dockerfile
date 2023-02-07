FROM node:alpine

WORKDIR /usr/app

COPY ./c8y-codec-interface/package.json ./c8y-codec-interface/package.json
COPY ./c8y-codec-interface/tsconfig.json ./c8y-codec-interface/tsconfig.json
COPY ./c8y-codec-interface/src ./c8y-codec-interface/src
WORKDIR /usr/app/c8y-codec-interface
RUN npm install && npm install typescript -g && tsc
WORKDIR /usr/app
COPY ./lora-codec-adeunis/package.json ./lora-codec-adeunis/package.json
COPY ./lora-codec-adeunis/tsconfig.json ./lora-codec-adeunis/tsconfig.json
COPY ./lora-codec-adeunis/src ./lora-codec-adeunis/src
WORKDIR /usr/app/lora-codec-adeunis
RUN npm install && tsc
CMD ["npm", "start"]
