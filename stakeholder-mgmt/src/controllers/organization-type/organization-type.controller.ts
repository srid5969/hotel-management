import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
  //   NoContentResponse,
} from '../../util';
import {OrganizationTypeRepository} from '../../repositories/organization-type.repo';
export class OrganizationTypeController {
  static orgTypeRepo = new OrganizationTypeRepository();

  public static async getOrgTypeList(
    req: Request,
    res: Response
  ): Promise<void> {
    const taskName = 'GET_ORGANIZATION_TYPE_LIST';
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
      const orgList: any = await OrganizationTypeController.orgTypeRepo.getOrganizationTypeList();
      if (!orgList || orgList.length <= 0) {
        logger.info(`${taskName}_DATA_NOT_FOUND`, JSON.stringify(orgList));
        const noResult = new BadRequestResponse(
          res,
          'Organization Type List Data Not Found'
        );
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', orgList);
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
