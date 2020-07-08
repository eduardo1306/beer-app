import { getCustomRepository } from 'typeorm';

import { BrewerCreateOptions } from '../../interfaces/Brewer/brewer.interfaces';
import BrewerRepository from '../../repositories/BrewerRepository';
import Brewer from '../../models/Brewer';

class CreateBrewerService {
  public async execute({
    email,
    ...rest
  }: BrewerCreateOptions): Promise<Brewer> {
    const brewerRepository = getCustomRepository(BrewerRepository);

    const findBrewer = await brewerRepository.findByEmail(email);

    if (findBrewer) {
      throw new Error('Esse cervejeiro já existe!');
    }

    const brewer = await brewerRepository.create({
      ...rest,
      email,
    });

    await brewerRepository.save(brewer);

    delete brewer.password;

    return brewer;
  }
}

export default CreateBrewerService;
