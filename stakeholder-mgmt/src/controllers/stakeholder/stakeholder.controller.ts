/* eslint-disable @typescript-eslint/no-unused-vars */
import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {CityRepository} from '../../repositories/city.repo';
import {CountryRepository} from '../../repositories/country.repo';
import {OrganizationTypeRepository} from '../../repositories/organization-type.repo';
import {OrganizationNameRepository} from '../../repositories/organization-name.repo';
import {PriorityLevelRepository} from '../../repositories/priority-level.repo';
import {StakeHolderLinksRepository} from '../../repositories/stakeholder-links.repo';
import {TemplateRepository} from '../../repositories/template.repo';
import {getLinkPreview} from 'link-preview-js';
const URL = require('url').URL;
const url = require('url');
const inlineCss = require('inline-css');
import {
  createUpdateStakeHolderReq,
  stakeHolderDropdownRes,
  stakeHolderAdditionalReq,
  getStakeHoldersRes,
  createUpdateStakeHolderRes,
  filteredStakeholderReq,
  stakeHolderActionReq,
  getStakeholdersForMergingRes,
  stakeHolderList,
  getStakeholdersForMergingReq,
  stakeholderActionEmail,
} from '../../business_objects/stakeholder';
import {StakeHolderRepository} from '../../repositories/stakeholder.repo';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
  //   NoContentResponse,
} from '../../util';
import {StatusRepository} from '../../repositories/status.repo';
import {
  statusConfig,
  statusTypeConfig,
  stakeHolderLinksTypeConfig,
  rolesConfig,
} from '../../config/app';
import {UserRepository} from '../../repositories/users.repo';
import {meetingsRepository} from '../../repositories/meetings.repo';
import {EmailService} from '../../services/email.service';
import {templateConfig} from '../../config/app';
import {EmailProperties} from '../../business_objects/auth';
import {RoleRepository} from '../../repositories/role.repo';
import {TIMEOUT} from 'dns';

export class StakeholderController {
  private static cityRepo = new CityRepository();
  private static countryRepo = new CountryRepository();
  private static organizationTypeRepo = new OrganizationTypeRepository();
  private static organizationNameRepo = new OrganizationNameRepository();
  private static priorityLevelRepo = new PriorityLevelRepository();
  private static stakeholderLinksRepo = new StakeHolderLinksRepository();
  private static stakeHolderRepo = new StakeHolderRepository();
  private static statusRepo = new StatusRepository();
  private static userRepo = new UserRepository();
  private static priorityRepo = new PriorityLevelRepository();
  private static meetingRepo = new meetingsRepository();
  private static emailService = new EmailService();
  private static templateRepo = new TemplateRepository();
  private static roleRepo = new RoleRepository();
  //#region getDropdownData
  /**
   * @description getDropdownData
   * @param req
   * @param res
   * @returns
   */
  public static async getDropdownData(req: Request, res: Response) {
    const taskName = 'STAKEHOLDER_DDL_DATA';
    logger.info(`${taskName}_REQ`, `GET_${taskName}`);
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
      //gets the countries
      const countryList = await StakeholderController.countryRepo.getCountryList();
      //gets the cities
      const cityList = await StakeholderController.cityRepo.getCityList();
      //gets the organiztion types
      const organizationTypeList = await StakeholderController.organizationTypeRepo.getOrganizationTypeList();
      //gets the priority levels by user level
      const userLevel = await StakeholderController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      // gets priority level list based on logged in user priority level
      let priorityLevelListByUserPriorityLevel: any;
      if (constants.restrictiionType.IS_PRIORITY_BASED) {
        priorityLevelListByUserPriorityLevel = await StakeholderController.priorityLevelRepo.getPriorityLevelByLevel(
          userLevel.priorityLevel
        );
      } else {
        priorityLevelListByUserPriorityLevel = await StakeholderController.priorityLevelRepo.getPriorityLevelByLevel(
          'P0'
        );
      }
      //gets the stakeholder link types
      const stakeholderLinksList = await StakeholderController.stakeholderLinksRepo.getStakeHolderLinkTypes();

      const resp: stakeHolderDropdownRes = {
        country: countryList,
        city: cityList,
        organizationType: organizationTypeList,
        priorityLevel: priorityLevelListByUserPriorityLevel,
        stakeholderLinkTypes: stakeholderLinksList,
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

  //#region getFilterDropdownData
  public static async getFilterDropdownData(req: Request, res: Response) {
    const taskName = 'STAKEHOLDERS_FILTER_DDL_DATA';
    logger.info(`${taskName}-REQ`, `GET_${taskName}`);
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
      const priorityLevelUser = await StakeholderController.userRepo.findUserByAzureId(
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
      let priorityLevelFilter: any;
      if (constants.restrictiionType.IS_PRIORITY_BASED) {
        priorityLevelFilter = await StakeholderController.priorityRepo.getPriorityLevelByLevel(
          priorityLevelUser?.priorityLevel
        );
      } else {
        priorityLevelFilter = await StakeholderController.priorityRepo.getPriorityLevelByLevel(
          'P0'
        );
      }
      const priorityLevels = priorityLevelFilter.map((a: any) => a.level);
      //gets the cities
      const cityList = await StakeholderController.cityRepo.getCityList();
      //gets the organiztion types
      const organizationTypeList = await StakeholderController.organizationTypeRepo.getOrganizationTypeList();
      // gets the status
      const statusList = await StakeholderController.statusRepo.getStatusList();
      // gets all stakeHolder list
      const stakeHolderList = await StakeholderController.stakeHolderRepo.getAllStakeHolders();
      // gets stakeholder managers list.
      const createdBy = await StakeholderController.userRepo.getUsersList();
      // get roles
      const isAllRolesRequired = false;
      const notRequiredRoles = ['CXRO'];
      const roleList = await StakeholderController.roleRepo.getRoleList(
        isAllRolesRequired,
        notRequiredRoles
      );

      const resp = {
        city: cityList,
        organizationType: organizationTypeList,
        status: statusList,
        stakeHolders: stakeHolderList,
        priorityLevels: priorityLevels,
        createdByIds: createdBy,
        roles: roleList,
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

  //#region  getStakeHolderList
  public static async getStakeHolderList(req: Request, res: Response) {
    const taskName = 'GET_STAKEHOLDERS_LIST';
    logger.info(`${taskName}-REQ`, 'GET_LIST');
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
      const dbUserId = await StakeholderController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      const priorityLevelUser = await StakeholderController.userRepo.findUserByAzureId(
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
      const priorityLevelFilter = await StakeholderController.priorityRepo.getPriorityLevelByLevel(
        priorityLevelUser?.priorityLevel
      );
      const priorityLevels = priorityLevelFilter.map((a: any) => a.level);
      const stakeHolderList = await StakeholderController.stakeHolderRepo.getStakeHolderList(
        priorityLevels,
        dbUserId.id
      );
      if (!stakeHolderList) {
        logger.info(
          `${taskName}_DATA_NOT_FOUND`,
          JSON.stringify(stakeHolderList)
        );
        const response: getStakeHoldersRes = {
          stakeHolderList: [],
        };
        const success = new SuccessResponse(res, 'success', response);
        return success.send();
      }
      const stakeHolderLinkedIn: any = await StakeholderController.stakeholderLinksRepo.getStakeHolderLinkTypeById(
        stakeHolderLinksTypeConfig.LINKEDIN
      );
      const stakeHolderImpLinks: any = await StakeholderController.stakeholderLinksRepo.getStakeHolderLinks(
        stakeHolderLinkedIn.id
      );
      const response: getStakeHoldersRes = {
        stakeHolderList: [],
      };
      for (let index = 0; index < stakeHolderList.length; index++) {
        const obj: stakeHolderList = {
          stakeHolder: stakeHolderList[index],
          importantLinks: [],
        };
        for (let j_index = 0; j_index < stakeHolderImpLinks.length; j_index++) {
          const element: any = stakeHolderList[index];
          if (
            element.stakeHolderId === stakeHolderImpLinks[j_index].stakeHolderId
          ) {
            obj.importantLinks.push(stakeHolderImpLinks[j_index]);
          }
        }
        response.stakeHolderList.push(obj);
      }
      const success = new SuccessResponse(res, 'success', response);
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

  //#region getApprovedStakeholderList
  public static async getApprovedStakeholderList(req: Request, res: Response) {
    const taskName = 'GET_APPROVED_STAKEHOLDERS';
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
      const dbUserId = await StakeholderController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      const ApprovedStatusId = await StakeholderController.statusRepo.getStatus(
        statusConfig.APPROVED,
        statusTypeConfig.STAKE_HOLDER
      );
      const getApprovedStakeholderList = await StakeholderController.stakeHolderRepo.getApprovedStakeholdersList(
        ApprovedStatusId.id,
        dbUserId.id
      );
      const response: getStakeHoldersRes = {
        stakeHolderList: [],
      };
      getApprovedStakeholderList.forEach((item, index, arr) => {
        const obj: stakeHolderList = {
          stakeHolder: arr[index],
        };
        response.stakeHolderList.push(obj);
      });
      const success = new SuccessResponse(res, 'success', response);
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

  //#region  getStakeHolderFilteredList
  public static async getStakeHolderFilteredList(req: Request, res: Response) {
    const taskName = 'STAKEHOLDERS_FILTERED_LIST';
    logger.info(`${taskName}-REQ`, req.body);
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
      const dbUserId = await StakeholderController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      const filterObj: filteredStakeholderReq = {
        statusIds: req.body.statusIds,
        stakeHolderIds: req.body.stakeHolderIds,
        cityIds: req.body.cityIds,
        organizationIds: req.body.organizationIds,
        organizationTypeIds: req.body.organizationTypeIds,
        priorityLevels: req.body.priorityLevels,
        createdByIds: req.body.createdByIds,
        roleIds: req.body.roleIds,
      };
      const filteredStakeholderList = await StakeholderController.stakeHolderRepo.filteredStakeHolderList(
        filterObj,
        dbUserId.id
      );
      if (!filteredStakeholderList) {
        logger.info(
          `${taskName}_DATA_NOT_FOUND`,
          JSON.stringify(filteredStakeholderList)
        );
        const noResult = new BadRequestResponse(
          res,
          'No Data For The Selected Filters Was Found'
        );
        return noResult.send();
      }
      const stakeHolderLinkedIn: any = await StakeholderController.stakeholderLinksRepo.getStakeHolderLinkTypeById(
        stakeHolderLinksTypeConfig.LINKEDIN
      );
      const stakeHolderImpLinks: any = await StakeholderController.stakeholderLinksRepo.getStakeHolderLinks(
        stakeHolderLinkedIn.id
      );
      const response: getStakeHoldersRes = {
        stakeHolderList: [],
      };
      for (let index = 0; index < filteredStakeholderList.length; index++) {
        const obj: stakeHolderList = {
          stakeHolder: filteredStakeholderList[index],
          importantLinks: [],
        };
        for (let j_index = 0; j_index < stakeHolderImpLinks.length; j_index++) {
          const element: any = filteredStakeholderList[index];
          if (
            element.stakeHolderId === stakeHolderImpLinks[j_index].stakeHolderId
          ) {
            obj.importantLinks.push(stakeHolderImpLinks[j_index]);
          }
        }
        response.stakeHolderList.push(obj);
      }
      const success = new SuccessResponse(res, 'success', response);
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

  //#region  createUpdateStakeHolder
  public static async createUpdateStakeHolder(req: Request, res: Response) {
    const taskName = 'CREATE_STAKEHOLDER';
    logger.info(`${taskName}-REQ`, JSON.stringify(req.body));
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
    const reqObj: createUpdateStakeHolderReq = {
      stakeHolderId: parseInt(req.body.stakeHolderId),
      fullName: req.body.fullName,
      organizationTypeId: req.body.organizationTypeId,
      companyTypeId: req.body.companyTypeId,
      publicCompanyId: req.body.publicCompanyId,
      organizationId: req.body.organizationId,
      designation: req.body.designation,
      email: req.body.email,
      mobile: req.body.mobile,
      description: req.body.description,
      cityId: req.body.cityId,
      priorityLevel: req.body.priorityLevel,
      imageUrl: req.body?.imageUrl,
      imageName: req.body?.imageName,
      imageType: req.body?.imageType,
      importantLinks: req.body.importantLinks,
      mergedIds: req.body.mergedIds,
    };
    try {
      const dbUserId = await StakeholderController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      //#region  Check user role

      // We are checking role here because if role is Admin he can create stakeholder that will already be approved.
      const getUserRoleId = await StakeholderController.userRepo.getUserRoleId(
        rolesConfig.ADMIN
      );
      if (!getUserRoleId) {
        logger.error(`${taskName}_ROLE_CONFIG_NOT_FOUND`, getUserRoleId);
        const noResult = new BadRequestResponse(res, 'Role Config Not Found');
        return noResult.send();
      }
      const checkUserRole = await StakeholderController.userRepo.findUserRoleInfo(
        dbUserId.id,
        getUserRoleId.id
      );
      let status = null;
      // Putting this check here because if user already exist then we don't need to update this status.
      if (!reqObj.stakeHolderId) {
        if (checkUserRole.length > 0) {
          status = await StakeholderController.statusRepo.getStatus(
            statusConfig.APPROVED,
            statusTypeConfig.STAKE_HOLDER
          );
        } else if (checkUserRole.length === 0) {
          status = await StakeholderController.statusRepo.getStatus(
            statusConfig.PENDING_APPROVAL,
            statusTypeConfig.STAKE_HOLDER
          );
        }
        if (!status) {
          logger.info(`${taskName}_STATUS_NOT_FOUND`, JSON.stringify(status));
          const noResult = new BadRequestResponse(res, 'Status Not Found');
          return noResult.send();
        }
      } else if (reqObj.stakeHolderId && checkUserRole.length === 0) {
        logger.info(`${taskName}_PERMISSION DENIED`, JSON.stringify(status));
        const noResult = new BadRequestResponse(
          res,
          'Stakeholder Manager cannot edit stakeholder details.'
        );
        return noResult.send();
      }
      const addReq: stakeHolderAdditionalReq = {
        statusId: status ? status?.id : null,
      };
      //#endregion
      if (reqObj.mergedIds.length === 1 || reqObj.mergedIds.length > 2) {
        logger.info(`${taskName}_LENGTH_DOESN'T_MATCH`, reqObj.mergedIds);
        const noResult = new BadRequestResponse(
          res,
          'Merged Ids length is greater or less than 2.'
        );
        return noResult.send();
      }
      if (reqObj.mergedIds.length === 2 && checkUserRole.length === 0) {
        logger.info(`${taskName}_ACCESS_DENIED`, reqObj.mergedIds);
        const noResult = new BadRequestResponse(
          res,
          'Only admins can merge stakeholders.'
        );
        return noResult.send();
      }
      if (!reqObj.stakeHolderId && reqObj.mergedIds.length <= 0) {
        const stakeHolderExists = await StakeholderController.stakeHolderRepo.findStakeholderByName(
          reqObj.fullName.trim(),
          reqObj.organizationId,
          reqObj.designation.trim()
        );
        if (stakeHolderExists) {
          logger.info(`${taskName}_ALREADY_EXISTS`, stakeHolderExists);
          const noResult = new BadRequestResponse(
            res,
            'A stakeholder with this name already exists.'
          );
          return noResult.send();
        }
      }
      if (reqObj.stakeHolderId) {
        const stakeHolderExists: any = await StakeholderController.stakeHolderRepo.findStakeholderByName(
          reqObj.fullName.replace(/[^a-zA-Z ]/g, '').trim(),
          reqObj.organizationId,
          reqObj.designation.trim()
        );
        if (
          stakeHolderExists !== null &&
          parseInt(stakeHolderExists?.id) !== reqObj.stakeHolderId
        ) {
          logger.info(`${taskName}_ALREADY_EXISTS`, stakeHolderExists);
          const noResult = new BadRequestResponse(
            res,
            'A stakeholder with this name already exists.'
          );
          return noResult.send();
        }
      }
      if (reqObj.mergedIds.length === 2 && checkUserRole.length === 1) {
        const checkStatus: any = await StakeholderController.stakeHolderRepo.checkStakeholderStatus(
          reqObj.mergedIds
        );
        for (let index = 0; index < checkStatus.length; index++) {
          if (checkStatus[index]?.isActive === false) {
            const noResult = new BadRequestResponse(
              res,
              'You cannot merge an inactive user'
            );
            return noResult.send();
          }
        }
      }
      const createUpdateStakeholder = await StakeholderController.stakeHolderRepo.createUpdateStakeHolder(
        reqObj,
        addReq,
        dbUserId.id
      );
      if (!createUpdateStakeholder) {
        logger.info(
          `${taskName}_ERROR_CREATING_STAKEHOLDER`,
          JSON.stringify(createUpdateStakeholder)
        );
        const noResult = new BadRequestResponse(
          res,
          'Error Occurred while creating/updating stakeholder'
        );
        return noResult.send();
      }
      if (reqObj.mergedIds.length === 2 && createUpdateStakeholder) {
        const getMeetingIdsByStakeholderIds = await StakeholderController.meetingRepo.getStakeholderInMeetingsForMerging(
          reqObj.mergedIds
        );
        if (
          getMeetingIdsByStakeholderIds ||
          getMeetingIdsByStakeholderIds.length > 0
        ) {
          const meetingsIds = getMeetingIdsByStakeholderIds
            .map((x: any) => x.meetingId)
            .map(Number)
            .filter(
              (value: any, index: any, self: string | any[]) =>
                self.indexOf(value) === index
            );
          for (let index = 0; index < meetingsIds.length; index++) {
            const stakeholderIds = await StakeholderController.meetingRepo.getAllStakeholdersByMeetingId(
              meetingsIds[index]
            );
            const stakeholderIdsList = stakeholderIds
              .map((x: any) => x.stakeHolderId)
              .map(Number);
            const filteredStakeholderIds = stakeholderIdsList.filter(
              (f: number) => !reqObj.mergedIds.includes(f)
            );
            filteredStakeholderIds.push(createUpdateStakeholder.id);
            const meetingObj = {
              meetingId: meetingsIds[index],
              stakeHolderIds: filteredStakeholderIds,
              userId: dbUserId.id,
            };
            const updateMeetingResult = await StakeholderController.meetingRepo.updateStakeholderInMeetings(
              meetingObj
            );
            logger.info(
              `${taskName}-UPDATE-MEETINGS-FOR-MERGED-IDS`,
              updateMeetingResult
            );
          }
          // const stakeholderIds = getMeetingIdsByStakeholderIds
          //   .map((x: any) => x.stakeHolderId)
          //   .map(Number);
          // const filteredStakeholderIds = stakeholderIds.filter(
          //   (f: number) => !reqObj.mergedIds.includes(f)
          // );
          // filteredStakeholderIds.push(createUpdateStakeholder.id);
          // for (let index = 0; index < meetingsIds.length; index++) {
          //   const meetingObj = {
          //     meetingId: meetingsIds[index],
          //     stakeHolderIds: filteredStakeholderIds,
          //     userId: dbUserId.id,
          //   };
          //   const updateMeetingResult = await StakeholderController.meetingRepo.updateStakeholderInMeetings(
          //     meetingObj
          //   );
          //   logger.info(
          //     `${taskName}-UPDATE-MEETINGS-FOR-MERGED-IDS`,
          //     updateMeetingResult
          //   );
          // }
          // meetingsIds.forEach(async (element: any) => {});
        }
      }
      const resp: createUpdateStakeHolderRes = {
        userObj: createUpdateStakeholder,
        isStakeHolderCreated: true,
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

  //#region  uploadProfilePicture
  public static async uploadProfilePicture(
    req: Request,
    res: Response
  ): Promise<void> {
    const taskName = 'STAKEHOLDER_UPLOAD_PROFILE_PICTURE';
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

  //#region  stakeHolderAction
  /**
   * @descrition approved or reject a stakeholder (Admin Portal)
   * @param req
   * @param res
   * @returns
   */
  public static async stakeHolderAction(req: Request, res: Response) {
    const taskName = 'STAKEHOLDER_ACTION';
    logger.info(`${taskName}`, req.body);
    try {
      const reqObj: stakeHolderActionReq = {
        type: req.body.type,
        stakeHolderId: req.body.stakeHolderId,
        comment: req.body.comment,
      };
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
      const dbUser = await StakeholderController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      if (!dbUser) {
        logger.info(`${taskName}_USER_NOT_FOUND`, req.params);
        const noResult = new BadRequestResponse(res, 'User Not Found');
        return noResult.send();
      }
      const status = await StakeholderController.statusRepo.getStatus(
        reqObj.type,
        statusTypeConfig.STAKE_HOLDER
      );
      if (!status) {
        logger.info(`${taskName}_STATUS_NOT_FOUND`, JSON.stringify(status));
        const noResult = new BadRequestResponse(res, 'Status Not Found');
        return noResult.send();
      }
      const updateStakeholderResult = await StakeholderController.stakeHolderRepo.updateStakeholderStatus(
        reqObj.stakeHolderId,
        status.id,
        dbUser.id,
        reqObj.comment
      );
      if (!updateStakeholderResult) {
        logger.info(`${taskName}_UPDATE_ERROR`, JSON.stringify(status));
        const noResult = new BadRequestResponse(
          res,
          'Error occurred while updating stakeholder status'
        );
        return noResult.send();
      }
      const dbUserId = await StakeholderController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      let getStakeHolderById = await StakeholderController.stakeHolderRepo.getStakeHolderById(
        reqObj.stakeHolderId,
        dbUserId.id
      );
      if (!getStakeHolderById) {
        const noResult = new BadRequestResponse(
          res,
          'No stakeholder with this ID exist.'
        );
        return noResult.send();
      }
      getStakeHolderById = getStakeHolderById.stakeHolder[0];
      const emailObj: stakeholderActionEmail = {
        requesterName: getStakeHolderById.requesterName,
        comment: reqObj.comment,
        status: reqObj.type === statusConfig.APPROVED ? 'Approved' : 'Rejected',
        stakeholderInfo: {
          fullName: getStakeHolderById.fullName,
          designation: getStakeHolderById.designation,
          email: getStakeHolderById.email,
          organization: getStakeHolderById.organizationName,
          priorityLevel: getStakeHolderById.priorityLevel,
          status:
            reqObj.type === statusConfig.APPROVED ? 'Approved' : 'Rejected',
        },
        requesterEmail: getStakeHolderById.requesterEmailId,
        templateType: templateConfig.STAKEHOLDER_ACTION_TEMPLATE,
      };
      const emailResponse = await StakeholderController.sendStakeholderEmail(
        emailObj
      );
      logger.info('SEND_STAKEHOLDER_ACTION_EMAIL_RESULT', emailResponse);
      const success = new SuccessResponse(
        res,
        'success',
        updateStakeholderResult
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
  //#endregion

  //#region disableStakeholder
  public static async disableStakeholder(req: Request, res: Response) {
    const taskName = 'DISABLE_STAKEHOLDER';
    logger.info(`${taskName}`, req.body);
    try {
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
      const disableSH = await StakeholderController.stakeHolderRepo.disableStakeholderQuery(
        req.body.stakeholderId
      );
      if (!disableSH) {
        logger.info(`${taskName}-ERROR`, disableSH);
        const noResult = new BadRequestResponse(
          res,
          'Error occurred while updating stakeholder status.'
        );
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', disableSH);
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

  //#region enableStakeholder
  public static async enableStakeholder(req: Request, res: Response) {
    const taskName = 'ENABLE_STAKEHOLDER';
    logger.info(`${taskName}`, req.body);
    try {
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
      const enableSH = await StakeholderController.stakeHolderRepo.enableStakeholderQuery(
        req.body.stakeholderId
      );
      if (!enableSH) {
        logger.info(`${taskName}-ERROR`, enableSH);
        const noResult = new BadRequestResponse(
          res,
          'Error occurred while updating stakeholder status.'
        );
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', enableSH);
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

  //#region  getStakeholderById
  public static async getStakeholderById(req: Request, res: Response) {
    const taskName = 'GET_STAKEHOLDER_BY_ID';
    logger.info(`${taskName}`, req.params);
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
      const dbUserId = await StakeholderController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      const {stakeHolderId} = req.params;
      const getStakeHolderById = await StakeholderController.stakeHolderRepo.getStakeHolderById(
        parseInt(stakeHolderId),
        dbUserId.id
      );
      if (!getStakeHolderById) {
        logger.info(
          `${taskName}_GET_ERROR`,
          JSON.stringify(getStakeHolderById)
        );
        const noResult = new BadRequestResponse(
          res,
          'Error occurred while fetching stakeholder details'
        );
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', getStakeHolderById);
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

  //#region getStakeholderProfileInfo
  public static async getStakeholderProfileInfo(req: Request, res: Response) {
    const taskName = 'GET_STAKEHOLDER_PROFILE_INFO';
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
      const dbUserId = await StakeholderController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      const reqObj = {
        stakeHolderId: req.body.stakeHolderId,
      };
      const getStakeHolderById = await StakeholderController.stakeHolderRepo.getStakeHolderById(
        reqObj.stakeHolderId,
        dbUserId.id
      );
      if (!getStakeHolderById) {
        logger.info(
          `${taskName}_GET_ERROR`,
          JSON.stringify(getStakeHolderById)
        );
        const noResult = new BadRequestResponse(
          res,
          'Error occurred while fetching stakeholder details'
        );
        return noResult.send();
      }
      const success = new SuccessResponse(
        res,
        'success',
        getStakeHolderById.stakeHolder
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

  //#region getStakeholderProfileInfo
  public static async getStakeholderSocialProfileInfo(
    req: Request,
    res: Response
  ) {
    const taskName = 'GET_STAKEHOLDER_SOCIAL_PROFILE_INFO';
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
      const dbUserId = await StakeholderController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      const reqObj = {
        stakeHolderId: req.body.stakeHolderId,
      };
      const getStakeHolderById = await StakeholderController.stakeHolderRepo.getStakeHolderById(
        reqObj.stakeHolderId,
        dbUserId.id
      );
      if (!getStakeHolderById) {
        logger.info(
          `${taskName}_GET_ERROR`,
          JSON.stringify(getStakeHolderById)
        );
        const noResult = new BadRequestResponse(
          res,
          'Error occurred while fetching stakeholder details'
        );
        return noResult.send();
      }
      for (
        let index = 0;
        index < getStakeHolderById.stakeHolderLinks.length;
        index++
      ) {
        const element: any = getStakeHolderById.stakeHolderLinks[index];
        try {
          if (!/^https?:\/\//i.test(element.url)) {
            element.url = 'https://' + element.url;
          }
          let urlInfo;
          try {
            urlInfo = await getLinkPreview(element.url, {
              timeout: 3000,
              followRedirects: 'follow',
              // handleRedirects: (baseURL: string, forwardedURL: string) => {
              //   const urlObj = new URL(baseURL);
              //   const forwardedURLObj = new URL(forwardedURL);
              //   if (
              //     forwardedURLObj.hostname === urlObj.hostname ||
              //     forwardedURLObj.hostname === 'www.' + urlObj.hostname ||
              //     'www.' + forwardedURLObj.hostname === urlObj.hostname
              //   ) {
              //     return true;
              //   } else {
              //     return false;
              //   }
              // },
              headers: {
                'user-agent':
                  'Mozilla/5.0 (Linux; Android 11; vivo 1904; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.141 Mobile Safari/537.36 VivoBrowser/8.7.0.1',
              },
            });
          } catch (error) {
            urlInfo = 'Unable to fetch the data from link';
          }

          const objPush = {
            stakeHolderId: element.stakeHolderId,
            fullName: element.fullName,
            linkTypeId: element.linkTypeId,
            linkName: element.linkName,
            urlInfo: urlInfo,
          };
          getStakeHolderById.stakeHolderLinks[index] = objPush;
        } catch (error) {
          logger.error('LINK_PREVIEW_ERROR', error);
          const response = new BadRequestResponse(res, error.message);
          return response.send();
        }
      }
      const success = new SuccessResponse(res, 'success', getStakeHolderById);
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
  //#region getStakeholdersForMerging
  static async getStakeholdersForMerging(req: Request, res: Response) {
    const taskName = 'GET_STAKEHOLDERS_FOR_MERGING';
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
      const dbUserId = await StakeholderController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      const reqObj: getStakeholdersForMergingReq = {
        stakeholderIds: req.body.stakeholderIds,
      };
      const getStakeholderDetails: any = await StakeholderController.stakeHolderRepo.getStakeholderForMergingQuery(
        reqObj.stakeholderIds,
        dbUserId.id
      );
      if (!getStakeholderDetails || getStakeholderDetails.length < 2) {
        logger.info(
          `${taskName}_GET_ERROR`,
          JSON.stringify(getStakeholderDetails)
        );
        const noResult = new BadRequestResponse(
          res,
          'Error occurred while fetching stakeholder details'
        );
        return noResult.send();
      }
      for (let index = 0; index < getStakeholderDetails.length; index++) {
        const getStakeholderLinks = await StakeholderController.stakeholderLinksRepo.getStakeholderLinksById(
          getStakeholderDetails[index]?.stakeHolderId
        );
        if (getStakeholderLinks || getStakeholderLinks.length > 0) {
          getStakeholderDetails[index].importantLinks = getStakeholderLinks;
        } else {
          getStakeholderDetails[index].importantLinks = [];
        }
      }
      const resp: getStakeholdersForMergingRes = {
        stakeHolderOne: getStakeholderDetails[1],
        stakeHolderTwo: getStakeholderDetails[0],
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

  //#region sendStakeholderEmail
  private static async sendStakeholderEmail(emailObj: stakeholderActionEmail) {
    const taskName = 'SEND_STAKEHOLDER_ACTION_EMAIL';
    logger.info(`${taskName}-REQ`, emailObj);
    // Fetch email template from DB
    const templateFetch: Record<
      string,
      any
    > = await StakeholderController.templateRepo.getTemplateByType(
      emailObj.templateType
    );
    if (templateFetch === null) {
      logger.info(`${taskName}_UNABLE_TO_FETCH_TEMPLATE`, templateFetch);
      return false;
    }
    const emailReq: EmailProperties = {
      // emailFrom: emailConfig.email_from,
      emailTo: emailObj.requesterEmail,
      emailSubject: templateFetch?.title,
      emailHTMLContent: templateFetch?.template.toString(),
    };
    const stakeHolderInjection = `  <tbody><tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>Organization Name</th>
      <th>Designation</th>
      <th>Priority</th>
      <th>Status</th>
    </tr> <tr>
    <td>${1}</td>
    <td>${emailObj.stakeholderInfo.fullName}</td>
    <td>${emailObj.stakeholderInfo.email}</td>
    <td>${emailObj.stakeholderInfo.organization}</td>
    <td>${emailObj.stakeholderInfo.designation}</td>
    <td>${emailObj.stakeholderInfo.priorityLevel}</td>
    <td>${emailObj.stakeholderInfo.status}</td>
    </tr>
    </tbody>`;
    emailReq.emailHTMLContent = emailReq.emailHTMLContent
      .replace('@userFullName', emailObj.requesterName)
      .replace('@status', emailObj.status)
      .replace('@comment', emailObj.comment || '')
      .replace('@stakeHolder', stakeHolderInjection);
    emailReq.emailHTMLContent = await inlineCss(emailReq.emailHTMLContent, {
      url: emailReq.emailHTMLContent,
      // applyTableAttributes: true,
      // applyWidthAttributes: true,
      // removeStyleTags: true,
      applyLinkTags: true,
    });
    const mailResult: boolean = await StakeholderController.emailService.sendEMail(
      emailReq
    );
    if (!mailResult) {
      return mailResult;
    }
    // If Email has been successfully sent update the user.
    if (mailResult) {
      return mailResult;
    }
  }
  //#endregion
}
