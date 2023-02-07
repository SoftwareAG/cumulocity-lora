FROM node:alpine

WORKDIR /usr/app

COPY ./dist ./dist
COPY ./node_modules ./node_modules
CMD ["node", "dist/index.js"]
