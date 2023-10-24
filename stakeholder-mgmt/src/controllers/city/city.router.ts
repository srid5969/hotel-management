import express from 'express';
import {CityController} from './city.controller';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {handleUserSession} from '../../middleware/handle-user-session';

export const CityRouter = express.Router();

CityRouter.get('/get-city', [
  handleUserSession(CityController.getCityList),
  asyncWrapper(CityController.getCityList),
]);
