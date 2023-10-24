import express from 'express';
import {AuthController} from './auth.controller';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {validator} from '../../middleware/validator';
import {authValidator} from './auth.validator';
import {handleUserSession} from '../../middleware/handle-user-session';

export const AuthRouter = express.Router();

AuthRouter.post('/login', [
  validator(authValidator.login, 'body'),
  asyncWrapper(AuthController.login),
]);

AuthRouter.post('/logout/:userId', [
  validator(authValidator.logout, 'params'),
  asyncWrapper(AuthController.logout),
]);

AuthRouter.get('/get-create-user-ddl', [
  asyncWrapper(AuthController.createUserDDL),
]);

AuthRouter.post('/create-user', [
  validator(authValidator.createUser, 'body'),
  asyncWrapper(AuthController.createUser),
]);

AuthRouter.post('/createOtp', [
  validator(authValidator.generateOtp, 'body'),
  asyncWrapper(AuthController.generateOtp),
]);

AuthRouter.post('/verifyOtp', [
  validator(authValidator.verifyOtp, 'body'),
  asyncWrapper(AuthController.verifyOtp),
]);

// AuthRouter.post('/updatePassword', [
//   validator(authValidator.updatePassword, 'body'),
//   asyncWrapper(AuthController.updatePassword),
// ]);

AuthRouter.post('/set-password', [
  validator(authValidator.setPassword, 'body'),
  asyncWrapper(AuthController.setPassword),
]);

AuthRouter.post('/forgot-password', [
  validator(authValidator.updatePassword, 'body'),
  asyncWrapper(AuthController.forgotPassword),
]);

AuthRouter.get('/refresh-token/:userId', [
  validator(authValidator.refreshToken, 'params'),
  asyncWrapper(AuthController.refreshToken),
]);

AuthRouter.post('/change-password', [
  validator(authValidator.changePassword, 'body'),
  handleUserSession(AuthController.changePassword),
  asyncWrapper(AuthController.changePassword),
]);

AuthRouter.post('/revoke-token', [asyncWrapper(AuthController.revokeToken)]);
