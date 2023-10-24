import express from 'express';
import {OrganizationNameController} from './organization-name.controller';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {validator} from '../../middleware/validator';
import {organizationNameValidator} from './organization-name.validator';
import {handleUserSession} from '../../middleware/handle-user-session';

export const OrganizationNameRouter = express.Router();

OrganizationNameRouter.get('/get-organization-namesbyId/:orgId?', [
  validator(organizationNameValidator.getOrgById, 'params'),
  handleUserSession(OrganizationNameController.getOrgNamebyId),
  asyncWrapper(OrganizationNameController.getOrgNamebyId),
]);

OrganizationNameRouter.post('/get-public-organizations', [
  validator(organizationNameValidator.getOrgByPubCompId, 'body'),
  handleUserSession(OrganizationNameController.getOrgByPubCompId),
  asyncWrapper(OrganizationNameController.getOrgByPubCompId),
]);

OrganizationNameRouter.get('/get-lookup-data', [
  handleUserSession(OrganizationNameController.getOrganizationDDL),
  asyncWrapper(OrganizationNameController.getOrganizationDDL),
]);

OrganizationNameRouter.post('/create-lookup-organization', [
  validator(organizationNameValidator.createOrganization, 'body'),
  handleUserSession(OrganizationNameController.createOrganization),
  asyncWrapper(OrganizationNameController.createOrganization),
]);

OrganizationNameRouter.post('/update-lookup-organization', [
  validator(organizationNameValidator.updateOrganization, 'body'),
  handleUserSession(OrganizationNameController.updateOrganization),
  asyncWrapper(OrganizationNameController.updateOrganization),
]);
