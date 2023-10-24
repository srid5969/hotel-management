import express from 'express';
import {PriorityLevelController} from './priority-level.controller';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {handleUserSession} from '../../middleware/handle-user-session';

export const PriorityLevelRouter = express.Router();

PriorityLevelRouter.get('/get-priority-level', [
  handleUserSession(PriorityLevelController.getPriorityLevelList),
  asyncWrapper(PriorityLevelController.getPriorityLevelList),
]);
