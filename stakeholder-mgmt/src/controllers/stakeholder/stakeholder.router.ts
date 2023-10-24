import express from 'express';
import {StakeholderController} from './stakeholder.controller';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {validator} from '../../middleware/validator';
import {stakeHolderValidator} from './stakeholder.validator';
import {stakeholderProfileUpload} from '../../config/multerParam';
import {handleUserSession} from '../../middleware/handle-user-session';
import {checkAdminRole} from '../../middleware/checkAdminRole';
import {checkCXRORole} from '../../middleware/checkCXRORole';

export const StakeholderRouter = express.Router();

StakeholderRouter.get('/get-ddl-data', [
  handleUserSession(StakeholderController.getDropdownData),
  asyncWrapper(StakeholderController.getDropdownData),
]);

StakeholderRouter.get('/get-stakeholders', [
  handleUserSession(StakeholderController.getStakeHolderList),
  asyncWrapper(StakeholderController.getStakeHolderList),
]);

StakeholderRouter.post('/create-or-update-stakeholder', [
  validator(stakeHolderValidator.createUpdateStakeHolder, 'body'),
  handleUserSession(StakeholderController.createUpdateStakeHolder),
  asyncWrapper(StakeholderController.createUpdateStakeHolder),
]);

StakeholderRouter.post(
  '/upload-profile-picture',
  stakeholderProfileUpload.single('profilePicture'),
  [
    handleUserSession(StakeholderController.uploadProfilePicture),
    asyncWrapper(StakeholderController.uploadProfilePicture),
  ]
);

StakeholderRouter.get('/get-filter-ddl', [
  handleUserSession(StakeholderController.getFilterDropdownData),
  asyncWrapper(StakeholderController.getFilterDropdownData),
]);

StakeholderRouter.post('/filter-stakeholders', [
  validator(stakeHolderValidator.filterStakeHolder, 'body'),
  handleUserSession(StakeholderController.getStakeHolderFilteredList),
  asyncWrapper(StakeholderController.getStakeHolderFilteredList),
]);

StakeholderRouter.post('/stakeholder-action', [
  validator(stakeHolderValidator.stakeHolderActions, 'body'),
  handleUserSession(StakeholderController.stakeHolderAction),
  checkAdminRole(StakeholderController.stakeHolderAction),
  asyncWrapper(StakeholderController.stakeHolderAction),
]);

StakeholderRouter.get('/get-stakeholder/:stakeHolderId', [
  validator(stakeHolderValidator.getStakeHolderById, 'params'),
  handleUserSession(StakeholderController.getStakeholderById),
  checkAdminRole(StakeholderController.getStakeholderById),
  asyncWrapper(StakeholderController.getStakeholderById),
]);

StakeholderRouter.post('/get-stakeholders-for-merging', [
  validator(stakeHolderValidator.getStakeholdersForMerging, 'body'),
  handleUserSession(StakeholderController.getStakeholdersForMerging),
  checkAdminRole(StakeholderController.getStakeholdersForMerging),
  asyncWrapper(StakeholderController.getStakeholdersForMerging),
]);

StakeholderRouter.get('/get-approved-stakeholders', [
  handleUserSession(StakeholderController.getApprovedStakeholderList),
  checkAdminRole(StakeholderController.getApprovedStakeholderList),
  asyncWrapper(StakeholderController.getApprovedStakeholderList),
]);

StakeholderRouter.post('/disable-stakeholder', [
  validator(stakeHolderValidator.disableStakeholder, 'body'),
  handleUserSession(StakeholderController.disableStakeholder),
  checkAdminRole(StakeholderController.disableStakeholder),
  asyncWrapper(StakeholderController.disableStakeholder),
]);

StakeholderRouter.post('/enable-stakeholder', [
  validator(stakeHolderValidator.enableStakeholder, 'body'),
  handleUserSession(StakeholderController.enableStakeholder),
  checkAdminRole(StakeholderController.enableStakeholder),
  asyncWrapper(StakeholderController.enableStakeholder),
]);

StakeholderRouter.post('/get-stakeholder-profile', [
  validator(stakeHolderValidator.getProfileInfo, 'body'),
  handleUserSession(StakeholderController.getStakeholderProfileInfo),
  checkAdminRole(StakeholderController.getStakeholderProfileInfo),
  asyncWrapper(StakeholderController.getStakeholderProfileInfo),
]);

StakeholderRouter.post('/get-stakeholder-social-profile', [
  validator(stakeHolderValidator.getProfileInfo, 'body'),
  handleUserSession(StakeholderController.getStakeholderSocialProfileInfo),
  checkAdminRole(StakeholderController.getStakeholderSocialProfileInfo),
  asyncWrapper(StakeholderController.getStakeholderSocialProfileInfo),
]);

StakeholderRouter.post('/get-stakeholder-profile-for-cxro', [
  validator(stakeHolderValidator.getProfileInfo, 'body'),
  handleUserSession(StakeholderController.getStakeholderProfileInfo),
  checkCXRORole(StakeholderController.getStakeholderProfileInfo),
  asyncWrapper(StakeholderController.getStakeholderProfileInfo),
]);

StakeholderRouter.post('/get-stakeholder-social-profile-for-cxro', [
  validator(stakeHolderValidator.getProfileInfo, 'body'),
  handleUserSession(StakeholderController.getStakeholderSocialProfileInfo),
  checkCXRORole(StakeholderController.getStakeholderSocialProfileInfo),
  asyncWrapper(StakeholderController.getStakeholderSocialProfileInfo),
]);
