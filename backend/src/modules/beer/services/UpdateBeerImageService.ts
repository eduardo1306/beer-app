import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/multer';

import { IUpdateBeerImageDTO } from '@modules/beer/dtos/IUpdateBeerImageDTO';
import IBeerRepository from '@modules/beer/repositories/IBeerRepository';
import Beer from '@modules/beer/infra/typeorm/entities/Beer';

@injectable()
class UpdateBeerImageService {
  constructor(
    @inject('BeerRepository')
    private beerRepository: IBeerRepository,
  ) {}

  public async execute({
    brewer_id,
    id,
    image,
  }: IUpdateBeerImageDTO): Promise<Beer> {
    const beer = await this.beerRepository.findBeer(id, brewer_id);

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

    beer.image = image;

    await this.beerRepository.save(beer);

    return beer;
  }
}

export default UpdateBeerImageService;
