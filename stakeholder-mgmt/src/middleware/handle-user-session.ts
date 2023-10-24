import {Request, Response, NextFunction} from 'express';
import {UserRepository} from '../repositories/users.repo';
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
export const handleUserSession = (asyncRouteHandler: ExpressMiddleware) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<unknown> => {
    const taskName = 'HANDLE_USER_SESSION';
    logger.info(`${taskName}`, req.headers.azureuserid);
    try {
      //#region  Validate User Login
      if (req.originalUrl === '/api/user/verify-users') {
        return next();
      }
      const userRepo = new UserRepository();
      const dbUser = await userRepo.findUserByAzureId(req.headers.azureuserid);
      if (!dbUser) {
        const noResult = new BadRequestResponse(
          res,
          'The Following User Does Not Exist'
        );
        return noResult.send();
      }
      // Note: We are not calling the login api as we are using the Azure AD Default autentication method so we cant manage to prevent multiple user login
      // if (dbUser?.isLogin === false) {
      //   const noResult = new UnauthorizedResponse(res, {
      //     code: 'INVALID_TOKEN_USER_ALREADY_LOGGED_OUT',
      //     message:
      //       'Session Expired or Already logged in from a different browser.',
      //   });
      //   return noResult.send();
      // }

      if (dbUser?.isActive === false) {
        const noResult = new UnauthorizedResponse(res, {
          code: 'USER_DISABLED',
          message: 'User is disabled by admin. Access denied.',
        });
        return noResult.send();
      }
      //#endregion

      //#region Prevent Concurrent User Login
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        const noResult = new BadRequestResponse(
          res,
          'Invalid Session. Access Token Does Not Exist.'
        );
        return noResult.send();
      }

      //#region Not required as sing Azue AD token mechanism
      // if (accessToken?.search('Bearer') !== -1) {
      //   accessToken = accessToken.replace('Bearer ', '');
      // }
      // if (dbUser?.accessToken !== accessToken) {
      //   const noResult = new UnauthorizedResponse(res, {
      //     code: 'INVALID_SESSION_ID',
      //     message:
      //       'Invalid session Id. User is already logged in with same credentials',
      //   });
      //   return noResult.send();
      // }
      //#endregion

      //#endregion
      next();
      // asyncRouteHandler(req, res, next)
      //   .then(() => {
      //     next();
      //   })
      //   .catch(next);
    } catch (error) {
      next(new BadRequestError(error.message));
      return;
    }
  };
};
