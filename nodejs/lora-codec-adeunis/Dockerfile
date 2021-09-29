FROM node:alpine

WORKDIR /usr/app

COPY ./package.json ./
RUN npm install\
        && npm install typescript -g
COPY ./ ./
RUN tsc
CMD ["npm", "start"]
