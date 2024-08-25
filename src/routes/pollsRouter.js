import { Router } from 'express';
import pollsController from '../controllers/pollsController.js';
import choicesController from '../controllers/choicesController.js';
import schemasValidation from '../middleware/schemasValidation.js';

const { createNewPoll, getAllPolls, searchPollResult } = pollsController;
const { getAllChoicesFromThePoll } = choicesController;

const poolsRouter = Router();

poolsRouter.get('/poll', getAllPolls);
poolsRouter.post('/poll', schemasValidation('pool'), createNewPoll);
poolsRouter.get('/poll/:id/choice', getAllChoicesFromThePoll);
poolsRouter.get('/poll/:id/result', searchPollResult);

export default poolsRouter;
