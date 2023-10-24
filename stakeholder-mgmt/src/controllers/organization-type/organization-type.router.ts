import express from 'express';
import {OrganizationTypeController} from './organization-type.controller';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {handleUserSession} from '../../middleware/handle-user-session';

export const OrganizationTypeRouter = express.Router();

OrganizationTypeRouter.get('/get-organization-types', [
  handleUserSession(OrganizationTypeController.getOrgTypeList),
  asyncWrapper(OrganizationTypeController.getOrgTypeList),
]);
