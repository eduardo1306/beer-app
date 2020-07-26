import { Request, Response } from 'express';

import UpdateBrewerPhotoService from '@modules/brewer/services/UpdateBrewerPhotoService';

export default class BrewerUpdatePhotoController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateBrewerPhotoService = new UpdateBrewerPhotoService();
    const photo = request.file.filename;
    const { id } = request.params;

    await updateBrewerPhotoService.execute({
      id,
      photo,
    });

    return response.send({
      message: 'Dados cadastrais atualizados com sucesso!',
    });
  }
}
