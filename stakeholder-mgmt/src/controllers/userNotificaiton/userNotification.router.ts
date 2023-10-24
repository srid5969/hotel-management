import express from 'express';
import {UserNotificationController} from './userNotification.controller';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {validator} from '../../middleware/validator';
import {userNotificationValidator} from './userNotification.validator';
import {handleUserSession} from '../../middleware/handle-user-session';

export const UserNotificationRouter = express.Router();

UserNotificationRouter.post('/get-notifications/:userId', [
  validator(userNotificationValidator.getNotification, 'params'),
  handleUserSession(UserNotificationController.getNotification),
  asyncWrapper(UserNotificationController.getNotification),
]);

UserNotificationRouter.get('/send-escalation-emails', [
  asyncWrapper(UserNotificationController.checkUsersForEscalationEmails),
]);

UserNotificationRouter.post('/mark-as-read', [
  validator(userNotificationValidator.markNotificationAsRead, 'body'),
  handleUserSession(UserNotificationController.readNotification),
  asyncWrapper(UserNotificationController.readNotification),
]);
