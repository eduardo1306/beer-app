import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import multerConfig from '../config/multer';
import { beerCelebrateConfig } from '../config/celebrate';

import { BeerDeleteOptions } from '../interfaces/Beer/beer.interfaces';
import CreateBeerService from '../services/BeerServices/CreateBeerService';
import DeleteBeerService from '../services/BeerServices/DeleteBeerService';
import BeerRepository from '../repositories/BeerRepository';
import Beer from '../models/Beer';
import brewerRouter from './brewer.routes';

const upload = multer(multerConfig);
const beerRouter = Router();

beerRouter.get('/beer', async (request, response) => {
  const beerRepository = getCustomRepository(BeerRepository);

  const beers = await beerRepository.find();

  return response.send(beers);
});

beerRouter.post(
  '/beer/:id',
  upload.single('image'),
  celebrate(beerCelebrateConfig, {
    abortEarly: false,
  }),
  async (request, response) => {
    try {
      const beerService = new CreateBeerService();

      const {
        title,
        coloring,
        description,
        ibu,
        image = 'https://cdn.pixabay.com/photo/2017/06/24/23/41/beer-2439237_960_720.jpg',
      }: Beer = request.body;
      const { id } = request.params;

      const beer = await beerService.execute({
        title,
        coloring,
        description,
        ibu,
        image: request.file.filename,
        brewer_id: id,
      });

      return response.send(beer);
    } catch (err) {
      return response.send({ message: err.message });
    }
  },
);

beerRouter.delete('/beer', async (request, response) => {
  const deleteBeerService = new DeleteBeerService();

  const stringifyParams = JSON.stringify(request.query);
  const parsedParams = JSON.parse(stringifyParams);

  const { beer_id, brewer_id }: BeerDeleteOptions = parsedParams;

  const beer = await deleteBeerService.execute({
    beer_id,
    brewer_id,
  });

  return response.send(beer);
});

export default beerRouter;
