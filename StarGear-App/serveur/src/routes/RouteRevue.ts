import { Router } from "express";
import { ObjectId } from "mongodb";
import { getRevues } from "../db/mongo.js";
import { authenticateToken } from "../middleware/jwtToken.js";

const router = Router();

router.get("/:jeuId", async (req, res) => {
  try {
    const jeuId = Number(req.params.jeuId);

    if (isNaN(jeuId)) {
      return res.status(400).json({ message: "ID du jeu invalide" });
    }

    const revues = await getRevues()
      .find({ jeuId: jeuId })
      .sort({ date: -1 })
      .toArray();

    return res.json(revues);
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors du chargement des revues" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { jeuId, note, commentaire } = req.body;

    if (!jeuId || !note) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    if (note < 1 || note > 5) {
      return res.status(400).json({ message: "La note doit être entre 1 et 5" });
    }

    const userId = new ObjectId(req.user?._id);

    const revue = {
      userId: userId,
      nomUtilisateur: req.user?.nomUtilisateur,
      jeuId: Number(jeuId),
      note: Number(note),
      commentaire: commentaire || "",
      date: new Date(),
    };

    await getRevues().updateOne(
      {
        userId: userId,
        jeuId: Number(jeuId),
      },
      {
        $set: revue,
      },
      {
        upsert: true,
      }
    );

    const revueFinale = await getRevues().findOne({
      userId: userId,
      jeuId: Number(jeuId),
    });

    return res.status(201).json(revueFinale);
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la création de la revue" });
  }
});

export default router;