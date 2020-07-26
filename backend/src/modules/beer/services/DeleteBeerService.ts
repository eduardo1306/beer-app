import { getCustomRepository } from 'typeorm';

import { IDeleteBeerDTO } from '@modules/beer/dtos/IDeleteBeerDTO';
import BeerRepository from '@modules/beer/infra/typeorm/repository/BeerRepository';

class DeleteBeerService {
  public async execute({ brewer_id, beer_id }: IDeleteBeerDTO): Promise<[]> {
    const beerRepository = getCustomRepository(BeerRepository);

    await beerRepository.findOneAndDelete(beer_id, brewer_id);

    return [];
  }
}

export default DeleteBeerService;
