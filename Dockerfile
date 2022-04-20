FROM node:16.14.2-alpine3.15

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY dist .

EXPOSE 3000

CMD [ "node", "main" ]