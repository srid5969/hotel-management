import cors from 'cors';
import express from 'express';
import morganBody from 'morgan-body';
import {appConfig} from './config';
import {errorHandler} from './middleware/error-handler';
import {requestId} from './middleware/request-id';
import {AppRouter} from './router';
import {NotFoundError} from './util/app-error';

export const app: express.Application = express();
app.use(express.json());
app.use(requestId);
morganBody(app, {
  noColors: true,
  prettify: false,
  logRequestId: true,
  stream: null,
  filterParameters: ['password', 'access_token', 'refresh_token', 'id_token'],
});

app.use(cors());

app.use('/api', AppRouter);
app.use((_req, _res, next) => next(new NotFoundError()));
app.use(errorHandler);
app.set('port', appConfig.port);
