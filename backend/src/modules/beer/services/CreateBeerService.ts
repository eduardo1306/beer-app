import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICreateBeerDTO from '../dtos/ICreateBeerDTO';
import Beer from '../infra/typeorm/entities/Beer';
import IBeerRepository from '../repositories/IBeerRepository';

@injectable()
export default class CreateBeerService {
  constructor(
    @inject('BeerRepository')
    private beerRepository: IBeerRepository,
  ) {}

  public async execute(beerData: ICreateBeerDTO): Promise<Beer> {
    const beer = this.beerRepository.create(beerData);

    return beer;
  }
}
