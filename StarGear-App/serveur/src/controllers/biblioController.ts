import { Collection, ObjectId, UpdateResult } from "mongodb";
import { Bibliotheque } from "../models/bibliotheque.js";
import { Jeu } from "../models/jeu.js";

export async function addGame( 
    collection: Collection<Bibliotheque>,
    userId: ObjectId,
    listeJeux: Jeu[]
): Promise<Bibliotheque | null> {
    const jeuxIds = listeJeux.map(jeu => jeu.igdb_id);

    const result = await collection.findOneAndUpdate(
        { userId: userId }, 
        { 
            
            $addToSet: { jeux: { $each: jeuxIds } } 
        },
        { 
            returnDocument: "after", 
            upsert: true             
        }
    );

    return result;
}

export async function getLibrary(
    collection: Collection<Bibliotheque>,
    userId: ObjectId
): Promise<Bibliotheque | null> {

    const bibliotheque = await collection.findOne({
        userId: userId
    });

    return bibliotheque;
}