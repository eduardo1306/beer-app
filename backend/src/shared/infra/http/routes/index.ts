import { Router } from 'express';
import brewerRoute from '@modules/brewer/infra/http/routes/brewer.routes';
import beerRoute from '@modules/beer/infra/http/routes/beer.routes';

const routes = Router();

routes.use('/brewer', brewerRoute);
routes.use('/beer', beerRoute);

export default routes;
