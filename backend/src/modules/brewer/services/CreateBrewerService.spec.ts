import FakeBrewerRepository from '@modules/brewer/repositories/fakes/FakeBrewerRepository';
import CreateBrewerService from '@modules/brewer/services/CreateBrewerService';
import AppError from '@shared/error/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let brewerRepository: FakeBrewerRepository;
let createBrewer: CreateBrewerService;
let fakeHashProvider: FakeHashProvider;
describe('CreateBrewerService', () => {
  beforeEach(() => {
    brewerRepository = new FakeBrewerRepository();
    fakeHashProvider = new FakeHashProvider();
    createBrewer = new CreateBrewerService(brewerRepository, fakeHashProvider);
  });
  it('should be able to create a new brewer', async () => {
    const brewer = await createBrewer.execute({
      city: 'Vila Velha',
      email: 'johndoe@example.com',
      latitude: -20.4568766,
      longitude: -40.3657492,
      name: 'John Doe',
      password: '123456',
      uf: 'ES',
      whatsapp: '2712345678901',
    });

    expect(brewer).toHaveProperty('id');
  });
  it('should not be able to create a new brewer with the same email to another', async () => {
    await createBrewer.execute({
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
      createBrewer.execute({
        city: 'Vila Velha',
        email: 'johndoe@example.com',
        latitude: -20.4568766,
        longitude: -40.3657492,
        name: 'John Doe',
        password: '123456',
        uf: 'ES',
        whatsapp: '2712345678901',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
