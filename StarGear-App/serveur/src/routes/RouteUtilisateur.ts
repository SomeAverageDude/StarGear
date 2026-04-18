import bcrypt from "bcrypt";
import { Router } from "express";
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
    const refreshToken = await createAndSaveRefreshToken(user._id);
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

    // Make sure the received passwords are the same
    if (mdp != mdpConfirm) {
      return res.status(500).json({ message: "Les mots de passe ne correspondent pas" });
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
    };
    user.mdp = await bcrypt.hash(mdp, saltRounds);

    // Register the user in the BD
    const registerResult = await registerUser(getUsers(), user);
    if (!registerResult.acknowledged) {
      return res.status(500).json({ message: "Erreur de création de l'utilisateur" });
    }

    // Create and save refresh token in a safe cookie
    const refreshToken = await createAndSaveRefreshToken(
      registerResult.insertedId,
    );
    if (refreshToken == null) {
      res.status(500).json({ message: "Erreur lors de l'ajout du token de rafraîchissement" });
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
    });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});
export default router;
