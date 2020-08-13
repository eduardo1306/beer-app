import FakeBrewerRepository from '@modules/brewer/repositories/fakes/FakeBrewerRepository';
import CreateBrewerService from '@modules/brewer/services/CreateBrewerService';
import AppError from '@shared/error/AppError';

let brewerRepository: FakeBrewerRepository;
let createBrewer: CreateBrewerService;
describe('CreateBrewerService', () => {
  beforeEach(() => {
    brewerRepository = new FakeBrewerRepository();
    createBrewer = new CreateBrewerService(brewerRepository);
  });
  it('should be able to create a new brewer', async () => {
    const brewer = await createBrewer.execute({
      city: 'Vila Velha',
      email: 'johndoe@example.com',
      latitude: -20.4568766,
      longitude: -40.3657492,
      name: 'John Doe',
      password: '123456',
      photo: 'photo.jpeg',
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
      photo: 'photo.jpeg',
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
        photo: 'photo.jpeg',
        uf: 'ES',
        whatsapp: '2712345678901',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
