import { uuid } from 'uuidv4';
import Brewer from '@modules/brewer/infra/typeorm/entities/Brewer';
import IBrewerRepository from '@modules/brewer/repositories/IBrewerRepository';
import { ICreateBrewerDTO } from '@modules/brewer/dtos/ICreateBrewerDTO';
import AppError from '@shared/error/AppError';

export default class FakeBrewerRepository implements IBrewerRepository {
  private brewers: Brewer[] = [];

  public async findByEmail(email: string): Promise<Brewer> {
    const brewer = this.brewers.find(item => item.email === email);

    if (!brewer) {
      throw new AppError('Esse cervejeiro não existe!');
    }

    return brewer;
  }

  public async create(brewerData: ICreateBrewerDTO): Promise<Brewer> {
    const brewer = new Brewer();

    Object.assign(brewer, { ...brewerData, id: uuid() });

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
      throw new AppError('Esse cervejeiro já existe');
    }

    this.brewers.push(brewer);

    return brewer;
  }

  public async findById(id: string): Promise<Brewer> {
    const brewer = this.brewers.find(item => item.id === id);

    if (!brewer) {
      throw new AppError('Esse cervejeiro já existe');
    }

    return brewer;
  }
}
