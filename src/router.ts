import express from 'express';
import {ApiHealthCheckRouter} from './controllers/api-health-check';
import {UsersRouter} from './controllers/users';
import {HotelsRouter} from './controllers/hotels';
import {RevenueRouter} from './controllers/revenue';
import {AnalysisRouter} from './controllers/analysis';

export const AppRouter = express.Router();

/**
 * @API :-Health Check {{baseURL}}/api/api-health-check/verify
 */
AppRouter.use('/api-health-check', ApiHealthCheckRouter);
AppRouter.use('/users', UsersRouter);
AppRouter.use('/hotels', HotelsRouter);
AppRouter.use('/revenue', RevenueRouter);
AppRouter.use('/analysis', AnalysisRouter);
