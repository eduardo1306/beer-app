import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IBrewerRepository from '@modules/brewer/repositories/IBrewerRepository';
import AppError from '@shared/error/AppError';
import ICreateBeerDTO from '../dtos/ICreateBeerDTO';
import Beer from '../infra/typeorm/entities/Beer';
import IBeerRepository from '../repositories/IBeerRepository';

@injectable()
export default class CreateBeerService {
  constructor(
    @inject('BeerRepository')
    private beerRepository: IBeerRepository,
    @inject('BrewerRepository')
    private brewerRepository: IBrewerRepository,
  ) {}

  public async execute(beerData: ICreateBeerDTO): Promise<Beer> {
    const brewer = await this.brewerRepository.findById(beerData.brewer_id);

    if (!brewer) {
      throw new AppError('Esse cervejeiro não existe!');
    }

    const beer = await this.beerRepository.create(beerData);

    return beer;
  }
}
