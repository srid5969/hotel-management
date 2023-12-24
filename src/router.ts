import express from 'express';
import {ApiHealthCheckRouter} from './controllers/api-health-check';
import {ReportsRouter} from './controllers/reports';
/**
 * @AppRouter Express App Router
 * All Router files are declared here
 */
export const AppRouter = express.Router();

/**
 * @API :-Health Check
 */
AppRouter.use('/api-health-check', ApiHealthCheckRouter);
AppRouter.use('/reports', ReportsRouter);
