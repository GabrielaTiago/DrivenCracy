import { Router } from 'express';
import poolsController from '../controllers/poolsController.js';
import choicesController from '../controllers/choicesController.js';

const { createPoll, getPolls, getResult } = poolsController;
const { getChoices } = choicesController;

const poolsRouter = Router();

poolsRouter.get('/poll', getPolls);
poolsRouter.post('/poll', createPoll);
poolsRouter.get('/poll/:id/choice', getChoices);
poolsRouter.get('/poll/:id/result', getResult);

export default poolsRouter;
