import CreateBeerService from './CreateBeerService';
import FakeBeerRepository from '../repositories/fakes/FakeBeerRepository';

let fakeBeerRepository: FakeBeerRepository;
let createBeer: CreateBeerService;
describe('CreateBeerService', () => {
  fakeBeerRepository = new FakeBeerRepository();
  createBeer = new CreateBeerService(fakeBeerRepository);

  it('should be able to create a new beer', async () => {
    const beer = await createBeer.execute({
      coloring: 'example coloring',
      description: 'example description',
      ibu: 'example ibu',
      title: 'example title',
    });

    expect(beer).toHaveProperty('id');
  });
});
