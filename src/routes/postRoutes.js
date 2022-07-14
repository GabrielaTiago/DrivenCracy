import { Router } from "express";
import { pollChoices, pollPost, pollVote } from "../controllers/postControllers.js";

const postRoutes = Router();

postRoutes.post("/poll", pollPost);
postRoutes.post("/choice", pollChoices);
postRoutes.post("/choice/:id/vote", pollVote);

export default postRoutes;