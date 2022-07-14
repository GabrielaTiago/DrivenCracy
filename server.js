import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./src/routes/postRoutes.js";
import getRoutes from "./src/routes/getRoutes.js";
dotenv.config();


const server = express();
server.use(json(), cors());


server.use(postRoutes);
server.use(getRoutes);


server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});