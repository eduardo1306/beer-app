import { Router } from 'express';
import { celebrate } from 'celebrate';

import { beerCreateCelebrateConfig } from '@config/celebrate';
import BeerController from '../controllers/BeerController';

const brewerRouter = Router();
const beerController = new BeerController();

brewerRouter.post(
  '/:id',
  celebrate(beerCreateCelebrateConfig),
  beerController.create,
);
brewerRouter.get('/:id', beerController.index);

export default brewerRouter;
