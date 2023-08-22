import { NextFunction, Request, Response } from "express";
import { xApiKey } from "./../config";
import { ForbiddenResponse } from "./../util/apiResponse";
import { IResponse } from "./../util/constants";

/**
 * -----------------------------------------------------------------
 * Middleware:      xApiKeyMiddleware
 * Description:     Validates the X-API-Key header for API authentication.
 *                  Checks if the provided key matches the configured API key.
 * @param req       The request object.
 * @param res       The response object.
 * @param next      The next function to call if the authentication is successful.
 * @returns         The response with an error message if authentication fails, otherwise calls the next function.
 * -----------------------------------------------------------------
 */
export const xApiKeyMiddleware = async (req: Request, res: Response<IResponse>, next: NextFunction) => {
  const key = req.headers["x-api-key"] || null;
  // Check if the X-API-Key header is missing

  if (!key) {
    return new ForbiddenResponse(res, "API headers missing").send();
  }

  // Check if the provided key matches the configured API key

  if (key != xApiKey) {
    return new ForbiddenResponse(res, "Wrong header value").send();
  }

  // Call the next function if authentication is successful

  return next();
};
