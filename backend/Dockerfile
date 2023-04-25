
FROM node:16-alpine 

RUN mkdir /server
WORKDIR /server 
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install
COPY . . 
CMD ["node",  "index.js"]