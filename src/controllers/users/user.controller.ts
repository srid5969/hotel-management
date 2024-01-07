import {Request, Response} from 'express';
import {InternalErrorResponse, SuccessResponse} from './../../util/apiResponse';
import {AppError} from './../../util/app-error';
import {UserRepository} from './../../repositories/user';

export class UsersController {
  private static userService: UserRepository = new UserRepository();
  public static async getAllUsers(req: Request, res: Response) {
    try {
      const data = await UsersController.userService.getAllUsers(
        req.query.limit as any,
        req.query.offset as any
      );
      return new SuccessResponse(res, 'OK', data).send();
    } catch (error) {
      if (error instanceof AppError) return AppError.handle(error, res);
      return new InternalErrorResponse(res);
    }
  }
  public static async getUserById(req: Request, res: Response) {
    try {
      const data = await UsersController.userService.getUserById(req.params.id);
      return new SuccessResponse(res, 'OK', data).send();
    } catch (error) {
      if (error instanceof AppError) return AppError.handle(error, res);
      return new InternalErrorResponse(res);
    }
  }
  public static async deleteUserById(req: Request, res: Response) {
    try {
      const data =await UsersController.userService.deleteUserById(req.params.id);
      return new SuccessResponse(res, 'OK', data).send();
    } catch (error) {
      if (error instanceof AppError) return AppError.handle(error, res);
      return new InternalErrorResponse(res);
    }
  }
  public static async updateUserById(req: Request, res: Response) {
    try {
      const data =await UsersController.userService.updateUserById(
        req.params.id,
        req.body
      );
      return new SuccessResponse(res, 'OK', data).send();
    } catch (error) {
      if (error instanceof AppError) return AppError.handle(error, res);
      return new InternalErrorResponse(res);
    }
  }
  public static async addUser(req: Request, res: Response) {
    try {
      const data =await UsersController.userService.registerUser(req.body);
      return new SuccessResponse(res, 'OK', data).send();
    } catch (error) {
      if (error instanceof AppError) return AppError.handle(error, res);
      return new InternalErrorResponse(res);
    }
  }
}
