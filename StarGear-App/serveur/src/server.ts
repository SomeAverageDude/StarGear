import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/RouteUtilisateur.js";
import { config } from "dotenv";
import { connectToMongo } from "./db/mongo.js";
import igdbRoutes from "./routes/RoutesIGDB.js";
<<<<<<< HEAD
import panierRoutes from "./routes/RoutePanier.js";
=======
import panierRoutes from "./routes/RoutesPanier.js";
>>>>>>> ee1b7cbc067153dbd3f6535d364f59ef78ae3739

config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/igdb", igdbRoutes);
<<<<<<< HEAD
app.use("/panier", panierRoutes);
=======
app.use("/panier",panierRoutes);
>>>>>>> ee1b7cbc067153dbd3f6535d364f59ef78ae3739

await connectToMongo(process.env.MONGODB_URI!);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});