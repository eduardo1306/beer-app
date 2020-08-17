import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBeerService from '@modules/beer/services/CreateBeerService';
import Beer from '../../typeorm/entities/Beer';
import BeerRepository from '../../typeorm/repository/BeerRepository';

export default class BeerController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<Beer>> {
    const { title, coloring, ibu, description } = request.body;

    const { brewer_id } = request.params;

    const createBeer = container.resolve(CreateBeerService);

    const beer = await createBeer.execute({
      title,
      coloring,
      description,
      ibu,
      brewer_id,
    });

    return response.json(beer);
  }

  public async index(
    request: Request,
    response: Response,
  ): Promise<Response<Beer[] | undefined>> {
    const { brewer_id } = request.params;

    const beerRepository = container.resolve(BeerRepository);

    const beers = await beerRepository.relatedBeers(brewer_id);

    return response.json(beers);
  }
}
