import { Collection, ObjectId } from "mongodb";
import { GameBlacklist } from "../models/jeuxBlacklist.js";

export async function getBlacklistedIds(col: Collection<GameBlacklist>) {
  const docs = await col.find().toArray();
  return docs.map(d => d.igdb_id);
}

export async function blacklistGame(col: Collection<GameBlacklist>, igdb_id: number, admin_id: ObjectId) {
  return col.updateOne(
    { igdb_id },
    { $setOnInsert: { igdb_id, ajoute_au: new Date() } },
    { upsert: true }
  );
}

export async function unblacklistGame(col: Collection<GameBlacklist>, igdb_id: number) {
  return col.deleteOne({ igdb_id });
}