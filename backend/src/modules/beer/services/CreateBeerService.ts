import { getCustomRepository } from 'typeorm';

import { ICreateBeerDTO } from '@modules/beer/dtos/ICreateBeerDTO';
import BrewerRepository from '@modules/brewer/repositories/BrewerRepository';
import BeerRepository from '@modules/beer/repositories/BeerRepository';
import Beer from '@modules/beer/infra/typeorm/entities/Beer';

class CreateBeerService {
  public async execute({
    coloring,
    description,
    ibu,
    image,
    title,
    brewer_id,
  }: ICreateBeerDTO): Promise<Beer> {
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
