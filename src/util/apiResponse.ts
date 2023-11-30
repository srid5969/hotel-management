import {ServerResponse} from 'http';
import {NextApiResponse} from 'next';
import {NextResponse} from 'next/server';

export enum ResponseStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
  NO_CONTENT = 201,
  CONFLICT = 409,
  GONE = 410,
  METHOD_NOT_ALLOWED = 405,
  PRECONDITION_FAILED = 412,
}

abstract class ApiResponse {
  constructor(
    protected statusCode: ResponseStatus,
    protected message: string | Record<string, unknown>,
    protected data: unknown | null = null
  ) {}

  public send(): any {
    return NextResponse.json(
      {
        data: this.data,
        message: this.message,
      },
      {status: this.statusCode}
    );
  }
}

export class NotFoundResponse extends ApiResponse {
  constructor(message = 'Not Found') {
    super(ResponseStatus.NOT_FOUND, message);
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(message = 'Unknown error occurred') {
    super(ResponseStatus.INTERNAL_ERROR, message);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message: string) {
    super(ResponseStatus.BAD_REQUEST, message);
  }
}

export class SuccessResponse extends ApiResponse {
  constructor(message: string, data?: unknown) {
    super(ResponseStatus.SUCCESS, message, data);
  }
}

export class NoContentResponse extends ApiResponse {
  constructor(message: string) {
    super(ResponseStatus.NO_CONTENT, message);
  }
}

export class UnauthorizedResponse extends ApiResponse {
  constructor(message: string) {
    super(ResponseStatus.UNAUTHORIZED, message);
  }
}

export class ConflictResponse extends ApiResponse {
  constructor(message: string) {
    super(ResponseStatus.CONFLICT, message);
  }
}

export class MethodNotAllowedResponse extends ApiResponse {
  constructor(message: string = 'Method not allowed') {
    super(ResponseStatus.METHOD_NOT_ALLOWED, message);
  }
}

export class ForbiddenResponse extends ApiResponse {
  constructor(message: string) {
    super(ResponseStatus.FORBIDDEN, message);
  }
}

export class PreconditionFailedResponse extends ApiResponse {
  constructor(message: string) {
    super(ResponseStatus.PRECONDITION_FAILED, message);
  }
}

export class ExpiredResponse extends ApiResponse {
  constructor(message: string) {
    super(ResponseStatus.GONE, message);
  }
}
