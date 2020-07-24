import { inject, injectable } from 'tsyringe';

import BrewerRepository from '@modules/brewer/infra/typeorm/repository/BrewerRepository';

@injectable()
class DeleteBrewerService {
  constructor(
    @inject('BrewerRepository')
    private brewerRepository: BrewerRepository,
  ) {}

  public async execute(brewerId: string): Promise<void> {
    this.brewerRepository.findOneAndDelete(brewerId);
  }
}

export default DeleteBrewerService;
