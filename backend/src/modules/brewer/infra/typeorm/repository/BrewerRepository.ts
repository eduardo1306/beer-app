import { getRepository, Repository } from 'typeorm';

import Brewer from '@modules/brewer/infra/typeorm/entities/Brewer';
import IBrewerRepository from '@modules/brewer/repositories/IBrewerRepository';
import { ICreateBrewerDTO } from '@modules/brewer/dtos/ICreateBrewerDTO';

export default class BrewerRepository implements IBrewerRepository {
  private ormRepository: Repository<Brewer>;

  constructor() {
    this.ormRepository = getRepository(Brewer);
  }

  public async find(): Promise<Brewer[] | undefined> {
    const brewers = this.ormRepository.find();

    return brewers;
  }

  public async findById(id: string): Promise<Brewer | undefined> {
    const brewer = this.ormRepository.findOne({
      where: { id },
    });

    return brewer;
  }

  public async findOneAndDelete(brewer_id: string): Promise<never[]> {
    const brewer = await this.ormRepository.findOne(brewer_id);

    if (!brewer) {
      throw new Error('Esse cervejeiro não existe!');
    }

    await this.ormRepository.delete(brewer);
    return [];
  }

  public async create(brewerData: ICreateBrewerDTO): Promise<Brewer> {
    const brewer = this.ormRepository.create(brewerData);

    await this.ormRepository.save(brewer);

    return brewer;
  }

  public async findByEmail(email: string): Promise<Brewer | undefined> {
    const findBrewer = await this.ormRepository.findOne({
      where: { email },
    });

    return findBrewer;
  }
}
