import { Router } from "express";
import { getChoices, getPolls, getResult } from "../controllers/getController.js";

const getRoutes = Router();

getRoutes.get("/poll", getPolls);
getRoutes.get("/poll/:id/choice", getChoices);
getRoutes.get("/poll/:id/result", getResult);


export default getRoutes;