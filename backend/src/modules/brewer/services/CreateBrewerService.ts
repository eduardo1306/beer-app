import { inject, injectable } from 'tsyringe';
import AppError from '@shared/error/AppError';

import IBrewerRepository from '../repositories/IBrewerRepository';
import { ICreateBrewerDTO } from '../dtos/ICreateBrewerDTO';
import Brewer from '../infra/typeorm/entities/Brewer';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

@injectable()
export default class CreateBrewerService {
  constructor(
    @inject('BrewerRepository')
    private brewerRepository: IBrewerRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    city,
    latitude,
    longitude,
    name,
    password,
    uf,
    whatsapp,
  }: ICreateBrewerDTO): Promise<Brewer> {
    const findBrewer = await this.brewerRepository.findByEmail(email);

    if (findBrewer) {
      throw new AppError('Esse e-mail já está em uso!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    const brewer = await this.brewerRepository.create({
      email,
      city,
      latitude,
      longitude,
      name,
      password: hashedPassword,
      uf,
      whatsapp,
    });

    return brewer;
  }
}
