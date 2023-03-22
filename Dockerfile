FROM node:16.12.0-alpine
WORKDIR /usr/src/app
COPY . .
RUN yarn install
CMD [ "yarn", "start" ]