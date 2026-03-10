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

app.post("/inscription", async (req, res) => {
    const { nomUtilisateur, courriel, mdp } = req.body;
1
    try {
        const [rows] = await pool.execute(
            "INSERT INTO Compte (username, email, mot_de_passe) VALUES (?, ?, ?)",
            [nomUtilisateur, courriel, mdp]
        );
        res.status(201).json({message: "Utilisateur créer avec succès!"})
    } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Create connection pool
const pool = mysql.createPool({
    host: "localhost",
    user: "scott",
    password: "oracle",
    database: "StarGear",
});

