import Beer from '@modules/beer/infra/typeorm/entities/Beer';
import ICreateBeerDTO from '../dtos/ICreateBeerDTO';

export default interface IBeerRepository {
  findBeers(): Promise<Beer[] | undefined>;
  delete(beer_id: string, brewer_id: string): Promise<void>;
  findBrewerBeers(
    beer_id: string,
    brewer_id: string,
  ): Promise<Beer[] | undefined>;
  create(beerData: ICreateBeerDTO): Promise<Beer>;
  save(beer: Beer): Promise<Beer>;
}
