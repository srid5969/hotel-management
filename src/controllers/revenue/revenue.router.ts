import express from 'express';
import {asyncWrapper} from './../../middleware/async-wrapper';
import {upload} from '../../services/multer';
import {RevenueController} from './revenue.controller';
import {RevenueGetController} from './revenue.get-controller';

export const RevenueRouter = express.Router();

RevenueRouter.post(
  '/history-forecast',
  upload.single('file'),
  asyncWrapper(RevenueController.importHistoryAndForecastOfHotel)
);

RevenueRouter.post(
  '/business-source',
  upload.single('file'),
  asyncWrapper(RevenueController.importBusinessSourceIncomeController)
);

RevenueRouter.post(
  '/market-segment',
  upload.single('file'),
  asyncWrapper(RevenueController.importMarketSegmentController)
);

RevenueRouter.get(
  '/overall-per-hotel/mtd',
  asyncWrapper(RevenueGetController.getOverallRevenuePerHotelMTD)
);

RevenueRouter.get(
  '/overall-per-hotel/ytd',
  asyncWrapper(RevenueGetController.getOverallRevenuePerHotelYTD)
);

RevenueRouter.get(
  '/unit-wise-total',
  asyncWrapper(RevenueGetController.getTotalRevenueUnitWise)
);

RevenueRouter.get(
  '/segment-wise-consolidated-level',
  asyncWrapper(RevenueGetController.getSegmentWiseRevenueConsolidatedLevel)
);

RevenueRouter.get(
  '/source-wise-consolidated-level',
  asyncWrapper(RevenueGetController.getSourceWiseRevenueConsolidatedLevel)
);

RevenueRouter.get(
  '/city-wise',
  asyncWrapper(RevenueGetController.getCityWiseRevenue)
);

RevenueRouter.get(
  '/hotel-room',
  asyncWrapper(RevenueGetController.getHotelRoomRevenue)
);

RevenueRouter.get(
  '/room-type-revenue',
  asyncWrapper(RevenueGetController.getRoomRevenueByRoomType)
);

RevenueRouter.get(
  '/f&b-revenue-outlet',
  asyncWrapper(RevenueGetController.F_and_B_revenue)
);
