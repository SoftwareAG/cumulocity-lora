FROM node:alpine as build

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

FROM node:alpine

WORKDIR /usr/app
COPY --from=build /usr/app/lora-codec-sampol/dist ./
COPY --from=build /usr/app/lora-codec-sampol/node_modules ./node_modules
RUN npm install pm2 -g

CMD ["pm2-runtime", "index.js"]

