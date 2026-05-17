import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/RouteUtilisateur.js";
import { config }  from "dotenv";
import { connectToMongo, getUsers } from "./db/mongo.js";
import igdbRoutes from "./routes/RoutesIGDB.js";
import  adminRoutes from "./routes/RoutesAdmin.js";
import panierRoutes from "./routes/RoutePanier.js";
import revueRoutes from "./routes/RouteRevue.js";
import biblioRoutes from "./routes/RouteBiblio.js";

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
app.use("/admin", adminRoutes);
app.use("/panier", panierRoutes);
app.use("/revues", revueRoutes);
app.use("/bibliotheque",biblioRoutes);
app.get("/testmongo", async (req, res) => {
  const users = await getUsers().find().toArray();

  res.json(users);
});


await connectToMongo(process.env.MONGODB_URI!);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});