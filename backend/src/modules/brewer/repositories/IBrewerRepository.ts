import Brewer from '@modules/brewer/infra/typeorm/entities/Brewer';

export default interface IBrewerRepository {
  findByEmail(email: string): Promise<Brewer | undefined>;
}
