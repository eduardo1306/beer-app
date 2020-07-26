import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/multer';

import BeerRepository from '@modules/beer/infra/typeorm/repository/BeerRepository';
import Beer from '@modules/beer/infra/typeorm/entities/Beer';
import { IUpdateBeerImageDTO } from '@modules/beer/dtos/IUpdateBeerImageDTO';

class UpdateBeerImageService {
  public async execute({
    brewer_id,
    id,
    image,
  }: IUpdateBeerImageDTO): Promise<Beer> {
    const beerRepository = new BeerRepository();

    const beer = await beerRepository.findBeer(id, brewer_id);

    if (!beer) {
      throw new Error('Esse(a) cervejeiro/cerveja não existe!');
    }

    if (beer.image) {
      const beerImageFilePath = path.join(uploadConfig.directory, beer.image);
      const beerImageFileExists = await fs.promises.stat(beerImageFilePath);

      if (beerImageFileExists) {
        await fs.promises.unlink(beerImageFilePath);
      }
    }

    await beerRepository.update(id, {
      image,
    });

    return beer;
  }
}

export default UpdateBeerImageService;
