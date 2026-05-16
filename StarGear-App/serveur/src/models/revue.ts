import { ObjectId } from "mongodb";

export interface Revue {
  _id?: ObjectId;
  userId: ObjectId;
  nomUtilisateur: string;
  jeuId: number;
  note: number;
  commentaire?: string;
  date?: Date;
}