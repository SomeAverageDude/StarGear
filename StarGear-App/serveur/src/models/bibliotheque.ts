import { ObjectId } from "mongodb";


export interface Bibliotheque {
  _id?: ObjectId;

  userId: ObjectId;
  jeux: number[]; // liste des IGDB IDs
}