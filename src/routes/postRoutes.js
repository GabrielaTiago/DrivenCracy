import { Router } from "express";
import { pollPost } from "../controllers/postControllers.js";

const postRoutes = Router();

postRoutes.post("/poll", pollPost);
postRoutes.post("/choice", );

export default postRoutes;