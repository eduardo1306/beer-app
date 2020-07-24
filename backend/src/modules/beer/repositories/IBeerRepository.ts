import Beer from '@modules/beer/infra/typeorm/entities/Beer';

export default interface IBeerRepository {
  relatedBeers(brewer_id: string): Promise<Beer[] | undefined>;
}
