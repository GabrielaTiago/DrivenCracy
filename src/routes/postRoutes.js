import { Router } from "express";
import { pollChoices, pollPost, pollVote } from "../controllers/postControllers.js";
import { countVotes } from "../middleware/counter.js";

const postRoutes = Router();

postRoutes.post("/poll", pollPost);
postRoutes.post("/choice", pollChoices);
postRoutes.post("/choice/:id/vote", countVotes, pollVote);

export default postRoutes;