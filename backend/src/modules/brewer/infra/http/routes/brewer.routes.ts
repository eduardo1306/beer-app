import { Router } from 'express';
import { celebrate } from 'celebrate';

import { brewerCreateCelebrateConfig } from '@config/celebrate';
import BrewerController from '../controllers/BrewerController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const brewerRouter = Router();
const brewerController = new BrewerController();

brewerRouter.post(
  '/',
  celebrate(brewerCreateCelebrateConfig),
  brewerController.create,
);
brewerRouter.get('/', brewerController.index);
brewerRouter.delete('/:id', ensureAuthenticated, brewerController.delete);

export default brewerRouter;
