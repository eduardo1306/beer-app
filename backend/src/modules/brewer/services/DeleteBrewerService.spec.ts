import FakeBrewerRepository from '@modules/brewer/repositories/fakes/FakeBrewerRepository';
import DeleteBrewerService from '@modules/brewer/services/DeleteBrewerService';
import CreateBrewerService from '@modules/brewer/services/CreateBrewerService';
import AppError from '@shared/error/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let brewerRepository: FakeBrewerRepository;
let deleteBrewer: DeleteBrewerService;
let createBrewer: CreateBrewerService;
let fakeHashProvider: FakeHashProvider;
describe('DeleteBrewerService', () => {
  beforeEach(() => {
    brewerRepository = new FakeBrewerRepository();
    fakeHashProvider = new FakeHashProvider();
    deleteBrewer = new DeleteBrewerService(brewerRepository);
    createBrewer = new CreateBrewerService(brewerRepository, fakeHashProvider);
  });
  it('should be able to delete an exist brewer', async () => {
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

    await expect(deleteBrewer.execute(brewer.id)).toBeTruthy();
  });
  it('should not be able to delete a non-exist brewer', async () => {
    await expect(
      deleteBrewer.execute('non-exist-brewer-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
