import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

client
  .connect()
  .then(() => {
    console.log("Connected successfully to server");
  })
  .catch(() => {
    console.log("database Error");
  });

const db = client.db("assignment");

export default db;
