FROM node:21-alpine3.18

RUN mkdir /app

COPY . /app

WORKDIR /app

RUN npm install

RUN npm i -g sqlite3

CMD ["node", "index.js"]

EXPOSE 3000
