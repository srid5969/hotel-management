import {NextFunction, Request, Response} from 'express';
import {AppError, InternalError} from './../util/app-error';
declare interface ErrorWithRequestId extends Error {
  requestId: string;
}

export const errorHandler = (
  error: ErrorWithRequestId,
  _req: Request | any,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof AppError) {
    AppError.handle(error, res);
    return;
  }
  error.requestId = _req.id;
  console.error('APP_ERROR', error);
  AppError.handle(new InternalError(error.message), res);
  return;
};
