import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import multerConfig from '../config/multer';
import { brewerCelebrateConfig } from '../config/celebrate';
import CreateBrewerService from '../services/BrewerServices/CreateBrewerService';
import DeleteBrewerService from '../services/BrewerServices/DeleteBrewerService';

import BrewerRepository from '../repositories/BrewerRepository';
import BeerRepository from '../repositories/BeerRepository';

const brewerRouter = Router();
const upload = multer(multerConfig);

brewerRouter.post(
  '/brewer',
  upload.single('photo'),
  celebrate(brewerCelebrateConfig, {
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
        photo = 'https://assets.buscacity.com.br/wp-content/uploads/2017/03/19090426/default_user.jpg',
        city,
        uf,
        whatsapp,
      } = request.body;

      const brewer = await createBrewerService.execute({
        latitude,
        longitude,
        email,
        name,
        password,
        photo: request.file.filename,
        city,
        uf,
        whatsapp,
      });

      return response.json(brewer);
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
  const brewerRepository = getCustomRepository(BrewerRepository);
  const beerRepository = getCustomRepository(BeerRepository);

  const { id } = request.params;

  const brewer = await brewerRepository.findOne(id);
  const beers = await beerRepository.relatedBeers(id);

  return response.send({ brewer, beers });
});

brewerRouter.delete('/brewer/:id', async (request, response) => {
  const deleteBrewerService = new DeleteBrewerService();

  const { id } = request.params;

  const deletedBrewer = await deleteBrewerService.execute(id);

  return response.send(deletedBrewer);
});

export default brewerRouter;
