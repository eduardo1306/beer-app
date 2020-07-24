import { inject, injectable } from 'tsyringe';

import { ICreateBrewerDTO } from '@modules/brewer/dtos/ICreateBrewerDTO';
import BrewerRepository from '@modules/brewer/infra/typeorm/repository/BrewerRepository';
import Brewer from '@modules/brewer/infra/typeorm/entities/Brewer';

@injectable()
class CreateBrewerService {
  constructor(
    @inject('BrewerRepository')
    private brewerRepository: BrewerRepository,
  ) {}

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
    const findBrewer = await this.brewerRepository.findByEmail(email);

    if (findBrewer) {
      throw new Error('Esse cervejeiro já existe!');
    }

    const brewer = await this.brewerRepository.create({
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

    delete brewer.password;

    return brewer;
  }
}

export default CreateBrewerService;
