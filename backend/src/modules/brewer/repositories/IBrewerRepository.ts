import Brewer from '@modules/brewer/infra/typeorm/entities/Brewer';
import { ICreateBrewerDTO } from '../dtos/ICreateBrewerDTO';

export default interface IBrewerRepository {
  findByEmail(email: string): Promise<Brewer | undefined>;
  create(brewerData: ICreateBrewerDTO): Promise<Brewer>;
  delete(brewer_id: string): Promise<void>;
  findById(id: string): Promise<Brewer | undefined>;
  find(): Promise<Brewer[] | []>;
  save(brewer: Brewer): Promise<Brewer>;
}
