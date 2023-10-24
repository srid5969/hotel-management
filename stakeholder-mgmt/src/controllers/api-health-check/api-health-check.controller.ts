import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {InternalErrorResponse, SuccessResponse} from '../../util';

export class ApiHealthCheck {
  //#region ApiHealthCheck
  /**
   * ApiHealthCheck
   * @param req
   * @param res
   */
  public static async verify(req: Request, res: Response): Promise<void> {
    try {
      //returns the success response
      const success = new SuccessResponse(
        res,
        'success',
        'api(s) is working...'
      );
      return success.send();
    } catch (err) {
      const response = new InternalErrorResponse(
        res,
        constants.errorMessage.unexpectedError
      );
      return response.send();
    }
  }
  //#endregion
}
