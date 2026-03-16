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

app.put("/jeux/:id/edit", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const {nom_jeu,developpeur,date_de_sortie,prix,sale,description,file_size,revue_id_revue} = req.body;

        const result = await pool.query(`UPDATE jeux
            SET nom_jeu = ?, developpeur = ?, date_de_sortie = ?, prix = ?, sale = ?, description = ?, file_size = ?, revue_id_revue = ?
            WHERE id_jeu = ?`,
            [nom_jeu,developpeur,date_de_sortie,prix,sale,description,file_size,revue_id_revue,id],
        );

        res.status(200).json({message: "Jeu modifié"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Database error" });
    }
});

app.delete("/jeux/:id/delete", async (req,res) => {
    try {
        const id = Number(req.params.id);

        await pool.query("DELETE FROM bibliotheque WHERE jeux_id_jeu = ?", [id]);
        
        const result = await pool.query("DELETE FROM jeux where id_jeu = ?",[id]);

        res.status(204).send();
    } catch (error){
        console.error(error);
        res.status(500).json({ message: "Database error" });
    }
});




