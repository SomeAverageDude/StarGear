import { Router } from "express";
import {
    registerGame,
    getPanierByUserId,
    removeGame,
    clearPanier,
} from "../controllers/panierController.js";
import { getPaniers } from "../db/mongo.js";
import { ObjectId } from "mongodb";
import { authenticateToken } from "../middleware/jwtToken.js";

const router = Router();

router.post("/ajouter", async (req,res)=> {
    try {
        const{userId, jeu} = req.body;

        const panierCollection = getPaniers();

        const result = await registerGame(panierCollection, new ObjectId(userId),jeu);
        
        if(result.modifiedCount > 0 || result.upsertedCount > 0){
            res.status(200).json({message: "Jeu ajouté au panier"});
        } else {
            res.status(400).json({message: "Échec d'ajout du jeu"});
        }

    } catch(error){
        return res.status(500).json({ message: "Database error" });
    }
}
);

router.get("/recuperer",authenticateToken, async(req,res) =>{
    try {
        const userId = req.user?._id;

        const collectionPanier = getPaniers();

        const panier = getPanierByUserId(collectionPanier,userId);

        if (!panier){
            res.status(200).json({
                userId, 
                jeux:[],
                updatedAt: new Date()
            });
        }

        res.status(200).json(panier);
    }catch(error){
        return res.status(500).json({ message: "Database error" });
    }
}
);

router.delete("/enlever", authenticateToken,async(req,res) =>{
    try {
        const userId = req.user?._id; 
        const { gameId } = req.body;

        if (!gameId || !ObjectId.isValid(gameId)) {
            return res.status(400).json({ message: "id de jeu est invalide!" });
        }
        
        const collectionPanier = getPaniers();

        const result = await removeGame(
            collectionPanier,
            new ObjectId(userId),
            new ObjectId(gameId)
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Le jeu n'a pas été trouvé!" });
        }

        res.status(200).json({message: "Le jeu a été enelevé avec succès"});

    }catch(error){
        return res.status(500).json({message: "DataBase error"});
    }
}
);

router.delete("/clear",authenticateToken, async(req,res) =>{
    try{
        const userId = req.user?._id;

        const collectionPanier = getPaniers();

        const result = await clearPanier(collectionPanier,new ObjectId(userId));

        if (result.matchedCount === 0){
            res.status(404).json({message: "Le panier n'existe pas!"});
        }

        res.status(200).json({message: "Le panier à été vidé avec succès"});
    }catch(error){
        return res.status(500).json({message: "DataBase error"});
    }
});

export default router;