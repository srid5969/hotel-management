import express from 'express';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {RolesController} from './roles.controller';
import {handleUserSession} from '../../middleware/handle-user-session';

export const RolesRouter = express.Router();

RolesRouter.get('/get-roles', [
  handleUserSession(RolesController.getRoles),
  asyncWrapper(RolesController.getRoles),
]);
