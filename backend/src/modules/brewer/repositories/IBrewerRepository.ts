import Brewer from '@modules/brewer/infra/typeorm/entities/Brewer';
import { ICreateBrewerDTO } from '../dtos/ICreateBrewerDTO';

export default interface IBrewerRepository {
  findByEmail(email: string): Promise<Brewer | undefined>;
  create(brewerData: ICreateBrewerDTO): Promise<Brewer>;
  findOneAndDelete(brewer_id: string): Promise<never[]>;
  findById(id: string): Promise<Brewer>;
  find(): Promise<Brewer[] | undefined>;
  save(brewer: Brewer): Promise<Brewer>;
}
