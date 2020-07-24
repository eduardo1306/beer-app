import { getCustomRepository } from 'typeorm';

import { ICreateBrewerDTO } from '@modules/brewer/dtos/ICreateBrewerDTO';
import BrewerRepository from '@modules/brewer/repositories/BrewerRepository';
import Brewer from '@modules/brewer/infra/typeorm/entities/Brewer';

class CreateBrewerService {
  public async execute({
    email,
    city,
    latitude,
    longitude,
    name,
    password,
    photo,
    uf,
    whatsapp,
  }: ICreateBrewerDTO): Promise<Brewer> {
    const brewerRepository = getCustomRepository(BrewerRepository);

    const findBrewer = await brewerRepository.findByEmail(email);

    if (findBrewer) {
      throw new Error('Esse cervejeiro já existe!');
    }

    const brewer = await brewerRepository.create({
      city,
      latitude,
      longitude,
      name,
      password,
      photo,
      uf,
      whatsapp,
      email,
    });

    await brewerRepository.save(brewer);

    delete brewer.password;

    return brewer;
  }
}

export default CreateBrewerService;
