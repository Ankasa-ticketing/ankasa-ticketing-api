FROM node:alpine

WORKDIR /app

COPY package*.json ./

COPY .env ./

COPY . .

RUN npm install

EXPOSE 5001

CMD [ "node", "index"]