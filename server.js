const express = require("express");
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGO_URL = "mongodb://admin:qwerty@localhost:27017";
const client = new MongoClient(MONGO_URL);

//GET all users
app.get("/getUsers", async (req, res) => {
    await client.connect(URL);
    console.log('Connected successfully to server');

    const db = client.db("dishants-db");
    const data = await db.collection('users').find({}).toArray();
    
    client.close();
    res.send(data);
});

//POST new user
app.post("/addUser", async (req, res) => {
    const userObj = req.body;
    console.log(req.body);
    await client.connect(URL);
    console.log('Connected successfully to server');

    const db = client.db("dishants-db");
    const data = await db.collection('users').insertOne(userObj);
    console.log(data);
    console.log("data inserted in DB");
    client.close();
});


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

/*node server.js

for mongoDB
docker run -d -p27017:27017 --name mongo --network mongo-network -e MONGO_INITDB_ROOT_USERNAME=admin -eMONGO_INITDB_ROOT_PASSWORD=qwerty mongo

for mongo-express
docker run -d -p8081:8081 --name mongo-express --network mongo-network -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin -e ME_CONFIG_MONGODB_ADMINPASSWORD=qwerty -e ME_CONFIG_MONGODB_URL="mongodb://admin:qwerty@mongo:27017" mongo-express







*/