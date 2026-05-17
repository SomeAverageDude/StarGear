import { Collection, Db, MongoClient } from "mongodb";
import { User } from "../models/utilisateur.js";
import { GameBlacklist } from "../models/jeuxBlacklist.js";
import { Panier } from "../models/panier.js";
import { Revue } from "../models/revue.js";
import { Bibliotheque } from "../models/bibliotheque.js";

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

export function getGameBlacklist() {
  return mongoClient.db().collection<GameBlacklist>("game_blacklist");
}
export function getPaniers(): Collection<Panier> {
  return getJwtDb().collection("paniers");
}
export function getRevues(): Collection<Revue> {
  return getJwtDb().collection("revues");
}

export function getBiblio(): Collection<Bibliotheque>{
  return getJwtDb().collection("Bibliotheques");
}
