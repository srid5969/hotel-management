import express from 'express';
import {ApiHealthCheckRouter} from './controllers/api-health-check';
import { UsersRouter } from './controllers/users';
import { HotelsRouter } from './controllers/hotels';

export const AppRouter = express.Router();

/**
 * @API :-Health Check {{baseURL}}/api/api-health-check/verify
 */
AppRouter.use('/api-health-check', ApiHealthCheckRouter);
AppRouter.use('/users', UsersRouter);
AppRouter.use('/hotels', HotelsRouter);
