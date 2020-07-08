import { getCustomRepository } from 'typeorm';

import BrewerRepository from '../../repositories/BrewerRepository';

class DeleteBrewerService {
  public async execute(brewerId: string): Promise<never[]> {
    const brewerRepository = getCustomRepository(BrewerRepository);

    const brewer = await brewerRepository.findOne(brewerId);

    if (!brewer) {
      throw new Error('Esse cervejeiro não existe!');
    }

    await brewerRepository.delete(brewerId);

    return [];
  }
}

export default DeleteBrewerService;
