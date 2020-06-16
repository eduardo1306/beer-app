import { Router } from 'express';
import brewmasterRoutes from './brewmaster.routes';

const routes = Router();

routes.use('/brewmaster', brewmasterRoutes);

export default routes;
