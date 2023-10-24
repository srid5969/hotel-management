import express from 'express';
import {StakeHolderLinksController} from './stakeholder-links.controller';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {handleUserSession} from '../../middleware/handle-user-session';

export const StakeHolderLinksRouter = express.Router();

StakeHolderLinksRouter.get('/get-stakeholder-links', [
  handleUserSession(StakeHolderLinksController.getStakeHolderLinksList),
  asyncWrapper(StakeHolderLinksController.getStakeHolderLinksList),
]);
