import { Router } from "express";
import { getChoices, getPolls } from "../controllers/getController.js";

const getRoutes = Router();

getRoutes.get("/poll", getPolls);
getRoutes.get("/poll/:id/choice", getChoices);


export default getRoutes;