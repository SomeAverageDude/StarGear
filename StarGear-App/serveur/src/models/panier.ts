import { ObjectId } from "mongodb";
import { Jeu } from "./jeu.js";

export interface Panier {
  _id?: ObjectId;

  userId: ObjectId;
  jeux: Jeu[];    

  updatedAt: Date;
}