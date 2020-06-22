import { Router, Response } from 'express';
import { celebrate } from 'celebrate';
import { getRepository } from 'typeorm';
import multer from 'multer';

import multerConfig from '../config/multer';
import celebrateConfig from '../config/celebrate';

import CreateBrewerService from '../services/CreateBrewerService';
import Brewer from '../models/Brewer';
import Beer from '../models/Beer';

const brewerService = new CreateBrewerService();
const brewerRouter = Router();
const upload = multer(multerConfig);

brewerRouter.post(
  '/',
  upload.single('photo'),
  celebrate(celebrateConfig, {
    abortEarly: false,
  }),
  async (request, response): Promise<Response<Brewer>> => {
    try {
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

      const brewer = await brewerService.execute({
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

brewerRouter.get('/', async (request, response) => {
  const brewerRepository = getRepository(Brewer);

  const brewers = await brewerRepository.find();

  return response.send(brewers);
});

brewerRouter.put('/:id/beer', async (request, response) => {
  try {
    const beerRepository = getRepository(Beer);

    const {
      title,
      image = 'https://cdn.pixabay.com/photo/2017/06/24/23/41/beer-2439237_960_720.jpg',
      coloring,
      ibu,
      description,
    } = request.body;

    const { id } = request.params;

    const beer = await beerRepository.create({
      title,
      image,
      coloring,
      description,
      ibu,
    });

    await beerRepository.save(beer);

    console.log(beer);
  } catch (err) {
    return response.send({ message: err.message });
  }
});

export default brewerRouter;
