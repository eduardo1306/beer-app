import { getCustomRepository } from 'typeorm';

import { IDeleteBeerDTO } from '@modules/beer/dtos/IDeleteBeerDTO';
import BeerRepository from '@modules/beer/repositories/BeerRepository';

class DeleteBeerService {
  public async execute({
    brewer_id,
    beer_id,
  }: IDeleteBeerDTO): Promise<never[]> {
    const beerRepository = getCustomRepository(BeerRepository);

    const beer = await beerRepository.findOne({
      where: {
        id: beer_id,
        brewer_id,
      },
    });

    if (!beer) {
      throw new Error('Essa cerveja/cervejeiro não existe!');
    }

    await beerRepository.delete(beer_id);

    return [];
  }
}

export default DeleteBeerService;
