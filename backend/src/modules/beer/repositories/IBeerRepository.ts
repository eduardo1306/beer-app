import Beer from '@modules/beer/infra/typeorm/entities/Beer';
import ICreateBeerDTO from '../dtos/ICreateBeerDTO';

export default interface IBeerRepository {
  relatedBeers(brewer_id: string): Promise<Beer[] | undefined>;
  findOneAndDelete(beer_id: number, brewer_id: string): Promise<[]>;
  findBeer(beer_id: number, brewer_id: string): Promise<Beer | undefined>;
  create(beerData: ICreateBeerDTO): Promise<Beer>;
  save(beer: Beer): Promise<Beer>;
}
