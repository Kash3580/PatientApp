# Backend application- Hippa compliance based

This application includes below services

```bash
 POST /register
 POST /login
 GET /patients
 POST /patient
 PUT /patient
 DELETE /patient
```

## Requirements:

-Node.js
-npm

## How to install dependencies

Installing all the necessary packages

```bash
npm install
```

## create envionment file in the folder

Below are the required variables to run the application

```bash
API_PORT=4001
MONGO_URI=<mongodb connection string >
TOKEN_KEY=<any string which will help to encrypt data>
```

## To run the application on the local system

```bash
nodemon run dev
```

## With docker

To run this application with the docker machine, run below command in your terminal

```bash
docker build -t ServerApp .
docker run  -p 4001:4001 ServerApp
```
