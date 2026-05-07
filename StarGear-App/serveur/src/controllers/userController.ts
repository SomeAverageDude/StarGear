import { Collection, InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import { User } from "../models/utilisateur.js";

export async function registerUser(
  collection: Collection<User>,
  user: User,
): Promise<InsertOneResult<User>> {
  return await collection.insertOne(user);
}

export async function getUserBycourriel(
  collection: Collection<User>,
  courriel: string,
): Promise<User | null> {
  return await collection.findOne({ courriel: courriel });
}

export async function getUserById(
  collection: Collection<User>,
  id: ObjectId | string,
): Promise<User | null> {
  const queryId = typeof id === "string" ? new ObjectId(id) : id;
  return await collection.findOne({ _id: queryId });
}

export async function updateUserToken(
  collection: Collection<User>,
  id: ObjectId,
  newToken?: string,
): Promise<UpdateResult> {
  const queryId = typeof id === "string" ? new ObjectId(id) : id;
  return await collection.updateOne(
    { _id: queryId },
    { $set: { token: newToken } },
  );
}
