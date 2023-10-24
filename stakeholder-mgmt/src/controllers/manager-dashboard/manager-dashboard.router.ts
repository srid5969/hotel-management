import express from 'express';
import {ManagerDashboardController} from './manager-dashboard.controller';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {validator} from '../../middleware/validator';
import {managerDashboardValidator} from './manager-dashboard.validator';
import {handleUserSession} from '../../middleware/handle-user-session';

export const ManagerDashboardRouter = express.Router();

ManagerDashboardRouter.get('/get-manager-dashboard/:userId', [
  validator(managerDashboardValidator.getUser, 'params'),
  handleUserSession(ManagerDashboardController.getDashboardData),
  asyncWrapper(ManagerDashboardController.getDashboardData),
]);

ManagerDashboardRouter.get('/filter-ddl-data', [
  handleUserSession(ManagerDashboardController.getFilterDdlData),
  asyncWrapper(ManagerDashboardController.getFilterDdlData),
]);

ManagerDashboardRouter.post('/get-org-names', [
  validator(managerDashboardValidator.getOrgNames, 'body'),
  handleUserSession(ManagerDashboardController.getOrgNameData),
  asyncWrapper(ManagerDashboardController.getOrgNameData),
]);

ManagerDashboardRouter.post('/filter-dashboard', [
  validator(managerDashboardValidator.filterDashboard, 'body'),
  handleUserSession(ManagerDashboardController.filterDashboardData),
  asyncWrapper(ManagerDashboardController.filterDashboardData),
]);
