import express from 'express';
import {AppRouter} from './routes';
import {appConfig} from './config';
import cors from 'cors';
import morganBody from 'morgan-body';
import {LoggingStream, NotFoundError} from './util';
import {requestId, errorHandler} from './middleware';
export const app: express.Application = express();
app.use(express.json());
app.use(requestId);
morganBody(app, {
  noColors: true,
  prettify: false,
  logRequestId: true,
  stream: new LoggingStream(),
  filterParameters: ['password', 'access_token', 'refresh_token', 'id_token'],
});
app.use(cors());
app.use('/api', AppRouter);
app.use((_req, _res, next) => next(new NotFoundError()));
app.use(errorHandler);
app.set('port', appConfig.port);
