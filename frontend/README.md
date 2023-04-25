# Frontend Application -PatientApp

## create envionment file in the folder

Below are the required variables to run the application

```bash
REACT_APP_API_URL=<Backend API url>
```

if you have used port 4001 then you should use `http://localhost:4001`

## create envionment file in the folder

Below are the required variables to run the application

```bash
API_PORT=4001
MONGO_URI=<mongodb connection string>
TOKEN_KEY=<any string which will help to encrypt data>
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

Your app is ready to be deployed!

### With docker

To run this application with the docker machine, run below command in your terminal

```bash
docker build -t client .
docker run -p 3000:3000 client
```
