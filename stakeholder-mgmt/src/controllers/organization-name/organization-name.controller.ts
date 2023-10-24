import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
  //   NoContentResponse,
} from '../../util';
import {OrganizationNameRepository} from '../../repositories/organization-name.repo';
import {OrganizationTypeRepository} from '../../repositories/organization-type.repo';
import {PublicCompanyRepository} from '../../repositories/public-company.repo';
import {CompanyTypeRepository} from '../../repositories/company-type.repo';
import {
  createOrganizationReq,
  updateOrganizationReq,
} from '../../business_objects/organization-name';
import {UserRepository} from '../../repositories/users.repo';
import {rolesConfig} from '../../config/app';
export class OrganizationNameController {
  static orgNameRepo = new OrganizationNameRepository();
  static orgTypeRepo = new OrganizationTypeRepository();
  static publicCompRepo = new PublicCompanyRepository();
  static compRepo = new CompanyTypeRepository();
  static userRepo = new UserRepository();

  public static async getOrgNamebyId(
    req: Request,
    res: Response
  ): Promise<void> {
    const taskName = 'GET_ORGANIZATION_NAME';
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
      const dbUserId = await OrganizationNameController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      // We are checking role here because if role is Admin, he can sell all the users regardless of active or not.
      const getUserRoleId = await OrganizationNameController.userRepo.getUserRoleId(
        rolesConfig.ADMIN
      );
      if (!getUserRoleId) {
        logger.error(`${taskName}_ROLE_CONFIG_NOT_FOUND`, getUserRoleId);
        const noResult = new BadRequestResponse(res, 'Role Config Not Found');
        return noResult.send();
      }
      const checkUserRole = await OrganizationNameController.userRepo.findUserRoleInfo(
        dbUserId.id,
        getUserRoleId.id
      );
      const {orgId} = req.params;
      if (!parseInt(orgId)) {
        const orgNameList: any[] = await OrganizationNameController.orgNameRepo.getOrganizationNameList(
          checkUserRole.length > 0 ? false : true // send isActive flag for non-admin users
        );
        if (!orgNameList) {
          logger.info(
            `${taskName}_ERROR_GETTING_ORGANIZATIONLIST`,
            JSON.stringify(orgNameList)
          );
          const noResult = new BadRequestResponse(
            res,
            JSON.stringify(orgNameList)
          );
          return noResult.send();
        }
        const success = new SuccessResponse(res, 'success', orgNameList);
        return success.send();
      } else {
        const orgName: any = await OrganizationNameController.orgNameRepo.getOrganizationNamebyId(
          checkUserRole.length > 0 ? false : true,
          parseInt(orgId)
        );
        if (!orgName || orgName.length <= 0) {
          logger.info(`${taskName}_DATA_NOT_FOUND`, JSON.stringify(orgName));
          const noResult = new BadRequestResponse(
            res,
            'Organization Names List Data Not Found'
          );
          return noResult.send();
        }
        const success = new SuccessResponse(res, 'success', orgName);
        return success.send();
      }
    } catch (err) {
      logger.error(`${taskName}_ERROR`, err);
      const response = new InternalErrorResponse(
        res,
        constants.errorMessage.unexpectedError
      );
      return response.send();
    }
  }
  static async getOrgByPubCompId(req: Request, res: Response) {
    const taskName = 'GET_ORG_NAMES_BY_PUB_COMP';
    logger.info(`${taskName}`, req.body);
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
      const orgObj = {
        compId: req.body.compId,
        orgId: req.body.orgId,
        pubCompId: req.body.pubCompId,
      };
      const orgNameList = await OrganizationNameController.orgNameRepo.getOrganizations(
        orgObj.orgId,
        orgObj.compId,
        orgObj.pubCompId
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
      const resp = {
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
  //#region getOrganizationDDL
  static async getOrganizationDDL(req: Request, res: Response) {
    const taskName = 'GET_ORGANIZATION_DDL';
    logger.info(`${taskName}`, 'GET_REQUEST');
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
      const orgTypes = await OrganizationNameController.orgTypeRepo.getOrganizationTypeList();
      const companyTypes = await OrganizationNameController.compRepo.getCompanyTypeList();
      const publicCompTypes = await OrganizationNameController.publicCompRepo.getPublicCompanyList();
      const resp = {
        orgTypes,
        companyTypes,
        publicCompTypes,
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
  //#endregion

  //#region createOrganization
  static async createOrganization(req: Request, res: Response) {
    const taskName = 'CREATE_ORGANIZATION';
    logger.info(`${taskName}`, req.body);
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
      const dbUser = await OrganizationNameController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      if (!dbUser) {
        logger.info(`${taskName}_USER_NOT_FOUND`, dbUser);
        const noResult = new BadRequestResponse(res, 'User not found.');
        return noResult.send();
      }
      const reqObj: createOrganizationReq = {
        name: req.body.name,
        userId: dbUser.id,
        orgTypeId: req.body.orgTypeId,
        companyTypeId: req.body.companyTypeId,
        publicCompanyId: req.body.publicCompanyId,
      };
      const organizationExists = await OrganizationNameController.orgNameRepo.findOrganizationByName(
        reqObj.name.trim()
      );
      if (organizationExists) {
        logger.info(`${taskName}_ALREADY_EXISTS`, organizationExists);
        const noResult = new BadRequestResponse(
          res,
          'A organization with this name already exists.'
        );
        return noResult.send();
      }
      const createOrganization = await OrganizationNameController.orgNameRepo.createOrganization(
        reqObj
      );
      if (!createOrganization) {
        logger.info(`${taskName}_ERROR`, createOrganization);
        const noResult = new BadRequestResponse(
          res,
          // eslint-disable-next-line quotes
          `Error occurred while creating new organization.`
        );
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', createOrganization);
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
  //#endregion

  //#region updateOrganization
  static async updateOrganization(req: Request, res: Response) {
    const taskName = 'UPDATE_ORGANIZATION';
    logger.info(`${taskName}`, req.body);
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
      const dbUser = await OrganizationNameController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      if (!dbUser) {
        logger.info(`${taskName}_USER_NOT_FOUND`, dbUser);
        const noResult = new BadRequestResponse(res, 'User not found.');
        return noResult.send();
      }
      const reqObj: updateOrganizationReq = {
        userId: dbUser.id,
        orgNameId: req.body.orgNameId,
        isActive: req.body.isActive,
        orgTypeId: req.body.orgTypeId,
        name: req.body.name,
        publicCompanyId: req.body.publicCompanyId,
        companyTypeId: req.body.companyTypeId,
      };
      const updateOrganization = await OrganizationNameController.orgNameRepo.updateOrganization(
        reqObj
      );
      if (!updateOrganization) {
        logger.info(`${taskName}_ERROR`, updateOrganization);
        const noResult = new BadRequestResponse(
          res,
          // eslint-disable-next-line quotes
          `Error occurred while updating the following organization.`
        );
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', updateOrganization);
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
  //#endregion
}
