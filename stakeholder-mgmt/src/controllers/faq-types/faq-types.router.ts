import express from 'express';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {FaqTypesController} from './faq-types.controller';
import {handleUserSession} from '../../middleware/handle-user-session';
import {validator} from '../../middleware/validator';
import {faqTypesValidator} from './faq-types.validator';

export const FaqTypesRouter = express.Router();

FaqTypesRouter.get('/get-faqTypes/:faqTypeId?', [
  validator(faqTypesValidator.getfaqTypeById, 'params'),
  handleUserSession(FaqTypesController.getFaqTypes),
  asyncWrapper(FaqTypesController.getFaqTypes),
]);

FaqTypesRouter.post('/add-update-faqTypes', [
  validator(faqTypesValidator.addUpdateFaqTypes, 'body'),
  handleUserSession(FaqTypesController.addUpdateFaqTypes),
  asyncWrapper(FaqTypesController.addUpdateFaqTypes),
]);
