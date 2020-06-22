import { Router, Response } from 'express';
import { celebrate } from 'celebrate';
import { getRepository } from 'typeorm';
import multer from 'multer';

import multerConfig from '../config/multer';
import celebrateConfig from '../config/celebrate';

import BrewmasterService from '../services/CreateBrewmasterService';
import Brewmaster from '../models/Brewmaster';
import Beer from '../models/Beer';
import SocialMedia from '../models/SocialMedia';

const brewmasterService = new BrewmasterService();
const brewmasterRouter = Router();
const upload = multer(multerConfig);

interface Data {
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

brewmasterRouter.post(
  '/',
  upload.single('photo'),
  celebrate(celebrateConfig, {
    abortEarly: false,
  }),
  async (request, response): Promise<Response<Brewmaster>> => {
    const {
      name,
      latitude,
      longitude,
      email,
      password,
      photo = 'https://assets.buscacity.com.br/wp-content/uploads/2017/03/19090426/default_user.jpg',
      city,
      uf,
      whatsapp,
    } = request.body;

    const brewmaster = await brewmasterService.execute({
      latitude,
      longitude,
      email,
      name,
      password,
      photo: request.file.filename,
      city,
      uf,
      whatsapp,
    });

    return response.json(brewmaster);
  },
);

brewmasterRouter.get('/', async (request, response) => {
  const brewmasterRepository = getRepository(Brewmaster);

  const brewmasters = await brewmasterRepository.find();

  return response.send(brewmasters);
});

brewmasterRouter.put('/:id/beer', async (request, response) => {
  const beerRepository = getRepository(Beer);
  const brewmasterRepository = getRepository(Brewmaster);
  const {
    title,
    image = 'https://cdn.pixabay.com/photo/2017/06/24/23/41/beer-2439237_960_720.jpg',
    coloring,
    ibu,
    description,
  } = request.body;

  const { id } = request.params;

  const brewmaster = await brewmasterRepository.find({
    where: {
      id,
    },
  });

  const newBeer = await beerRepository.create({
    title,
    image,
    coloring,
    description,
    ibu,
  });

  await brewmasterRepository.update(id, {
    beer: [newBeer],
  });

  return response.send(brewmaster);
});

export default brewmasterRouter;
