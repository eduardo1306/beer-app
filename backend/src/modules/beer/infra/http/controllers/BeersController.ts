import { container } from 'tsyringe';
import { Response, Request } from 'express';

import CreateBeerService from '@modules/beer/services/CreateBeerService';
import DeleteBeerService from '@modules/beer/services/DeleteBeerService';

import BeerRepository from '@modules/beer/infra/typeorm/repository/BeerRepository';
import Beer from '@modules/beer/infra/typeorm/entities/Beer';

export default class BeersController {
  public async index(
    response: Response,
    request: Request,
  ): Promise<Response<Beer>> {
    const beerRepository = container.resolve(BeerRepository);
    const beers = await beerRepository.find();

    return response.send(beers);
  }

  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<Beer>> {
    const beerCreateService = container.resolve(CreateBeerService);

    const { title, coloring, description, ibu }: Beer = request.body;
    const { id } = request.params;
    const image = request.file;

    if (!image) {
      const beer = await beerCreateService.execute({
        title,
        coloring,
        description,
        ibu,
        image:
          'https://cdn.pixabay.com/photo/2017/06/24/23/41/beer-2439237_960_720.jpg',
        brewer_id: id,
      });

      return response.send(beer);
    }

    const beer = await beerCreateService.execute({
      title,
      coloring,
      description,
      ibu,
      image: image.filename,
      brewer_id: id,
    });

    return response.send(beer);
  }

  public async delete(
    response: Response,
    request: Request,
  ): Promise<Response<never[]>> {
    const deleteBeerService = container.resolve(DeleteBeerService);

    const stringifyParams = JSON.stringify(request.query);
    const parsedParams = JSON.parse(stringifyParams);

    const { beer_id, brewer_id } = parsedParams;

    await deleteBeerService.execute({
      beer_id,
      brewer_id,
    });

    return response.send([]);
  }
}
