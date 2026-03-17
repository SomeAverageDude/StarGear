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

app.get("/jeux", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM jeux");
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Database error"})
    }
});

app.get("/jeux/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const [result] = await pool.query("SELECT * FROM jeux WHERE id_jeu = ?", [
            id,
        ]);

        const jeu = (result as any[])[0];

        if (!jeu){
            return res.status(404).json({ message: "Jeu non trouvé" });
        }

        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Database error" });
    }
});
app.get("/images/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const [rows] = await pool.query("SELECT * FROM imagesjeux WHERE jeux_id_jeu = ?", [id]);
        
        const image = (rows as any[])[0];
        if (!image){
            return res.status(404).json({ message: "Image non trouvé" });
        }


        
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Database error"})
    }
});

