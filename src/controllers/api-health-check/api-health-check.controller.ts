import {Request, Response} from 'express';
import {InternalErrorResponse, SuccessResponse} from './../../util/apiResponse';

export class ApiHealthCheck {
  //#region ApiHealthCheck
  /**
   * ApiHealthCheck
   * @param req
   * @param res
   */
  public static async verify(req: Request, res: Response): Promise<void> {
    const taskName = 'HEALTH-CHECK';
    try {
      //returns the success response
      const success = new SuccessResponse(
        res,
        'success',
        'api(s) is working...'
      );
      return success.send();
    } catch (err) {
      console.error(`${taskName}_ERROR`, err);
      const response = new InternalErrorResponse(
        res,
        'An unexpected error has occurred'
      );
      return response.send();
    }
  }
  //#endregion
}
