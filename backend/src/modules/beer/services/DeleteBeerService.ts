import { injectable, inject } from 'tsyringe';

import { IDeleteBeerDTO } from '@modules/beer/dtos/IDeleteBeerDTO';
import IBeerRepository from '@modules/beer/repositories/IBeerRepository';

@injectable()
class DeleteBeerService {
  constructor(
    @inject('BeerRepository')
    private beerRepository: IBeerRepository,
  ) {}

  public async execute({ brewer_id, beer_id }: IDeleteBeerDTO): Promise<[]> {
    await this.beerRepository.findOneAndDelete(beer_id, brewer_id);

    return [];
  }
}

export default DeleteBeerService;
