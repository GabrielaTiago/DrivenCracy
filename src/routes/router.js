import { Router } from 'express';
import poolsRouter from './pollsRouter.js';
import choicesRouter from './choicesRouter.js';

const router = Router();

router.use(poolsRouter);
router.use(choicesRouter);

export default router;
