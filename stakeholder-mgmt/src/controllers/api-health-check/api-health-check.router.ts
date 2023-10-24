import express from 'express';
import {ApiHealthCheck} from './api-health-check.controller';
import {asyncWrapper} from '../../middleware/async-wrapper';

export const ApiHealthCheckRouter = express.Router();

ApiHealthCheckRouter.get('/verify', [asyncWrapper(ApiHealthCheck.verify)]);
