import express from 'express';
import {EntityController} from './entity.controller';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {validator} from '../../middleware/validator';
import {entityValidator} from './entity.validator';
import {handleUserSession} from '../../middleware/handle-user-session';
import {checkAdminRole} from '../../middleware/checkAdminRole';

export const EntityRouter = express.Router();

EntityRouter.get('/get-lookup-entity', [
  handleUserSession(EntityController.getEntityList),
  checkAdminRole(EntityController.getEntityList),
  asyncWrapper(EntityController.getEntityList),
]);

EntityRouter.get('/get-lookup-entitybyId/:Id', [
  validator(entityValidator.getEntitybyId, 'params'),
  handleUserSession(EntityController.getEntitybyId),
  checkAdminRole(EntityController.getEntitybyId),
  asyncWrapper(EntityController.getEntitybyId),
]);

EntityRouter.post('/create-lookup-entity', [
  validator(entityValidator.createEntity, 'body'),
  handleUserSession(EntityController.createEntity),
  asyncWrapper(EntityController.createEntity),
]);

// EntityRouter.post('/disable-lookup-entity', [
//   validator(entityValidator.disableEntity, 'body'),
//   handleUserSession(EntityController.disableEntity),
//   asyncWrapper(EntityController.disableEntity),
// ]);

EntityRouter.post('/update-lookup-entity', [
  validator(entityValidator.updateEntity, 'body'),
  handleUserSession(EntityController.updateEntity),
  asyncWrapper(EntityController.updateEntity),
]);
