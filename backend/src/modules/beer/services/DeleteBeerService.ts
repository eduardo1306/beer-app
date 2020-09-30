import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

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
    await this.beerRepository.delete(beer_id, brewer_id);
  }
}
