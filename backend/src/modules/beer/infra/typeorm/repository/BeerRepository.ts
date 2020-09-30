import { getRepository, Repository } from 'typeorm';

import Beer from '@modules/beer/infra/typeorm/entities/Beer';
import IBeerRepository from '@modules/beer/repositories/IBeerRepository';
import AppError from '@shared/error/AppError';
import ICreateBeerDTO from '@modules/beer/dtos/ICreateBeerDTO';

export default class BeerRepository implements IBeerRepository {
  private ormRepository: Repository<Beer>;

  constructor() {
    this.ormRepository = getRepository(Beer);
  }

  save(beer: Beer): Promise<Beer> {
    return this.ormRepository.save(beer);
  }

  public async findBeer(
    beer_id: string,
    brewer_id: string,
  ): Promise<Beer | undefined> {
    const beer = await this.ormRepository.findOne({
      where: {
        brewer_id,
        id: beer_id,
      },
    });

    return beer;
  }

  public async delete(beer_id: string, brewer_id: string): Promise<void> {
    const beer = await this.findBeer(beer_id, brewer_id);

    if (!beer) {
      throw new AppError('Essa cerveja/cervejeiro não existe!');
    }

    await this.ormRepository.delete(beer_id);
  }

  public async findBeers(): Promise<Beer[] | undefined> {
    const beers = await this.ormRepository.find();

    return beers;
  }

  public async create(beerData: ICreateBeerDTO): Promise<Beer> {
    const beer = await this.ormRepository.create(beerData);

    await this.ormRepository.save(beer);

    return beer;
  }
}
