import AuthenticateBrewerService from '@modules/brewer/services/AuthenticateBrewerService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateBrewer = container.resolve(AuthenticateBrewerService);

    const { brewer, token } = await authenticateBrewer.execute({
      email,
      password,
    });

    return response.json({ brewer: classToClass(brewer), token });
  }
}
