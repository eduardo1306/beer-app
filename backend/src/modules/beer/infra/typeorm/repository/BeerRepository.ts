import { getRepository, Repository } from 'typeorm';

import Beer from '@modules/beer/infra/typeorm/entities/Beer';
import IBeerRepository from '@modules/beer/repositories/IBeerRepository';
import { ICreateBeerDTO } from '@modules/beer/dtos/ICreateBeerDTO';

export default class BeerRepository implements IBeerRepository {
  private ormRepository: Repository<Beer>;

  constructor() {
    this.ormRepository = getRepository(Beer);
  }

  save(beer: Beer): Promise<Beer> {
    return this.ormRepository.save(beer);
  }

  public async findBeer(
    beer_id: number,
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

  public async findOneAndDelete(
    beer_id: number,
    brewer_id: string,
  ): Promise<[]> {
    const beer = await this.ormRepository.find({
      where: {
        brewer_id,
        id: beer_id,
      },
    });

    if (!beer) {
      throw new Error('Essa cerveja/cervejeiro não existe!');
    }

    await this.ormRepository.delete(beer_id);

    return [];
  }

  public async relatedBeers(brewer_id: string): Promise<Beer[] | undefined> {
    const relatedBeer = await this.ormRepository.find({
      where: {
        brewer_id,
      },
    });

    return relatedBeer;
  }

  public async find(): Promise<Beer[] | undefined> {
    const beers = this.ormRepository.find();

    return beers;
  }

  public async create(beerData: ICreateBeerDTO): Promise<Beer> {
    const beer = await this.ormRepository.create(beerData);

    await this.ormRepository.save(beer);

    return beer;
  }
}
