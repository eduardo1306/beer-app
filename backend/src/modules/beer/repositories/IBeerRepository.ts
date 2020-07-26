import Beer from '@modules/beer/infra/typeorm/entities/Beer';

export default interface IBeerRepository {
  relatedBeers(brewer_id: string): Promise<Beer[] | undefined>;
  find(): Promise<Beer[] | undefined>;
  findOneAndDelete(beer_id: number, brewer_id: string): Promise<[]>;
  findBeer(beer_id: number, brewer_id: string): Promise<Beer | undefined>;
}
