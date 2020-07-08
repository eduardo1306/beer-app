import { EntityRepository, Repository } from 'typeorm';

import Brewer from '../models/Brewer';

@EntityRepository(Brewer)
export default class BrewerRepository extends Repository<Brewer> {
  public async findByEmail(email: string): Promise<Brewer | null> {
    const findBrewer = await this.findOne({
      where: { email },
    });

    return findBrewer || null;
  }
}
