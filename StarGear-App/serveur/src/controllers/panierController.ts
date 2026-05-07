import { Collection, InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import { Panier } from "../models/panier.js";
import { Jeu } from "../models/jeu.js";

export async function registerGame(
    collection : Collection<Panier>,
    userId: ObjectId,
    nouveauJeu: Jeu,) : Promise<UpdateResult> {
    return await collection.updateOne(
        {userId: userId},
        {
            $push: {jeux: nouveauJeu},
            $set: {updatedAt: new Date()}
        },
        {upsert: true}
    );
}