import express from 'express';
import {asyncWrapper} from './../../middleware/async-wrapper';
import {HotelsController} from './holtels.controller';
import {upload} from '../../services/multer';

export const HotelsRouter = express.Router();

HotelsRouter.get('/', asyncWrapper(HotelsController.getAllHotels));
HotelsRouter.get('/:id', asyncWrapper(HotelsController.getHotelById));
HotelsRouter.post('/', asyncWrapper(HotelsController.addHotel));
HotelsRouter.post(
  '/monthly-report',
  upload.single('file'),
  asyncWrapper(HotelsController.importHotelsMonthlyReport)
);
HotelsRouter.post(
  '/daily-report',
  upload.single('file'),
  asyncWrapper(HotelsController.importHotelsDailyReport)
);
HotelsRouter.patch('/:id', asyncWrapper(HotelsController.updateHotelById));
HotelsRouter.delete('/:id', asyncWrapper(HotelsController.deleteHotelById));
