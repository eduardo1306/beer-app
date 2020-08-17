import { Router } from 'express';
import BrewerController from '../controllers/BrewerController';

const brewerRouter = Router();
const brewerController = new BrewerController();

brewerRouter.post('/', brewerController.create);

export default brewerRouter;
