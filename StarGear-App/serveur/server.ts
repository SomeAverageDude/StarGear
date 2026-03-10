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
        res.status(201).json({message: "Utilisateur créer avec succès!"})
    } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



