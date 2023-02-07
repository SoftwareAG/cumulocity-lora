FROM node:alpine as build

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

FROM node:alpine

WORKDIR /usr/app
COPY --from=build /usr/app/lora-codec-custom/dist ./
COPY --from=build /usr/app/lora-codec-custom/node_modules ./node_modules
RUN npm install pm2 -g

CMD ["pm2-runtime", "index.js"]
