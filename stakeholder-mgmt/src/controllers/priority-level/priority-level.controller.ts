import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
  //   NoContentResponse,
} from '../../util';
import {PriorityLevelRepository} from '../../repositories/priority-level.repo';
export class PriorityLevelController {
  static priorityLevelRepo = new PriorityLevelRepository();

  public static async getPriorityLevelList(
    req: Request,
    res: Response
  ): Promise<void> {
    const taskName = 'GET_PRIORITY_LEVEL_LIST';
    logger.info(`${taskName}_REQ`, 'GET_LIST');
    try {
      const {azureuserid} = req.headers;
      if (!azureuserid) {
        logger.info(
          `${taskName}_AUTHORIZATION_HEADER_USERID_MISSING`,
          req.headers
        );
        const noResult = new BadRequestResponse(
          res,
          'Authorization header id missing'
        );
        return noResult.send();
      }
      const priorityLevelList: any = await PriorityLevelController.priorityLevelRepo.getPriorityLevelList();
      if (!priorityLevelList || priorityLevelList.length <= 0) {
        logger.info(
          `${taskName}_DATA_NOT_FOUND`,
          JSON.stringify(priorityLevelList)
        );
        const noResult = new BadRequestResponse(
          res,
          'Priority Level List Data Not Found'
        );
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', priorityLevelList);
      return success.send();
    } catch (err) {
      logger.error(`${taskName}_ERROR`, err);
      const response = new InternalErrorResponse(
        res,
        constants.errorMessage.unexpectedError
      );
      return response.send();
    }
  }
}
