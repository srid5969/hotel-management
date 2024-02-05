import express from 'express';
import {UsersController} from './user.controller';
import {asyncWrapper} from './../../middleware/async-wrapper';

export const UsersRouter = express.Router();

UsersRouter.post('/', asyncWrapper(UsersController.addUser));
UsersRouter.get('/', asyncWrapper(UsersController.getAllUsers));
UsersRouter.get('/:id', asyncWrapper(UsersController.getUserById));
UsersRouter.delete('/:id', asyncWrapper(UsersController.deleteUserById));
UsersRouter.put('/:id', asyncWrapper(UsersController.updateUserById));
