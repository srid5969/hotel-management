import express from 'express';
import { UsersController } from './user.controller';
import { asyncWrapper } from './../../middleware/async-wrapper';

export const UsersRouter = express.Router();

UsersRouter.get('/', asyncWrapper(UsersController.addUser));
UsersRouter.get('/', asyncWrapper(UsersController.getAllUsers));
UsersRouter.get('/:id', asyncWrapper(UsersController.getUserById));
UsersRouter.get('/:id', asyncWrapper(UsersController.deleteUserById));
UsersRouter.get('/:id', asyncWrapper(UsersController.updateUserById));
