import sequelize from '../config/sequelize';
import {QueryTypes, Op} from 'sequelize';
import {
  getStakeholderForMeetingsCreationReq,
  createMeetingReq,
} from '../business_objects/meeting';
import {meetingModel} from '../models/meeting.model';
import {stakeHolderProvider} from '../sql-provider/getStakeholdersList';
import {meetingPriorityTypeModel} from '../models/meetingPriorityType.model';
import {logger} from '../util/logger';
import {stakeHolderMeetingsModel} from '../models/stakeHolderMeetings.model';
import {meetingRiskNotesModel} from '../models/meetingRiskNotes.model';
import {meetingSupportNotesModel} from '../models/meetingSupportNotes.model';
import {meetingFilesModel} from '../models/meetingFiles.model';
import {meetingOrgNamesModel} from '../models/meetingOrgNames.model';
import {meetingOrgTypesModel} from '../models/meetingOrgTypes.model';
import {meetingsProvider} from '../sql-provider/getMeetingsListing';
import {filterMeetingReq} from '../business_objects/meeting';
import {filterDashboardReq} from '../business_objects/admin-dashboard';
import {filterByDateObj} from '../business_objects/admin-dashboard';
import {attendeeMeetingsModel} from '../models/attendeeMeetings.model';
export class meetingsRepository {
  //#region getMeetings
  async getMeetings() {
    const getAllMeetings = meetingModel.findAll();
    return getAllMeetings;
  }
  //#endregion

  //#region getStakeHolderForMeetingCreation
  async getStakeHolderForMeetingCreation(
    filterObj: getStakeholderForMeetingsCreationReq
  ) {
    let getStakeholdersQuery =
      stakeHolderProvider.getStakeholdersForMeetingsCreation(filterObj);
    getStakeholdersQuery = `${getStakeholdersQuery} AND "stakeHolder"."isActive" = 'true' ORDER BY "stakeHolder"."lastModifiedDate" DESC`;
    const getStakeholders = await sequelize.query(getStakeholdersQuery, {
      type: QueryTypes.SELECT,
    });
    return getStakeholders;
  }
  //#endregion

  //#region getMeetingPriorityType
  public static async getMeetingPriorityType(code: string) {
    const meetingPriority = await meetingPriorityTypeModel.findOne({
      where: {code: code},
    });
    return meetingPriority;
  }
  //#endregion

  //#region getMeetingPriorityTypeList
  async getMeetingPriorityTypeList() {
    const meetingPriorityList = await meetingPriorityTypeModel.findAll();
    return meetingPriorityList;
  }
  //#endregion

  //#region createMeeting
  async createMeeting(meetingObj: createMeetingReq) {
    const t = await sequelize.transaction();
    const taskName = 'CREATE_MEETING';
    logger.info(`${taskName}`, 'Transaction started');
    try {
      let createMeetingResult: any;
      //#region Create Meetings
      if (meetingObj?.meetingId) {
        createMeetingResult = await meetingModel.findOne({
          where: {
            id: meetingObj.meetingId,
          },
        });
        if (!createMeetingResult) {
          return null;
        } else {
          await createMeetingResult.update(
            {
              meetingDate: meetingObj.meetingDate,
              meetingStartTime: meetingObj.meetingStartTime,
              meetingEndTime: meetingObj.meetingEndTime,
              meetingAgenda: meetingObj?.meetingAgenda,
              oppurtunities: meetingObj?.oppurtunities,
              observations: meetingObj?.observations,
              lastModifiedDate: new Date().toISOString(),
              lastModifiedBy: meetingObj.userId,
              isDraft: meetingObj.isDraft,
            },
            {
              transaction: t,
            }
          );
        }
      } else {
        createMeetingResult = await meetingModel.create(
          {
            meetingDate: meetingObj.meetingDate,
            meetingStartTime: meetingObj.meetingStartTime,
            meetingEndTime: meetingObj.meetingEndTime,
            meetingAgenda: meetingObj?.meetingAgenda,
            oppurtunities: meetingObj?.oppurtunities,
            observations: meetingObj?.observations,
            lastModifiedDate: new Date().toISOString(),
            lastModifiedBy: meetingObj.userId,
            isDraft: meetingObj.isDraft,
          },
          {transaction: t}
        );
      }

      //#endregion

      //#region  Create StakeHolder Meetings
      if (meetingObj?.meetingId) {
        await stakeHolderMeetingsModel.destroy({
          where: {
            meetingId: meetingObj?.meetingId,
          },
          transaction: t,
        });
      }
      if (meetingObj.stakeHolderIds && meetingObj.stakeHolderIds.length > 0) {
        const stakeHolderIds = [];
        for (let index = 0; index < meetingObj.stakeHolderIds.length; index++) {
          const element = meetingObj.stakeHolderIds[index];
          const obj = {
            meetingId: createMeetingResult.id,
            stakeHolderId: element,
            lastModifiedDate: new Date().toISOString(),
            lastModifiedBy: meetingObj.userId,
          };
          stakeHolderIds.push(obj);
        }
        await stakeHolderMeetingsModel.bulkCreate(stakeHolderIds, {
          transaction: t,
        });
      }
      //#endregion

      //#region add Attendees to Meeting
      if (meetingObj?.meetingId) {
        await attendeeMeetingsModel.destroy({
          where: {
            meetingId: meetingObj?.meetingId,
          },
          transaction: t,
        });
      }
      if (meetingObj.attendeesIds && meetingObj.attendeesIds.length > 0) {
        const attendeesIds = [];
        for (let index = 0; index < meetingObj.attendeesIds.length; index++) {
          const element = meetingObj.attendeesIds[index];
          const obj = {
            meetingId: createMeetingResult.id,
            attendeeId: element,
            createdBy: meetingObj.userId,
            updatedBy: meetingObj.userId,
          };
          attendeesIds.push(obj);
        }
        await attendeeMeetingsModel.bulkCreate(attendeesIds, {
          transaction: t,
        });
      }
      //#endregion
      //#region  Risk Notes Creation
      if (meetingObj?.meetingId) {
        await meetingRiskNotesModel.destroy({
          where: {
            meetingId: meetingObj?.meetingId,
          },
          transaction: t,
        });
      }
      if (meetingObj.riskNotes && meetingObj.riskNotes.length > 0) {
        const riskNotes = [];
        for (let index = 0; index < meetingObj.riskNotes.length; index++) {
          const element = meetingObj.riskNotes[index];
          const meetingPriorityId: any =
            await meetingsRepository.getMeetingPriorityType(element.type);
          const obj = {
            meetingId: createMeetingResult.id,
            meetingPriorityId: meetingPriorityId.id,
            notes: element.text,
            lastModifiedBy: meetingObj.userId,
            lastModifiedDate: new Date().toISOString(),
          };
          riskNotes.push(obj);
        }
        await meetingRiskNotesModel.bulkCreate(riskNotes, {
          transaction: t,
        });
      }
      //#endregion

      //#region Support Notes Creation
      if (meetingObj?.meetingId) {
        await meetingSupportNotesModel.destroy({
          where: {
            meetingId: meetingObj?.meetingId,
          },
          transaction: t,
        });
      }
      if (meetingObj.supportNotes && meetingObj.supportNotes.length > 0) {
        const supportNotes = [];
        for (let index = 0; index < meetingObj.supportNotes.length; index++) {
          const element = meetingObj.supportNotes[index];
          const meetingPriorityId: any =
            await meetingsRepository.getMeetingPriorityType(element.type);
          const obj = {
            meetingId: createMeetingResult.id,
            meetingPriorityId: meetingPriorityId.id,
            notes: element.text,
            lastModifiedBy: meetingObj.userId,
            lastModifiedDate: new Date().toISOString(),
          };
          supportNotes.push(obj);
        }
        await meetingSupportNotesModel.bulkCreate(supportNotes, {
          transaction: t,
        });
      }
      //#endregion

      //#region Meeting Organization Names Creation
      if (meetingObj?.meetingId) {
        await meetingOrgNamesModel.destroy({
          where: {
            meetingId: meetingObj?.meetingId,
          },
          transaction: t,
        });
      }
      if (meetingObj.organizationIds && meetingObj.organizationIds.length > 0) {
        const organizationIds = [];
        for (
          let index = 0;
          index < meetingObj.organizationIds.length;
          index++
        ) {
          const element = meetingObj.organizationIds[index];
          const obj = {
            meetingId: createMeetingResult.id,
            orgNameId: element,
          };
          organizationIds.push(obj);
        }
        await meetingOrgNamesModel.bulkCreate(organizationIds, {
          transaction: t,
        });
      }
      //#endregion

      //#region Meeting Organization Types Creation
      if (meetingObj?.meetingId) {
        await meetingOrgTypesModel.destroy({
          where: {
            meetingId: meetingObj?.meetingId,
          },
          transaction: t,
        });
      }
      if (
        meetingObj.organizationTypeIds &&
        meetingObj.organizationTypeIds.length > 0
      ) {
        const organizationTypeIds = [];
        for (
          let index = 0;
          index < meetingObj.organizationTypeIds.length;
          index++
        ) {
          const element = meetingObj.organizationTypeIds[index];
          const obj = {
            meetingId: createMeetingResult.id,
            orgTypeId: element,
          };
          organizationTypeIds.push(obj);
        }
        await meetingOrgTypesModel.bulkCreate(organizationTypeIds, {
          transaction: t,
        });
      }
      //#endregion

      //#region  File Upload
      if (meetingObj?.meetingId) {
        await meetingFilesModel.destroy({
          where: {
            meetingId: meetingObj?.meetingId,
          },
          transaction: t,
        });
      }
      if (meetingObj.fileUpload && meetingObj.fileUpload.length > 0) {
        const fileUpload = [];
        for (let index = 0; index < meetingObj.fileUpload.length; index++) {
          const element = meetingObj.fileUpload[index];
          const obj = {
            meetingId: createMeetingResult.id,
            fileName: element.fileName,
            fileType: element.fileType,
            fileUrl: element.fileUrl,
            lastModifiedDate: new Date().toISOString(),
            lastModifiedBy: meetingObj.userId,
          };
          fileUpload.push(obj);
        }
        await meetingFilesModel.bulkCreate(fileUpload, {
          transaction: t,
        });
      }
      //#endregion
      //* commit transaction..
      await t.commit();
      logger.info(`${taskName}`, 'Transaction successfully committed');
      return createMeetingResult;
    } catch (error) {
      await t.rollback();
      logger.info(`${taskName}_ERROR_TRANSACTION_ROLLBACK`, error);
      throw error;
    }
  }
  //#endregion

  //#region getMeetingsById
  async getMeetingsById(
    userId: number | null,
    isFilteredForCurrentYear?: boolean | null
  ) {
    if (isFilteredForCurrentYear) {
      if (!userId) {
        const meetingsData = await meetingModel.findAndCountAll({
          where: {
            meetingDate: {
              [Op.lte]: new Date(new Date().getFullYear(), 11, 31),
              [Op.gte]: new Date(new Date().getFullYear(), 0, 1),
            },
          },
        });
        return meetingsData;
      }
      const meetingsData = await meetingModel.findAndCountAll({
        where: {
          lastModifiedBy: userId,
          meetingDate: {
            [Op.lte]: new Date(new Date().getFullYear(), 11, 31),
            [Op.gte]: new Date(new Date().getFullYear(), 0, 1),
          },
        },
      });
      return meetingsData;
    } else {
      if (!userId) {
        const meetingsData = await meetingModel.findAndCountAll();
        return meetingsData;
      }
      const meetingsData = await meetingModel.findAndCountAll({
        where: {lastModifiedBy: userId},
      });
      return meetingsData;
    }
  }
  //#endregion

  //#region  getMeetingPriorityId
  async getMeetingPriorityId(code: string) {
    const meetingPriority = await meetingPriorityTypeModel.findOne({
      where: {code: code},
    });
    return meetingPriority;
  }
  //#endregion

  //#region getMeetingRiskNotesByUserIdQuery
  async getMeetingRiskNotesByUserIdQuery(
    userId: number | null,
    isFilteredForCurrentYear?: boolean | null
  ) {
    if (isFilteredForCurrentYear) {
      if (!userId) {
        let getMeetingRiskNotesQuery =
          meetingsProvider.getMeetingRiskNotesForAdmin();
        // eslint-disable-next-line quotes
        if (getMeetingRiskNotesQuery.search('WHERE') === -1) {
          getMeetingRiskNotesQuery = `${getMeetingRiskNotesQuery} WHERE EXTRACT(year from "meeting"."meetingDate") = EXTRACT(YEAR FROM CURRENT_DATE)`;
        } else {
          getMeetingRiskNotesQuery = `${getMeetingRiskNotesQuery} AND EXTRACT(year from "meeting"."meetingDate") = EXTRACT(YEAR FROM CURRENT_DATE)`;
        }
        const getMeetingRiskNotes = await sequelize.query(
          getMeetingRiskNotesQuery,
          {
            type: QueryTypes.SELECT,
          }
        );
        return getMeetingRiskNotes;
      }
      let getMeetingRiskNotesQuery =
        meetingsProvider.getMeetingRiskNotesByUserId(userId);
      // eslint-disable-next-line quotes
      if (getMeetingRiskNotesQuery.search('WHERE') === -1) {
        getMeetingRiskNotesQuery = `${getMeetingRiskNotesQuery} WHERE EXTRACT(year from "meeting"."meetingDate") = EXTRACT(YEAR FROM CURRENT_DATE)`;
      } else {
        getMeetingRiskNotesQuery = `${getMeetingRiskNotesQuery} AND EXTRACT(year from "meeting"."meetingDate") = EXTRACT(YEAR FROM CURRENT_DATE)`;
      }
      const getMeetingRiskNotes = await sequelize.query(
        getMeetingRiskNotesQuery,
        {
          type: QueryTypes.SELECT,
        }
      );
      return getMeetingRiskNotes;
    } else {
      if (!userId) {
        const getMeetingRiskNotesQuery =
          meetingsProvider.getMeetingRiskNotesForAdmin();
        const getMeetingRiskNotes = await sequelize.query(
          getMeetingRiskNotesQuery,
          {
            type: QueryTypes.SELECT,
          }
        );
        return getMeetingRiskNotes;
      }
      const getMeetingRiskNotesQuery =
        meetingsProvider.getMeetingRiskNotesByUserId(userId);
      const getMeetingRiskNotes = await sequelize.query(
        getMeetingRiskNotesQuery,
        {
          type: QueryTypes.SELECT,
        }
      );
      return getMeetingRiskNotes;
    }
  }
  //#endregion

  //#region filterMeetingRiskNotesByUserIdQuery
  async filterMeetingRiskNotesByUserIdQuery(
    userId: number | null,
    meetingId: Array<number>
  ) {
    let getMeetingRiskNotesQuery =
      meetingsProvider.getMeetingRiskNotesByUserId(userId);
    getMeetingRiskNotesQuery = `${getMeetingRiskNotesQuery} AND "meetingRiskNotes"."meetingId" in (${meetingId.join(
      ','
    )})`;
    const getMeetingRiskNotes = await sequelize.query(
      getMeetingRiskNotesQuery,
      {
        type: QueryTypes.SELECT,
      }
    );
    return getMeetingRiskNotes;
  }
  //#endregion

  //#region  getMeetingsRiskCountById
  // async getMeetingsRiskCountById(userId: number, priorityId: number) {
  //   const meetingRiskCount = await meetingRiskNotesModel.findAndCountAll({
  //     where: {meetingPriorityId: priorityId, lastModifiedBy: userId},
  //   });
  //   return meetingRiskCount;
  // }
  //#endregion

  //#region  getMeetingsRiskCountByMeetingId
  async meetingRiskByMeetingId(
    userId: number,
    priorityId: number,
    meetingIds: Array<number>
  ) {
    const meetingRiskCount = await meetingRiskNotesModel.findAndCountAll({
      where: {
        meetingPriorityId: priorityId,
        lastModifiedBy: userId,
        meetingId: meetingIds,
      },
    });
    return meetingRiskCount;
  }
  //#endregion

  //#region getMeetingSupportNotesByUserIdQuery
  async getMeetingSupportNotesByUserIdQuery(
    userId: number | null,
    isFilteredForCurrentYear?: boolean | null
  ) {
    if (isFilteredForCurrentYear) {
      if (!userId) {
        let getMeetingSupportNotesQuery =
          meetingsProvider.getMeetingSupportNotesForAdmin();
        // eslint-disable-next-line quotes
        if (getMeetingSupportNotesQuery.search('WHERE') === -1) {
          getMeetingSupportNotesQuery = `${getMeetingSupportNotesQuery} WHERE EXTRACT(year from "meeting"."meetingDate") = EXTRACT(YEAR FROM CURRENT_DATE)`;
        } else {
          getMeetingSupportNotesQuery = `${getMeetingSupportNotesQuery} AND EXTRACT(year from "meeting"."meetingDate") = EXTRACT(YEAR FROM CURRENT_DATE)`;
        }
        const getMeetingSupportNotes = await sequelize.query(
          getMeetingSupportNotesQuery,
          {
            type: QueryTypes.SELECT,
          }
        );
        return getMeetingSupportNotes;
      }
      let getMeetingSupportNotesQuery =
        meetingsProvider.getMeetingSupportNotesByUserId(userId);
      // eslint-disable-next-line quotes
      if (getMeetingSupportNotesQuery.search('WHERE') === -1) {
        getMeetingSupportNotesQuery = `${getMeetingSupportNotesQuery} WHERE EXTRACT(year from "meeting"."meetingDate") = EXTRACT(YEAR FROM CURRENT_DATE)`;
      } else {
        getMeetingSupportNotesQuery = `${getMeetingSupportNotesQuery} AND EXTRACT(year from "meeting"."meetingDate") = EXTRACT(YEAR FROM CURRENT_DATE)`;
      }
      const getMeetingSupportNotes = await sequelize.query(
        getMeetingSupportNotesQuery,
        {
          type: QueryTypes.SELECT,
        }
      );
      return getMeetingSupportNotes;
    } else {
      if (!userId) {
        const getMeetingSupportNotesQuery =
          meetingsProvider.getMeetingSupportNotesForAdmin();
        const getMeetingSupportNotes = await sequelize.query(
          getMeetingSupportNotesQuery,
          {
            type: QueryTypes.SELECT,
          }
        );
        return getMeetingSupportNotes;
      }
      const getMeetingSupportNotesQuery =
        meetingsProvider.getMeetingSupportNotesByUserId(userId);
      const getMeetingSupportNotes = await sequelize.query(
        getMeetingSupportNotesQuery,
        {
          type: QueryTypes.SELECT,
        }
      );
      return getMeetingSupportNotes;
    }
  }
  //#endregion

  //#region filterMeetingSupportNotesByUserIdQuery
  async filterMeetingSupportNotesByUserIdQuery(
    userId: number,
    meetingId: Array<number>
  ) {
    let getMeetingSupportNotesQuery =
      meetingsProvider.getMeetingSupportNotesByUserId(userId);
    getMeetingSupportNotesQuery = `${getMeetingSupportNotesQuery} AND "meetingSupportNotes"."meetingId" in (${meetingId.join(
      ','
    )})`;
    const getMeetingSupportNotes = await sequelize.query(
      getMeetingSupportNotesQuery,
      {
        type: QueryTypes.SELECT,
      }
    );
    return getMeetingSupportNotes;
  }
  //#endregion

  //#region  getMeetingsSupportCountById
  // async getMeetingsSupportCountById(userId: number, priorityId: number) {
  //   const meetingSupportCount = await meetingSupportNotesModel.findAndCountAll({
  //     where: {meetingPriorityId: priorityId, lastModifiedBy: userId},
  //   });
  //   return meetingSupportCount;
  // }
  //#endregion

  //#region  getMeetingsSupportByMeetingId
  async meetingSupportByMeetingId(
    userId: number,
    priorityId: number,
    meetingIds: Array<number>
  ) {
    const meetingSupportCount = await meetingSupportNotesModel.findAndCountAll({
      where: {
        meetingPriorityId: priorityId,
        lastModifiedBy: userId,
        meetingId: meetingIds,
      },
    });
    return meetingSupportCount;
  }
  //#endregion

  //#region getMeetingsByIdQuery
  async getMeetingsByIdQuery(userId: number | null) {
    let getMeetingQuery = meetingsProvider.getMeetingsByUserId();
    if (!userId) {
      getMeetingQuery = `${getMeetingQuery} ORDER BY "meeting"."lastModifiedDate" DESC`;
    } else if (userId) {
      getMeetingQuery = `${getMeetingQuery} WHERE "meeting"."lastModifiedBy" = '${userId}' ORDER BY "meeting"."lastModifiedDate" DESC`;
    }

    const getMeetings = await sequelize.query(getMeetingQuery, {
      type: QueryTypes.SELECT,
    });
    return getMeetings;
  }
  //#endregion

  //#region getMeetingsByIdQuery
  async exportExcelByIdQuery(
    userId: number | null,
    filterObj: filterByDateObj
  ) {
    let getMeetingQuery = meetingsProvider.exportExcelByUserId();
    // if (!userId) {
    //   getMeetingQuery = `${getMeetingQuery} ORDER BY "meeting"."lastModifiedDate" DESC`;
    // } else if (userId) {
    //   getMeetingQuery = `${getMeetingQuery} WHERE "meeting"."lastModifiedBy" = '${userId}' ORDER BY "meeting"."lastModifiedDate" DESC`;
    // }

    if (filterObj.meetingFrom && filterObj.meetingTo) {
      if (!userId) {
        getMeetingQuery = `${getMeetingQuery} WHERE "meeting"."meetingDate" BETWEEN '${filterObj.meetingFrom}' AND '${filterObj.meetingTo}'  ORDER BY "meeting"."lastModifiedDate" DESC`;
      } else {
        getMeetingQuery = `${getMeetingQuery} WHERE "meeting"."meetingDate" BETWEEN '${filterObj.meetingFrom}' AND '${filterObj.meetingTo}' AND "meeting"."lastModifiedBy" = '${userId}' ORDER BY "meeting"."lastModifiedDate" DESC`;
      }
    } else {
      if (!userId) {
        getMeetingQuery = `${getMeetingQuery} ORDER BY "meeting"."lastModifiedDate" DESC`;
      } else {
        getMeetingQuery = `${getMeetingQuery} WHERE "meeting"."lastModifiedBy" = '${userId}' ORDER BY "meeting"."lastModifiedDate" DESC`;
      }
    }

    const getMeetings = await sequelize.query(getMeetingQuery, {
      type: QueryTypes.SELECT,
    });
    return getMeetings;
  }
  //#endregion
  async getLatestMeetingById(userId: number) {
    const getMeeting = await meetingModel.findAll({
      where: {lastModifiedBy: userId},
      order: [['createdAt', 'DESC']],
    });
    return getMeeting;
  }
  //#region getMeetingsByIdQuery
  async getFilteredMeetingsByIdQuery(meetingIds: Array<number>) {
    let getMeetingQuery = meetingsProvider.filterMeetingsById(meetingIds);
    getMeetingQuery = `${getMeetingQuery} ORDER BY "meeting"."lastModifiedDate" DESC`;
    const getMeetings = await sequelize.query(getMeetingQuery, {
      type: QueryTypes.SELECT,
    });
    return getMeetings;
  }
  //#endregion

  //#region getMeetingFilesByIdQuery
  async getMeetingFilesByIdQuery(meetingId: number, userId: number) {
    const getMeetingFilesQuery = meetingsProvider.getMeetingFilesById(
      meetingId,
      userId
    );
    const getMeetingFiles = await sequelize.query(getMeetingFilesQuery, {
      type: QueryTypes.SELECT,
    });
    return getMeetingFiles;
  }
  //#endregion

  //#region getMeetingRiskCountByIdQuery
  async getMeetingRiskCountByIdQuery(userId: number | null, meetingId: number) {
    const getMeetingRiskCountQuery =
      meetingsProvider.getMeetingRiskNotesCountById(meetingId, userId);
    const getMeetingRiskCount = await sequelize.query(
      getMeetingRiskCountQuery,
      {
        type: QueryTypes.SELECT,
      }
    );
    return getMeetingRiskCount;
  }
  //#endregion

  //#region getMeetingRiskCountByIdQuery
  async getMeetingRiskQuery(filterObj: filterByDateObj) {
    let getMeetingRiskCountQuery = meetingsProvider.getMeetingRiskNotes();
    if (filterObj.meetingFrom && filterObj.meetingTo) {
      getMeetingRiskCountQuery = `${getMeetingRiskCountQuery} WHERE "meeting"."meetingDate" BETWEEN '${filterObj.meetingFrom}' AND '${filterObj.meetingTo}'`;
    }
    const getMeetingRiskCount = await sequelize.query(
      getMeetingRiskCountQuery,
      {
        type: QueryTypes.SELECT,
      }
    );
    return getMeetingRiskCount;
  }
  //#endregion

  //#region getMeetingSupportCountByIdQuery
  async getMeetingSupportCountByIdQuery(
    userId: number | null,
    meetingId: number
  ) {
    const getMeetingSupportCountQuery =
      meetingsProvider.getMeetingSupportNotesCountById(meetingId, userId);
    const getMeetingSupportCount = await sequelize.query(
      getMeetingSupportCountQuery,
      {
        type: QueryTypes.SELECT,
      }
    );
    return getMeetingSupportCount;
  }
  //#endregion

  async getMeetingSupport(filterObj: filterByDateObj) {
    let getMeetingSupportCountQuery = meetingsProvider.getMeetingSupportNotes();
    if (filterObj.meetingFrom && filterObj.meetingTo) {
      getMeetingSupportCountQuery = `${getMeetingSupportCountQuery} WHERE "meeting"."meetingDate" BETWEEN '${filterObj.meetingFrom}' AND '${filterObj.meetingTo}'`;
    }
    const getMeetingSupportCount = await sequelize.query(
      getMeetingSupportCountQuery,
      {
        type: QueryTypes.SELECT,
      }
    );
    return getMeetingSupportCount;
  }
  //#endregion

  //#region getMeetingOrgNamesByIdQuery
  async getMeetingOrgNamesByIdQuery(meetingId: number) {
    const getMeetingOrgNamesQuery = meetingsProvider.getOrgNamesById(meetingId);
    const getMeetingOrgNames = await sequelize.query(getMeetingOrgNamesQuery, {
      type: QueryTypes.SELECT,
    });
    return getMeetingOrgNames;
  }
  //#endregion

  //#region getMeetingOrgTypesByIdQuery
  async getMeetingOrgTypesByIdQuery(meetingId: number) {
    const getMeetingOrgTypesQuery = meetingsProvider.getOrgTypesById(meetingId);
    const getMeetingOrgTypes = await sequelize.query(getMeetingOrgTypesQuery, {
      type: QueryTypes.SELECT,
    });
    return getMeetingOrgTypes;
  }
  //#endregion

  //#region getMeetingStakeHoldersByIdQuery
  async getMeetingStakeHoldersByIdQuery(
    meetingId: number,
    userId: number | null
  ) {
    const getMeetingStakeHoldersQuery = meetingsProvider.getStakeHoldersById(
      meetingId,
      userId
    );
    const getMeetingStakeHolders = await sequelize.query(
      getMeetingStakeHoldersQuery,
      {
        type: QueryTypes.SELECT,
      }
    );
    return getMeetingStakeHolders;
  }
  //#endregion

  //#region getMeetingStakeHoldersByIdQuery
  async getMeetingStakeHoldersForExcelExport(filterObj: filterByDateObj) {
    let getMeetingStakeHoldersQuery =
      meetingsProvider.getStakeHoldersByIdForExcelExport();
    if (filterObj.meetingFrom && filterObj.meetingTo) {
      getMeetingStakeHoldersQuery = `${getMeetingStakeHoldersQuery} WHERE "meeting"."meetingDate" BETWEEN '${filterObj.meetingFrom}' AND '${filterObj.meetingTo}'`;
    }
    const getMeetingStakeHolders = await sequelize.query(
      getMeetingStakeHoldersQuery,
      {
        type: QueryTypes.SELECT,
      }
    );
    return getMeetingStakeHolders;
  }
  //#endregion

  //#region getMeetingStakeHoldersByIdQuery
  async getMeetingAttebdeesByIdQuery(meetingId: number, userId: number | null) {
    const getMeetingAttendeesQuery = meetingsProvider.getAttendeesById1(
      meetingId,
      userId
    );
    const getMeetingStakeHolders = await sequelize.query(
      getMeetingAttendeesQuery,
      {
        type: QueryTypes.SELECT,
      }
    );
    return getMeetingStakeHolders;
  }
  //#endregion

  //#region getMeetingStakeHoldersByIdForEmailQuery
  async getMeetingStakeHoldersByIdForEmailQuery(
    meetingId: number,
    userId: number
  ) {
    const getMeetingStakeHoldersQuery =
      meetingsProvider.getStakeHoldersByIdForEmail(meetingId, userId);
    const getMeetingStakeHolders = await sequelize.query(
      getMeetingStakeHoldersQuery,
      {
        type: QueryTypes.SELECT,
      }
    );
    return getMeetingStakeHolders;
  }
  //#endregion

  //#region editMeetingByIdQuery
  async editMeetingByIdQuery(meetingId: number, userId: number) {
    const editMeetingQuery = meetingsProvider.editMeetingByUserId(
      meetingId,
      userId
    );
    const editMeeting = await sequelize.query(editMeetingQuery, {
      type: QueryTypes.SELECT,
    });
    return editMeeting;
  }
  //#endregion

  //#region getStakeHolderManagersInvolvedWithStakeHolder
  async getStakeHolderManagersForStakeHolderByIdQuery(stakeHolderId: number) {
    const getStakeHolderManagersQuery =
      meetingsProvider.getStakeHolderManagersInvolvedWithStakeHolder(
        stakeHolderId
      );
    const getStakeHolderManagers = await sequelize.query(
      getStakeHolderManagersQuery,
      {
        type: QueryTypes.SELECT,
      }
    );
    return getStakeHolderManagers;
  }
  //#endregion

  //#region getMeetingByIdQuery
  async getMeetingByIdQuery(meetingId: number) {
    const getMeetingQuery = meetingsProvider.getMeetingByUserId(meetingId);
    const getMeeting = await sequelize.query(getMeetingQuery, {
      type: QueryTypes.SELECT,
    });
    return getMeeting;
  }
  //#endregion

  //#region downloadMeetingByIdQuery
  async downloadMeetingByIdQuery(meetingId: number, userId: number | null) {
    const downloadMeetingQuery = meetingsProvider.downloadMeetingByUserId(
      meetingId,
      userId
    );
    const downloadMeeting = await sequelize.query(downloadMeetingQuery, {
      type: QueryTypes.SELECT,
    });
    return downloadMeeting;
  }
  //#endregion

  //#region getMeetingRiskNotesByIdQuery
  async getMeetingRiskNotesByIdQuery(meetingId: number, userId: number | null) {
    const meetingRiskNotesQuery = meetingsProvider.getMeetingRiskNotesById(
      meetingId,
      userId
    );
    const meetingRiskNotes = await sequelize.query(meetingRiskNotesQuery, {
      type: QueryTypes.SELECT,
    });
    return meetingRiskNotes;
  }
  //#endregion

  //#region getMeetingSupportNotesByIdQuery
  async getMeetingSupportNotesByIdQuery(
    meetingId: number,
    userId: number | null
  ) {
    const meetingSupportNotesQuery =
      meetingsProvider.getMeetingSupportNotesById(meetingId, userId);
    const meetingSupportNotes = await sequelize.query(
      meetingSupportNotesQuery,
      {
        type: QueryTypes.SELECT,
      }
    );
    return meetingSupportNotes;
  }
  //#endregion

  //#region filterMeetingByDateAndTime
  async filterMeetingByDateAndTime(filterObj: filterMeetingReq) {
    const filterMeetingsQuery =
      meetingsProvider.filterMeetingByDateAndTime(filterObj);
    const filterMeetings = await sequelize.query(filterMeetingsQuery, {
      type: QueryTypes.SELECT,
    });
    return filterMeetings;
  }
  //#endregion

  //#region filterMeetingsByDateQuery
  async filterMeetingsByDateQuery(filterObj: filterByDateObj) {
    const filterMeetingsQuery = meetingsProvider.filterMeetingByDate(filterObj);
    const filterMeetings = await sequelize.query(filterMeetingsQuery, {
      type: QueryTypes.SELECT,
    });
    return filterMeetings;
  }
  //#endregion

  //#region filterMeetings
  async filterMeetings(filterObj: filterDashboardReq) {
    let filterMeetings: any;
    if (filterObj.meetingFrom && filterObj.meetingTo) {
      if (!filterObj.userId) {
        filterMeetings = await meetingModel.findAndCountAll({
          where: {
            meetingDate: {
              [Op.between]: [filterObj.meetingFrom, filterObj.meetingTo],
            },
          },
        });
      } else {
        filterMeetings = await meetingModel.findAndCountAll({
          where: {
            meetingDate: {
              [Op.between]: [filterObj.meetingFrom, filterObj.meetingTo],
            },
            lastModifiedBy: filterObj.userId,
          },
        });
      }
    } else {
      if (!filterObj.userId) {
        filterMeetings = await meetingModel.findAndCountAll({});
      } else {
        filterMeetings = await meetingModel.findAndCountAll({
          where: {
            lastModifiedBy: filterObj.userId,
          },
        });
      }
    }
    if (filterObj?.createdByIds?.length > 0) {
      if (filterMeetings.rows.length > 0) {
        const meetingIds = filterMeetings?.rows
          .map((x: any) => x.id)
          .map(Number);
        const filterMeetingsQuery =
          meetingsProvider.getMeetingByUserEntityOrUserId(
            filterObj.createdByIds,
            filterObj.entityIds,
            meetingIds
          );
        const filterMeetingsResult = await sequelize.query(
          filterMeetingsQuery,
          {
            type: QueryTypes.SELECT,
          }
        );
        if (filterMeetingsResult.length === 0) {
          filterMeetings.count = 0;
          filterMeetings.rows = [];
          return filterMeetings;
        }
        filterMeetings.count = filterMeetingsResult.length;
        filterMeetings.rows = filterMeetingsResult;
      }
    }
    if (filterObj?.entityIds?.length > 0) {
      if (filterMeetings.rows.length > 0) {
        const filterMeetingsQuery =
          meetingsProvider.getMeetingByUserEntityOrUserId(
            filterObj.createdByIds,
            filterObj.entityIds,
            filterMeetings?.rows?.map((x: any) => x.id).map(Number)
          );
        const filterMeetingsResult = await sequelize.query(
          filterMeetingsQuery,
          {
            type: QueryTypes.SELECT,
          }
        );
        if (filterMeetingsResult.length === 0) {
          filterMeetings.count = 0;
          filterMeetings.rows = [];
          return filterMeetings;
        }
        filterMeetings.count = filterMeetingsResult.length;
        filterMeetings.rows = filterMeetingsResult;
      }
    }
    if (filterObj.organizationTypeIds.length > 0) {
      filterMeetings = await meetingOrgTypesModel.findAndCountAll({
        where: {
          meetingId: filterMeetings.rows
            .map((user: any) => user.id)
            .map(Number),
          orgTypeId: filterObj.organizationTypeIds,
        },
      });
      if (filterObj.organizationIds.length > 0) {
        filterMeetings = await meetingOrgNamesModel.findAndCountAll({
          where: {
            meetingId: filterMeetings.rows
              .map((user: any) => user.meetingId)
              .map(Number),
            orgNameId: filterObj.organizationIds,
          },
        });
      }
      if (!filterObj.userId) {
        filterMeetings = await meetingModel.findAndCountAll({
          where: {
            id: filterMeetings.rows
              .map((user: any) => user.meetingId)
              .map(Number),
          },
        });
      } else {
        filterMeetings = await meetingModel.findAndCountAll({
          where: {
            lastModifiedBy: filterObj.userId,
            id: filterMeetings.rows
              .map((user: any) => user.meetingId)
              .map(Number),
          },
        });
      }
    }
    return filterMeetings;
  }
  //#endregion

  //#region applyMeetingOrgTypesAndOrgNamesQuery
  async applyMeetingOrgTypesAndOrgNamesQuery(
    meetingIds: Array<number>,
    filterObj: filterMeetingReq
  ) {
    const filterMeetingOrgTypesQuery =
      meetingsProvider.filterOrgTypesByMeetingIds(meetingIds, filterObj);
    const filterMeetingOrgTypes = await sequelize.query(
      filterMeetingOrgTypesQuery,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (
      filterObj.organizationIds.length > 0 &&
      filterMeetingOrgTypes.length > 0
    ) {
      // I am doing this mapping to remove multiple count of the same meeting ID
      const filterMeetingOrgNamesQuery =
        meetingsProvider.filterOrgNamesByMeetingIds(
          filterMeetingOrgTypes
            .map((id: any) => id.meetingId)
            .map(Number)
            .filter((value, index, self) => self.indexOf(value) === index),
          filterObj
        );
      const filterMeetingOrgNames = await sequelize.query(
        filterMeetingOrgNamesQuery,
        {
          type: QueryTypes.SELECT,
        }
      );
      return filterMeetingOrgNames
        .map((id: any) => id.meetingId)
        .map(Number)
        .filter((value, index, self) => self.indexOf(value) === index);
    }
    return filterMeetingOrgTypes
      .map((id: any) => id.meetingId)
      .map(Number)
      .filter((value, index, self) => self.indexOf(value) === index);
  }
  //#endregion
  //#region  checkEscalationByMeeting
  async checkEscalationByMeeting() {
    const recordsQuery = meetingsProvider.getLatestRecordForEachUser();
    const records = await sequelize.query(recordsQuery, {
      type: QueryTypes.SELECT,
    });
    return records;
  }
  //#endregion

  //#region filterByStakeHolderPriorityLevels
  async filterByStakeHolderPriorityLevels(
    meetingIds: Array<number>,
    filterObj: filterMeetingReq
  ) {
    let stakeHoldersIds: any = await stakeHolderMeetingsModel.findAll({
      where: {meetingId: meetingIds},
    });
    stakeHoldersIds = stakeHoldersIds
      .map((x: any) => x.stakeHolderId)
      .map(Number)
      .filter(
        (value: any, index: any, self: any) => self.indexOf(value) === index
      );
    const stakeHoldersIdsQuery = stakeHolderProvider.getStakeholdersByPriority(
      stakeHoldersIds,
      filterObj
    );
    stakeHoldersIds = await sequelize.query(stakeHoldersIdsQuery, {
      type: QueryTypes.SELECT,
    });
    stakeHoldersIds = stakeHoldersIds
      .map((x: any) => x.stakeHolderId)
      .map(Number);
    stakeHoldersIds = await stakeHolderMeetingsModel.findAll({
      where: {stakeHolderId: stakeHoldersIds, meetingId: meetingIds},
    });
    stakeHoldersIds = stakeHoldersIds
      .map((x: any) => x.meetingId)
      .map(Number)
      .filter(
        (value: any, index: any, self: any) => self.indexOf(value) === index
      );
    return stakeHoldersIds;
  }
  //#endregion

  //#region getStakeholderInMeetings
  async getStakeholderInMeetings(stakeHolderId: number | Array<number>) {
    // eslint-disable-next-line prefer-const
    let stakeholderInMeetings: any = await stakeHolderMeetingsModel.findAll({
      where: {stakeHolderId: stakeHolderId},
      attributes: ['meetingId'],
    });
    stakeholderInMeetings = stakeholderInMeetings
      .map((x: any) => x.meetingId)
      .map(Number);
    return stakeholderInMeetings;
  }
  //#endregion

  //#region getStakeholderInMeetingsForMerging
  async getStakeholderInMeetingsForMerging(stakeHolderIds: Array<number>) {
    const stakeholderInMeetings: any = await stakeHolderMeetingsModel.findAll({
      where: {stakeHolderId: stakeHolderIds},
    });
    return stakeholderInMeetings;
  }
  //#endregion

  //#region getAllStakeholdersByMeetingId
  async getAllStakeholdersByMeetingId(meetingId: number) {
    const stakeholderInMeetings: any = await stakeHolderMeetingsModel.findAll({
      where: {meetingId: meetingId},
    });
    return stakeholderInMeetings;
  }
  //#endregion

  //#region getMeetingByUserId
  async getMeetingByUserId(
    meetingIdsArray: Array<number>,
    filterObj: filterMeetingReq
  ) {
    const getMeetingByUserIdQuery =
      meetingsProvider.getMeetingByUserEntityOrUserId(
        filterObj.createdByIds,
        filterObj.entityIds,
        meetingIdsArray
      );
    let getMeetingByUserId: any = await sequelize.query(
      getMeetingByUserIdQuery,
      {
        type: QueryTypes.SELECT,
      }
    );
    getMeetingByUserId = getMeetingByUserId
      .map((x: any) => x.id)
      .map(Number)
      .filter(
        (value: any, index: any, self: any) => self.indexOf(value) === index
      );
    return getMeetingByUserId;
  }
  //#endregion

  //#region getMeetingByEntityId
  async getMeetingByEntityId(
    meetingIdsArray: Array<number>,
    filterObj: filterMeetingReq
  ) {
    const getMeetingByEntityIdQuery =
      meetingsProvider.getMeetingByUserEntityOrUserId(
        filterObj.createdByIds,
        filterObj.entityIds,
        meetingIdsArray
      );
    let getMeetingByEntityId: any = await sequelize.query(
      getMeetingByEntityIdQuery,
      {
        type: QueryTypes.SELECT,
      }
    );
    getMeetingByEntityId = getMeetingByEntityId
      .map((x: any) => x.id)
      .map(Number)
      .filter(
        (value: any, index: any, self: any) => self.indexOf(value) === index
      );
    return getMeetingByEntityId;
  }
  //#endregion

  //#region updateStakeholderInMeetings
  async updateStakeholderInMeetings(meetingObj: any) {
    //#region  Create StakeHolder Meetings
    if (meetingObj?.meetingId) {
      await stakeHolderMeetingsModel.destroy({
        where: {
          meetingId: meetingObj?.meetingId,
        },
      });
    }
    if (meetingObj.stakeHolderIds && meetingObj.stakeHolderIds.length > 0) {
      const stakeHolderIds = [];
      for (let index = 0; index < meetingObj.stakeHolderIds.length; index++) {
        const element = meetingObj.stakeHolderIds[index];
        const obj = {
          meetingId: meetingObj?.meetingId,
          stakeHolderId: element,
          lastModifiedDate: new Date().toISOString(),
          lastModifiedBy: meetingObj.userId,
        };
        stakeHolderIds.push(obj);
      }
      await stakeHolderMeetingsModel.bulkCreate(stakeHolderIds);
    }
    //#endregion
  }
  //#endregion
}
