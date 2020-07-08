import { getCustomRepository } from 'typeorm';

import { BrewerCreateOptions } from '../../interfaces/Brewer/brewer.interfaces';
import BrewerRepository from '../../repositories/BrewerRepository';
import Brewer from '../../models/Brewer';

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
  }: BrewerCreateOptions): Promise<Brewer> {
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
