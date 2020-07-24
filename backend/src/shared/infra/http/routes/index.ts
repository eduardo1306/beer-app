import { Router } from 'express';
import brewerRouter from '@modules/brewer/infra/http/routes/brewer.routes';
import beerRouter from '@modules/beer/infra/http/routes/beer.routes';

const routes = Router();

routes.use('/', brewerRouter);
routes.use('/', beerRouter);

export default routes;
