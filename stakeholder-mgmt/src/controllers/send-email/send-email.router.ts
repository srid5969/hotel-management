import express from 'express';
import {SendEmailController} from './send-email.controller';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {validator} from '../../middleware/validator';
import {resendEmailValidator} from './send-email.validator';
import {handleUserSession} from '../../middleware/handle-user-session';

export const SendEmailRouter = express.Router();

SendEmailRouter.post('/resend-user-invite-email', [
  validator(resendEmailValidator.resendEmail, 'body'),
  handleUserSession(SendEmailController.resendEmail),
  asyncWrapper(SendEmailController.resendEmail),
]);
