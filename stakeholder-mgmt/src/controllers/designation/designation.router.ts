import express from 'express';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {validator} from '../../middleware/validator';
import {handleUserSession} from '../../middleware/handle-user-session';
import {designationValidator} from './designation.validator';
import {DesignationController} from './designation.controller';

export const DesignationRouter = express.Router();

DesignationRouter.post('/create-lookup-designation', [
  validator(designationValidator.createDesignation, 'body'),
  handleUserSession(DesignationController.addDesignation),
  asyncWrapper(DesignationController.addDesignation),
]);

DesignationRouter.post('/enable-disable-lookup-designation', [
  validator(designationValidator.enableDisableDesignation, 'body'),
  handleUserSession(DesignationController.enableDisableDesignation),
  asyncWrapper(DesignationController.enableDisableDesignation),
]);
