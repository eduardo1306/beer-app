import { uuid } from 'uuidv4';
import FakeBrewerRepository from '@modules/brewer/repositories/fakes/FakeBrewerRepository';
import CreateBeerService from './CreateBeerService';
import FakeBeerRepository from '../repositories/fakes/FakeBeerRepository';

let fakeBeerRepository: FakeBeerRepository;
let fakeBrewerRepository: FakeBrewerRepository;
let createBeer: CreateBeerService;
describe('CreateBeerService', () => {
  fakeBeerRepository = new FakeBeerRepository();
  fakeBrewerRepository = new FakeBrewerRepository();
  createBeer = new CreateBeerService(fakeBeerRepository, fakeBrewerRepository);

  it('should be able to create a new beer', async () => {
    const beer = await createBeer.execute({
      brewer_id: uuid(),
      coloring: 'example coloring',
      description: 'example description',
      ibu: 'example ibu',
      title: 'example title',
    });

    expect(beer).toHaveProperty('id');
  });
});
