import {Request, Response, NextFunction} from 'express';
import {UserRepository} from '../repositories/users.repo';
import {rolesConfig} from '../config/app';
import {
  logger,
  BadRequestError,
  BadRequestResponse,
  UnauthorizedResponse,
  //   NoContentResponse,
} from '../util';

type ExpressMiddleware = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<unknown>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const checkCXRORole = (asyncRouteHandler: ExpressMiddleware) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<unknown> => {
    const taskName = 'CHECK_USER_ROLE';
    logger.info(`${taskName}`, req.headers.azureuserid);
    try {
      //#region  Validate User Login
      const userRepo = new UserRepository();
      const dbUser = await userRepo.findUserByAzureId(req.headers.azureuserid);
      if (!dbUser) {
        const noResult = new BadRequestResponse(
          res,
          'The Following User Does Not Exist'
        );
        return noResult.send();
      }

      //#region Check user permission based upon roles.
      const getUserRoleId = await userRepo.getUserRoleId(rolesConfig.CXRO);
      if (!getUserRoleId) {
        logger.error(`${taskName}_ROLE_CONFIG_NOT_FOUND`, getUserRoleId);
        const noResult = new BadRequestResponse(res, 'Role Config Not Found');
        return noResult.send();
      }
      const checkUserRole = await userRepo.findUserRoleInfo(
        dbUser.id,
        getUserRoleId.id
      );
      if (checkUserRole.length === 0) {
        const noResult = new UnauthorizedResponse(res, {
          code: 'PERMISSION_DENIED',
          message: 'You do not have the permission to access this endpoint.',
        });
        return noResult.send();
      }

      //#endregion
      next();
    } catch (error) {
      next(new BadRequestError(error.message));
      return;
    }
  };
};
