import AppError from '@shared/error/AppError';
import FakeBrewerRepository from '../repositories/fakes/FakeBrewerRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateBrewerService from './AuthenticateBrewerService';

let fakeBrewerRepository: FakeBrewerRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateBrewer: AuthenticateBrewerService;
describe('AuthenticateBrewer', () => {
  beforeEach(() => {
    fakeBrewerRepository = new FakeBrewerRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateBrewer = new AuthenticateBrewerService(
      fakeBrewerRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
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

    const response = await authenticateBrewer.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.brewer).toEqual(brewer);
  });
  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateBrewer.execute({
        email: 'johndoe@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with wrong password', async () => {
    await fakeBrewerRepository.create({
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
      authenticateBrewer.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
