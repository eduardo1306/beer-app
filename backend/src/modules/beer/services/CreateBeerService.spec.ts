import FakeBrewerRepository from '@modules/brewer/repositories/fakes/FakeBrewerRepository';
import AppError from '@shared/error/AppError';
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
    const brewer = await fakeBrewerRepository.create({
      city: 'Vila Velha',
      email: 'johndoe@example.com',
      latitude: -20.4568766,
      longitude: -40.3657492,
      name: 'John Doe',
      password: '123456',
      uf: 'ES',
      whatsapp: '2712345678901',
    });

    const beer = await createBeer.execute({
      brewer_id: brewer.id,
      coloring: 'example coloring',
      description: 'example description',
      ibu: 'example ibu',
      title: 'example title',
    });

    expect(beer).toHaveProperty('id');
  });
  it('should not be able to create a new beer without a non-existing brewer', async () => {
    await expect(
      createBeer.execute({
        brewer_id: 'non-existing-brewer-id',
        coloring: 'example coloring',
        description: 'example description',
        ibu: 'example ibu',
        title: 'example title',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
