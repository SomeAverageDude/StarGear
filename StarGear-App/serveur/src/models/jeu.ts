import { ObjectId } from "mongodb";

export interface Jeu {
  _id?: ObjectId;
  igdb_id: number;
  nom: string;
  description?: string;
  cover?: string;
  prix: number;
}