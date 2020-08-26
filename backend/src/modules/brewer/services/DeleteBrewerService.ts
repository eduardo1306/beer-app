import { inject, injectable } from 'tsyringe';

import AppError from '@shared/error/AppError';
import IBrewerRepository from '../repositories/IBrewerRepository';

@injectable()
export default class DeleteBrewerService {
  constructor(
    @inject('BrewerRepository')
    private brewerRepository: IBrewerRepository,
  ) {}

  public async execute(brewer_id: string): Promise<void> {
    const brewer = await this.brewerRepository.findById(brewer_id);

    if (!brewer) {
      throw new AppError('Esse cervejeiro não existe!');
    }

    await this.brewerRepository.delete(brewer_id);
  }
}
