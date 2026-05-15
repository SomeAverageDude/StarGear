import { Router } from "express";
import {
  registerGame,
  getPanierByUserId,
  removeGame,
  clearPanier,
} from "../controllers/panierController.js";
import { GetPaniers } from "../db/mongo.js";
import { authenticateToken } from "../middleware/jwtToken.js";


const router = Router();

router.post("/ajouter", authenticateToken, async (req, res) => {
  try {
    const userId = req.user?._id;
    const { jeu } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Utilisateur non connecté" });
    }

    if (!jeu) {
      return res.status(400).json({ message: "Jeu manquant" });
    }

    const panierCollection = GetPaniers();

    const result = await registerGame(panierCollection, userId, jeu);


if (result.dejaPresent) {
  return res.status(409).json({
    message: "Jeu déjà dans le panier"
  });
}

return res.status(200).json({
  message: "Jeu ajouté au panier"
});

  } catch (error) {
    console.error("Erreur panier ajouter :", error);
    return res.status(500).json({ message: "Database error" });
  }
});

router.get("/recuperer", authenticateToken, async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Utilisateur non connecté" });
    }

    const collectionPanier = GetPaniers();

    const panier = await getPanierByUserId(collectionPanier, userId);

    if (!panier) {
      return res.status(200).json({
        userId: userId,
        jeux: [],
        updatedAt: new Date(),
      });
    }

    return res.status(200).json(panier);
  } catch (error) {
    console.error("Erreur panier recuperer :", error);
    return res.status(500).json({ message: "Database error" });
  }
});

router.delete("/supprimer/:igdbId", authenticateToken, async (req, res) => {
  try {
    const userId = req.user?._id;
    const igdbId = Number(req.params.igdbId);

    if (!userId) {
      return res.status(401).json({ message: "Utilisateur non connecté" });
    }

    if (isNaN(igdbId)) {
      return res.status(400).json({ message: "ID du jeu invalide" });
    }

    const collectionPanier = GetPaniers();

    const result = await removeGame(collectionPanier, userId, igdbId);

    if (result.modifiedCount > 0) {
      return res.status(200).json({ message: "Jeu supprimé du panier" });
    }

    return res.status(404).json({ message: "Jeu introuvable dans le panier" });
  } catch (error) {
    console.error("Erreur panier supprimer :", error);
    return res.status(500).json({ message: "Database error" });
  }
});

router.delete("/vider", authenticateToken, async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Utilisateur non connecté" });
    }

    const collectionPanier = GetPaniers();

    const result = await clearPanier(collectionPanier, userId);

    if (result.modifiedCount > 0) {
      return res.status(200).json({ message: "Panier vidé" });
    }

    return res.status(200).json({ message: "Panier déjà vide" });
  } catch (error) {
    console.error("Erreur panier vider :", error);
    return res.status(500).json({ message: "Database error" });
  }
});

export default router;