import express from 'express';
import {AdminDashboardController} from './admin-dashboard.controller';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {validator} from '../../middleware/validator';
import {adminDashboardValidator} from './admin-dashboard.validator';

export const AdminDashboardRouter = express.Router();

AdminDashboardRouter.get('/get-admin-dashboard', [
  asyncWrapper(AdminDashboardController.getDashboardData),
]);

AdminDashboardRouter.get('/filter-ddl-data', [
  asyncWrapper(AdminDashboardController.getFilterDdlData),
]);

AdminDashboardRouter.post('/get-org-names', [
  validator(adminDashboardValidator.getOrgNames, 'body'),
  asyncWrapper(AdminDashboardController.getOrgNameData),
]);

AdminDashboardRouter.post('/filter-dashboard', [
  validator(adminDashboardValidator.filterDashboard, 'body'),
  asyncWrapper(AdminDashboardController.filterDashboardData),
]);
