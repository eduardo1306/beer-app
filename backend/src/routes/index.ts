import { Router } from 'express';
import brewerRouter from './brewer.routes';

const routes = Router();

routes.use('/brewer', brewerRouter);

export default routes;
