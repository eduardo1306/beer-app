import { getRepository, Repository } from 'typeorm';

import IBrewerTokenRepository from '@modules/brewer/repositories/IBrewerTokenRepository';
import BrewerToken from '../entities/BrewerToken';

export default class BrewerTokenRepository implements IBrewerTokenRepository {
  private ormRepository: Repository<BrewerToken>;

  constructor() {
    this.ormRepository = getRepository(BrewerToken);
  }

  public async generate(brewer_id: string): Promise<BrewerToken> {
    const brewerToken = await this.ormRepository.create({
      brewer_id,
    });

    await this.ormRepository.save(brewerToken);

    return brewerToken;
  }

  public async findByToken(token: string): Promise<BrewerToken | undefined> {
    const brewerToken = await this.ormRepository.findOne({
      where: { token },
    });

    return brewerToken;
  }
}
