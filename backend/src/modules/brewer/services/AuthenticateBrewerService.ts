import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import authConfig from '@config/auth';

import AppError from '@shared/error/AppError';
import Brewer from '../infra/typeorm/entities/Brewer';
import IBrewerRepository from '../repositories/IBrewerRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  brewer: Brewer;
  token: string;
}

@injectable()
export default class AuthenticateBrewerService {
  constructor(
    @inject('BrewerRepository')
    private brewerRepository: IBrewerRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const brewer = await this.brewerRepository.findByEmail(email);

    if (!brewer) {
      throw new AppError('E-mail/Password incorreto!', 401);
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      brewer.password,
    );

    if (!passwordMatch) {
      throw new AppError('A senha está incorreta!');
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: brewer.id,
      expiresIn,
    });

    return {
      brewer,
      token,
    };
  }
}
