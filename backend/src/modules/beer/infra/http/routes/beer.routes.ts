import { Router } from 'express';
import { celebrate } from 'celebrate';
import multer from 'multer';

import multerConfig from '@config/multer';
import {
  beerUpdatePhotoCelebrateConfig,
  beerCreateCelebrateConfig,
} from '@config/celebrate';

import BeersController from '../controllers/BeersController';
import BeersUpdateAvatarController from '../controllers/BeersUpdateAvatarController';

const upload = multer(multerConfig);
const beerRouter = Router();

const beersController = new BeersController();
const beersUpdateAvatarController = new BeersUpdateAvatarController();

beerRouter.get('/beer', beersController.index);
beerRouter.post(
  '/beer/:id',
  upload.single('image'),
  celebrate(beerCreateCelebrateConfig, {
    abortEarly: false,
  }),
  beersController.create,
);
beerRouter.delete('/beer', beersController.delete);
beerRouter.put(
  '/beer',
  upload.single('image'),
  celebrate(beerUpdatePhotoCelebrateConfig, {
    abortEarly: false,
  }),
  beersUpdateAvatarController.update,
);

export default beerRouter;
