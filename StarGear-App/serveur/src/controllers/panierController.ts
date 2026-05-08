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

export async function getPanierByUserId(
    collection: Collection<Panier>,
    userId: ObjectId
): Promise<Panier | null> {
   return await collection.findOne({userId: userId});
}

export async function removeGame(
    collection: Collection<Panier>,
    userId: ObjectId,
    gameId: ObjectId,
): Promise<UpdateResult> {
   return await collection.updateOne(
    {userId: userId},
    {
        $pull: {jeux:{_id: gameId}},
        $set: {updatedAt: new Date()}
    }
);
}

export async function clearPanier(
    collection: Collection<Panier>,
    userId: ObjectId
): Promise<UpdateResult> {
    return await collection.updateOne(
        { userId: userId },
        { 
            $set: { jeux: [], updatedAt: new Date() } 
        }
    );
}

export function calculateTotalPrice(panier: Panier){
    if (!panier.jeux || panier.jeux.length === 0) return 0;

    return panier.jeux.reduce((total,jeu) => {
        return total + (jeu.prix || 0);
    },0);
}