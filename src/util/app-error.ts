import {Response} from 'express';
import {
  BadRequestResponse,
  InternalErrorResponse,
  NotFoundResponse,
  PreconditionFailedResponse,
} from './apiResponse';

enum ErrorType {
  INTERNAL = 'InternalError',
  NOT_FOUND = 'NotFoundError',
  NO_ENTRY = 'NoEntryError',
  NO_DATA = 'NoDataError',
  BAD_REQUEST = 'BadRequest',
  PRE_CONDITION_FAILED = 'PreconditionFailed',
}

const notFound = [ErrorType.NOT_FOUND, ErrorType.NO_ENTRY, ErrorType.NO_DATA];

export abstract class AppError extends Error {
  constructor(
    public type: ErrorType,
    public message: string = 'error'
  ) {
    super(type);
  }

  public static handle(err: AppError, res: Response): void {
    if (notFound.includes(err.type)) {
      new NotFoundResponse(res).send();
      return;
    }

    if (err.type === ErrorType.BAD_REQUEST) {
      new BadRequestResponse(res, err.message).send();
      return;
    }
    if (err.type === ErrorType.PRE_CONDITION_FAILED) {
      new PreconditionFailedResponse(res, err.message).send();
      return;
    }

    const message = 'Something went wrong.';
    new InternalErrorResponse(res, message).send();
  }
}

export class InternalError extends AppError {
  constructor(message = 'Internal error') {
    super(ErrorType.INTERNAL, message);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(ErrorType.BAD_REQUEST, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(ErrorType.NOT_FOUND, message);
  }
}
export class PreconditionFailedError extends AppError {
  constructor(message: string) {
    super(ErrorType.PRE_CONDITION_FAILED, message);
  }
}
