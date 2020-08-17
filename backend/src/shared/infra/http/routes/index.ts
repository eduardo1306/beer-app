import { Router } from 'express';
import brewerRoute from '@modules/brewer/infra/http/routes/brewer.routes';

const routes = Router();

routes.use('/brewer', brewerRoute);

export default routes;
