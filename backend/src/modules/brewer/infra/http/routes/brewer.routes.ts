import { Router } from 'express';
import { celebrate } from 'celebrate';
import multer from 'multer';

import multerConfig from '@config/multer';
import {
  brewerCreateCelebrateConfig,
  brewerUpdatePhotoCelebrateConfig,
} from '@config/celebrate';

import BrewersController from '../controllers/BrewersController';
import BrewerUpdatePhotoController from '../controllers/BrewerUpdatePhotoController';

const brewerRouter = Router();
const upload = multer(multerConfig);

const brewersController = new BrewersController();
const brewerUpdatePhotoController = new BrewerUpdatePhotoController();

brewerRouter.post(
  '/brewer',
  upload.single('photo'),
  celebrate(brewerCreateCelebrateConfig, {
    abortEarly: false,
  }),
  brewersController.create,
);
brewerRouter.get('/brewer', brewersController.index);
brewerRouter.get('/brewer/:id', brewersController.show);
brewerRouter.delete('/brewer/:id', brewersController.delete);
brewerRouter.put(
  '/brewer/:id',
  upload.single('photo'),
  celebrate(brewerUpdatePhotoCelebrateConfig, {
    abortEarly: false,
  }),
  brewerUpdatePhotoController.update,
);

export default brewerRouter;
