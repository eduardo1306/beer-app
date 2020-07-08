import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../../config/multer';

import BeerRepository from '../../repositories/BeerRepository';
import Beer from '../../models/Beer';
import { BeerUpdateImageOptions } from '../../interfaces/Beer/beer.interfaces';

class UpdateBeerImageService {
  public async execute({
    brewer_id,
    id,
    image,
  }: BeerUpdateImageOptions): Promise<Beer> {
    const beerRepository = getCustomRepository(BeerRepository);

    const beer = await beerRepository.findOne({
      where: {
        id,
        brewer_id,
      },
    });

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
