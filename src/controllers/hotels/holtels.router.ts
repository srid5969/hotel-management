import express from 'express';
import { asyncWrapper } from './../../middleware/async-wrapper';
import { HotelsController } from './holtels.controller';

export const HotelsRouter = express.Router();

HotelsRouter.get('/',asyncWrapper(HotelsController.getAllHotels))
HotelsRouter.get('/:id',asyncWrapper(HotelsController.getHotelById))
HotelsRouter.post('/',asyncWrapper(HotelsController.addHotel))
HotelsRouter.patch('/:id',asyncWrapper(HotelsController.updateHotelById))
HotelsRouter.delete('/:id',asyncWrapper(HotelsController.deleteHotelById))
