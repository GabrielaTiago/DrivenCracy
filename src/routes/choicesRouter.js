import { Router } from 'express';
import choicesController from '../controllers/choicesController.js';
import schemasValidation from '../middleware/schemasValidation.js';

const { createNewChoice, voteOnThePollChoice } = choicesController;

const choicesRouter = Router();

choicesRouter.post('/choice', schemasValidation('choice'), createNewChoice);
choicesRouter.post('/choice/:id/vote', voteOnThePollChoice);

export default choicesRouter;
