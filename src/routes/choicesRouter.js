import { Router } from 'express';
import choicesController from '../controllers/choicesController.js';
import { countVotes } from '../middleware/counter.js';
import schemasValidation from '../middleware/schemasValidation.js';

const { pollChoices, pollVote } = choicesController;

const choicesRouter = Router();

choicesRouter.post('/choice', schemasValidation('choice'), pollChoices);
choicesRouter.post('/choice/:id/vote', countVotes, pollVote);

export default choicesRouter;
