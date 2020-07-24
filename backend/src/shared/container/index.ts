import { container } from 'tsyringe';

import IBeerRepository from '@modules/beer/repositories/IBeerRepository';
import BeerRepository from '@modules/beer/infra/typeorm/repository/BeerRepository';

import IBrewerRepository from '@modules/brewer/repositories/IBrewerRepository';
import BrewerRepository from '@modules/brewer/infra/typeorm/repository/BrewerRepository';

container.register<IBeerRepository>('BeerRepository', BeerRepository);
container.register<IBrewerRepository>('BrewerRepository', BrewerRepository);
