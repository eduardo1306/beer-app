import { getRepository, Repository } from 'typeorm';

import Brewer from '@modules/brewer/infra/typeorm/entities/Brewer';
import IBrewerRepository from '@modules/brewer/repositories/IBrewerRepository';

export default class BrewerRepository implements IBrewerRepository {
  private ormRepository: Repository<Brewer>;

  constructor() {
    this.ormRepository = getRepository(Brewer);
  }

  public async findByEmail(email: string): Promise<Brewer | undefined> {
    const findBrewer = await this.ormRepository.findOne({
      where: { email },
    });

    return findBrewer;
  }
}
