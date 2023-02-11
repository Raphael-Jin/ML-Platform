
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
const url = 'mongodb://localhost:27017';

export const collections: { resquestRecord ?: mongoDB.Collection, resultRecord ?: mongoDB.Collection } = {}

export async function connectToMongoDB () {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(url);
          
  await client.connect();
      
  const db: mongoDB.Db = client.db('ml_model');

  const requestCollection: mongoDB.Collection = db.collection("model_request");
  const resultCollection: mongoDB.Collection = db.collection("model_result");

  collections.resquestRecord = requestCollection;
  collections.resultRecord = resultCollection;

  console.log(`Successfully connected to database: ${db.databaseName}`);
}