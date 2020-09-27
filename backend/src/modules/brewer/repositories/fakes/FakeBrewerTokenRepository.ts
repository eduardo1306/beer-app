import { uuid } from 'uuidv4';

import IBrewerTokenRepository from '@modules/brewer/repositories/IBrewerTokenRepository';
import BrewerToken from '@modules/brewer/infra/typeorm/entities/BrewerToken';

export default class FakeBrewerTokenRepository
  implements IBrewerTokenRepository {
  private brewerTokens: BrewerToken[] = [];

  public async generate(brewer_id: string): Promise<BrewerToken> {
    const brewerToken = new BrewerToken();

    Object.assign(brewerToken, {
      id: uuid(),
      token: uuid(),
      brewer_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.brewerTokens.push(brewerToken);

    return brewerToken;
  }

  public async findByToken(token: string): Promise<BrewerToken | undefined> {
    const brewerToken = await this.brewerTokens.find(
      brewer => brewer.token === token,
    );

    return brewerToken;
  }
}
