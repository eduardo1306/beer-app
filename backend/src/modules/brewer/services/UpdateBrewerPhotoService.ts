import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/multer';

import BrewerRepository from '@modules/brewer/infra/typeorm/repository/BrewerRepository';
import Brewer from '@modules/brewer/infra/typeorm/entities/Brewer';
import { IUpdateBrewerPhotoDTO } from '@modules/brewer/dtos/IUpdateBrewerPhotoDTO';

class UpdateBrewerPhotoService {
  public async execute({ photo, id }: IUpdateBrewerPhotoDTO): Promise<Brewer> {
    const brewerRepository = getCustomRepository(BrewerRepository);

    const brewer = await brewerRepository.findById(id);

    if (!brewer) {
      throw new Error('Esse cervejeiro não existe!');
    }

    if (brewer.photo) {
      const brewerPhotoFilePath = path.join(
        uploadConfig.directory,
        brewer.photo,
      );
      const brewerPhotoFileExists = await fs.promises.stat(brewerPhotoFilePath);

      if (brewerPhotoFileExists) {
        await fs.promises.unlink(brewerPhotoFilePath);
      }
    }

    brewer.photo = photo;

    await brewerRepository.save(brewer);

    return brewer;
  }
}

export default UpdateBrewerPhotoService;
