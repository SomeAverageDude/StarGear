import { ObjectId } from "mongodb";

export interface Jeu{
    _id?: ObjectId;
    titre: string;
    description: string;
    prix: string;
    genre: string;
    imageurl: string;
}