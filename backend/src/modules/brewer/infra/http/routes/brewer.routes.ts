import { Router } from 'express';
import { celebrate } from 'celebrate';

import { brewerCreateCelebrateConfig } from '@config/celebrate';
import BrewerController from '../controllers/BrewerController';

const brewerRouter = Router();
const brewerController = new BrewerController();

brewerRouter.post(
  '/',
  celebrate(brewerCreateCelebrateConfig),
  brewerController.create,
);

brewerRouter.get('/', brewerController.index);

brewerRouter.delete('/:id', brewerController.delete);

export default brewerRouter;
