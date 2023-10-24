import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  NoContentResponse,
  SuccessResponse,
} from '../../util';
import {UserRepository} from '../../repositories/users.repo';
import {
  enableDisableUserReq,
  filterUsersReq,
  UpdateUserProfileReq,
  verifyUserReq,
  verifyUserRes,
} from '../../business_objects/user';
import {AzureUserRepository} from '../../repositories/azure_ad.repo';
import {TemplateRepository} from '../../repositories/template.repo';
import {EntityRepository} from '../../repositories/entity.repo';
import {DesignationRepository} from '../../repositories/designation.repo';
import {PriorityLevelRepository} from '../../repositories/priority-level.repo';
import {RoleRepository} from '../../repositories/role.repo';

export class UserController {
  static userRepo = new UserRepository();
  static azureRepo = new AzureUserRepository();
  static templateRepo = new TemplateRepository();
  static entityRepo = new EntityRepository();
  static designationRepo = new DesignationRepository();
  static priorityRepo = new PriorityLevelRepository();
  static roleRepo = new RoleRepository();

  //#region uploadProfilePicture
  public static async uploadProfilePicture(
    req: Request,
    res: Response
  ): Promise<void> {
    const taskName = 'UPLOAD_PROFILE_PICTURE';
    try {
      logger.info(`${taskName}_REQ`, JSON.stringify(req.body));
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

      if (!req.file) {
        const noResult = new BadRequestResponse(res, 'No file has been found');
        return noResult.send();
      }
      //returns the success response
      const success = new SuccessResponse(res, 'success', req.file);
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

  //#region updateUser
  public static async updateUser(req: Request, res: Response): Promise<void> {
    const taskName = 'UPDATE_USER';
    try {
      logger.info(`${taskName}_REQ`, JSON.stringify(req.body));
      //check for authorization header
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

      const reqObj: UpdateUserProfileReq = {
        emailId: req.body.emailId,
        newEmailId: req.body.newEmailId,
        fullName: req.body.fullName,
        mobile: req.body.mobile,
        designationId: req.body.designationId,
        entityId: req.body.entityId,
        description: req.body.description,
        priorityLevel: req.body.priorityLevel,
        imageUrl: req.body.imageUrl,
        imageName: req.body.imageName,
        imageType: req.body.imageType,
        roleId: req.body.roleId,
      };
      //find user by username in USER table, if user name already exist throw error
      const dbUser = await UserController.userRepo.findUserByUsername(
        reqObj.emailId
      );
      if (!dbUser || dbUser?.id === null) {
        logger.info(`${taskName}_USER_NOT_FOUND`, dbUser);
        const noResult = new BadRequestResponse(
          res,
          'Invalid email ID. User not found'
        );
        return noResult.send();
      }
      // Once user has accepted the invitation, then admin cannot change his email.
      if (
        dbUser?.isPasswordSet === true &&
        reqObj.newEmailId !== null &&
        dbUser?.emailId !== reqObj.newEmailId
      ) {
        logger.info(`${taskName}-ERROR`, dbUser?.isPasswordSet);
        const noResult = new BadRequestResponse(
          res,
          'You cannot change email of an active user.'
        );
        return noResult.send();
      }
      const checkEmail = await UserController.userRepo.findUserByEmail(
        reqObj.newEmailId
      );
      if (checkEmail && checkEmail.id !== null) {
        logger.info(`${taskName}_USER_NAME_ALREADY_EXIST`, checkEmail);
        const noRes = new NoContentResponse(
          res,
          'A user with this email Id already exist.'
        );
        return noRes.send();
      }
      // fine user by phoneNumber in USER table, if user with this phoneNumber already exist then throw error
      const checkMobile: any = await UserController.userRepo.findUserByPhoneNumber(
        reqObj.mobile
      );
      if (
        checkMobile &&
        checkMobile.id !== null &&
        checkMobile.id !== dbUser.id
      ) {
        logger.info(`${taskName}_USER_NAME_ALREADY_EXIST`, checkMobile);
        const noRes = new NoContentResponse(
          res,
          'A user with this phone number already exists.'
        );
        return noRes.send();
      }
      if (reqObj.newEmailId !== null) {
        const strName = reqObj.newEmailId.toString().split('@');
        const domain: string = strName[1];
        const entity: any = await UserController.entityRepo.checkDomain(domain);
        if (!entity) {
          logger.info(`${taskName}_ENTITY_NOT_FOUND`, strName[1]);
          const noResult = new BadRequestResponse(
            res,
            'This domain does not belong to Pure Health Group Email ID or is disabled.'
          );
          return noResult.send();
        }
      }

      //user is found, update the user info
      const loginUserId: number = await UserController.userRepo.getUserDbIdByAzureId(
        azureuserid.toString()
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await UserController.userRepo.updateDbUser(
        reqObj,
        loginUserId,
        dbUser.id
      );
      if (reqObj.roleId) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const updateRole = await UserController.userRepo.updateRole(
          reqObj,
          loginUserId,
          dbUser.id
        );
      }
      //returns the success response
      const success = new SuccessResponse(res, 'success', result);
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

  //#region get users list
  /**
   * getUsersList
   * @description get list of all users
   * @param req
   * @param res
   */
  public static async getUsersList(req: Request, res: Response): Promise<void> {
    const taskName = 'GET_USERS_LIST';
    try {
      logger.info(`${taskName}_REQ`, JSON.stringify(req.body));
      //check for authorization header
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

      //Get all users lst
      const dbUsers = await UserController.userRepo.getUserListForManagement();

      // check if users exists
      if (!dbUsers || dbUsers.length <= 0) {
        logger.info(`${taskName}_NO_USERS_FOUND`, dbUsers);
        const noResult = new BadRequestResponse(res, 'No Users found');
        return noResult.send();
      }

      //returns the success response
      const success = new SuccessResponse(res, 'success', dbUsers);
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

  //#region getUserInfoByAzureId
  public static async getUserInfoByAzureId(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const taskName = 'GET_USER_INFO_BY_AZURE_ID';
      logger.info(`${taskName}`, req.body);
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
      const {azureId} = req.params;
      let result = await UserController.userRepo.getUserInfoByAzureId(azureId);
      result = result[0];
      const userRoleInfo = await UserController.userRepo.getUserRoleInfo(
        result.userId
      );
      result.userRoles = userRoleInfo.map((x: any) => x.role);
      if (!result || result.length <= 0) {
        logger.info(`${taskName}_NO_USER_FOUND`, result);
        const noResult = new BadRequestResponse(res, 'No User found');
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', result);
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

  //#region getUserInfoByAzureId
  public static async getUserInfoByUserId(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const taskName = 'GET_USER_INFO_BY_ID';
      logger.info(`${taskName}`, req.body);
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
      const {userId} = req.params;
      let result = await UserController.userRepo.getUserInfoByUserId(
        parseInt(userId)
      );
      if (!result || result.length <= 0) {
        logger.info(`${taskName}_NO_USER_FOUND`, result);
        const noResult = new BadRequestResponse(res, 'No User found');
        return noResult.send();
      }
      result = result[0];
      // This Code Is For Future In Case User Has Multiple Roles.
      // Remember To Remove Roles Data From Query (In SQL Providers) That Is Used Above (getUserInfoByUserId).

      // const userRoleInfo = await UserController.userRepo.getUserRoleInfo(
      //   result.userId
      // );
      // result.userRoles = userRoleInfo.map((x: any) => x.role);
      const success = new SuccessResponse(res, 'success', result);
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

  //#region getFilterDDL
  static async getFilterDDL(req: Request, res: Response) {
    const taskName = 'GET_FILTER_DDL';
    logger.info(`${taskName}`, 'GET-REQUEST');
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
      const priorityLevelUser = await UserController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      if (!priorityLevelUser) {
        logger.info(`${taskName}_NOT_PROVIDED`, priorityLevelUser);
        const noResult = new BadRequestResponse(
          res,
          // eslint-disable-next-line quotes
          `No user found.`
        );
        return noResult.send();
      }
      // get priority Levels list based on stakeholder manager priority level
      const priorityLevelFilter = await UserController.priorityRepo.getPriorityLevelByLevel(
        priorityLevelUser?.priorityLevel
      );
      const priorityLevels = priorityLevelFilter.map((a: any) => a.level);
      // get Entity list that are active
      const entityResult = await UserController.entityRepo.getEntityList();
      // get Designation list that are active
      const designationResult = await UserController.designationRepo.getDesignationList();
      const resp = {
        priorityLevelsList: priorityLevels,
        entityList: entityResult,
        designationList: designationResult,
      };
      const success = new SuccessResponse(res, 'success', resp);
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

  //#region filterUsers
  static async filterUsers(req: Request, res: Response) {
    const taskName = 'FILTER_USERS';
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
      const filterObj: filterUsersReq = {
        isActive: req.body.isActive,
        isPasswordSet: req.body.isPasswordSet,
        emailIds: req.body.emailIds,
        entityIds: req.body.entityIds,
        designationIds: req.body.designationIds,
        priorityIds: req.body.priorityIds,
        roleIds: req.body.roleIds,
      };
      const filterResult = await UserController.userRepo.filterUsersQuery(
        filterObj
      );
      const success = new SuccessResponse(res, 'success', filterResult);
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

  //#region enableDisableUser
  static async enableDisableUser(req: Request, res: Response) {
    const taskName = 'ENABLE_DISABLE_USER';
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
      const reqObj: enableDisableUserReq = {
        userId: req.body.userId,
        userStatus: req.body.userStatus,
      };
      const updateUserStatus = await UserController.userRepo.enableDisableUserQuery(
        reqObj
      );
      if (!updateUserStatus) {
        logger.error(`${taskName}-ERROR`, updateUserStatus);
        const noResult = new BadRequestResponse(
          res,
          'Unable to update user status. Possible Reason: User does not exist.'
        );
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', updateUserStatus);
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

  //#region verifyUser
  static async verifyUser(req: Request, res: Response) {
    const taskName = 'VERIFY_USER';
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
      const reqObj: verifyUserReq = {
        emailId: req.body.emailId,
      };
      //find user by username in USER table
      let dbUser = await UserController.userRepo.getUserInfoByEmailId(
        reqObj.emailId
      );
      if (
        dbUser === null ||
        dbUser.length <= 0 ||
        dbUser[0].userId === null ||
        !dbUser[0].isActive
      ) {
        logger.info(`${taskName}_ACCESS_DENIED_EMAIL_ID_NOT_FOUND`, dbUser);
        const noRes = new BadRequestResponse(
          res,
          'Access Denied. You dont have an access please contact your IT Support team.'
        );
        return noRes.send();
      }
      // const updateUserStatus = await UserController.userRepo.enableDisableUserQuery(
      //   reqObj
      // );
      dbUser = dbUser[0];
      if (dbUser.azureId === null || dbUser.azureId !== azureuserid) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const setAzureId = await UserController.userRepo.setUserAzureId(
          dbUser.userId,
          azureuserid.toString()
        );
      }
      const rolesList: any = await UserController.roleRepo.getRoleList(
        true,
        null
      );
      const resp: verifyUserRes = {
        userDetails: dbUser,
        rolesList: rolesList,
      };
      const success = new SuccessResponse(res, 'success', resp);
      return success.send();
    } catch (err) {
      const response = new InternalErrorResponse(
        res,
        constants.errorMessage.unexpectedError
      );
      logger.info(`${taskName}`, err);
      return response.send();
    }
  }
  //#endregion
}
