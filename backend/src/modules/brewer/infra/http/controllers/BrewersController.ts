import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateBrewerService from '@modules/brewer/services/CreateBrewerService';
import DeleteBrewerService from '@modules/brewer/services/DeleteBrewerService';

import BrewerRepository from '@modules/brewer/infra/typeorm/repository/BrewerRepository';
import BeerRepository from '@modules/beer/infra/typeorm/repository/BeerRepository';
import Beer from '@modules/beer/infra/typeorm/entities/Beer';
import { ICreateBrewerDTO } from '@modules/brewer/dtos/ICreateBrewerDTO';
import Brewer from '../../typeorm/entities/Brewer';

export default class BrewersController {
  public async create(
    response: Response,
    request: Request,
  ): Promise<Response<Brewer>> {
    const createBrewerService = container.resolve(CreateBrewerService);

    console.log(request.body);
    // const {
    //   name,
    //   latitude,
    //   longitude,
    //   email,
    //   password,
    //   city,
    //   uf,
    //   whatsapp,
    // }: ICreateBrewerDTO = request.body;
    // const photo = request.file;

    // if (!photo) {
    //   const brewer = await createBrewerService.execute({
    //     latitude,
    //     longitude,
    //     email,
    //     name,
    //     password,
    //     photo:
    //       'https://assets.buscacity.com.br/wp-content/uploads/2017/03/19090426/default_user.jpg',
    //     city,
    //     uf,
    //     whatsapp,
    //   });

    //   return response.send(brewer);
    // }

    // const brewer = await createBrewerService.execute({
    //   latitude,
    //   longitude,
    //   email,
    //   name,
    //   password,
    //   photo: photo.filename,
    //   city,
    //   uf,
    //   whatsapp,
    // });

    // return response.send(brewer);
  }

  public async index(
    response: Response,
    request: Request,
  ): Promise<Response<Brewer[]>> {
    const brewerRepository = container.resolve(BrewerRepository);

    const brewers = await brewerRepository.find();

    return response.send(brewers);
  }

  public async show(
    response: Response,
    request: Request,
  ): Promise<Response<Brewer & Beer>> {
    const brewerRepository = container.resolve(BrewerRepository);
    const beerRepository = container.resolve(BeerRepository);

    const { id } = request.params;

    const brewer = await brewerRepository.findById(id);
    const beers = await beerRepository.relatedBeers(id);

    return response.send({ brewer, beers });
  }

  public async delete(response: Response, request: Request): Promise<Response> {
    const deleteBrewerService = container.resolve(DeleteBrewerService);

    const { id } = request.params;

    await deleteBrewerService.execute(id);

    return response.send([]);
  }
}
