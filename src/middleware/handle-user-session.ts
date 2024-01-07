import {NextFunction, Request, Response} from 'express';
import {
  BadRequestResponse,
  InternalErrorResponse,
  MethodNotAllowedResponse,
  NotFoundResponse,
} from './../util/apiResponse';
type ExpressMiddleware = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<unknown>;

export const handleUserSession = (_asyncRouteHandler: ExpressMiddleware) => {
  return async (
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<unknown> => {
    // const taskName = 'HANDLE_USER_SESSION';
    try {
      const url: string = req.originalUrl;

      const condition: boolean =
        url.startsWith('/api/general') && req.method == 'GET';
      if (condition) {
        return next();
      }

      switch (url) {
        case '/api/user/login':
          return next();
        default:
          if (req.headers.authorization) {
            const token: string[] = req.headers.authorization.split(' ') || '';
            if (!token[1]) {
              const response = new NotFoundResponse(
                res,
                'Bearer token not found'
              );
              response.send();
              break;
            }
            try {
              // const userRepo = new UserRepository();
              //#region Prevent Concurrent User Login
              let accessToken = req.headers.authorization;
              if (!accessToken) {
                const noResult = new BadRequestResponse(
                  res,
                  'Invalid Session. Access Token Does Not Exist.'
                );
                return noResult.send();
              }
              if (accessToken?.search('Bearer') !== -1) {
                accessToken = accessToken.replace('Bearer ', '');
              }

              //code...
            } catch (error) {
              console.log(error);

              const response = new InternalErrorResponse(res, 'Server error');
              return response.send();
            }
          } else {
            //code ...
          }
          // eslint-disable-next-line no-case-declarations
          const response = new MethodNotAllowedResponse(res, 'Token not found');
          return response.send();
      }
    } catch (error) {
      const response = new InternalErrorResponse(res, 'Some error occurred');
      return response.send();
    }
  };
};
