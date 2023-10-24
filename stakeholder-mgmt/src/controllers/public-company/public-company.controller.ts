import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
  //   NoContentResponse,
} from '../../util';
import {PublicCompanyRepository} from '../../repositories/public-company.repo';
import {
  PubCompByCompIdReq,
  PubCompByCompIdRes,
} from '../../business_objects/public-company';
import {OrganizationNameRepository} from '../../repositories/organization-name.repo';
export class PublicCompanyController {
  static pubCompRepo = new PublicCompanyRepository();
  static orgNameRepo = new OrganizationNameRepository();

  public static async getPublicCompList(
    req: Request,
    res: Response
  ): Promise<void> {
    const taskName = 'GET_PUBLIC_COMPANY_LIST';
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
      const pubCompList: any = await PublicCompanyController.pubCompRepo.getPublicCompanyList();
      if (!pubCompList || pubCompList.length <= 0) {
        logger.info(`${taskName}_DATA_NOT_FOUND`, JSON.stringify(pubCompList));
        const noResult = new BadRequestResponse(
          res,
          'Public Company List Data Not Found'
        );
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', pubCompList);
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
  public static async getPubCompListByCompId(req: Request, res: Response) {
    const taskName = 'GET_PUBLIC_COMPANY_LIST_BY_COMP_TYPE_ID';
    logger.info(`${taskName}_REQ`, req.body);
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
      const pubCompListObj: PubCompByCompIdReq = {
        compId: req.body.compId,
        orgId: req.body.orgId,
      };
      const pubCompList = await PublicCompanyController.pubCompRepo.getPublicCompanyByCompId(
        pubCompListObj
      );
      if (!pubCompList) {
        logger.info(`${taskName}_DATA_NOT_FOUND`, JSON.stringify(pubCompList));
        const noResult = new BadRequestResponse(
          res,
          'Error occurred while retrieving public company data.'
        );
        return noResult.send();
      }
      if (!pubCompListObj.orgId) {
        const resp: PubCompByCompIdRes = {
          publicCompList: pubCompList,
        };
        const success = new SuccessResponse(res, 'success', resp);
        return success.send();
      }
      const orgNameList = await PublicCompanyController.orgNameRepo.getOrganizations(
        pubCompListObj.orgId,
        pubCompListObj.compId
      );
      if (!orgNameList) {
        logger.info(
          `${taskName}_ORGANIZATION_NAME_DATA_NOT_FOUND`,
          JSON.stringify(orgNameList)
        );
        const noResult = new BadRequestResponse(
          res,
          'Error occurred while retrieving organization name data'
        );
        return noResult.send();
      }
      const resp: PubCompByCompIdRes = {
        publicCompList: pubCompList,
        organizationNameList: orgNameList,
      };
      const success = new SuccessResponse(res, 'success', resp);
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
