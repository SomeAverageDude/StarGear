import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/RouteUtilisateur.js";
import { config } from "dotenv";
import { connectToMongo } from "./db/mongo.js";


config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

await connectToMongo(process.env.MONGODB_URI!);

    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
app.use("/users", userRoutes);

const IGDB_CHAMPS = `
  fields name, summary, cover.image_id,
         artworks.image_id, screenshots.image_id, videos.video_id,
         involved_companies.company.name, involved_companies.developer,
         first_release_date;
`;

async function igdbFetch(body: string) {
  const res = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": process.env.IGDB_CLIENT_ID!,
      "Authorization": `Bearer ${process.env.IGDB_TOKEN}`,
      "Accept": "application/json",
    },
    body,
  });
  if (!res.ok) throw new Error(`IGDB error: ${res.status} ${res.statusText}`);
  return res.json();
}

function formatGame(game: any) {
  return {
    igdb_id:     game.id,
    nom:         game.name,
    description: game.summary ?? null,
    developpeur: game.involved_companies?.find((c: any) => c.developer)?.company?.name ?? null,
    sortie:      game.first_release_date
                   ? new Date(game.first_release_date * 1000).toISOString().split("T")[0]
                   : null,
    cover:       game.cover?.image_id
                   ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
                   : null,
    banner:      game.artworks?.[0]?.image_id
                   ? `https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${game.artworks[0].image_id}.jpg`
                   : game.screenshots?.[0]?.image_id
                     ? `https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${game.screenshots[0].image_id}.jpg`
                     : null,
    screenshots: game.screenshots?.map((s: any) =>
                   `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${s.image_id}.jpg`
                 ) ?? [],
    videos:      game.videos?.slice(0, 3).map((v: any) =>
                   `https://www.youtube.com/embed/${v.video_id}`
                 ) ?? [],
    prix:        ((game.id % 40) + 9.99).toFixed(2),
  };
}

// GET /igdb/jeux
app.get("/igdb/jeux", async (req, res) => {
  try {
    if (req.query.ids) {
      const ids = (req.query.ids as string).split(",").map(Number).filter(Boolean);
      if (!ids.length) return res.status(400).json({ message: "IDs invalides" });

      const data = await igdbFetch(`
        ${IGDB_CHAMPS}
        where id = (${ids.join(",")});
        limit ${ids.length};
      `);

      const map = new Map(data.map((g: any) => [g.id, g]));
      return res.json(ids.map(id => map.get(id)).filter(Boolean).map(formatGame));
    }

    const limit  = Math.min(Number(req.query.limit) || 20, 50);
    const offset = Number(req.query.offset) || 0;

    const data = await igdbFetch(`
      ${IGDB_CHAMPS}
      where rating > 75 & cover.image_id != null & rating_count > 50;
      sort rating_count desc;
      limit ${limit};
      offset ${offset};
    `);

    res.json(data.map(formatGame));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur IGDB" });
  }
});

// GET /igdb/jeux/:id
app.get("/igdb/jeux/:id", async (req, res) => {
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
app.get("/igdb/search", async (req, res) => {
  const q = (req.query.q as string)?.trim();
  if (!q) return res.status(400).json({ message: "Paramètre 'q' requis" });

  const limit  = Math.min(Number(req.query.limit) || 20, 50);
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
