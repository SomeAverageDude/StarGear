import { ObjectId } from "mongodb";

export interface Panier {
  _id?: ObjectId;

  userId: ObjectId;
  jeux: number[];    

  updatedAt: Date;
}