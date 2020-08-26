import AppError from '@shared/error/AppError';
import FakeBrewerRepository from '@modules/brewer/repositories/fakes/FakeBrewerRepository';
import FakeBeerRepository from '../repositories/fakes/FakeBeerRepository';
import CreateBeerService from './CreateBeerService';
import DeleteBeerService from './DeleteBeerService';

let fakeBeerRepository: FakeBeerRepository;
let fakeBrewerRepository: FakeBrewerRepository;
let createBeer: CreateBeerService;
let deleteBeer: DeleteBeerService;
describe('DeleteBeerService', () => {
  fakeBeerRepository = new FakeBeerRepository();
  fakeBrewerRepository = new FakeBrewerRepository();
  createBeer = new CreateBeerService(fakeBeerRepository, fakeBrewerRepository);
  deleteBeer = new DeleteBeerService(fakeBeerRepository, fakeBrewerRepository);

  it('should be able to delete a beer', async () => {
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

    await expect(
      deleteBeer.execute({
        beer_id: beer.id,
        brewer_id: brewer.id,
      }),
    ).toBeTruthy();
  });
  it('should not be able to delete a non-existing beer', async () => {
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

    await expect(
      deleteBeer.execute({
        beer_id: 'non-existing-beer-id',
        brewer_id: brewer.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
