import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import multerConfig from '../config/multer';
import {
  brewerCreateCelebrateConfig,
  brewerUpdatePhotoCelebrateConfig,
} from '../config/celebrate';
import CreateBrewerService from '../services/BrewerServices/CreateBrewerService';
import DeleteBrewerService from '../services/BrewerServices/DeleteBrewerService';
import UpdateBrewerPhotoService from '../services/BrewerServices/UpdateBrewerPhotoService';

import BrewerRepository from '../repositories/BrewerRepository';
import BeerRepository from '../repositories/BeerRepository';

const brewerRouter = Router();
const upload = multer(multerConfig);

brewerRouter.post(
  '/brewer',
  upload.single('photo'),
  celebrate(brewerCreateCelebrateConfig, {
    abortEarly: false,
  }),
  async (request, response) => {
    try {
      const createBrewerService = new CreateBrewerService();

      const {
        name,
        latitude,
        longitude,
        email,
        password,
        city,
        uf,
        whatsapp,
      } = request.body;
      const photo = request.file;

      if (!photo) {
        const brewer = await createBrewerService.execute({
          latitude,
          longitude,
          email,
          name,
          password,
          photo:
            'https://assets.buscacity.com.br/wp-content/uploads/2017/03/19090426/default_user.jpg',
          city,
          uf,
          whatsapp,
        });

        return response.send(brewer);
      }

      const brewer = await createBrewerService.execute({
        latitude,
        longitude,
        email,
        name,
        password,
        photo: photo.filename,
        city,
        uf,
        whatsapp,
      });

      return response.send(brewer);
    } catch (err) {
      return response.send({ message: err.message });
    }
  },
);

brewerRouter.get('/brewer', async (request, response) => {
  const brewerRepository = getCustomRepository(BrewerRepository);
  const brewers = await brewerRepository.find();

  return response.send(brewers);
});

brewerRouter.get('/brewer/:id', async (request, response) => {
  try {
    const brewerRepository = getCustomRepository(BrewerRepository);
    const beerRepository = getCustomRepository(BeerRepository);

    const { id } = request.params;

    const brewer = await brewerRepository.findOne(id);
    const beers = await beerRepository.relatedBeers(id);

    return response.send({ brewer, beers });
  } catch (err) {
    return response.send({ message: err.message });
  }
});

brewerRouter.delete('/brewer/:id', async (request, response) => {
  try {
    const deleteBrewerService = new DeleteBrewerService();

    const { id } = request.params;

    const deletedBrewer = await deleteBrewerService.execute(id);

    return response.send(deletedBrewer);
  } catch (err) {
    return response.send({ message: err.message });
  }
});

brewerRouter.put(
  '/brewer/:id',
  upload.single('photo'),
  celebrate(brewerUpdatePhotoCelebrateConfig, {
    abortEarly: false,
  }),
  async (request, response) => {
    try {
      const updateBrewerPhotoService = new UpdateBrewerPhotoService();
      const photo = request.file.filename;
      const { id } = request.params;

      await updateBrewerPhotoService.execute({
        id,
        photo,
      });

      return response.send({
        message: 'Dados cadastrais atualizados com sucesso!',
      });
    } catch (err) {
      return response.send({ message: err.message });
    }
  },
);

export default brewerRouter;
