import bcrypt from "bcrypt";
import { Router } from "express";
import { ObjectId } from "mongodb";

import {
  getUserBycourriel,
  registerUser,
  updateUserToken,
  getUserById,
} from "../controllers/userController.js";
import { getUsers } from "../db/mongo.js";
import {
  authenticateToken,
  createAndSaveRefreshToken,
} from "../middleware/jwtToken.js";
import { User } from "../models/utilisateur.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();
const saltRounds = 10;

router.post("/Connexion", async (req, res) => {
  try {
    let { courriel, mdp, remember } = req.body;

    const user = await getUserBycourriel(getUsers(), courriel);

    // Make sure the courriel exists
    if (user == null || user._id == null)
      return res.status(401).json({ message: "courriel doesn't exist" });

    // Make sure the mdp matches
    const match = await bcrypt.compare(mdp, user!.mdp);
    if (!match)
      return res.status(401).json({ message: "Password doesn't match" });

    // Create and save refresh token in a safe cookie
    const refreshToken = await createAndSaveRefreshToken(user._id, user.role);
    if (refreshToken == null) {
      res.status(500).json({ message: "Failed to add refresh token" });
    }
    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
      sameSite: "lax",
      secure: false,
    });

    return res.status(201).json({ message: "Connected" });
  } catch (error) {
    return res.status(500).json({ message: "Database error" });
  }
});

router.post("/Inscription", async (req, res) => {
  try {
    const { courriel, mdp, mdpConfirm, nomUtilisateur } = req.body;


    // Validation des champs reçus    
    if (!courriel || !mdp || !mdpConfirm || !nomUtilisateur) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    if (courriel.trim() === "" || nomUtilisateur.trim() === "") {
      return res.status(400).json({ message: "Champs invalides" });
    }

    // Make sure the received passwords are the same
    if (mdp != mdpConfirm) {
      return res
        .status(500)
        .json({ message: "Les mots de passe ne correspondent pas" });
    }

    // Make sure the courriel is not already used
    const userExists = await getUserBycourriel(getUsers(), courriel);
    if (userExists != null) {
      return res.status(500).json({ message: "Courriel déjà utilisé" });
    }

    // Create the user and hash the password
    const user: User = {
      courriel: courriel,
      mdp: mdp,
      nomUtilisateur: nomUtilisateur,
      token: "",
      role : "user",
    };
    user.mdp = await bcrypt.hash(mdp, saltRounds);

    // Register the user in the BD
    const registerResult = await registerUser(getUsers(), user);
    if (!registerResult.acknowledged) {
      return res
        .status(500)
        .json({ message: "Erreur de création de l'utilisateur" });
    }

    // Create and save refresh token in a safe cookie
    const refreshToken = await createAndSaveRefreshToken(
      registerResult.insertedId,
      user.role
    );
    if (refreshToken == null) {
      res
        .status(500)
        .json({
          message: "Erreur lors de l'ajout du token de rafraîchissement",
        });
    }
    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
      sameSite: "lax",
      secure: false,
    });

    return res.status(201).json({ message: "Inscription réussie!" });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de base de données" });
  }
});

router.post("/Deconnexion", authenticateToken, async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Clear the token from the DB
    await updateUserToken(getUsers(), userId);

    // Clear the cookie from the browser
    res.clearCookie("refresh", {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({ message: "Logged out" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Database error" });
  }
});
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const userId = req.user?._id;

    const user = await getUserById(getUsers(), userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      nomUtilisateur: user.nomUtilisateur,
      courriel: user.courriel,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});
// GET tous les users
router.get("/", authenticateToken,requireAdmin,async (req, res) => {
 try {
    const users = await getUsers().find().toArray();
    res.json(users || []);
  } catch (error) {
    res.status(500).json([]);
  }
});

// DELETE user
router.delete("/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params as { id: string };

  
    const userToDelete = await getUsers().findOne({ _id: new ObjectId(id) });

    if (!userToDelete) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    if (userToDelete.role === "admin") {
      return res.status(403).json({ message: "Impossible de supprimer un administrateur" });
    }

    await getUsers().deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Erreur" });
  }
});

// UPDATE user
router.put("/:id",authenticateToken,requireAdmin, async (req, res) => {
  try {
    const { id } = req.params as { id: string };
    const { courriel, nomUtilisateur } = req.body;

    await getUsers().updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { courriel, nomUtilisateur },
      },
    );

    res.json({ message: "User updated" });
  } catch (error) {
    res.status(500).json({ message: "Erreur" });
  }
});
export default router;
