import { Router } from "express";
import {
  igdbFetch,
  formatGame,
  IGDB_CHAMPS,
} from "../controllers/IgdbController.js";

import { getBlacklistedIds } from "../controllers/gameBlacklistController.js";
import { getGameBlacklist } from "../db/mongo.js";

const router = Router();

// GET /igdb/jeux
router.get("/jeux", async (req, res) => {
  try {
    const isAdmin = req.query.admin === "true";

    const blacklisted = isAdmin
      ? []
      : await getBlacklistedIds(getGameBlacklist());

    // ── Jeux spécifiques par IDs ──
    if (req.query.ids) {
      const ids = (req.query.ids as string)
        .split(",")
        .map(Number)
        .filter(Boolean);

      if (!ids.length) {
        return res.status(400).json({ message: "IDs invalides" });
      }

      const data = await igdbFetch(`
        ${IGDB_CHAMPS}
        where id = (${ids.join(",")});
        limit ${ids.length};
      `);

      const filtered = data.filter(
        (g: any) => !blacklisted.includes(g.id),
      );

      const map = new Map(filtered.map((g: any) => [g.id, g]));

      return res.json(
        ids
          .map((id) => map.get(id))
          .filter(Boolean)
          .map(formatGame),
      );
    }

    const offset = Math.floor(Math.random() * 200); // pour varier les jeux proposés à chaque reload

    const query = isAdmin
      ? `
        ${IGDB_CHAMPS}
        where cover.image_id != null;
        sort total_rating_count desc;
        offset ${offset};
      `
      : `
        ${IGDB_CHAMPS}
        where rating > 75
          & cover.image_id != null
          & rating_count > 50;
        sort rating_count desc;
        offset ${offset};
      `;

    const data = await igdbFetch(query);

    // ── Filtrage blacklist côté backend ──
    const filtered = data.filter(
      (g: any) => !blacklisted.includes(g.id),
    );

    res.json(filtered.map(formatGame));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur IGDB" });
  }
});
// GET /igdb/jeux/:id
router.get("/jeux/:id", async (req, res) => {
  const id = Number(req.params.id);
  const blacklisted = await getBlacklistedIds(getGameBlacklist());
  if (blacklisted.includes(id)) {
    return res.status(404).json({ message: "Jeu introuvable" });
  }
  if (isNaN(id)) return res.status(400).json({ message: "ID invalide" });

  try {
    const data = await igdbFetch(`${IGDB_CHAMPS} where id = ${id};`);
    const game = data[0];
    if (!game) return res.status(404).json({ message: "Jeu introuvable" });
    if (!game.screenshots?.[0]?.image_id && !game.cover?.image_id) {
      return res.status(404).json({ message: "Jeu sans image" });
    }
    res.json(formatGame(game));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur IGDB" });
  }
});

// GET /igdb/search?q=jeu+name
router.get("/search", async (req, res) => {
  const isAdmin = req.query.admin === "true";

  const blacklisted = isAdmin
    ? []
    : await getBlacklistedIds(getGameBlacklist());

  const q = (req.query.q as string)?.trim();

  if (!q) {
    return res.status(400).json({ message: "Paramètre 'q' requis" });
  }

  const limit = Math.min(Number(req.query.limit) || 20, 50);
  const offset = Number(req.query.offset) || 0;

  try {
    const data = await igdbFetch(`
  search "${q.replace(/"/g, "")}";
  ${IGDB_CHAMPS}
  where cover.image_id != null;
  limit ${limit};
  offset ${offset};
`);

    // Filtre les jeux blacklistés    
    const filtered = data.filter((g: any) => !blacklisted.includes(g.id));

    res.json(filtered.map(formatGame));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur IGDB" });
  }
});

export default router;
