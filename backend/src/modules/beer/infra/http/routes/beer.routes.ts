import { Router } from 'express';
import { celebrate } from 'celebrate';

import { beerCreateCelebrateConfig } from '@config/celebrate';
import BeerController from '../controllers/BeerController';

const beerRouter = Router();
const beerController = new BeerController();

beerRouter.post(
  '/:brewer_id',
  celebrate(beerCreateCelebrateConfig),
  beerController.create,
);

beerRouter.get('/:brewer_id', beerController.index);

beerRouter.delete('/:brewer_id', beerController.delete);

export default beerRouter;
