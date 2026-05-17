import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  courriel: string;
  mdp: string;
  nomUtilisateur?: string;
  token?: string;
  role: "user" | "admin";
}
