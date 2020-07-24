import 'reflect-metadata';
import express, { json } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';

import './typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(json());
app.use(routes);
app.use(errors());

export default app;
