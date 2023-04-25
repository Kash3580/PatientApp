# Demo Application-HIPAA Compliant based

This applicated is created with basic CRUD operation.

To run this application use `docker-compose.yml` file

## update environment variable

Below are the required variables need to setup to run the application

```bash
API_PORT=4001 <default>
MONGO_URI=<mongodb connection string>
TOKEN_KEY=<any string which will help to encrypt data>
REACT_APP_API_URL=<base on API_PORT update the url e.g. http://localhost:4001>

```

if you have used port 4001 then you should use `http://localhost:4001`

## MongoDB Atlas connection

To run the backend application, create database on Mongodb cloud
Here are the steps:

1. Go to https://cloud.mongodb.com/
2. login with your account
3. Under Database, Click on 'Browse Collection'
4. Create new database by clicking on 'Create Database' button
5. Enter Database name and collection name (Collection name must be `users` by default to run this application)
6. Once you create database and collection, get the connection string from dashboard and update in `docker-compose.yml`

### If you want to change the default port then update in `docker-compose.yml` under `Ports`

### How to run docker compose

use below command in your terminal,

```bash
docker-compose up
```

Once this command run successfully, go to your browser and hit below url

```bash
http://localhost:4001/test-user
```

this will add dummy user record in your `users` collection.

Now you can use below link to run frontend application

```bash
http://localhost:3000/
```

[Note: Port 3000 is default port specified in docker compose file, If you have already changed this port then update above URL accordingly ]

### Additionaly, If you want to run these applications separately. Please refer README document included in individual folders
