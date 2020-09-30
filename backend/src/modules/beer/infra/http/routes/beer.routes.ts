import { Router } from 'express';
import { celebrate } from 'celebrate';

import { beerCreateCelebrateConfig } from '@config/celebrate';
import ensureAuthenticated from '@modules/brewer/infra/http/middlewares/ensureAuthenticated';
import CreateBeerController from '../controllers/CreateBeerController';

const beerRouter = Router();
const createBeerController = new CreateBeerController();

beerRouter.post(
  '/',
  ensureAuthenticated,
  celebrate(beerCreateCelebrateConfig),
  createBeerController.create,
);
// beerRouter.get('/', createBeerController.index);
// beerRouter.delete('/:id', ensureAuthenticated, createBeerController.delete);

export default beerRouter;
