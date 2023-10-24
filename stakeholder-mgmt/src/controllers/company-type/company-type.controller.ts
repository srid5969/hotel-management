import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
  //   NoContentResponse,
} from '../../util';
import {CompanyTypeRepository} from '../../repositories/company-type.repo';
import {
  CompTypeByOrgIdReq,
  CompTypeByOrgIdRes,
} from '../../business_objects/company-type';
import {OrganizationNameRepository} from '../../repositories/organization-name.repo';
export class CompanyTypeController {
  private static compTypeRepo = new CompanyTypeRepository();
  private static orgNameRepo = new OrganizationNameRepository();

  public static async getCompTypeList(
    req: Request,
    res: Response
  ): Promise<void> {
    const taskName = 'GET_COMPANY_TYPE_LIST';
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
      const compList: any = await CompanyTypeController.compTypeRepo.getCompanyTypeList();
      if (!compList || compList.length <= 0) {
        logger.info(`${taskName}_DATA_NOT_FOUND`, JSON.stringify(compList));
        const noResult = new BadRequestResponse(
          res,
          'Company Type List Data Not Found'
        );
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', compList);
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
  public static async getCompTypeByOrgId(req: Request, res: Response) {
    const taskName = 'COMPANY_TYPE_LIST_BY_ORG_TYPE_ID';
    logger.info(`${taskName}_REQ`, req.body);
    try {
      const {azureuserid} = req.headers;
      if (!azureuserid) {
        logger.info(
          `${taskName}_AUTHORIZATION_HEADER_USER_ID_MISSING`,
          req.headers
        );
        const noResult = new BadRequestResponse(
          res,
          'Authorization header id missing'
        );
        return noResult.send();
      }
      const compListObj: CompTypeByOrgIdReq = {
        orgId: req.body.orgId,
      };
      const compList = await CompanyTypeController.compTypeRepo.getCompanyTypesByOrgId(
        compListObj
      );
      if (!compList) {
        logger.info(`${taskName}_DATA_NOT_FOUND`, JSON.stringify(compList));
        const noResult = new BadRequestResponse(
          res,
          'Error occurred while retrieving company type data'
        );
        return noResult.send();
      }
      const orgNameList = await CompanyTypeController.orgNameRepo.getOrganizations(
        compListObj.orgId
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
      const resp: CompTypeByOrgIdRes = {
        companyTypeList: compList,
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
