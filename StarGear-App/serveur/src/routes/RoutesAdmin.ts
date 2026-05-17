import { getBlacklistedIds, blacklistGame, unblacklistGame } from "../controllers/gameBlacklistController.js";
import { getGameBlacklist } from "../db/mongo.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { authenticateToken } from "../middleware/jwtToken.js";
import { Router } from "express";

const router = Router();

// GET /admin/jeux/blacklist — liste les igdb_id blacklistés
router.get("/jeux/blacklist", authenticateToken, requireAdmin, async (req, res) => {
  const ids = await getBlacklistedIds(getGameBlacklist());
  res.json(ids);
});

// PUT /admin/jeux/:igdb_id/blacklist
router.put("/jeux/:igdb_id/blacklist", authenticateToken, requireAdmin, async (req, res) => {
  const igdb_id = Number(req.params.igdb_id);
  if (isNaN(igdb_id)) return res.status(400).json({ message: "ID invalide" });
  await blacklistGame(getGameBlacklist(), igdb_id, req.user!._id);
  res.json({ message: "Jeu blacklisté" });
});

// DELETE /admin/jeux/:igdb_id/blacklist
router.delete("/jeux/:igdb_id/blacklist", authenticateToken, requireAdmin, async (req, res) => {
  const igdb_id = Number(req.params.igdb_id);
  await unblacklistGame(getGameBlacklist(), igdb_id);
  res.json({ message: "Jeu retiré de la blacklist" });
});

export default router;