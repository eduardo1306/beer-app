import { inject, injectable } from 'tsyringe';
import AppError from '@shared/error/AppError';
import IBrewerRepository from '../repositories/IBrewerRepository';

import { ICreateBrewerDTO } from '../dtos/ICreateBrewerDTO';
import Brewer from '../infra/typeorm/entities/Brewer';

@injectable()
export default class CreateBrewerService {
  constructor(
    @inject('BrewerRepository')
    private brewerRepository: IBrewerRepository,
  ) {}

  public async execute({
    email,
    ...brewerData
  }: ICreateBrewerDTO): Promise<Brewer> {
    const checkBrewerExists = await this.brewerRepository.findByEmail(email);

    if (checkBrewerExists) {
      throw new AppError('Esse cervejeiro já existe!');
    }

    const brewer = await this.brewerRepository.create({
      ...brewerData,
      email,
    });

    return brewer;
  }
}
