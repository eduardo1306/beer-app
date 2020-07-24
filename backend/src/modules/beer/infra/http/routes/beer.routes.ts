import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import multerConfig from '@config/multer';
import {
  beerUpdatePhotoCelebrateConfig,
  beerCreateCelebrateConfig,
} from '@config/celebrate';

import CreateBeerService from '@modules/beer/services/CreateBeerService';
import DeleteBeerService from '@modules/beer/services/DeleteBeerService';
import UpdateBeerImageService from '@modules/beer/services/UpdateBeerImageService';
import BeerRepository from '@modules/beer/repositories/BeerRepository';
import Beer from '@modules/beer/infra/typeorm/entities/Beer';

const upload = multer(multerConfig);
const beerRouter = Router();

beerRouter.get('/beer', async (request, response) => {
  const beerRepository = getCustomRepository(BeerRepository);

  const beers = await beerRepository.find();

  return response.send(beers);
});

beerRouter.post(
  '/beer/:id',
  upload.single('image'),
  celebrate(beerCreateCelebrateConfig, {
    abortEarly: false,
  }),
  async (request, response) => {
    try {
      const beerService = new CreateBeerService();

      const { title, coloring, description, ibu }: Beer = request.body;
      const { id } = request.params;
      const image = request.file;

      if (!image) {
        const beer = await beerService.execute({
          title,
          coloring,
          description,
          ibu,
          image:
            'https://cdn.pixabay.com/photo/2017/06/24/23/41/beer-2439237_960_720.jpg',
          brewer_id: id,
        });

        return response.send(beer);
      }

      const beer = await beerService.execute({
        title,
        coloring,
        description,
        ibu,
        image: image.filename,
        brewer_id: id,
      });

      return response.send(beer);
    } catch (err) {
      return response.send({ message: err.message });
    }
  },
);

beerRouter.delete('/beer', async (request, response) => {
  try {
    const deleteBeerService = new DeleteBeerService();

    const stringifyParams = JSON.stringify(request.query);
    const parsedParams = JSON.parse(stringifyParams);

    const { beer_id, brewer_id } = parsedParams;

    const beer = await deleteBeerService.execute({
      beer_id,
      brewer_id,
    });

    return response.send(beer);
  } catch (err) {
    return response.send({ message: err.message });
  }
});

beerRouter.put(
  '/beer',
  upload.single('image'),
  celebrate(beerUpdatePhotoCelebrateConfig, {
    abortEarly: false,
  }),
  async (request, response) => {
    try {
      const updateBeerImageService = new UpdateBeerImageService();

      const stringifyParams = JSON.stringify(request.query);
      const parsedParams = JSON.parse(stringifyParams);

      const { beer_id, brewer_id } = parsedParams;

      await updateBeerImageService.execute({
        brewer_id,
        id: beer_id,
        image: request.file.filename,
      });

      return response.send({ message: 'Avatar trocado com sucesso!' });
    } catch (err) {
      return response.send({ message: err.message });
    }
  },
);

export default beerRouter;
