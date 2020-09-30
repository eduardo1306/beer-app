import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBeerService from '@modules/beer/services/CreateBeerService';
import Beer from '../../typeorm/entities/Beer';

export default class CreateBeerController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<Beer>> {
    const { title, coloring, ibu, description } = request.body;
    const brewer_id = request.brewer.id;

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
}
