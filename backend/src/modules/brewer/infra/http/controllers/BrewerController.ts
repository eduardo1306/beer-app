import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { ICreateBrewerDTO } from '@modules/brewer/dtos/ICreateBrewerDTO';
import CreateBrewerService from '@modules/brewer/services/CreateBrewerService';

import Brewer from '../../typeorm/entities/Brewer';
import BrewerRepository from '../../typeorm/repository/BrewerRepository';

export default class BrewerController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<Brewer>> {
    const {
      city,
      email,
      latitude,
      longitude,
      name,
      password,
      uf,
      whatsapp,
    }: ICreateBrewerDTO = request.body;

    const createBrewer = container.resolve(CreateBrewerService);

    const brewer = await createBrewer.execute({
      city,
      email,
      latitude,
      longitude,
      name,
      password,
      uf,
      whatsapp,
    });

    delete brewer.password;

    return response.json(brewer);
  }

  public async index(
    request: Request,
    response: Response,
  ): Promise<Response<Brewer[]>> {
    const brewerRepository = container.resolve(BrewerRepository);

    const brewer = await brewerRepository.find();

    return response.json(brewer);
  }
}
