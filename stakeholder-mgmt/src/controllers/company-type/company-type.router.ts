import express from 'express';
import {CompanyTypeController} from './company-type.controller';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {validator} from '../../middleware/validator';
import {companyTypeValidator} from './company-type.validator';
import {handleUserSession} from '../../middleware/handle-user-session';

export const CompanyTypeRouter = express.Router();

CompanyTypeRouter.get('/get-company-types', [
  handleUserSession(CompanyTypeController.getCompTypeList),
  asyncWrapper(CompanyTypeController.getCompTypeList),
]);

CompanyTypeRouter.post('/get-comptype-by-orgid', [
  validator(companyTypeValidator.getCompTypeByOrgId, 'body'),
  handleUserSession(CompanyTypeController.getCompTypeByOrgId),
  asyncWrapper(CompanyTypeController.getCompTypeByOrgId),
]);
