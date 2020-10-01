import { Request, Response } from 'express';
import { container } from 'tsyringe';

import BeerRepository from '../../typeorm/repository/BeerRepository';

export default class ListBeersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const beerRepository = container.resolve(BeerRepository);

    const beers = await beerRepository.findBeers();

    return response.json(beers);
  }
}
