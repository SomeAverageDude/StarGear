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

