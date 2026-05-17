import { Router } from "express";
import {
  igdbFetch,
  formatGame,
  IGDB_CHAMPS,
} from "../controllers/IgdbController.js";

const router = Router();

// GET /igdb/jeux
router.get("/jeux", async (req, res) => {
  try {
    // Permet de récupérer des jeux spécifiques par leurs IDs
    if (req.query.ids) {
      const ids = (req.query.ids as string)
        .split(",")
        .map(Number)
        .filter(Boolean);
      if (ids.length === 0)
        return res.status(400).json({ message: "IDs invalides" });
      const data = await igdbFetch(`
        ${IGDB_CHAMPS}
        where id = (${ids.join(",")});
        limit ${ids.length};
      `);
      const map = new Map(data.map((g: any) => [g.id, g]));
      return res.json(
        ids
          .map((id) => map.get(id))
          .filter(Boolean)
          .map(formatGame),
      );
    }

    const offset = Math.floor(Math.random() * 200); // pour varier les jeux proposés à chaque reload

    const data = await igdbFetch(`
      ${IGDB_CHAMPS}
      where cover.image_id != null
        & screenshots.image_id != null
        & rating_count > 750;
      limit 20;
      offset ${offset};
    `);

    if (data.length === 0) {
      return res.status(500).json({ message: "Aucun jeu trouvé" });
    }

    res.json(data.map(formatGame));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur IGDB" });
  }
});
// GET /igdb/jeux/:id
router.get("/jeux/:id", async (req, res) => {
  const id = Number(req.params.id);
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
  const q = (req.query.q as string)?.trim();
  if (!q) return res.status(400).json({ message: "Paramètre 'q' requis" });

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
    res.json(data.map(formatGame));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur IGDB" });
  }
});

export default router;
