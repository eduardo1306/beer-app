import { injectable, inject } from 'tsyringe';

import { ICreateBeerDTO } from '@modules/beer/dtos/ICreateBeerDTO';
import IBrewerRepository from '@modules/brewer/repositories/IBrewerRepository';
import IBeerRepository from '@modules/beer/repositories/IBeerRepository';
import Beer from '@modules/beer/infra/typeorm/entities/Beer';

@injectable()
class CreateBeerService {
  constructor(
    @inject('BeerRepository')
    private beerRepository: IBeerRepository,
    @inject('BrewerRepository')
    private brewerRepository: IBrewerRepository,
  ) {}

  public async execute({
    coloring,
    description,
    ibu,
    image,
    title,
    brewer_id,
  }: ICreateBeerDTO): Promise<Beer> {
    const brewer = await this.brewerRepository.findById(brewer_id);

    if (!brewer || brewer === null) {
      throw new Error('Esse cervejeiro não existe!');
    }

    const beer = await this.beerRepository.create({
      coloring,
      description,
      ibu,
      image,
      title,
      brewer_id,
    });

    return beer;
  }
}
export default CreateBeerService;
