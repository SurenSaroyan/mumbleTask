FROM node:12-alpine

RUN npm i -g http-server

WORKDIR /app

ADD ./ ./

RUN yarn && yarn build

EXPOSE 3000

CMD [ "http-server",  "./build", "-p 3000"]
