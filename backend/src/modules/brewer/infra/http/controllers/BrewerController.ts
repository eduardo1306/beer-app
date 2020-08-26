import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateBrewerService from '@modules/brewer/services/CreateBrewerService';
import DeleteBrewerService from '@modules/brewer/services/DeleteBrewerService';

import { ICreateBrewerDTO } from '@modules/brewer/dtos/ICreateBrewerDTO';
import BrewerRepository from '../../typeorm/repository/BrewerRepository';

import Brewer from '../../typeorm/entities/Brewer';

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
    try {
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
    } catch (err) {
      return response.json({ message: err.message });
    }
  }

  public async index(
    request: Request,
    response: Response,
  ): Promise<Response<Brewer[]>> {
    const brewerRepository = container.resolve(BrewerRepository);

    const brewers = await brewerRepository.find();

    return response.json(brewers);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const deleteBrewer = container.resolve(DeleteBrewerService);

      await deleteBrewer.execute(id);

      return response.sendStatus(204);
    } catch (err) {
      return response.json({ message: err.message });
    }
  }
}
