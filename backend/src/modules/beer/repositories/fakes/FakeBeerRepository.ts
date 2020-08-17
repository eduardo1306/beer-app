import Beer from '@modules/beer/infra/typeorm/entities/Beer';
import ICreateBeerDTO from '@modules/beer/dtos/ICreateBeerDTO';
import { uuid } from 'uuidv4';
import IBeerRepository from '../IBeerRepository';

export default class FakeBeerRepository implements IBeerRepository {
  private beers: Beer[] = [];

  public async findOneAndDelete(
    beer_id: number,
    brewer_id: string,
  ): Promise<[]> {
    const beerIndex = this.beers.findIndex(
      beer => beer.id === beer_id && beer.brewer_id === brewer_id,
    );

    this.beers.splice(beerIndex, 1);

    return [];
  }

  public async relatedBeers(brewer_id: string): Promise<Beer[] | undefined> {
    const beers = this.beers.filter(beer => beer.brewer_id === brewer_id);

    return beers;
  }

  public async index(): Promise<Beer[] | undefined> {
    return this.beers;
  }

  public async findBeer(
    beer_id: number,
    brewer_id: string,
  ): Promise<Beer | undefined> {
    const beer = this.beers.find(
      item => item.id === beer_id && item.brewer_id === brewer_id,
    );

    return beer;
  }

  public async create({
    coloring,
    description,
    ibu,
    title,
  }: ICreateBeerDTO): Promise<Beer> {
    const beer = new Beer();

    Object.assign(beer, {
      coloring,
      description,
      ibu,
      title,
      brewer_id: uuid(),
      id: uuid(),
    });

    this.beers.push(beer);

    return beer;
  }

  public async save(beer: Beer): Promise<Beer> {
    this.beers.push(beer);

    return beer;
  }
}
