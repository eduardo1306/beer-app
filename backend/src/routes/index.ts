import { Router } from 'express';
import brewerRouter from './brewer.routes';
import beerRouter from './beer.routes';

const routes = Router();

routes.use('/brewer', brewerRouter);
routes.use('/beer', beerRouter);

export default routes;
