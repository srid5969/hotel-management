import express from 'express';
import {PublicCompanyController} from './public-company.controller';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {validator} from '../../middleware/validator';
import {PublicCompanyValidator} from './public-company.validator';
import {handleUserSession} from '../../middleware/handle-user-session';

export const PublicCompRouter = express.Router();

PublicCompRouter.get('/get-public-company', [
  handleUserSession(PublicCompanyController.getPublicCompList),
  asyncWrapper(PublicCompanyController.getPublicCompList),
]);

PublicCompRouter.post('/get-pubcomp-by-compid', [
  validator(PublicCompanyValidator.getPubCompByCompTypeId, 'body'),
  handleUserSession(PublicCompanyController.getPubCompListByCompId),
  asyncWrapper(PublicCompanyController.getPubCompListByCompId),
]);
