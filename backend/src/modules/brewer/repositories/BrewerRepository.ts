import { EntityRepository, Repository } from 'typeorm';

import Brewer from '@modules/brewer/infra/typeorm/entities/Brewer';

@EntityRepository(Brewer)
export default class BrewerRepository extends Repository<Brewer> {
  public async findByEmail(email: string): Promise<Brewer | null> {
    const findBrewer = await this.findOne({
      where: { email },
    });

    return findBrewer || null;
  }
}
