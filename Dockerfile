FROM node:18.16.0-alpine3.16

RUN mkdir /server

WORKDIR /server

COPY . .

RUN npm i

EXPOSE 3000

CMD ["npm", "start"]