import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {StakeHolderRepository} from '../../repositories/stakeholder.repo';
import {meetingsRepository} from '../../repositories/meetings.repo';
import {StatusRepository} from '../../repositories/status.repo';
import {
  statusConfig,
  statusTypeConfig,
  meetingPriorityConfig,
} from '../../config/app';
import {UserRepository} from '../../repositories/users.repo';
import {
  getDashboardDataRes,
  filterDashboardReq,
} from '../../business_objects/manager-dashboard';
import {OrganizationTypeRepository} from '../../repositories/organization-type.repo';
import {CityRepository} from '../../repositories/city.repo';
import {OrganizationNameRepository} from '../../repositories/organization-name.repo';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
  //   NoContentResponse,
} from '../../util';
export class ManagerDashboardController {
  private static stakeHolderRepo = new StakeHolderRepository();
  private static meetingsRepo = new meetingsRepository();
  private static statusRepo = new StatusRepository();
  private static userRepo = new UserRepository();
  private static organizationTypeRepo = new OrganizationTypeRepository();
  private static cityRepo = new CityRepository();
  private static organizationNameRepo = new OrganizationNameRepository();

  //#region  getDashboardData
  static async getDashboardData(req: Request, res: Response) {
    const taskName = 'DASHBOARD_DATA';
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
      const dbUser = await ManagerDashboardController.userRepo.findUserByAzureId(
        req.params.userId
      );
      if (!dbUser) {
        logger.info(`${taskName}_USER_NOT_FOUND`, req.params);
        const noResult = new BadRequestResponse(res, 'User Not Found');
        return noResult.send();
      }
      const stakeHoldersCount = await ManagerDashboardController.stakeHolderRepo.getStakeholdersCountById(
        dbUser.id,
        true
      );
      const approvedStatusId = await ManagerDashboardController.statusRepo.getStatus(
        statusConfig.APPROVED,
        statusTypeConfig.STAKE_HOLDER
      );
      const approvedCount = await ManagerDashboardController.stakeHolderRepo.getStatusCountById(
        dbUser.id,
        approvedStatusId.id,
        true
      );
      const pendingStatusId = await ManagerDashboardController.statusRepo.getStatus(
        statusConfig.PENDING_APPROVAL,
        statusTypeConfig.STAKE_HOLDER
      );
      const pendingCount = await ManagerDashboardController.stakeHolderRepo.getStatusCountById(
        dbUser.id,
        pendingStatusId.id,
        true
      );
      const rejectedStatusId = await ManagerDashboardController.statusRepo.getStatus(
        statusConfig.REJECTED,
        statusTypeConfig.STAKE_HOLDER
      );
      const rejectedCount = await ManagerDashboardController.stakeHolderRepo.getStatusCountById(
        dbUser.id,
        rejectedStatusId.id,
        true
      );
      const meetingsData = await ManagerDashboardController.meetingsRepo.getMeetingsById(
        dbUser.id,
        true
      );
      //#region  getRiskNotes Count And Data
      const riskNotes: any = await ManagerDashboardController.meetingsRepo.getMeetingRiskNotesByUserIdQuery(
        dbUser.id,
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
      const supportNotes: any = await ManagerDashboardController.meetingsRepo.getMeetingSupportNotesByUserIdQuery(
        dbUser.id,
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
      const dbUser = await ManagerDashboardController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      const filterObj: filterDashboardReq = {
        meetingFrom: req.body.meetingFrom,
        meetingTo: req.body.meetingTo,
        userId: dbUser.id,
        cityIds: req.body.cityIds,
        organizationTypeIds: req.body.organizationTypeIds,
        organizationIds: req.body.organizationIds,
      };
      const filterMeeting = await ManagerDashboardController.meetingsRepo.filterMeetings(
        filterObj
      );
      const filterStakeholders = await ManagerDashboardController.stakeHolderRepo.filterStakeholder(
        filterObj
      );
      if (filterMeeting.count <= 0) {
        const approvedStatusId = await ManagerDashboardController.statusRepo.getStatus(
          statusConfig.APPROVED,
          statusTypeConfig.STAKE_HOLDER
        );
        const pendingStatusId = await ManagerDashboardController.statusRepo.getStatus(
          statusConfig.PENDING_APPROVAL,
          statusTypeConfig.STAKE_HOLDER
        );
        const rejectedStatusId = await ManagerDashboardController.statusRepo.getStatus(
          statusConfig.REJECTED,
          statusTypeConfig.STAKE_HOLDER
        );
        let approvedCount: any = {count: 0, rows: []};
        let pendingCount: any = {count: 0, rows: []};
        let rejectedCount: any = {count: 0, rows: []};
        if (filterStakeholders?.count > 0) {
          approvedCount = await ManagerDashboardController.stakeHolderRepo.getStatusCountByStakeHolderId(
            dbUser.id,
            approvedStatusId.id,
            filterStakeholders?.rows?.map((user: any) => user.id).map(Number)
          );
          pendingCount = await ManagerDashboardController.stakeHolderRepo.getStatusCountByStakeHolderId(
            dbUser.id,
            pendingStatusId.id,
            filterStakeholders?.rows?.map((user: any) => user.id).map(Number)
          );
          rejectedCount = await ManagerDashboardController.stakeHolderRepo.getStatusCountByStakeHolderId(
            dbUser.id,
            rejectedStatusId.id,
            filterStakeholders?.rows?.map((user: any) => user.id).map(Number)
          );
        } else if (
          filterStakeholders.count === 0 &&
          filterObj.cityIds.length === 0 &&
          filterObj.organizationIds.length === 0 &&
          filterObj.organizationTypeIds.length === 0
        ) {
          approvedCount = await ManagerDashboardController.stakeHolderRepo.getStatusCountById(
            dbUser.id,
            approvedStatusId.id
          );
          pendingCount = await ManagerDashboardController.stakeHolderRepo.getStatusCountById(
            dbUser.id,
            pendingStatusId.id
          );
          rejectedCount = await ManagerDashboardController.stakeHolderRepo.getStatusCountById(
            dbUser.id,
            rejectedStatusId.id
          );
        }
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
        };
        const success = new SuccessResponse(res, 'success', resp);
        return success.send();
      }

      if (filterMeeting.count > 0) {
        //#region  getRiskNotes Count And Data
        const riskNotes: any = await ManagerDashboardController.meetingsRepo.filterMeetingRiskNotesByUserIdQuery(
          dbUser.id,
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
        const supportNotes: any = await ManagerDashboardController.meetingsRepo.filterMeetingSupportNotesByUserIdQuery(
          dbUser.id,
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
        const approvedStatusId = await ManagerDashboardController.statusRepo.getStatus(
          statusConfig.APPROVED,
          statusTypeConfig.STAKE_HOLDER
        );
        const pendingStatusId = await ManagerDashboardController.statusRepo.getStatus(
          statusConfig.PENDING_APPROVAL,
          statusTypeConfig.STAKE_HOLDER
        );
        const rejectedStatusId = await ManagerDashboardController.statusRepo.getStatus(
          statusConfig.REJECTED,
          statusTypeConfig.STAKE_HOLDER
        );
        let approvedCount: any = {count: 0, rows: []};
        let pendingCount: any = {count: 0, rows: []};
        let rejectedCount: any = {count: 0, rows: []};
        if (filterStakeholders?.count > 0) {
          approvedCount = await ManagerDashboardController.stakeHolderRepo.getStatusCountByStakeHolderId(
            dbUser.id,
            approvedStatusId.id,
            filterStakeholders?.rows?.map((user: any) => user.id).map(Number)
          );
          pendingCount = await ManagerDashboardController.stakeHolderRepo.getStatusCountByStakeHolderId(
            dbUser.id,
            pendingStatusId.id,
            filterStakeholders?.rows?.map((user: any) => user.id).map(Number)
          );
          rejectedCount = await ManagerDashboardController.stakeHolderRepo.getStatusCountByStakeHolderId(
            dbUser.id,
            rejectedStatusId.id,
            filterStakeholders?.rows?.map((user: any) => user.id).map(Number)
          );
        } else if (
          filterStakeholders.count === 0 &&
          filterObj.cityIds.length === 0 &&
          filterObj.organizationIds.length === 0 &&
          filterObj.organizationTypeIds.length === 0
        ) {
          approvedCount = await ManagerDashboardController.stakeHolderRepo.getStatusCountById(
            dbUser.id,
            approvedStatusId.id
          );
          pendingCount = await ManagerDashboardController.stakeHolderRepo.getStatusCountById(
            dbUser.id,
            pendingStatusId.id
          );
          rejectedCount = await ManagerDashboardController.stakeHolderRepo.getStatusCountById(
            dbUser.id,
            rejectedStatusId.id
          );
        }
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
      const orgTypeList = await ManagerDashboardController.organizationTypeRepo.getOrganizationTypeList();
      const cityList = await ManagerDashboardController.cityRepo.getCityList();
      const resp = {
        organizationTypeList: orgTypeList,
        cityList: cityList,
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
      const orgNamesList = await ManagerDashboardController.organizationNameRepo.getOrganizations(
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
}
