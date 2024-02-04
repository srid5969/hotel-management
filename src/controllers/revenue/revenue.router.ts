import express from 'express';
import {asyncWrapper} from './../../middleware/async-wrapper';
import { upload } from '../../services/multer';
import { RevenueController } from './revenue.controller';

export const RevenueRouter = express.Router();


RevenueRouter.post('/history-forecast', upload.single('file'),asyncWrapper(RevenueController.importHistoryAndForecastOfHotel));
RevenueRouter.post('/business-source', upload.single('file'),asyncWrapper(RevenueController.importBusinessSourceIncomeController));
RevenueRouter.post('/market-segment', upload.single('file'),asyncWrapper(RevenueController.importMarketSegmentController));
