import { ObjectId } from "mongodb";

<<<<<<< HEAD
export interface Jeu {
  _id?: ObjectId;
  igdb_id: number;
  nom: string;
  description?: string;
  cover?: string;
  prix: number;
=======
export interface Jeu{
    _id?: ObjectId;
    titre: string;
    description: string;
    prix: number;
    genre: string;
    imageurl: string;
>>>>>>> ee1b7cbc067153dbd3f6535d364f59ef78ae3739
}