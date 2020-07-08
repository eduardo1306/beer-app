import { Router } from 'express';
import brewerRouter from './brewer.routes';
import beerRouter from './beer.routes';

const routes = Router();

routes.use('/', brewerRouter);
routes.use('/', beerRouter);

export default routes;
