import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {
  statusConfig,
  statusTypeConfig,
  meetingPriorityConfig,
} from '../../config/app';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
  //   NoContentResponse,
} from '../../util';
import {StakeHolderRepository} from '../../repositories/stakeholder.repo';
import {meetingsRepository} from '../../repositories/meetings.repo';
import {StatusRepository} from '../../repositories/status.repo';
import {UserRepository} from '../../repositories/users.repo';
import {OrganizationTypeRepository} from '../../repositories/organization-type.repo';
import {CityRepository} from '../../repositories/city.repo';
import {OrganizationNameRepository} from '../../repositories/organization-name.repo';
import {
  filterDashboardReq,
  getDashboardDataRes,
} from '../../business_objects/admin-dashboard';
import {EntityRepository} from '../../repositories/entity.repo';

export class AdminDashboardController {
  private static stakeHolderRepo = new StakeHolderRepository();
  private static meetingsRepo = new meetingsRepository();
  private static statusRepo = new StatusRepository();
  private static userRepo = new UserRepository();
  private static organizationTypeRepo = new OrganizationTypeRepository();
  private static cityRepo = new CityRepository();
  private static organizationNameRepo = new OrganizationNameRepository();
  private static entityRepo = new EntityRepository();

  //#region getDashboardData
  static async getDashboardData(req: Request, res: Response) {
    const taskName = 'ADMIN_DASHBOARD_DATA';
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
      const dbUser = await AdminDashboardController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      if (!dbUser) {
        logger.info(`${taskName}_USER_NOT_FOUND`, req.params);
        const noResult = new BadRequestResponse(res, 'User Not Found');
        return noResult.send();
      }
      //#region Dashboard General Data
      const stakeHoldersCount = await AdminDashboardController.stakeHolderRepo.getStakeholdersCountById(
        null,
        true
      );
      const approvedStatusId = await AdminDashboardController.statusRepo.getStatus(
        statusConfig.APPROVED,
        statusTypeConfig.STAKE_HOLDER
      );
      const approvedCount = await AdminDashboardController.stakeHolderRepo.getStatusCountById(
        null,
        approvedStatusId.id,
        true
      );
      const pendingStatusId = await AdminDashboardController.statusRepo.getStatus(
        statusConfig.PENDING_APPROVAL,
        statusTypeConfig.STAKE_HOLDER
      );
      const pendingCount = await AdminDashboardController.stakeHolderRepo.getStatusCountById(
        null,
        pendingStatusId.id,
        true
      );
      const rejectedStatusId = await AdminDashboardController.statusRepo.getStatus(
        statusConfig.REJECTED,
        statusTypeConfig.STAKE_HOLDER
      );
      const rejectedCount = await AdminDashboardController.stakeHolderRepo.getStatusCountById(
        null,
        rejectedStatusId.id,
        true
      );
      const meetingsData = await AdminDashboardController.meetingsRepo.getMeetingsById(
        null,
        true
      );
      //#region  getRiskNotes Count And Data
      const riskNotes: any = await AdminDashboardController.meetingsRepo.getMeetingRiskNotesByUserIdQuery(
        null,
        true
      );
      const highRisk = [];
      const mediumRisk = [];
      const lowRisk = [];
      if (riskNotes.length > 0) {
        for (let index = 0; index < riskNotes.length; index++) {
          if (
            riskNotes[index].meetingRiskNotesPriority ===
            meetingPriorityConfig.HIGH
          ) {
            highRisk.push(riskNotes[index]);
          }
          if (
            riskNotes[index].meetingRiskNotesPriority ===
            meetingPriorityConfig.MEDIUM
          ) {
            mediumRisk.push(riskNotes[index]);
          }
          if (
            riskNotes[index].meetingRiskNotesPriority ===
            meetingPriorityConfig.LOW
          ) {
            lowRisk.push(riskNotes[index]);
          }
        }
      }
      //#endregion

      //#region  getSupportNotes Count And Data
      const supportNotes: any = await AdminDashboardController.meetingsRepo.getMeetingSupportNotesByUserIdQuery(
        null,
        true
      );
      const highSupport = [];
      const mediumSupport = [];
      const lowSupport = [];
      if (supportNotes.length > 0) {
        for (let index = 0; index < supportNotes.length; index++) {
          if (
            supportNotes[index].meetingSupportNotesPriority ===
            meetingPriorityConfig.HIGH
          ) {
            highSupport.push(supportNotes[index]);
          }
          if (
            supportNotes[index].meetingSupportNotesPriority ===
            meetingPriorityConfig.MEDIUM
          ) {
            mediumSupport.push(supportNotes[index]);
          }
          if (
            supportNotes[index].meetingSupportNotesPriority ===
            meetingPriorityConfig.LOW
          ) {
            lowSupport.push(supportNotes[index]);
          }
        }
      }
      //#endregion

      //#endregion

      //#region Date for Stakeholders widget
      const stakeHolderList = await AdminDashboardController.stakeHolderRepo.getStakeHolderListForAdminDashboard(
        dbUser.id,
        null,
        null,
        null,
        true
      );
      const stakeHolders = [];
      for (let index = 0; index < stakeHolderList.length; index++) {
        const element: any = stakeHolderList[index];
        const getMeetings = await AdminDashboardController.meetingsRepo.getStakeholderInMeetings(
          element.stakeHolderId
        );
        let highRisk = 0;
        let mediumRisk = 0;
        let lowRisk = 0;
        let highSupport = 0;
        let mediumSupport = 0;
        let lowSupport = 0;

        for (const element of getMeetings) {
          const riskInvolvedCount: any = await AdminDashboardController.meetingsRepo.getMeetingRiskCountByIdQuery(
            null,
            element
          );
          if (riskInvolvedCount.length > 0) {
            riskInvolvedCount.map((x: any) => {
              highRisk +=
                x['meetingRiskNotesPriority'] === meetingPriorityConfig.HIGH
                  ? parseInt(x['riskTypeCount'])
                  : 0;
              mediumRisk +=
                x['meetingRiskNotesPriority'] === meetingPriorityConfig.MEDIUM
                  ? parseInt(x['riskTypeCount'])
                  : 0;
              lowRisk +=
                x['meetingRiskNotesPriority'] === meetingPriorityConfig.LOW
                  ? parseInt(x['riskTypeCount'])
                  : 0;
            });
          }
          const supportRequiredCount = await AdminDashboardController.meetingsRepo.getMeetingSupportCountByIdQuery(
            null,
            element
          );
          if (supportRequiredCount.length > 0) {
            supportRequiredCount.map((x: any) => {
              highSupport +=
                x['meetingSupportNotesPriority'] === meetingPriorityConfig.HIGH
                  ? parseInt(x['riskTypeCount'])
                  : 0;
              mediumSupport +=
                x['meetingSupportNotesPriority'] ===
                meetingPriorityConfig.MEDIUM
                  ? parseInt(x['riskTypeCount'])
                  : 0;
              lowSupport +=
                x['meetingSupportNotesPriority'] === meetingPriorityConfig.LOW
                  ? parseInt(x['riskTypeCount'])
                  : 0;
            });
          }
        }
        const obj = {
          stakeHolderId: element.stakeHolderId,
          stakeHolderfullName: element.fullName,
          organizationTypeName: element.organizationTypeName,
          organizationName: element.organizationName,
          imageUrl: element.imageUrl,
          priorityLevel: element.priorityLevel,
          highRisk: highRisk,
          mediumRisk: mediumRisk,
          lowRisk: lowRisk,
          highSupport: highSupport,
          mediumSupport: mediumSupport,
          lowSupport: lowSupport,
        };
        stakeHolders.push(obj);
      }
      //#endregion

      const resp: getDashboardDataRes = {
        stakeHoldersCreated: stakeHoldersCount.count,
        pendingApprovals: pendingCount.count,
        stakeHoldersApproved: approvedCount.count,
        stakeHolderRejected: rejectedCount.count,
        meetingsCreated: meetingsData.count,
        userMeetings: meetingsData.rows,
        riskNotes: {
          highRisk: highRisk,
          highCount: highRisk.length,
          mediumRisk: mediumRisk,
          mediumCount: mediumRisk.length,
          lowRisk: lowRisk,
          lowCount: lowRisk.length,
        },
        supportRequired: {
          highSupport: highSupport,
          highCount: highSupport.length,
          mediumSupport: mediumSupport,
          mediumCount: mediumSupport.length,
          lowSupport: lowSupport,
          lowCount: lowSupport.length,
        },
        stakeHolders: stakeHolders,
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

  //#region  getFilterDdlData

  /**
   * @description This API is used to get Filter DDL Data.
   * @param req
   * @param res
   * @returns
   */
  static async getFilterDdlData(req: Request, res: Response) {
    const taskName = 'FILTER_DDL_DATA';
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
      const orgTypeList = await AdminDashboardController.organizationTypeRepo.getOrganizationTypeList();
      const cityList = await AdminDashboardController.cityRepo.getCityList();
      const createdBy = await AdminDashboardController.userRepo.getUsersList();
      const entityList = await AdminDashboardController.entityRepo.getEntityList();
      const meetingPriorityTypeList = await AdminDashboardController.meetingsRepo.getMeetingPriorityTypeList();
      const resp = {
        organizationTypeList: orgTypeList,
        cityList: cityList,
        createdBy: createdBy,
        entityList: entityList,
        meetingPriorityTypeList: meetingPriorityTypeList,
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
      const reqObj = {
        orgId: req.body.orgId,
      };
      const orgNamesList = await AdminDashboardController.organizationNameRepo.getOrganizations(
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

  //#region filterDashboardData
  static async filterDashboardData(req: Request, res: Response) {
    const taskName = 'FILTER_DASHBOARD';
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
      // const dbUser = await AdminDashboardController.userRepo.findUserByAzureId(
      //   azureuserid.toString()
      // );
      const filterObj: filterDashboardReq = {
        meetingFrom: req.body.meetingFrom,
        meetingTo: req.body.meetingTo,
        userId: null,
        cityIds: req.body.cityIds,
        organizationTypeIds: req.body.organizationTypeIds,
        organizationIds: req.body.organizationIds,
        entityIds: req.body.entityIds,
        createdByIds: req.body.createdByIds,
        riskType: req.body.riskType,
      };
      // #region Risk Filter
      let dbUser = await AdminDashboardController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      const stakeHolderList = await AdminDashboardController.stakeHolderRepo.getStakeHolderListForAdminDashboard(
        dbUser.id,
        filterObj.organizationIds,
        filterObj.cityIds,
        filterObj.organizationTypeIds
      );
      const stakeHolders: any = [];
      if (filterObj.riskType.length > 0) {
        for (let index = 0; index < stakeHolderList.length; index++) {
          const element: any = stakeHolderList[index];
          const getMeetings = await AdminDashboardController.meetingsRepo.getStakeholderInMeetings(
            element.stakeHolderId
          );
          let isfiltered = false;
          let highRisk = 0;
          let mediumRisk = 0;
          let lowRisk = 0;
          let highSupport = 0;
          let mediumSupport = 0;
          let lowSupport = 0;
          for (const element of getMeetings) {
            const riskInvolvedCount: any = await AdminDashboardController.meetingsRepo.getMeetingRiskCountByIdQuery(
              null,
              element
            );
            if (riskInvolvedCount.length > 0) {
              riskInvolvedCount.map((x: any) => {
                if (
                  filterObj.riskType.length > 0
                    ? filterObj.riskType.includes(x['meetingRiskNotesPriority'])
                    : true
                ) {
                  isfiltered = true;
                }
                highRisk +=
                  x['meetingRiskNotesPriority'] === meetingPriorityConfig.HIGH
                    ? parseInt(x['riskTypeCount'])
                    : 0;
                mediumRisk +=
                  x['meetingRiskNotesPriority'] === meetingPriorityConfig.MEDIUM
                    ? parseInt(x['riskTypeCount'])
                    : 0;
                lowRisk +=
                  x['meetingRiskNotesPriority'] === meetingPriorityConfig.LOW
                    ? parseInt(x['riskTypeCount'])
                    : 0;
              });
            }
            const supportRequiredCount = await AdminDashboardController.meetingsRepo.getMeetingSupportCountByIdQuery(
              null,
              element
            );
            if (supportRequiredCount.length > 0) {
              supportRequiredCount.map((x: any) => {
                highSupport +=
                  x['meetingSupportNotesPriority'] ===
                  meetingPriorityConfig.HIGH
                    ? parseInt(x['riskTypeCount'])
                    : 0;
                mediumSupport +=
                  x['meetingSupportNotesPriority'] ===
                  meetingPriorityConfig.MEDIUM
                    ? parseInt(x['riskTypeCount'])
                    : 0;
                lowSupport +=
                  x['meetingSupportNotesPriority'] === meetingPriorityConfig.LOW
                    ? parseInt(x['riskTypeCount'])
                    : 0;
              });
            }
          }
          if (isfiltered) {
            const obj = {
              stakeHolderId: element.stakeHolderId,
              stakeHolderfullName: element.fullName,
              organizationTypeName: element.organizationTypeName,
              organizationName: element.organizationName,
              imageUrl: element.imageUrl,
              priorityLevel: element.priorityLevel,
              highRisk: highRisk,
              mediumRisk: mediumRisk,
              lowRisk: lowRisk,
              highSupport: highSupport,
              mediumSupport: mediumSupport,
              lowSupport: lowSupport,
            };
            stakeHolders.push(obj);
          }
        }
      } else {
        for (let index = 0; index < stakeHolderList.length; index++) {
          const element: any = stakeHolderList[index];
          const getMeetings = await AdminDashboardController.meetingsRepo.getStakeholderInMeetings(
            element.stakeHolderId
          );
          let highRisk = 0;
          let mediumRisk = 0;
          let lowRisk = 0;
          let highSupport = 0;
          let mediumSupport = 0;
          let lowSupport = 0;
          for (const element of getMeetings) {
            const riskInvolvedCount: any = await AdminDashboardController.meetingsRepo.getMeetingRiskCountByIdQuery(
              null,
              element
            );
            if (riskInvolvedCount.length > 0) {
              riskInvolvedCount.map((x: any) => {
                highRisk +=
                  x['meetingRiskNotesPriority'] === meetingPriorityConfig.HIGH
                    ? parseInt(x['riskTypeCount'])
                    : 0;
                mediumRisk +=
                  x['meetingRiskNotesPriority'] === meetingPriorityConfig.MEDIUM
                    ? parseInt(x['riskTypeCount'])
                    : 0;
                lowRisk +=
                  x['meetingRiskNotesPriority'] === meetingPriorityConfig.LOW
                    ? parseInt(x['riskTypeCount'])
                    : 0;
              });
            }
            const supportRequiredCount = await AdminDashboardController.meetingsRepo.getMeetingSupportCountByIdQuery(
              null,
              element
            );
            if (supportRequiredCount.length > 0) {
              supportRequiredCount.map((x: any) => {
                highSupport +=
                  x['meetingSupportNotesPriority'] ===
                  meetingPriorityConfig.HIGH
                    ? parseInt(x['riskTypeCount'])
                    : 0;
                mediumSupport +=
                  x['meetingSupportNotesPriority'] ===
                  meetingPriorityConfig.MEDIUM
                    ? parseInt(x['riskTypeCount'])
                    : 0;
                lowSupport +=
                  x['meetingSupportNotesPriority'] === meetingPriorityConfig.LOW
                    ? parseInt(x['riskTypeCount'])
                    : 0;
              });
            }
          }
          const obj = {
            stakeHolderId: element.stakeHolderId,
            stakeHolderfullName: element.fullName,
            organizationTypeName: element.organizationTypeName,
            organizationName: element.organizationName,
            imageUrl: element.imageUrl,
            priorityLevel: element.priorityLevel,
            highRisk: highRisk,
            mediumRisk: mediumRisk,
            lowRisk: lowRisk,
            highSupport: highSupport,
            mediumSupport: mediumSupport,
            lowSupport: lowSupport,
          };
          stakeHolders.push(obj);
        }
      }
      dbUser = null;
      //#endregion

      const filterMeeting = await AdminDashboardController.meetingsRepo.filterMeetings(
        filterObj
      );
      const filterStakeholders = await AdminDashboardController.stakeHolderRepo.filterStakeholder(
        filterObj
      );
      if (filterMeeting.count <= 0) {
        const approvedStatusId = await AdminDashboardController.statusRepo.getStatus(
          statusConfig.APPROVED,
          statusTypeConfig.STAKE_HOLDER
        );
        const pendingStatusId = await AdminDashboardController.statusRepo.getStatus(
          statusConfig.PENDING_APPROVAL,
          statusTypeConfig.STAKE_HOLDER
        );
        const rejectedStatusId = await AdminDashboardController.statusRepo.getStatus(
          statusConfig.REJECTED,
          statusTypeConfig.STAKE_HOLDER
        );
        const approvedCount = await AdminDashboardController.stakeHolderRepo.getStatusCountByStakeHolderId(
          null,
          approvedStatusId.id,
          filterStakeholders.rows.map((user: any) => user.id).map(Number)
        );
        const pendingCount = await AdminDashboardController.stakeHolderRepo.getStatusCountByStakeHolderId(
          null,
          pendingStatusId.id,
          filterStakeholders.rows.map((user: any) => user.id).map(Number)
        );
        const rejectedCount = await AdminDashboardController.stakeHolderRepo.getStatusCountByStakeHolderId(
          null,
          rejectedStatusId.id,
          filterStakeholders.rows.map((user: any) => user.id).map(Number)
        );
        const resp: getDashboardDataRes = {
          stakeHoldersCreated: filterStakeholders?.count,
          pendingApprovals: pendingCount.count,
          stakeHoldersApproved: approvedCount.count,
          stakeHolderRejected: rejectedCount.count,
          meetingsCreated: 0,
          userMeetings: [],
          riskNotes: {
            highRisk: [],
            highCount: 0,
            mediumRisk: [],
            mediumCount: 0,
            lowRisk: [],
            lowCount: 0,
          },
          supportRequired: {
            highSupport: [],
            highCount: 0,
            mediumSupport: [],
            mediumCount: 0,
            lowSupport: [],
            lowCount: 0,
          },
          stakeHolders: stakeHolders,
        };
        const success = new SuccessResponse(res, 'success', resp);
        return success.send();
      }
      if (filterMeeting.count > 0) {
        //#region  getRiskNotes Count And Data
        const riskNotes: any = await AdminDashboardController.meetingsRepo.filterMeetingRiskNotesByUserIdQuery(
          null,
          filterMeeting.rows.map((meeting: any) => meeting.id).map(Number)
        );
        const highRisk = [];
        const mediumRisk = [];
        const lowRisk = [];
        if (riskNotes.length > 0) {
          for (let index = 0; index < riskNotes.length; index++) {
            if (
              riskNotes[index].meetingRiskNotesPriority ===
              meetingPriorityConfig.HIGH
            ) {
              highRisk.push(riskNotes[index]);
            }
            if (
              riskNotes[index].meetingRiskNotesPriority ===
              meetingPriorityConfig.MEDIUM
            ) {
              mediumRisk.push(riskNotes[index]);
            }
            if (
              riskNotes[index].meetingRiskNotesPriority ===
              meetingPriorityConfig.LOW
            ) {
              lowRisk.push(riskNotes[index]);
            }
          }
        }
        //#endregion

        //#region  getSupportNotes Count And Data
        const supportNotes: any = await AdminDashboardController.meetingsRepo.filterMeetingSupportNotesByUserIdQuery(
          null,
          filterMeeting.rows.map((meeting: any) => meeting.id).map(Number)
        );
        const highSupport = [];
        const mediumSupport = [];
        const lowSupport = [];
        if (supportNotes.length > 0) {
          for (let index = 0; index < supportNotes.length; index++) {
            if (
              supportNotes[index].meetingSupportNotesPriority ===
              meetingPriorityConfig.HIGH
            ) {
              highSupport.push(supportNotes[index]);
            }
            if (
              supportNotes[index].meetingSupportNotesPriority ===
              meetingPriorityConfig.MEDIUM
            ) {
              mediumSupport.push(supportNotes[index]);
            }
            if (
              supportNotes[index].meetingSupportNotesPriority ===
              meetingPriorityConfig.LOW
            ) {
              lowSupport.push(supportNotes[index]);
            }
          }
        }
        //#endregion

        const approvedStatusId = await AdminDashboardController.statusRepo.getStatus(
          statusConfig.APPROVED,
          statusTypeConfig.STAKE_HOLDER
        );
        const pendingStatusId = await AdminDashboardController.statusRepo.getStatus(
          statusConfig.PENDING_APPROVAL,
          statusTypeConfig.STAKE_HOLDER
        );
        const rejectedStatusId = await AdminDashboardController.statusRepo.getStatus(
          statusConfig.REJECTED,
          statusTypeConfig.STAKE_HOLDER
        );
        const approvedCount = await AdminDashboardController.stakeHolderRepo.getStatusCountByStakeHolderId(
          null,
          approvedStatusId.id,
          filterStakeholders.rows.map((user: any) => user.id).map(Number)
        );
        const pendingCount = await AdminDashboardController.stakeHolderRepo.getStatusCountByStakeHolderId(
          null,
          pendingStatusId.id,
          filterStakeholders.rows.map((user: any) => user.id).map(Number)
        );
        const rejectedCount = await AdminDashboardController.stakeHolderRepo.getStatusCountByStakeHolderId(
          null,
          rejectedStatusId.id,
          filterStakeholders.rows.map((user: any) => user.id).map(Number)
        );
        const resp: getDashboardDataRes = {
          stakeHoldersCreated: filterStakeholders?.count,
          pendingApprovals: pendingCount.count,
          stakeHoldersApproved: approvedCount.count,
          stakeHolderRejected: rejectedCount.count,
          meetingsCreated: filterMeeting.count,
          userMeetings: filterMeeting.rows,
          riskNotes: {
            highRisk: highRisk,
            highCount: highRisk.length,
            mediumRisk: mediumRisk,
            mediumCount: mediumRisk.length,
            lowRisk: lowRisk,
            lowCount: lowRisk.length,
          },
          supportRequired: {
            highSupport: highSupport,
            highCount: highSupport.length,
            mediumSupport: mediumSupport,
            mediumCount: mediumSupport.length,
            lowSupport: lowSupport,
            lowCount: lowSupport.length,
          },
          stakeHolders: stakeHolders,
        };
        const success = new SuccessResponse(res, 'success', resp);
        return success.send();
      }
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
