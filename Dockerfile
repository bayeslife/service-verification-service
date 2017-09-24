FROM node:boron

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY src/server ./src/server

EXPOSE 8080

CMD [ "npm","start"]
