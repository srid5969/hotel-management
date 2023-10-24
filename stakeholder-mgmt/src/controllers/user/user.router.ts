import express from 'express';
import {UserController} from './user.controller';
import {asyncWrapper} from '../../middleware/async-wrapper';
  import {validator} from '../../middleware/validator';
import {userValidator} from './user.validator';
import {userProfileUpload} from '../../config/multerParam';
import {handleUserSession} from '../../middleware/handle-user-session';
import {checkAdminRole} from '../../middleware/checkAdminRole';

export const UserRouter = express.Router();

UserRouter.post('/update-user', [
  validator(userValidator.updateUser, 'body'),
  handleUserSession(UserController.updateUser),
  asyncWrapper(UserController.updateUser),
]);

UserRouter.get('/get-user-info/:azureId', [
  handleUserSession(UserController.getUserInfoByAzureId),
  asyncWrapper(UserController.getUserInfoByAzureId),
]);

UserRouter.get('/get-user-by-id/:userId', [
  validator(userValidator.getUserByUserId, 'params'),
  handleUserSession(UserController.getUserInfoByUserId),
  checkAdminRole(UserController.getUserInfoByUserId),
  asyncWrapper(UserController.getUserInfoByUserId),
]);

UserRouter.post(
  '/upload-profile-picture',
  userProfileUpload.single('profilePicture'),
  [
    handleUserSession(UserController.uploadProfilePicture),
    asyncWrapper(UserController.uploadProfilePicture),
  ]
);

UserRouter.get('/get-users', [
  handleUserSession(UserController.getUsersList),
  checkAdminRole(UserController.getUsersList),
  asyncWrapper(UserController.getUsersList),
]);

UserRouter.get('/get-filter-ddl', [
  handleUserSession(UserController.getFilterDDL),
  checkAdminRole(UserController.getFilterDDL),
  asyncWrapper(UserController.getFilterDDL),
]);

UserRouter.post('/filter-users', [
  validator(userValidator.filterUsers, 'body'),
  handleUserSession(UserController.filterUsers),
  checkAdminRole(UserController.filterUsers),
  asyncWrapper(UserController.filterUsers),
]);

UserRouter.post('/enable-disable-users', [
  validator(userValidator.enableDisableUser, 'body'),
  handleUserSession(UserController.enableDisableUser),
  checkAdminRole(UserController.enableDisableUser),
  asyncWrapper(UserController.enableDisableUser),
]);

UserRouter.post('/verify-users', [
  validator(userValidator.verifyUser, 'body'),
  handleUserSession(UserController.verifyUser),
  asyncWrapper(UserController.verifyUser),
]);

// UserRouter.post()

// UserRouter.get('/search', [asyncWrapper(UserController.searchUsers)]);

// UserRouter.post('/update-fcm-token', [
//   validator(userValidator.updateUserFCMToken, 'body'),
//   asyncWrapper(UserController.updateUserFCMToken),
// ]);

// UserRouter.post('/update-tnc-accepted', [
//   validator(userValidator.updateTnCAccepted, 'body'),
//   asyncWrapper(UserController.updateUserTnCAccepted),
// ]);

// UserRouter.get('/terms-and-conditions', [asyncWrapper(UserController.getTNC)]);
