import BrewerToken from '../infra/typeorm/entities/BrewerToken';

export default interface IBrewerTokenRepository {
  generate(user_id: string): Promise<BrewerToken>;
  findByToken(token: string): Promise<BrewerToken | undefined>;
}
