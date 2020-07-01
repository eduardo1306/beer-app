import { Router } from 'express';
import { getRepository } from 'typeorm';

import Beer from '../models/Beer';

const beerRouter = Router();

beerRouter.get('/', async (request, response) => {
  const beerRepository = getRepository(Beer);

  const beers = await beerRepository.find();

  return response.send(beers);
});

export default beerRouter;
