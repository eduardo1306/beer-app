import { getRepository, Repository } from 'typeorm';

import Beer from '@modules/beer/infra/typeorm/entities/Beer';
import IBeerRepository from '@modules/beer/repositories/IBeerRepository';

export default class BeerRepository implements IBeerRepository {
  private ormRepository: Repository<Beer>;

  constructor() {
    this.ormRepository = getRepository(Beer);
  }

  public async relatedBeers(brewer_id: string): Promise<Beer[] | undefined> {
    const relatedBeer = await this.ormRepository.find({
      where: {
        brewer_id,
      },
    });

    return relatedBeer;
  }
}
