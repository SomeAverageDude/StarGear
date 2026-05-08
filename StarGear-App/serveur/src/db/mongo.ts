import { Collection, Db, MongoClient } from "mongodb";
import { User } from "../models/utilisateur.js";
import { Revue } from "../models/revue.js";

let mongoClient: MongoClient;

export async function connectToMongo(uri: string) {
  mongoClient = new MongoClient(uri);

  try {
    await mongoClient.connect();
  } catch (error) {
    throw Error("Connection to MongoDB failed, error: " + error);
  }
}

export function getJwtDb(): Db {
  return mongoClient.db();
}

export function getUsers(): Collection<User> {
  return getJwtDb().collection("users");
}

export function getRevues(): Collection<Revue> {
  return getJwtDb().collection("revues");
}