import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/error/AppError';

import IBrewerRepository from '@modules/brewer/repositories/IBrewerRepository';
import IBeerRepository from '../repositories/IBeerRepository';

import IDeleteBeerDTO from '../dtos/IDeleteBeerDTO';

@injectable()
export default class DeleteBeerService {
  constructor(
    @inject('BeerRepository')
    private beerRepository: IBeerRepository,
    @inject('BrewerRepository')
    private brewerRepository: IBrewerRepository,
  ) {}

  public async execute({ beer_id, brewer_id }: IDeleteBeerDTO): Promise<void> {
    const beer = await this.beerRepository.findBeer(beer_id, brewer_id);

    if (!beer) {
      throw new AppError('Essa cerveja não existe!');
    }

    await this.beerRepository.delete(beer_id, brewer_id);
  }
}
