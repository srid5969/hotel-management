import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { BadRequestError } from "./../util/app-error";
type ValidationPaths = "body" | "headers" | "params" | "query" | "cookies";
export const validator = (schema: Schema, path: ValidationPaths) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = await schema.validate(req[path]);
    if (error) {
      next(new BadRequestError(error.message));
      return;
    }
    next();
  };
};
