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

        const [rows] = await pool.query("SELECT jeux.*, imagesjeux.lien FROM jeux LEFT JOIN imagesjeux ON imagesjeux.jeux_id_jeu = jeux.id_jeu"); // Jointure pour récupérer le lien de l'image
        res.status(200).json(rows);
    }   
    catch (error) {
        console.error("Erreur de récupération des jeux:", error);
        res.status(500).json({ message: "Erreur de base de données" });
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

        await pool.query("DELETE FROM imagesjeux WHERE jeux_id_jeu = ?", [id]);
        
        const result = await pool.query("DELETE FROM jeux where id_jeu = ?",[id]);

        res.status(204).send();
    } catch (error){
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


app.get("/jeux/search", async (req,res) => {
    try{
        const nom_jeu = (req.query.nom_jeu);
           if (!nom_jeu) {
            return res.status(400).json({ message: "Nom du jeu requis" });
        }

        const result = await pool.query("SELECT * FROM jeux where nom_jeux LIKE ?", [`%${nom_jeu}%`]);
        
        res.status(200).json({result});
    } catch (error){
        console.error(error);
        res.status(500).json({message: "Database error"})
    }
});

