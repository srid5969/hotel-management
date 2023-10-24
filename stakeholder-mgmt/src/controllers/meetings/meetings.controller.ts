import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
  //   NoContentResponse,
} from '../../util';
import {meetingsRepository} from '../../repositories/meetings.repo';
import {OrganizationTypeRepository} from '../../repositories/organization-type.repo';
import {OrganizationNameRepository} from '../../repositories/organization-name.repo';
import {StatusRepository} from '../../repositories/status.repo';
import {
  statusConfig,
  statusTypeConfig,
  templateConfig,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rolesConfig,
} from '../../config/app';
import {UserRepository} from '../../repositories/users.repo';
import {PriorityLevelRepository} from '../../repositories/priority-level.repo';
const inlineCss = require('inline-css');
import {
  getMeetingsRes,
  editMeetingRes,
  filterMeetingReq,
} from '../../business_objects/meeting';
import {
  createMeetingReq,
  getOrgTypeDdlDataReq,
} from '../../business_objects/meeting';
import {
  getOrgDdlDataReq,
  getStakeholderForMeetingsCreationReq,
} from '../../business_objects/meeting';
import {notificationConfig, meetingPriorityConfig} from '../../config/app';
import {notificationConfigRepository} from '../../repositories/notification.repo';
import {TemplateRepository} from '../../repositories/template.repo';
import {EmailProperties} from '../../business_objects/auth';
// import {emailConfig} from '../../config/email';
import {sendMeetingEmails} from '../../business_objects/meeting';
import {corporateEmailRepository} from '../../repositories/corporateEmails.repo';
// import {MailService} from '../../services/mail.service';
import {EmailService} from '../../services/email.service';
import {CreateOptions} from 'html-pdf';
import {HtmlToPdf} from '../../providers/htmlToPdf';
import {azureFileUploadConfig} from '../../config';
import {AzureUploader} from '../../providers/blob-uploader';
import {promisify} from 'util';
import fs from 'fs';
import {PublicCompanyRepository} from '../../repositories/public-company.repo';
import {CompanyTypeRepository} from '../../repositories/company-type.repo';
import {filterByDateObj} from '../../business_objects/admin-dashboard';
import {EntityRepository} from '../../repositories/entity.repo';
import moment from 'moment';
const unlinkFile = promisify(fs.unlink);

export class MeetingsController {
  private static meetingsRepo = new meetingsRepository();
  private static organizationTypeRepo = new OrganizationTypeRepository();
  private static organizationNameRepo = new OrganizationNameRepository();
  private static statusRepo = new StatusRepository();
  private static userRepo = new UserRepository();
  private static priorityRepo = new PriorityLevelRepository();
  private static notificationConfigRepo = new notificationConfigRepository();
  private static templateRepo = new TemplateRepository();
  private static corporateEmailsRepo = new corporateEmailRepository();
  // private static mailService = new MailService();
  private static emailService = new EmailService();
  private static pubCompRepo = new PublicCompanyRepository();
  private static compTypeRepo = new CompanyTypeRepository();
  private static entityRepo = new EntityRepository();

  //#region  getOrgDdlData

  /**
   * @description This API is used to get Organization Types
   * @param req
   * @param res
   * @returns
   */
  static async getOrgDdlData(req: Request, res: Response) {
    const taskName = 'ORG_TYPE_DDL_DATA';
    logger.info(`${taskName}`, `GET_${taskName}`);
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
      const orgTypeList = await MeetingsController.organizationTypeRepo.getOrganizationTypeList();
      const resp: getOrgTypeDdlDataReq = {
        organizationTypeList: orgTypeList,
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

  //#region getOrgNameData
  /**
   * @description This API gets organization names based on Organization Type
   * @param req
   * @param res
   * @returns
   */
  static async getOrgNameData(req: Request, res: Response) {
    const taskName = 'GET_ORG_NAME_DATA';
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
      const reqObj: getOrgDdlDataReq = {
        orgId: req.body.orgId,
      };
      const orgNamesList = await MeetingsController.organizationNameRepo.getOrganizations(
        reqObj.orgId
      );
      if (!orgNamesList) {
        logger.info(`${taskName}_NOT_PROVIDED`, orgNamesList);
        const noResult = new BadRequestResponse(
          res,
          // eslint-disable-next-line quotes
          `Error occurred while retrieving organization names.`
        );
        return noResult.send();
      }
      const resp = {
        organizationNameList: orgNamesList,
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

  //#region getStakeholdersData

  /**
   * @description This API is used to get stakeholders data for meeting creation based on Org Type, Org Name, User Priority Level and StakeHolder Approval Status
   * @param req
   * @param res
   * @returns
   */
  static async getStakeholdersData(req: Request, res: Response) {
    const taskName = 'STAKEHOLDER_DATA';
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
      const priorityLevelUser = await MeetingsController.userRepo.findUserByAzureId(
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
      const dbUserId = await MeetingsController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      const priorityLevelFilter = await MeetingsController.priorityRepo.getPriorityLevelByLevel(
        priorityLevelUser?.priorityLevel
      );
      const priorityLevels = priorityLevelFilter.map((a: any) => a.level);
      const statusId = await MeetingsController.statusRepo.getStatus(
        statusConfig.APPROVED,
        statusTypeConfig.STAKE_HOLDER
      );
      const filterObj: getStakeholderForMeetingsCreationReq = {
        organizationIds: req.body.organizationIds,
        organizationTypeIds: req.body.organizationTypeIds,
        priorityLevel: priorityLevels,
        statusId: statusId?.id,
        userId: dbUserId.id,
      };
      if (
        filterObj.organizationIds.length <= 0 ||
        filterObj.organizationTypeIds.length <= 0
      ) {
        logger.info(`${taskName}_NOT_PROVIDED`, JSON.stringify(filterObj));
        const success = new SuccessResponse(res, 'success', []);
        return success.send();
      }
      const getStakeholders: any = await MeetingsController.meetingsRepo.getStakeHolderForMeetingCreation(
        filterObj
      );
      if (!getStakeholders) {
        logger.info(`${taskName}_ERROR`, JSON.stringify(getStakeholders));
        const noResult = new BadRequestResponse(
          res,
          'Error while retrieving stakeHolders Data '
        );
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', getStakeholders);
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

  //#region createMeetings

  /**
   * @description This API is used to create and update meetings.
   * @param req
   * @param res
   * @returns
   */

  static async createMeetings(req: Request, res: Response) {
    const taskName = 'CREATE_AND_UPDATE_MEETINGS';
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
      const meetingObj: createMeetingReq = {
        organizationIds: req.body.organizationIds,
        organizationTypeIds: req.body.organizationTypeIds,
        meetingAgenda: req.body?.meetingAgenda,
        meetingDate: req.body.meetingDate,
        meetingStartTime: req.body.meetingStartTime,
        meetingEndTime: req.body.meetingEndTime,
        stakeHolderIds: req.body.stakeHolderIds,
        attendeesIds: req.body.attendeesIds,
        riskNotes: req.body?.riskNotes,
        supportNotes: req.body?.supportNotes,
        observations: req.body?.observations,
        oppurtunities: req.body?.oppurtunities,
        fileUpload: req.body?.fileUpload,
        meetingId: req.body?.meetingId,
        isDraft: req.body?.isDraft,
      };
      const userId = await MeetingsController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      // const getUserRoleId = await MeetingsController.userRepo.getUserRoleId(
      //   rolesConfig.STAKEHOLDER_MANAGER
      // );
      // if (!getUserRoleId) {
      //   logger.error(`${taskName}_ROLE_CONFIG_NOT_FOUND`, getUserRoleId);
      //   const noResult = new BadRequestResponse(res, 'Role Config Not Found');
      //   return noResult.send();
      // }
      // const checkUserRole = await MeetingsController.userRepo.findUserRoleInfo(
      //   userId.id,
      //   getUserRoleId.id
      // );
      // if (checkUserRole.length <= 0) {
      //   logger.error(`${taskName}_ROLE_ACCESS_DENIED`, checkUserRole);
      //   const noResult = new BadRequestResponse(
      //     res,
      //     'Permission denied to the route.'
      //   );
      //   return noResult.send();
      // }
      meetingObj.userId = userId.id;
      const createMeetingResult = await MeetingsController.meetingsRepo.createMeeting(
        meetingObj
      );
      if (!createMeetingResult) {
        logger.info(`${taskName}_ERROR`, JSON.stringify(createMeetingResult));
        const noResult = new BadRequestResponse(
          res,
          'Error occurred while creating the meeting.'
        );
        return noResult.send();
      }
      if (meetingObj.isDraft === false) {
        const userInfo: any = await MeetingsController.userRepo.getUserInfoByAzureId(
          azureuserid.toString()
        );
        let corporateEmails = await MeetingsController.corporateEmailsRepo.getCorporateEmails();
        corporateEmails = corporateEmails.map(
          (corporate: any) => corporate.email
        );
        const stakeHoldersInvolved = await MeetingsController.meetingsRepo.getMeetingStakeHoldersByIdForEmailQuery(
          createMeetingResult?.id,
          userId.id
        );
        const attendeesInvolved = await MeetingsController.meetingsRepo.getMeetingAttebdeesByIdQuery(
          createMeetingResult?.id,
          userId.id
        );
        const emailObj: sendMeetingEmails = {
          userInfo: {
            fullName: userInfo[0]?.fullName,
            entity: userInfo[0]?.entityName,
            designation: userInfo[0]?.designation,
            priorityLevel: userInfo[0]?.priorityLevel,
          },
          meetingInfo: {
            meetingId: createMeetingResult?.id,
            meetingDate: createMeetingResult?.meetingDate,
            meetingStartTime: createMeetingResult?.meetingStartTime,
            meetingEndTime: createMeetingResult?.meetingEndTime,
            meetingAgenda: createMeetingResult?.meetingAgenda,
          },
          emails: corporateEmails,
          stakeHolders: stakeHoldersInvolved,
          attendees: attendeesInvolved,
        };
        emailObj.templateType = templateConfig.CREATE_UPDATE_MEETING;
        emailObj.taskName = 'CREATE_UPDATE_MEETING_EMAIL';
        const emailResponse = await MeetingsController.sendMeetingEmails(
          emailObj
        );
        logger.info('SEND_MEETING_EMAIL_RESULT', emailResponse);
      }
      const success = new SuccessResponse(res, 'success', createMeetingResult);
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

  //#region  getMeetingsByUserId
  static async getMeetingsByUserId(req: Request, res: Response) {
    const taskName = 'MEETINGS_LISTING';
    logger.info(`${taskName}`, `GET_${taskName}`);
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
      const dbUser = await MeetingsController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );

      //#region  Check user role
      // We are checking role here because if role is Admin he can view all meetings.
      const getUserRoleId = await MeetingsController.userRepo.getUserRoleId(
        rolesConfig.ADMIN
      );
      if (!getUserRoleId) {
        logger.error(`${taskName}_ROLE_CONFIG_NOT_FOUND`, getUserRoleId);
        const noResult = new BadRequestResponse(res, 'Role Config Not Found');
        return noResult.send();
      }
      let userId;
      const checkUserRole = await MeetingsController.userRepo.findUserRoleInfo(
        dbUser.id,
        getUserRoleId.id
      );
      //#endregion

      let getMeetings;
      // If role is not found as admin then we get only those meeting created by this user.
      if (checkUserRole.length === 0) {
        userId = dbUser.id;
        getMeetings = await MeetingsController.meetingsRepo.getMeetingsByIdQuery(
          userId
        );
        // if role is found we set userId to null indicating that we need data of all meetings.
      } else if (checkUserRole.length > 0) {
        userId = null;
        getMeetings = await MeetingsController.meetingsRepo.getMeetingsByIdQuery(
          userId
        );
      }

      const meetingsList = [];
      for (let index = 0; index < getMeetings.length; index++) {
        const element: any = getMeetings[index];
        const meetingFiles = await MeetingsController.meetingsRepo.getMeetingFilesByIdQuery(
          element?.meetingId,
          userId
        );
        const meetingStakeholders = await MeetingsController.meetingsRepo.getMeetingStakeHoldersByIdQuery(
          element?.meetingId,
          userId
        );
        const riskInvolvedCount = await MeetingsController.meetingsRepo.getMeetingRiskCountByIdQuery(
          userId,
          element?.meetingId
        );
        const supportRequiredCount = await MeetingsController.meetingsRepo.getMeetingSupportCountByIdQuery(
          userId,
          element?.meetingId
        );
        const organizationsInvolved: any = await MeetingsController.meetingsRepo.getMeetingOrgNamesByIdQuery(
          element?.meetingId
        );
        const ministriesInvolved = [];
        const companiesInvolved = [];
        // const organizationTypesInvolved = await MeetingsController.meetingsRepo.getMeetingOrgTypesByIdQuery(
        //   element?.meetingId
        // );
        for (let index = 0; index < organizationsInvolved.length; index++) {
          if (
            organizationsInvolved[index].organizationTypeName === 'Ministry'
          ) {
            ministriesInvolved.push(
              organizationsInvolved[index].organizationName
            );
          } else if (
            organizationsInvolved[index].organizationTypeName === 'Company'
          ) {
            companiesInvolved.push(
              organizationsInvolved[index].organizationName
            );
          }
        }
        const obj = {
          meetingInfo: element,
          stakeHoldersInvolved: meetingStakeholders,
          riskInvolved: riskInvolvedCount,
          supportRequired: supportRequiredCount,
          ministriesInvolved: ministriesInvolved,
          companiesInvolved: companiesInvolved,
          meetingFiles: meetingFiles,
        };
        meetingsList.push(obj);
      }
      const resp: getMeetingsRes = {
        meetingsList: meetingsList,
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

  //#region  getMeetingsByUserId
  static async exportMeetingToExcelByUserId(req: Request, res: Response) {
    const taskName = 'MEETINGS_LISTING';
    logger.info(`${taskName}`, `GET_${taskName}`);
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
      const filterObj: filterByDateObj = {
        meetingFrom: req.body.meetingFrom,
        meetingTo: req.body.meetingTo,
      };
      const dbUser = await MeetingsController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );

      //#region  Check user role
      // We are checking role here because if role is Admin he can view all meetings.
      const getUserRoleId = await MeetingsController.userRepo.getUserRoleId(
        rolesConfig.ADMIN
      );
      if (!getUserRoleId) {
        logger.error(`${taskName}_ROLE_CONFIG_NOT_FOUND`, getUserRoleId);
        const noResult = new BadRequestResponse(res, 'Role Config Not Found');
        return noResult.send();
      }
      let userId;
      const checkUserRole = await MeetingsController.userRepo.findUserRoleInfo(
        dbUser.id,
        getUserRoleId.id
      );
      //#endregion

      let getMeetings;
      // If role is not found as admin then we get only those meeting created by this user.
      if (checkUserRole.length === 0) {
        userId = dbUser.id;
        getMeetings = await MeetingsController.meetingsRepo.exportExcelByIdQuery(
          userId,
          filterObj
        );
        // if role is found we set userId to null indicating that we need data of all meetings.
      } else if (checkUserRole.length > 0) {
        userId = null;
        getMeetings = await MeetingsController.meetingsRepo.exportExcelByIdQuery(
          userId,
          filterObj
        );
      }
      const meetingStakeholders = await MeetingsController.meetingsRepo.getMeetingStakeHoldersForExcelExport(
        filterObj
      );
      const riskInvolved = await MeetingsController.meetingsRepo.getMeetingRiskQuery(
        filterObj
      );
      const supportRequiredCount = await MeetingsController.meetingsRepo.getMeetingSupport(
        filterObj
      );
      const resp = {
        meetingInfo: getMeetings,
        stakeHoldersInvolved: meetingStakeholders,
        riskInvolved: riskInvolved,
        supportRequired: supportRequiredCount,
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

  //#region editMeetingByUserId
  static async editMeetingByUserId(req: Request, res: Response) {
    const taskName = 'EDIT_MEETING';
    logger.info(`${taskName}`, req.params);
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
      const dbUser = await MeetingsController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      const meetingExpiration = await MeetingsController.notificationConfigRepo.getNotificationConfigByType(
        notificationConfig.EDIT_MEETING_EXPIRY_TIME
      );
      if (!meetingExpiration) {
        logger.info(
          `${taskName}_EXPIRY_TIME_CONFIG_NOT_FOUND`,
          meetingExpiration
        );
        const noResult = new BadRequestResponse(
          res,
          'Edit Meeting Expiration Config Not Found.'
        );
        return noResult.send();
      }
      const editObj = {
        meetingId: parseInt(req.params.meetingId),
      };
      const editMeeting: any = await MeetingsController.meetingsRepo.editMeetingByIdQuery(
        editObj.meetingId,
        dbUser.id
      );
      let editMeetingTime: any = new Date(editMeeting[0].lastModifiedDate);
      editMeetingTime =
        editMeetingTime.getTime() +
        parseFloat(meetingExpiration.timeInHrs) * 60 * 60 * 1000;
      if (
        editMeetingTime < new Date().getTime() &&
        editMeeting[0].isDraft === false
      ) {
        logger.info(`${taskName}_TIME_EXPIRED`, editObj);
        const noResult = new BadRequestResponse(
          res,
          'You cannot edit this meeting now as it was created 24 hours ago.'
        );
        return noResult.send();
      }
      const meetingOrgTypes = await MeetingsController.meetingsRepo.getMeetingOrgTypesByIdQuery(
        editObj.meetingId
      );
      const meetingOrgNames = await MeetingsController.meetingsRepo.getMeetingOrgNamesByIdQuery(
        editObj.meetingId
      );
      const meetingStakeholders = await MeetingsController.meetingsRepo.getMeetingStakeHoldersByIdQuery(
        editObj.meetingId,
        dbUser.id
      );
      const meetingAttendees = await MeetingsController.meetingsRepo.getMeetingAttebdeesByIdQuery(
        editObj.meetingId,
        dbUser.id
      );
      const meetingRiskNotes = await MeetingsController.meetingsRepo.getMeetingRiskNotesByIdQuery(
        editObj.meetingId,
        dbUser.id
      );
      const meetingSupportNotes = await MeetingsController.meetingsRepo.getMeetingSupportNotesByIdQuery(
        editObj.meetingId,
        dbUser.id
      );
      const meetingFiles = await MeetingsController.meetingsRepo.getMeetingFilesByIdQuery(
        editObj.meetingId,
        dbUser.id
      );
      const resp: editMeetingRes = {
        meetingInfo: editMeeting,
        organizationTypesInvolved: meetingOrgTypes,
        organizationsInvolved: meetingOrgNames,
        stakeHoldersInvolved: meetingStakeholders,
        attendeesInvolved: meetingAttendees,
        riskInvolved: meetingRiskNotes,
        supportRequired: meetingSupportNotes,
        meetingFiles: meetingFiles,
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

  //#region filterMeetingsById
  static async filterMeetingsById(req: Request, res: Response) {
    const taskName = 'FILTER_MEETINGS';
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
      const dbUser = await MeetingsController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      //#region  Check user role
      // We are checking role here because if role is Admin he can view all meetings.
      const getUserRoleId = await MeetingsController.userRepo.getUserRoleId(
        rolesConfig.ADMIN
      );
      if (!getUserRoleId) {
        logger.error(`${taskName}_ROLE_CONFIG_NOT_FOUND`, getUserRoleId);
        const noResult = new BadRequestResponse(res, 'Role Config Not Found');
        return noResult.send();
      }
      const checkUserRole = await MeetingsController.userRepo.findUserRoleInfo(
        dbUser.id,
        getUserRoleId.id
      );
      //#endregion

      const filterObj: filterMeetingReq = {
        userId: dbUser.id,
        meetingFrom: req.body.meetingFrom,
        meetingTo: req.body.meetingTo,
        meetingStartTime: req.body.meetingStartTime,
        meetingEndTime: req.body.meetingEndTime,
        organizationTypeIds: req.body.organizationTypeIds,
        organizationIds: req.body.organizationIds,
        priorityLevels: req.body.priorityLevels,
        companyTypeIds: req.body.companyTypeIds,
        publicCompTypeIds: req.body.publicCompTypeIds,
        createdByIds: req.body.createdByIds,
        entityIds: req.body.entityIds,
      };
      if (checkUserRole.length > 0) {
        filterObj.userId = null;
      }
      let filterMeetingResult = await MeetingsController.meetingsRepo.filterMeetingByDateAndTime(
        filterObj
      );
      if (filterMeetingResult.length <= 0) {
        const success = new SuccessResponse(res, 'success', []);
        return success.send();
      }
      if (filterObj.organizationTypeIds.length > 0) {
        const meetingIds = filterMeetingResult
          .map((id: any) => id.meetingId)
          .map(Number);

        // This returns us an array of meetingIds that matches the applied filters
        const filteredMeetingIdsBasedOnOrgNamesAndOrgTypes: any = await MeetingsController.meetingsRepo.applyMeetingOrgTypesAndOrgNamesQuery(
          meetingIds,
          filterObj
        );
        if (filteredMeetingIdsBasedOnOrgNamesAndOrgTypes.length <= 0) {
          const success = new SuccessResponse(res, 'success', []);
          return success.send();
        }
        filterMeetingResult = await MeetingsController.meetingsRepo.getFilteredMeetingsByIdQuery(
          filteredMeetingIdsBasedOnOrgNamesAndOrgTypes
        );
      }
      // Filters for priority level of stakeholders
      if (filterObj.priorityLevels.length > 0) {
        const meetingIds = filterMeetingResult
          .map((id: any) => id.meetingId)
          .map(Number);
        const filteredMeetingIdsByStakeHolderPriorityLevel = await MeetingsController.meetingsRepo.filterByStakeHolderPriorityLevels(
          meetingIds,
          filterObj
        );
        if (filteredMeetingIdsByStakeHolderPriorityLevel.length <= 0) {
          const success = new SuccessResponse(res, 'success', []);
          return success.send();
        }

        filterMeetingResult = await MeetingsController.meetingsRepo.getFilteredMeetingsByIdQuery(
          filteredMeetingIdsByStakeHolderPriorityLevel
        );
      }
      if (filterObj.createdByIds.length > 0) {
        if (checkUserRole.length === 0) {
          const success = new SuccessResponse(
            res,
            'Only admin can search based on who created the meeting',
            []
          );
          return success.send();
        }
        const meetingIds = filterMeetingResult
          .map((id: any) => id.meetingId)
          .map(Number);
        const filterByCreatedId = await MeetingsController.meetingsRepo.getMeetingByUserId(
          meetingIds,
          filterObj
        );
        if (filterByCreatedId.length <= 0) {
          const success = new SuccessResponse(res, 'success', []);
          return success.send();
        }
        filterMeetingResult = await MeetingsController.meetingsRepo.getFilteredMeetingsByIdQuery(
          filterByCreatedId
        );
      }
      if (filterObj.entityIds.length > 0) {
        if (checkUserRole.length === 0) {
          const success = new SuccessResponse(
            res,
            'Only admin can search based on entity',
            []
          );
          return success.send();
        }
        const meetingIds = filterMeetingResult
          .map((id: any) => id.meetingId)
          .map(Number);
        const filterByEntityId = await MeetingsController.meetingsRepo.getMeetingByEntityId(
          meetingIds,
          filterObj
        );
        if (filterByEntityId.length <= 0) {
          const success = new SuccessResponse(res, 'success', []);
          return success.send();
        }
        filterMeetingResult = await MeetingsController.meetingsRepo.getFilteredMeetingsByIdQuery(
          filterByEntityId
        );
      }
      const meetingsList = [];
      for (let index = 0; index < filterMeetingResult.length; index++) {
        const element: any = filterMeetingResult[index];
        const meetingFiles = await MeetingsController.meetingsRepo.getMeetingFilesByIdQuery(
          element?.meetingId,
          filterObj.userId
        );
        const meetingStakeholders = await MeetingsController.meetingsRepo.getMeetingStakeHoldersByIdQuery(
          element?.meetingId,
          filterObj.userId
        );
        const riskInvolvedCount = await MeetingsController.meetingsRepo.getMeetingRiskCountByIdQuery(
          filterObj.userId,
          element?.meetingId
        );
        const supportRequiredCount = await MeetingsController.meetingsRepo.getMeetingSupportCountByIdQuery(
          filterObj.userId,
          element?.meetingId
        );
        const organizationsInvolved: any = await MeetingsController.meetingsRepo.getMeetingOrgNamesByIdQuery(
          element?.meetingId
        );
        const ministriesInvolved = [];
        const companiesInvolved = [];
        // const organizationTypesInvolved = await MeetingsController.meetingsRepo.getMeetingOrgTypesByIdQuery(
        //   element?.meetingId
        // );
        for (let index = 0; index < organizationsInvolved.length; index++) {
          if (
            organizationsInvolved[index].organizationTypeName === 'Ministry'
          ) {
            ministriesInvolved.push(
              organizationsInvolved[index].organizationName
            );
          } else if (
            organizationsInvolved[index].organizationTypeName === 'Company'
          ) {
            companiesInvolved.push(
              organizationsInvolved[index].organizationName
            );
          }
        }
        const obj = {
          meetingInfo: element,
          stakeHoldersInvolved: meetingStakeholders,
          riskInvolved: riskInvolvedCount,
          supportRequired: supportRequiredCount,
          ministriesInvolved: ministriesInvolved,
          companiesInvolved: companiesInvolved,
          meetingFiles: meetingFiles,
        };
        meetingsList.push(obj);
      }
      const resp: getMeetingsRes = {
        meetingsList: meetingsList,
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

  //#region  uploadFile

  /**
   * @description This API is used to upload meeting file attachment
   * @param req
   * @param res
   * @returns
   */
  public static async uploadFile(req: Request, res: Response): Promise<void> {
    const taskName = 'FILE_UPLOAD';
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
      if (!req.file && !req.files) {
        const noResult = new BadRequestResponse(res, 'No file has been found');
        return noResult.send();
      }
      //returns the success response
      const success = new SuccessResponse(
        res,
        'success',
        req.file || req.files
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

  //#region downloadMeeting
  static async downloadMeeting(req: Request, res: Response) {
    const taskName = 'DOWNLOAD_MEETING';
    logger.info(`${taskName}`, req.params);
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
      const dbUser = await MeetingsController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      const downloadObj = {
        meetingId: parseInt(req.params.meetingId),
        userId: dbUser.id,
      };
      //#region  Check user role
      // We are checking role here because if role is Admin he can view all meetings.
      const getUserRoleId = await MeetingsController.userRepo.getUserRoleId(
        rolesConfig.ADMIN
      );
      if (!getUserRoleId) {
        logger.error(`${taskName}_ROLE_CONFIG_NOT_FOUND`, getUserRoleId);
        const noResult = new BadRequestResponse(res, 'Role Config Not Found');
        return noResult.send();
      }
      const checkUserRole = await MeetingsController.userRepo.findUserRoleInfo(
        dbUser.id,
        getUserRoleId.id
      );
      // We are checking role here because if role is CXRO he can view all meetings.
      const getUserRoleIdForCXRO = await MeetingsController.userRepo.getUserRoleId(
        rolesConfig.CXRO
      );
      if (!getUserRoleIdForCXRO) {
        logger.error(`${taskName}_ROLE_CONFIG_NOT_FOUND`, getUserRoleIdForCXRO);
        const noResult = new BadRequestResponse(res, 'Role Config Not Found');
        return noResult.send();
      }
      const checkUserRoleForCXRO = await MeetingsController.userRepo.findUserRoleInfo(
        dbUser.id,
        getUserRoleIdForCXRO.id
      );

      if (checkUserRole.length > 0 || checkUserRoleForCXRO.length > 0) {
        downloadObj.userId = null;
      }
      //#endregion
      const downloadMeeting: any = await MeetingsController.meetingsRepo.downloadMeetingByIdQuery(
        downloadObj.meetingId,
        downloadObj.userId
      );
      if (!downloadMeeting || downloadMeeting.length <= 0) {
        logger.info(`${taskName}_NOT_FOUND`, downloadObj);
        const noResult = new BadRequestResponse(
          res,
          'No meeting with this meeting Id was found against this user.'
        );
        return noResult.send();
      }
      const meetingOrgTypes = await MeetingsController.meetingsRepo.getMeetingOrgTypesByIdQuery(
        downloadObj.meetingId
      );
      const meetingOrgNames = await MeetingsController.meetingsRepo.getMeetingOrgNamesByIdQuery(
        downloadObj.meetingId
      );
      const meetingStakeholders = await MeetingsController.meetingsRepo.getMeetingStakeHoldersByIdQuery(
        downloadObj.meetingId,
        downloadObj.userId
      );
      const meetingAttendees = await MeetingsController.meetingsRepo.getMeetingAttebdeesByIdQuery(
        downloadObj.meetingId,
        downloadObj.userId
      );
      const meetingRiskNotes = await MeetingsController.meetingsRepo.getMeetingRiskNotesByIdQuery(
        downloadObj.meetingId,
        downloadObj.userId
      );
      const meetingSupportNotes = await MeetingsController.meetingsRepo.getMeetingSupportNotesByIdQuery(
        downloadObj.meetingId,
        downloadObj.userId
      );
      const meetingFiles = await MeetingsController.meetingsRepo.getMeetingFilesByIdQuery(
        downloadObj.meetingId,
        downloadObj.userId
      );
      const OrgTypesName = meetingOrgTypes.map(
        (org: any) => org.organizationName
      );
      const OrgNames = meetingOrgNames.map((org: any) => org.organizationName);
      let attendeesInjector = `
        <tbody><tr>
          <th>#</th>
          <th>Name</th>
          <th>Designation</th>
          <th>Email</th>
          <th>Priority</th>
        </tr>`;
      for (let index = 0; index < meetingStakeholders.length; index++) {
        const element: any = meetingStakeholders[index];
        attendeesInjector = `${attendeesInjector} <tr>
        <td>${index + 1}</td>
        <td>${element.fullName}</td>
        <td>${element.designation}</td>
        <td>${element.email}</td>
        <td>${element.priorityLevel}</td>
        </tr>`;
      }
      attendeesInjector = `${attendeesInjector} </tbody>`;
      let OtherAttendeesInjector = `
        <tbody><tr>
          <th>#</th>
          <th>Name</th>
          <th>Designation</th>
        </tr>`;
      for (let index = 0; index < meetingAttendees.length; index++) {
        const element: any = meetingAttendees[index];
        OtherAttendeesInjector = `${OtherAttendeesInjector} <tr>
        <td>${index + 1}</td>
        <td>${element.fullName}</td>
        <td>${element.designation}</td>
        </tr>`;
      }
      OtherAttendeesInjector = `${OtherAttendeesInjector} </tbody>`;
      let meetingRiskInjector;
      if (meetingRiskNotes.length > 0) {
        meetingRiskInjector = `<tbody><tr>
      <th>#</th>
      <th>Risk Description</th>
      <th>Priority</th>
    </tr>`;
        for (let index = 0; index < meetingRiskNotes.length; index++) {
          const element: any = meetingRiskNotes[index];
          meetingRiskInjector = `${meetingRiskInjector}
          <tr>
             <td>${index + 1}</td>
             <td>${element.meetingRiskNotes}</td>
              <th>${element.meetingRiskNotesPriority}</th>
            </tr>`;
        }
        meetingRiskInjector = `${meetingRiskInjector}             
        </tbody>`;
      } else if (meetingRiskNotes.length === 0) {
        meetingRiskInjector = `
      <tbody><tr>
      <th>#</th>
        <th>Support Description</th>
        <th>Priority</th>
      </tr>
      <tr>
      <td>-</td>
      <td>-</td>
      <th>-</th>
      </tr></tbody>`;
      }
      let meetingSupportInjector;
      if (meetingSupportNotes.length > 0) {
        meetingSupportInjector = `
        <tbody><tr>
        <th>#</th>
          <th>Support Description</th>
          <th>Priority</th>
        </tr>`;
        for (let index = 0; index < meetingSupportNotes.length; index++) {
          const element: any = meetingSupportNotes[index];
          meetingSupportInjector = `${meetingSupportInjector}
          <tr>
            <td>${index + 1}</td>
             <td>${element.meetingSupportNotes}</td>
              <th>${element.meetingSupportNotesPriority}</th>
            </tr>`;
        }
        meetingSupportInjector = `${meetingSupportInjector}             
        </tbody>`;
      } else if (meetingSupportNotes.length === 0) {
        meetingSupportInjector = `
      <tbody><tr>
      <th>#</th>
        <th>Support Description</th>
        <th>Priority</th>
      </tr>
      <tr>
      <td>-</td>
      <td>-</td>
      <th>-</th>
      </tr></tbody>`;
      }
      let meetingFilesInjector;
      if (meetingFiles.length > 0) {
        meetingFilesInjector = `
          <tbody><tr>
          <th>#</th>
          <th>File Name</th>
        </tr>`;
        for (let index = 0; index < meetingFiles.length; index++) {
          const element: any = meetingFiles[index];
          meetingFilesInjector = `${meetingFilesInjector}
          <tr>
            <td>${index + 1}</td>
            <td><a href="${element.fileUrl.toString()}">${
            element.fileName
          }</a></td>
          </tr>`;
        }
        meetingFilesInjector = `${meetingFilesInjector}             
        </tbody>`;
      } else if (meetingFiles.length === 0) {
        meetingFilesInjector = `
          <tbody><tr>
          <th>#</th>
          <th>File Name</th>
        </tr> 
        <tr>
        <td>-</td>
         <td>-</td>
          <th>-</th>
        </tr></tbody>`;
      }
      let downloadReport = await MeetingsController.templateRepo.getTemplateByType(
        templateConfig.DOWNLOAD_REPORT
      );
      if (!downloadReport) {
        logger.info(`${taskName}_REPORT_TEMPLATE_NOT_FOUND`, downloadReport);
        const noResult = new BadRequestResponse(
          res,
          'Download Report Template Not Found.'
        );
        return noResult.send();
      }
      downloadReport = downloadReport.template;
      let addDetails: string = downloadReport.toString();
      addDetails = addDetails
        .replace('@meetingId', downloadMeeting[0].meetingId)
        .replace(
          '@meetingDate',
          moment(downloadMeeting[0].meetingDate).format('DD/MM/YYYY')
        )
        .replace(
          '@meetingStartTime',
          downloadMeeting[0].meetingStartTime
            .toString()
            .replace(/(:\d{2}| [AP]M)$/, '')
        )
        .replace(
          '@meetingEndTime',
          downloadMeeting[0].meetingEndTime
            .toString()
            .replace(/(:\d{2}| [AP]M)$/, '')
        )
        .replace('@organizationTypes', OrgTypesName.join(','))
        .replace('@organizationNames', OrgNames.join(','))
        .replace('@meetingAgenda', downloadMeeting[0].meetingAgenda || ' ')
        .replace(
          '@oppurtunitiesDiscussed',
          downloadMeeting[0].oppurtunities || ' '
        )
        .replace('@keyObservations', downloadMeeting[0].observations || ' ')
        .replace('@attendeesList', attendeesInjector)
        .replace('@OtherAttendeesList', OtherAttendeesInjector)
        .replace('@risksList', meetingRiskInjector || ' ')
        .replace('@supportList', meetingSupportInjector || ' ')
        .replace('@attachments', meetingFilesInjector || ' ');
      downloadReport = addDetails;
      downloadReport = downloadReport.replace(
        /(\r\n|\n|\r|\t|\r\n\t|\t\n)/gm,
        ''
      );
      const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
      while (SCRIPT_REGEX.test(downloadReport)) {
        downloadReport = downloadReport.replace(SCRIPT_REGEX, '');
      }
      //NOTE: We are not uploading the file on azure for now, in future if yes, we can use the below code...
      //#region convert meeting report HTML to PDF, and send PDF file as response
      const pdfFile = `Meeting_report_${downloadMeeting[0].meetingId}.pdf`;
      const options: CreateOptions = {
        format: 'A4',
        phantomPath: require('requireg')('phantomjs-prebuilt').path,
      };
      await HtmlToPdf.createPdfAsync(downloadReport, options, pdfFile).then(
        (data: any) => {
          logger.info('MEETING_REPORT_CREATEING_PDF_SUCCESS', data);
        },
        error => {
          logger.error('MEETING_REPORT_CREATEING_PDF_ERROR', error);
          const noResult = new BadRequestResponse(
            res,
            'Unablet to download the meeting report. Please try again and contact IT support team if problem persist.'
          );
          return noResult.send();
        }
      );
      // const data = await HtmlToPdf.printPDF(downloadReport);
      // console.log(data);

      const uploadProvider = new AzureUploader(pdfFile);
      await uploadProvider
        .uploadFileByChoice(
          azureFileUploadConfig.meetingReportContainer,
          `downloads/${downloadMeeting[0].meetingId}`
        )
        .catch((error: Error) => {
          logger.error('MEETING_REPORT_PDF_AZURE_UPLOAD_ERROR', error);
        });
      await unlinkFile(pdfFile).catch(error =>
        logger.error('MEETING_REPORT_PDF_DELETE_ERROR', error)
      );
      const link = `https://${azureFileUploadConfig.storageAccount}.blob.core.windows.net/${azureFileUploadConfig.meetingReportContainer}/downloads/${downloadMeeting[0].meetingId}/${pdfFile}`;
      const resultObj = {
        meetingReportLink: link,
      };
      const success = new SuccessResponse(res, 'success', resultObj);
      //#endregion

      // const cssinline = await inlineCss(downloadReport, {
      //   url: downloadReport,
      //   // applyTableAttributes: true,
      //   // applyWidthAttributes: true,
      //   // removeStyleTags: true,
      //   applyLinkTags: true,
      // });
      // downloadReport = cssinline;
      // const success = new SuccessResponse(
      //   res,
      //   'success',
      //   Buffer.from(downloadReport, 'binary').toString('base64')
      // );
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

  //#region sendMeetingEmails
  private static async sendMeetingEmails(emailObj: sendMeetingEmails) {
    const taskName = `${emailObj.taskName}`;
    logger.info(`${taskName}-REQ`, emailObj);
    // Fetch email template from DB
    const templateFetch: Record<
      string,
      any
    > = await MeetingsController.templateRepo.getTemplateByType(
      emailObj.templateType
    );
    if (templateFetch === null) {
      logger.info(`${taskName}_UNABLE_TO_FETCH_TEMPLATE`, templateFetch);
      return false;
    }
    const emailReq: EmailProperties = {
      // emailFrom: emailConfig.email_from,
      emailTo: emailObj.emails,
      emailSubject: templateFetch?.title,
      emailHTMLContent: templateFetch?.template.toString(),
    };
    let stakeHoldersInjection = `  <tbody><tr>
      <th>#</th>
      <th>Name</th>
      <th>Designation</th>
      <th>Priority</th>
    <th>Organization Type</th>
    <th>Organization Name</th>
    </tr>`;
    for (let index = 0; index < emailObj?.stakeHolders.length; index++) {
      const element = emailObj?.stakeHolders[index];
      stakeHoldersInjection = `${stakeHoldersInjection} <tr>
        <td>${index + 1}</td>
        <td>${element.fullName}</td>
        <td>${element.designation}</td>
        <td>${element.priorityLevel}</td>
      <td>${element.organizationTypeName} ${
        element.companyTypeName ? '- ' + element?.companyTypeName : ''
      } ${
        element.publicCompanyName ? '- ' + element.publicCompanyName : ''
      }</td>
      <td>${element.organizationName}</td>
        </tr>`;
    }
    stakeHoldersInjection = `${stakeHoldersInjection} </tbody>`;
    let attendeesInjection = `  <tbody><tr>
    <th>#</th>
    <th>Name</th>
    <th>Designation</th>
    </tr>`;
    for (let index = 0; index < emailObj?.attendees.length; index++) {
      const element = emailObj?.attendees[index];
      attendeesInjection = `${attendeesInjection} <tr>
        <td>${index + 1}</td>
        <td>${element.fullName}</td>
        <td>${element.designation}</td>
        </tr>`;
    }
    attendeesInjection = `${attendeesInjection} </tbody>`;
    const addTitle = emailReq.emailSubject
      .toString()
      .replace('@stakeHolderName', emailObj.userInfo.fullName)
      .replace('@meetingId', emailObj.meetingInfo.meetingId);
    emailReq.emailSubject = addTitle;
    const addDetails = emailReq.emailHTMLContent
      .toString()
      .replace('@stakeholderName', emailObj?.userInfo.fullName)
      .replace('@stakeholderEntity', emailObj?.userInfo?.entity)
      .replace('@stakeholderDesignation', emailObj?.userInfo?.designation)
      .replace('@stakeholderPriorityLevel', emailObj?.userInfo?.priorityLevel)
      .replace('@meetingId', emailObj?.meetingInfo?.meetingId)
      .replace(
        '@meetingDate',
        moment(emailObj?.meetingInfo?.meetingDate).format('DD/MM/YYYY')
      )
      .replace('@meetingStartTime', emailObj?.meetingInfo?.meetingStartTime)
      .replace('@meetingEndTime', emailObj?.meetingInfo?.meetingEndTime)
      .replace('@meetingAgenda', emailObj?.meetingInfo?.meetingAgenda || '')
      .replace('@stakeHolders', stakeHoldersInjection)
      .replace('@attendees', attendeesInjection);
    emailReq.emailHTMLContent = addDetails;
    const cssinline = await inlineCss(emailReq.emailHTMLContent, {
      url: emailReq.emailHTMLContent,
      // applyTableAttributes: true,
      // applyWidthAttributes: true,
      // removeStyleTags: true,
      applyLinkTags: true,
    });
    emailReq.emailHTMLContent = cssinline;
    const mailResult: boolean = await MeetingsController.emailService.sendEMail(
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

  //#region getFilterDDLData
  static async getFilterDDLData(req: Request, res: Response) {
    const taskName = 'GET_MEETING_FILTER_DDL_DATA';
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
      const priorityLevelUser = await MeetingsController.userRepo.findUserByAzureId(
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
        priorityLevelFilter = await MeetingsController.priorityRepo.getPriorityLevelByLevel(
          priorityLevelUser?.priorityLevel
        );
      } else {
        priorityLevelFilter = await MeetingsController.priorityRepo.getPriorityLevelByLevel(
          'P0'
        );
      }
      const priorityLevels = priorityLevelFilter.map((a: any) => a.level);
      //gets the organiztion types
      const organizationTypeList = await MeetingsController.organizationTypeRepo.getOrganizationTypeList();
      // gets public company list
      const pubCompList = await MeetingsController.pubCompRepo.getPublicCompanyList();
      //gets company type list
      const compTypeList = await MeetingsController.compTypeRepo.getCompanyTypeList();
      // gets createdBy list
      const createdBy = await MeetingsController.userRepo.getUsersList();
      //gets entity list
      const entityList = await MeetingsController.entityRepo.getEntityList();

      const resp = {
        organizationType: organizationTypeList,
        priorityLevels: priorityLevels,
        publicCompany: pubCompList,
        companyType: compTypeList,
        createdBy: createdBy,
        entityList: entityList,
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

  //#region filterMeetingForAdmin
  static async filterMeetingForAdmin(req: Request, res: Response) {
    const taskName = 'FILTER_MEETING_BY_DATE_FOR_ADMIN';
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
      const filterObj: filterByDateObj = {
        meetingFrom: req.body.meetingFrom,
        meetingTo: req.body.meetingTo,
      };
      const filterMeetingByDate = await MeetingsController.meetingsRepo.filterMeetingsByDateQuery(
        filterObj
      );
      if (!filterMeetingByDate) {
        logger.info(`${taskName}_ERROR`, filterMeetingByDate);
        const noResult = new BadRequestResponse(
          res,
          // eslint-disable-next-line quotes
          `Error occurred while fetching data from DB.`
        );
        return noResult.send();
      }

      const success = new SuccessResponse(res, 'success', filterMeetingByDate);
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

  //#region getMeetingInfoByStakeholderId
  static async getMeetingInfoByStakeholderId(req: Request, res: Response) {
    const taskName = 'GET_MEETINGS_BY_STAKEHOLDER_ID';
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
      const {stakeHolderId} = req.body;

      const stakeHolderManagersInfo = await MeetingsController.meetingsRepo.getStakeHolderManagersForStakeHolderByIdQuery(
        stakeHolderId
      );
      const getMeetings = await MeetingsController.meetingsRepo.getStakeholderInMeetings(
        stakeHolderId
      );
      const meetingsList = [];
      for (let index = 0; index < getMeetings.length; index++) {
        const element: any = getMeetings[index];
        const meetingInfo = await MeetingsController.meetingsRepo.getMeetingByIdQuery(
          element
        );
        const meetingStakeholders = await MeetingsController.meetingsRepo.getMeetingStakeHoldersByIdQuery(
          element,
          null
        );
        const riskInvolvedCount = await MeetingsController.meetingsRepo.getMeetingRiskCountByIdQuery(
          null,
          element
        );
        const supportRequiredCount = await MeetingsController.meetingsRepo.getMeetingSupportCountByIdQuery(
          null,
          element
        );
        const organizationsInvolved: any = await MeetingsController.meetingsRepo.getMeetingOrgNamesByIdQuery(
          element
        );
        const ministriesInvolved = [];
        const companiesInvolved = [];
        // const organizationTypesInvolved = await MeetingsController.meetingsRepo.getMeetingOrgTypesByIdQuery(
        //   element?.meetingId
        // );
        for (let index = 0; index < organizationsInvolved.length; index++) {
          if (
            organizationsInvolved[index].organizationTypeName === 'Ministry'
          ) {
            ministriesInvolved.push(
              organizationsInvolved[index].organizationName
            );
          } else if (
            organizationsInvolved[index].organizationTypeName === 'Company'
          ) {
            companiesInvolved.push(
              organizationsInvolved[index].organizationName
            );
          }
        }
        const obj = {
          meetingInfo: meetingInfo,
          stakeHoldersInvolved: meetingStakeholders,
          riskInvolved: riskInvolvedCount,
          supportRequired: supportRequiredCount,
          ministriesInvolved: ministriesInvolved,
          companiesInvolved: companiesInvolved,
        };
        meetingsList.push(obj);
      }
      let highCount = 0;
      for (let index = 0; index < meetingsList.length; index++) {
        const element = meetingsList[index];
        for (let index2 = 0; index2 < element.riskInvolved.length; index2++) {
          const element2: any = element.riskInvolved[index2];
          if (
            element2.meetingRiskNotesPriority === meetingPriorityConfig.HIGH
          ) {
            highCount = highCount + parseInt(element2.riskTypeCount);
          }
        }
      }
      const meetingCount = getMeetings.length;
      const resp = {
        meetingCount: meetingCount,
        highRiskCount: highCount,
        stakeHolderManagersInfo: stakeHolderManagersInfo,
        meetingsList: meetingsList,
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
}
