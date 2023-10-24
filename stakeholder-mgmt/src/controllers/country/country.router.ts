import express from 'express';
import {CountryController} from './country.controller';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {handleUserSession} from '../../middleware/handle-user-session';

export const CountryRouter = express.Router();

CountryRouter.get('/get-country', [
  handleUserSession(CountryController.getCountryList),
  asyncWrapper(CountryController.getCountryList),
]);
