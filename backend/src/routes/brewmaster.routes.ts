import { Router } from 'express';

const brewmasterRouter = Router();

brewmasterRouter.get('/', (request, response) => {
  return response.send({ message: 'Hello World' });
});

export default brewmasterRouter;
