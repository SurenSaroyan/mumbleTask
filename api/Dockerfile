FROM node:12-alpine

WORKDIR /app

ADD ./ ./

RUN yarn

EXPOSE 8000

RUN node -v

CMD [ "node", "index.js"]
