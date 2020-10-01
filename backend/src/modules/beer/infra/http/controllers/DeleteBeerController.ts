import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteBeerService from '@modules/beer/services/DeleteBeerService';

export default class DeleteBeerController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const brewer_id = request.brewer.id;
    const { beer_id } = request.params;

    const deleteBeer = container.resolve(DeleteBeerService);

    await deleteBeer.execute({ brewer_id, beer_id });

    return response.json({ message: 'Cerveja deletada com sucesso' });
  }
}
