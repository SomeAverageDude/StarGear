import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
    // Create connection pool
    const pool = mysql.createPool({
        host: "localhost",
        user: "scott",
        password: "oracle",
        database: "StarGear",
    });

app.post("/inscription", async (req, res) => {
    const { nomUtilisateur, courriel, mdp } = req.body;
    try {
        const [rows] = await pool.execute(
            "INSERT INTO compte (username, mot_de_passe, courriel) VALUES (?, ?, ?)",
            [nomUtilisateur, mdp, courriel]
        );
        res.status(201).json({message: "Utilisateur créé avec succès!"})
    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
            res.status(409).json({ error: "Ce courriel est déjà utilisé." });
        } else {
            console.error("Erreur d'insertion d'Utilisateur:", error);
            res.status(500).json({ error: "Erreur du serveur" });
        }
    }
});

app.post("/connexion", async (req, res) => {
  const { courriel, mdp } = req.body;
    try {
    const [rows] = await pool.query("SELECT * FROM compte WHERE courriel = ? AND mot_de_passe = ?", [courriel, mdp]);
    res.status(201).json(rows);
  } catch (error) {
    console.error("Erreur de connexion:", error);
    res.status(500).json({ message: "Erreur de base de données" });
  }
});

app.get("/jeux", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM jeux");
        res.status(200).json(rows);
    }   
    catch (error) {
        console.error("Erreur de récupération des jeux:", error);
        res.status(500).json({ message: "Erreur de base de données" });
    }
});

