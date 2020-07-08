import { EntityRepository, Repository } from 'typeorm';

import Beer from '../models/Beer';

@EntityRepository(Beer)
export default class BeerRepository extends Repository<Beer> {
  public async relatedBeers(brewer_id: string): Promise<Beer[]> {
    const relatedBeer = await this.find({
      where: {
        brewer_id,
      },
    });

    if (!relatedBeer) {
      throw new Error('Você não possui cervejas cadastradas');
    }

    return relatedBeer;
  }
}
