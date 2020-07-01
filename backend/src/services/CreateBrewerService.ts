import { getRepository } from 'typeorm';

import Brewer from '../models/Brewer';

export interface BrewerOptions {
  name: string;
  latitude: number;
  longitude: number;
  email: string;
  password: string;
  photo: string;
  city: string;
  uf: string;
  whatsapp: string;
}

class CreateBrewerService {
  public async execute({ email, ...rest }: BrewerOptions): Promise<Brewer> {
    const brewerRepository = getRepository(Brewer);
    const findBrewer = await brewerRepository.findOne({
      where: {
        email,
      },
    });

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
