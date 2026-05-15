import { Collection, ObjectId, UpdateResult } from "mongodb";
import { Panier } from "../models/panier.js";
import { Jeu } from "../models/jeu.js";

export async function registerGame(
  collection: Collection<Panier>,
  userId: ObjectId,
  nouveauJeu: Jeu,
): Promise<{ dejaPresent: boolean }> {

  const panier = await collection.findOne({
    userId: userId,
    "jeux.igdb_id": nouveauJeu.igdb_id
  });

  if (panier) {
    return { dejaPresent: true };
  }

  await collection.updateOne(
    { userId },
    {
      $push: { jeux: nouveauJeu },
      $set: { updatedAt: new Date() }
    },
    { upsert: true }
  );

  return { dejaPresent: false };
}

export async function getPanierByUserId(
  collection: Collection<Panier>,
  userId: ObjectId,
): Promise<Panier | null> {
  return await collection.findOne({ userId: userId });
}

export async function removeGame(
  collection: Collection<Panier>,
  userId: ObjectId,
  igdbId: number,
): Promise<UpdateResult> {
  return await collection.updateOne(
    { userId: userId },
    {
      $pull: { jeux: { igdb_id: igdbId } },
      $set: { updatedAt: new Date() },
    },
  );
}

export async function clearPanier(
  collection: Collection<Panier>,
  userId: ObjectId,
): Promise<UpdateResult> {
  return await collection.updateOne(
    { userId: userId },
    {
      $set: {
        jeux: [],
        updatedAt: new Date(),
      },
    },
  );
}