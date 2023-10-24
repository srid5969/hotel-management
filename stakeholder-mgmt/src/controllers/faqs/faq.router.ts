import express from 'express';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {FaqController} from './faq.controller';
import {handleUserSession} from '../../middleware/handle-user-session';
import {validator} from '../../middleware/validator';
import {faqValidator} from './faq.validator';

export const FaqRouter = express.Router();

FaqRouter.get('/get-faqs', [
  handleUserSession(FaqController.getFaqs),
  asyncWrapper(FaqController.getFaqs),
]);

FaqRouter.get('/get-faqsbyId/:faqId?', [
  validator(faqValidator.getFaqbyId, 'params'),
  handleUserSession(FaqController.getFaqsbyId),
  asyncWrapper(FaqController.getFaqsbyId),
]);

FaqRouter.post('/add-update-faq', [
  validator(faqValidator.addUpdateFaq, 'body'),
  handleUserSession(FaqController.addUpdateFaqs),
  asyncWrapper(FaqController.addUpdateFaqs),
]);

FaqRouter.post('/active-inactive-faq', [
  validator(faqValidator.activeInactiveFaq, 'body'),
  handleUserSession(FaqController.activeInactiveFaq),
  asyncWrapper(FaqController.activeInactiveFaq),
]);
