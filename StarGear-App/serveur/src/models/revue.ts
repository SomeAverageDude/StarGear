import { ObjectId } from "mongodb";

export interface Revue {
  _id?: ObjectId;
  userId: ObjectId; 
  jeuId: number;     
  note: number;      
  commentaire?: string;}