import { Router } from 'express';
import { celebrate } from 'celebrate';

import { beerCreateCelebrateConfig } from '@config/celebrate';
import BeerController from '../controllers/BeerController';

const beerRouter = Router();
const beerController = new BeerController();

beerRouter.post(
  '/:id',
  celebrate(beerCreateCelebrateConfig),
  beerController.create,
);
beerRouter.get('/', beerController.index);

export default beerRouter;
