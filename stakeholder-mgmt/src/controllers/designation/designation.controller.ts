import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {DesignationRepository} from '../../repositories/designation.repo';
import {
  addDesignationReq,
  enableDisableDesignationReq,
} from '../../business_objects/designation';
import {UserRepository} from '../../repositories/users.repo';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
  //   NoContentResponse,
} from '../../util';

export class DesignationController {
  public static designationRepo = new DesignationRepository();
  public static userRepo = new UserRepository();

  public static async addDesignation(req: Request, res: Response) {
    const taskName = 'ADD_DESIGNATION';
    logger.info(`${taskName}`, req.body);
    try {
      //check for authorization header
      const {azureuserid} = req.headers;
      if (!azureuserid || azureuserid.length === 0) {
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
      const dbUser = await DesignationController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      const reqObj: addDesignationReq = {
        designationName: req.body.designationName,
        lastModifiedBy: dbUser.id,
      };
      const addDesignationResult = await DesignationController.designationRepo.addDesignationQuery(
        reqObj
      );
      if (!addDesignationResult) {
        logger.error(`${taskName}-ERROR`, addDesignationResult);
        const noResult = new BadRequestResponse(
          res,
          'Error occurred while adding designation.'
        );
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', addDesignationResult);
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

  public static async enableDisableDesignation(req: Request, res: Response) {
    const taskName = 'ENABLE_DISABLE_DESIGNATION';
    logger.info(`${taskName}`, req.body);
    try {
      //check for authorization header
      const {azureuserid} = req.headers;
      if (!azureuserid || azureuserid.length === 0) {
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
      const dbUser = await DesignationController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      const reqObj: enableDisableDesignationReq = {
        designationId: req.body.designationId,
        designationStatus: req.body.designationStatus,
        lastModifiedBy: dbUser.id,
      };
      const enableDisableDesignationResult = await DesignationController.designationRepo.enableDisableDesignationQuery(
        reqObj
      );
      if (!enableDisableDesignationResult) {
        logger.error(`${taskName}-ERROR`, enableDisableDesignationResult);
        const noResult = new BadRequestResponse(
          res,
          'Error occurred while changing designation status.'
        );
        return noResult.send();
      }
      const success = new SuccessResponse(
        res,
        'success',
        enableDisableDesignationResult
      );
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
