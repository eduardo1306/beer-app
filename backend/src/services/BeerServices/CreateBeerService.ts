import { getCustomRepository } from 'typeorm';

import { BeerCreateOptions } from '../../interfaces/Beer/beer.interfaces';
import BrewerRepository from '../../repositories/BrewerRepository';
import BeerRepository from '../../repositories/BeerRepository';
import Beer from '../../models/Beer';

class CreateBeerService {
  public async execute({
    coloring,
    description,
    ibu,
    image,
    title,
    brewer_id,
  }: BeerCreateOptions): Promise<Beer> {
    const beerRepository = getCustomRepository(BeerRepository);
    const brewerRepository = getCustomRepository(BrewerRepository);

    const brewer = await brewerRepository.findOne({
      where: {
        id: brewer_id,
      },
    });

    if (!brewer || brewer === null) {
      throw new Error('Esse cervejeiro não existe!');
    }

    const beer = await beerRepository.create({
      coloring,
      description,
      ibu,
      image,
      title,
      brewer_id,
    });
    await beerRepository.save(beer);

    return beer;
  }
}
export default CreateBeerService;
