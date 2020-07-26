import { Response, Request } from 'express';

import UpdateBeerImageService from '@modules/beer/services/UpdateBeerImageService';

export default class BeersUpdateAvatarController {
  public async update(
    response: Response,
    request: Request,
  ): Promise<Response<string>> {
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
  }
}
