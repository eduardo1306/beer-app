import { getRepository, Repository } from 'typeorm';

import Brewer from '@modules/brewer/infra/typeorm/entities/Brewer';
import IBrewerRepository from '@modules/brewer/repositories/IBrewerRepository';
import { ICreateBrewerDTO } from '@modules/brewer/dtos/ICreateBrewerDTO';
import AppError from '@shared/error/AppError';

export default class BrewerRepository implements IBrewerRepository {
  private ormRepository: Repository<Brewer>;

  constructor() {
    this.ormRepository = getRepository(Brewer);
  }

  public async save(brewer: Brewer): Promise<Brewer> {
    await this.ormRepository.save(brewer);

    return brewer;
  }

  public async find(): Promise<Brewer[] | []> {
    const brewers = await this.ormRepository.find();

    if (!brewers) {
      return [];
    }

    return brewers;
  }

  public async findById(id: string): Promise<Brewer | undefined> {
    const brewer = await this.ormRepository.findOne({
      where: { id },
    });

    return brewer;
  }

  public async delete(brewer_id: string): Promise<void> {
    const brewer = await this.findById(brewer_id);

    if (!brewer) {
      throw new AppError('Esse cervejeiro não existe!');
    }

    await this.ormRepository.delete({
      id: brewer.id,
    });
  }

  public async create({
    city,
    email,
    latitude,
    longitude,
    name,
    password,
    uf,
    whatsapp,
  }: ICreateBrewerDTO): Promise<Brewer> {
    const brewer = await this.ormRepository.create({
      city,
      email,
      latitude,
      longitude,
      name,
      password,
      uf,
      whatsapp,
    });

    await this.ormRepository.save(brewer);

    return brewer;
  }

  public async findByEmail(email: string): Promise<Brewer | undefined> {
    const brewer = await this.ormRepository.findOne({
      where: { email },
    });

    return brewer;
  }
}
