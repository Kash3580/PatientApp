
FROM node:16-alpine AS build

RUN mkdir /client
WORKDIR /client 
COPY . .
RUN npm i --no-progress
RUN  npm install -g serve
CMD ["npm", "run", "serve"]