import { Router } from "express";
import { getPolls } from "../controllers/getController.js";

const getRoutes = Router();

getRoutes.get("/poll", getPolls);


export default getRoutes;