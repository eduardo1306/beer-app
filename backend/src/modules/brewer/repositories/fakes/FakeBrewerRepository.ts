import Brewer from '@modules/brewer/infra/typeorm/entities/Brewer';
import IBrewerRepository from '@modules/brewer/repositories/IBrewerRepository';
import { ICreateBrewerDTO } from '@modules/brewer/dtos/ICreateBrewerDTO';

export default class FakeBrewerRepository implements IBrewerRepository {
  private brewers: Brewer[];

  public async findByEmail(email: string): Promise<Brewer | undefined> {
    const findBrewer = this.brewers.find(brewer => brewer.email === email);

    return findBrewer;
  }

  public async create(brewerData: ICreateBrewerDTO): Promise<Brewer> {
    const brewer = new Brewer();

    Object.assign(brewer, brewerData);

    this.brewers.push(brewer);

    return brewer;
  }

  public async findOneAndDelete(brewer_id: string): Promise<never[]> {
    const indexOfBrewer = this.brewers.findIndex(
      brewer => brewer.id === brewer_id,
    );

    this.brewers.splice(indexOfBrewer, 1);

    return [];
  }

  public async find(): Promise<Brewer[] | undefined> {
    return this.brewers;
  }

  public async save(brewer: Brewer): Promise<Brewer> {
    const findBrewer = this.brewers.find(brwr => brwr.id === brewer.id);

    if (findBrewer) {
      throw new Error('Brewer already exists');
    }

    this.brewers.push(brewer);

    return brewer;
  }

  public async findById(id: string): Promise<Brewer | undefined> {
    return this.brewers.find(brewer => brewer.id === id);
  }
}
