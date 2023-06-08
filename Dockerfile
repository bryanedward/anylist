FROM node:16-alpine AS development

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD sleep infinity

