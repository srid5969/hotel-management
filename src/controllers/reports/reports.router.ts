import express from 'express';
import {asyncWrapper} from './../../middleware/async-wrapper';
import {ReportsController} from './reports.controller';

export const ReportsRouter = express.Router();

ReportsRouter.get('/:id', asyncWrapper(ReportsController.hotelReports));
