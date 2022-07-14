import { Router } from "express";
import { pollChoices, pollPost } from "../controllers/postControllers.js";

const postRoutes = Router();

postRoutes.post("/poll", pollPost);
postRoutes.post("/choice", pollChoices);

export default postRoutes;