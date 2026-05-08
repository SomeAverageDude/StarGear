import { ObjectId } from "mongodb";

export interface Jeu{
    _id?: ObjectId;
    titre: string;
    description: string;
    prix: number;
    genre: string;
    imageurl: string;
}