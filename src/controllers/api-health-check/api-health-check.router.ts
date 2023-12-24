import express from 'express';
import {ApiHealthCheck} from './api-health-check.controller';

export const ApiHealthCheckRouter = express.Router();

ApiHealthCheckRouter.get('/verify', ApiHealthCheck.verify);
