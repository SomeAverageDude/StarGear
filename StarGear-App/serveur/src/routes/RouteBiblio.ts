import { Router } from "express";
import { authenticateToken } from "../middleware/jwtToken.js";
import { addGame } from "../controllers/biblioController.js";
import { getBiblio } from "../db/mongo.js";
import { getPaniers } from "../db/mongo.js";
import { ObjectId } from "mongodb";
import { getLibrary } from "../controllers/biblioController.js";

const router = Router();

router.post("/acheter" , authenticateToken, async(req,res) =>{
try {
        const loggedInUser = (req as any).user; 
        
        // 3. We only pull 'listeJeux' from the body now. No userId needed!
        const { listeJeux } = req.body;

        if (!listeJeux || !Array.isArray(listeJeux)) {
             res.status(400).json({ 
                error: "Manque les jeux requis. mettez des jeux!" 
            });
            return;
        }

        const collection = getBiblio();

        const panierCollection = getPaniers();
        
        const userObjectId = new ObjectId(loggedInUser._id);

        const updatedLibrary = await addGame(collection, userObjectId, listeJeux);

        // Ce bout de code est pour vider le panier après l'achat
        await panierCollection.updateOne(
            { userId: userObjectId }, 
            { $set: { jeux: [] } }
        );

        res.status(200).json({
            message: "Les jeux ont été acheté avec succès!",
            library: updatedLibrary
        });

    } catch (error) {
        console.error("Erreur d'ajout des jeux", error);
        res.status(500).json({ error: "Erreur de serveur interne!" });
    }
});

//GET pour la biblio
router.get("/", authenticateToken, async (req, res) => {
    try {

        const loggedInUser = (req as any).user;

        const userObjectId = new ObjectId(loggedInUser._id);

        const collection = getBiblio();

        const bibliotheque = await getLibrary(
            collection,
            userObjectId
        );

        if (!bibliotheque) {
            res.status(404).json({
                error: "Bibliothèque introuvable"
            });
            return;
        }

        res.status(200).json(bibliotheque);

    } catch (error) {
        console.error("Erreur récupération bibliothèque", error);

        res.status(500).json({
            error: "Erreur serveur interne"
        });
    }
});

export default router;