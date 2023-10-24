import {filterMeetingReq} from '../business_objects/meeting';
import {filterByDateObj} from '../business_objects/admin-dashboard';
export const meetingsProvider = {
  getMeetingsByUserId(): string {
    const query = `
        SELECT
        "meeting"."id" AS "meetingId",
        "meeting"."meetingDate",
        "meeting"."meetingStartTime",
        "meeting"."meetingEndTime",
        "meeting"."meetingAgenda",
        "meeting"."oppurtunities",
        "meeting"."observations",
        "meeting"."isDraft",
        "meeting"."lastModifiedBy",
        "meeting"."createdAt",
        "user"."fullName" AS "lastModifiedByName",
        "user"."priorityLevel" AS "lastModifiedByPriorityLevel",
        "user"."imageUrl" AS "imageURL",
        "meeting"."lastModifiedDate"
        FROM "meeting"
        INNER JOIN "user" ON "meeting"."lastModifiedBy" = "user"."id"`;
    return query;
  },
  exportExcelByUserId(): string {
    const query = `
    SELECT
    "meeting"."id" AS "meetingId",
    "meeting"."meetingDate",
    "meeting"."meetingStartTime",
    "meeting"."meetingEndTime",
    "meeting"."meetingAgenda",
    "meeting"."oppurtunities",
    "meeting"."observations",
    "meeting"."isDraft",
    "meeting"."lastModifiedBy",
    "meeting"."createdAt",
    "user"."fullName" AS "lastModifiedByName",
    "user"."priorityLevel" AS "lastModifiedByPriorityLevel",
    "user"."imageUrl" AS "imageURL",
    "meeting"."lastModifiedDate",
    "stakeHolder"."fullName" AS "stakeHolderName"
    FROM "meeting"
    INNER JOIN "stakeHolderMeetings" on "stakeHolderMeetings"."meetingId" = "meeting"."id"
    INNER JOIN "stakeHolder" ON "stakeHolder".id = "stakeHolderMeetings"."stakeHolderId"
    INNER JOIN "user" ON "meeting"."lastModifiedBy" = "user"."id"`;
    return query;
  },
  getMeetingsForAdmin(): string {
    const query = `
        SELECT
        "meeting"."id" AS "meetingId",
        "meeting"."meetingDate",
        "meeting"."meetingStartTime",
        "meeting"."meetingEndTime",
        "meeting"."meetingAgenda",
        "meeting"."oppurtunities",
        "meeting"."observations",
        "meeting"."isDraft",
        "meeting"."lastModifiedBy",
        "user"."fullName" AS "lastModifiedByName",
        "user"."priorityLevel" AS "lastModifiedByPriorityLevel",
        "user"."imageUrl" AS "imageURL",
        "meeting"."lastModifiedDate"
        FROM "meeting"
        INNER JOIN "user" ON "meeting"."lastModifiedBy" = "user"."id"`;
    return query;
  },
  filterMeetingsById(meetingIds: Array<number>): string {
    const filteredIds = meetingIds.join(',');
    const query = `
        SELECT
        "meeting"."id" AS "meetingId",
        "meeting"."meetingDate",
        "meeting"."meetingStartTime",
        "meeting"."meetingEndTime",
        "meeting"."meetingAgenda",
        "meeting"."oppurtunities",
        "meeting"."isDraft",
        "meeting"."observations",
        "meeting"."lastModifiedBy",
        "user"."fullName" AS "lastModifiedByName",
        "user"."priorityLevel" AS "lastModifiedByPriorityLevel",
        "meeting"."lastModifiedDate"
        FROM "meeting"
        INNER JOIN "user" ON "meeting"."lastModifiedBy" = "user"."id"
        WHERE "meeting"."id" in (${filteredIds})`;
    return query;
  },
  editMeetingByUserId(meetingId: number, userId: number) {
    const query = `
    SELECT
    "meeting"."id" AS "meetingId",
    "meeting"."meetingDate",
    "meeting"."meetingStartTime",
    "meeting"."meetingEndTime",
    "meeting"."meetingAgenda",
    "meeting"."oppurtunities",
    "meeting"."observations",
    "meeting"."isDraft",
    "meeting"."lastModifiedBy",
    "user"."fullName" AS "lastModifiedByName",
    "user"."priorityLevel" AS "lastModifiedByPriorityLevel",
    "meeting"."lastModifiedDate",
    "meeting"."createdAt"
    FROM "meeting"
    INNER JOIN "user" ON "meeting"."lastModifiedBy" = "user"."id"
    WHERE "meeting"."lastModifiedBy" = '${userId}' AND "meeting"."id" = '${meetingId}'`;
    return query;
  },
  getStakeHolderManagersInvolvedWithStakeHolder(stakeHolderId: number) {
    const query = `
    SELECT
    DISTINCT "user"."id" AS "userId",
    "user"."fullName",
    "user"."imageUrl"
    FROM "stakeHolderMeetings"
    INNER JOIN "meeting" ON "meeting"."id" = "stakeHolderMeetings"."meetingId"
    INNER JOIN "user" ON "user".id = "meeting"."lastModifiedBy"
    WHERE "stakeHolderMeetings"."stakeHolderId" = '${stakeHolderId}'`;
    return query;
  },
  getMeetingByUserId(meetingId: number) {
    const query = `
    SELECT
    "meeting"."id" AS "meetingId",
    "meeting"."meetingDate",
    "meeting"."meetingStartTime",
    "meeting"."meetingEndTime",
    "meeting"."meetingAgenda",
    "meeting"."oppurtunities",
    "meeting"."observations",
    "meeting"."isDraft",
    "meeting"."lastModifiedBy",
    "user"."fullName" AS "lastModifiedByName",
    "user"."priorityLevel" AS "lastModifiedByPriorityLevel",
    "user"."imageUrl" AS "imageURL",
    "meeting"."lastModifiedDate",
    "meeting"."createdAt"
    FROM "meeting"
    INNER JOIN "user" ON "meeting"."lastModifiedBy" = "user"."id"
    WHERE "meeting"."id" = '${meetingId}'`;
    return query;
  },
  downloadMeetingByUserId(meetingId: number, userId: number | null) {
    let query = `
    SELECT
    "meeting"."id" AS "meetingId",
    "meeting"."meetingDate",
    "meeting"."meetingStartTime",
    "meeting"."meetingEndTime",
    "meeting"."meetingAgenda",
    "meeting"."oppurtunities",
    "meeting"."observations",
    "meeting"."isDraft",
    "meeting"."lastModifiedBy",
    "user"."fullName" AS "lastModifiedByName",
    "user"."priorityLevel" AS "lastModifiedByPriorityLevel",
    "meeting"."lastModifiedDate",
    "meeting"."createdAt"
    FROM "meeting"
    INNER JOIN "user" ON "meeting"."lastModifiedBy" = "user"."id"
    WHERE "meeting"."id" = '${meetingId}'`;
    if (userId) {
      query = `${query} AND "meeting"."lastModifiedBy" = '${userId}'`;
    }
    return query;
  },
  getMeetingRiskNotesById(meetingId: number, userId: number | null): string {
    let query = `
    SELECT
	"meetingRiskNotes"."id" AS "meetingRiskNotesId",
    "meetingRiskNotes"."meetingPriorityId" AS "meetingRiskNotesPriorityId",
    "meetingRiskNotesPriorityType"."code" AS "meetingRiskNotesPriority",
    "meetingRiskNotes"."notes" AS "meetingRiskNotes"
    FROM "meetingRiskNotes"
    INNER JOIN "meetingPriorityType" AS "meetingRiskNotesPriorityType" ON "meetingRiskNotes"."meetingPriorityId" = "meetingRiskNotesPriorityType"."id"
    WHERE "meetingRiskNotes"."meetingId" = '${meetingId}'`;
    if (userId) {
      query = `${query} AND "meetingRiskNotes"."lastModifiedBy" = '${userId}'`;
    }
    return query;
  },
  getMeetingRiskNotesByUserId(userId: number | null): string {
    let query = `
    SELECT
	  "meetingRiskNotes"."id" AS "meetingRiskNotesId",
    "meetingRiskNotes"."meetingPriorityId" AS "meetingRiskNotesPriorityId",
    "meetingRiskNotesPriorityType"."code" AS "meetingRiskNotesPriority",
    "meetingRiskNotes"."notes",
    "meeting"."id" AS "meetingId",
    "meeting"."meetingStartTime",
    "meeting"."meetingEndTime",
    "meeting"."meetingDate"
    FROM "meetingRiskNotes"
    INNER JOIN "meeting" ON "meeting"."id" =  "meetingRiskNotes"."meetingId"
    INNER JOIN "meetingPriorityType" AS "meetingRiskNotesPriorityType" ON "meetingRiskNotes"."meetingPriorityId" = "meetingRiskNotesPriorityType"."id"`;
    if (userId) {
      query = `${query} WHERE "meetingRiskNotes"."lastModifiedBy" = '${userId}'`;
    }
    return query;
  },
  getMeetingSupportNotesByUserId(userId: number | null): string {
    let query = `
    SELECT
	  "meetingSupportNotes"."id" AS "meetingSupportNotesId",
    "meetingSupportNotes"."meetingPriorityId" AS "meetingSupportNotesPriorityId",
    "meetingSupportNotesPriorityType"."code" AS "meetingSupportNotesPriority",
    "meetingSupportNotes"."notes",
    "meeting"."id" AS "meetingId",
    "meeting"."meetingStartTime",
    "meeting"."meetingEndTime",
    "meeting"."meetingDate"
    FROM "meetingSupportNotes"
    INNER JOIN "meeting" ON "meeting"."id" =  "meetingSupportNotes"."meetingId"
    INNER JOIN "meetingPriorityType" AS "meetingSupportNotesPriorityType" ON "meetingSupportNotes"."meetingPriorityId" = "meetingSupportNotesPriorityType"."id"`;
    if (userId) {
      query = `${query} WHERE "meetingSupportNotes"."lastModifiedBy" = '${userId}'`;
    }
    return query;
  },
  getMeetingRiskNotesForAdmin(): string {
    const query = `
    SELECT
	  "meetingRiskNotes"."id" AS "meetingRiskNotesId",
    "meetingRiskNotes"."meetingPriorityId" AS "meetingRiskNotesPriorityId",
    "meetingRiskNotesPriorityType"."code" AS "meetingRiskNotesPriority",
    "meetingRiskNotes"."notes",
    "meeting"."id" AS "meetingId",
    "meeting"."meetingStartTime",
    "meeting"."meetingEndTime",
    "meeting"."meetingDate"
    FROM "meetingRiskNotes"
    INNER JOIN "meeting" ON "meeting"."id" =  "meetingRiskNotes"."meetingId"
    INNER JOIN "meetingPriorityType" AS "meetingRiskNotesPriorityType" ON "meetingRiskNotes"."meetingPriorityId" = "meetingRiskNotesPriorityType"."id"`;
    return query;
  },
  getMeetingSupportNotesForAdmin(): string {
    const query = `
    SELECT
	  "meetingSupportNotes"."id" AS "meetingSupportNotesId",
    "meetingSupportNotes"."meetingPriorityId" AS "meetingSupportNotesPriorityId",
    "meetingSupportNotesPriorityType"."code" AS "meetingSupportNotesPriority",
    "meetingSupportNotes"."notes",
    "meeting"."id" AS "meetingId",
    "meeting"."meetingStartTime",
    "meeting"."meetingEndTime",
    "meeting"."meetingDate"
    FROM "meetingSupportNotes"
    INNER JOIN "meeting" ON "meeting"."id" =  "meetingSupportNotes"."meetingId"
    INNER JOIN "meetingPriorityType" AS "meetingSupportNotesPriorityType" ON "meetingSupportNotes"."meetingPriorityId" = "meetingSupportNotesPriorityType"."id"`;
    return query;
  },
  getMeetingRiskNotesCountById(
    meetingId: number | number[] | null,
    userId: number | null
  ): string {
    let query = `
    SELECT
    "meetingRiskNotesPriorityType"."code" AS "meetingRiskNotesPriority",
	  COUNT("meetingRiskNotesPriorityType"."code") AS "riskTypeCount"
    FROM "meetingRiskNotes"
    INNER JOIN "meetingPriorityType" AS "meetingRiskNotesPriorityType" ON "meetingRiskNotes"."meetingPriorityId" = "meetingRiskNotesPriorityType"."id"
    WHERE "meetingRiskNotes"."meetingId" = '${meetingId}'`;
    if (userId) {
      query = `${query}  AND "meetingRiskNotes"."lastModifiedBy" = '${userId}'`;
    }
    query = `${query} GROUP BY "meetingRiskNotesPriorityType"."code"`;
    return query;
  },
  getMeetingRiskNotes(): string {
    const query = `
    SELECT
    "meeting"."id" AS "meetingId",
	  "meeting"."meetingDate",
    "meeting"."meetingStartTime",
    "meeting"."meetingEndTime",
	  "meetingRiskNotesPriorityType"."code" AS "meetingRiskNotesPriority",
	  "meetingRiskNotes"."notes"
	  FROM "meetingRiskNotes"
    INNER JOIN "meetingPriorityType" AS "meetingRiskNotesPriorityType" ON "meetingRiskNotes"."meetingPriorityId" = "meetingRiskNotesPriorityType"."id"
    INNER JOIN "meeting" ON "meeting"."id" = "meetingRiskNotes"."meetingId"`;
    return query;
  },
  getMeetingSupportNotesById(meetingId: number, userId: number | null): string {
    let query = `
    SELECT
	"meetingSupportNotes"."id" AS "meetingSupportNotesId",
    "meetingSupportNotes"."meetingPriorityId" AS "meetingSupportNotesPriorityId",
    "meetingSupportNotesPriorityType"."code" AS "meetingSupportNotesPriority",
    "meetingSupportNotes"."notes" AS "meetingSupportNotes"
    FROM "meetingSupportNotes"
    INNER JOIN "meetingPriorityType" AS "meetingSupportNotesPriorityType" ON "meetingSupportNotes"."meetingPriorityId" = "meetingSupportNotesPriorityType"."id"
    WHERE "meetingSupportNotes"."meetingId" = '${meetingId}'`;
    if (userId) {
      query = `${query} AND "meetingSupportNotes"."lastModifiedBy" = '${userId}'`;
    }
    return query;
  },
  getMeetingSupportNotesCountById(
    meetingId: number | null,
    userId: number
  ): string {
    let query = `
    SELECT
    "meetingSupportNotesPriorityType"."code" AS "meetingSupportNotesPriority",
	COUNT("meetingSupportNotesPriorityType"."code") AS "riskTypeCount"
    FROM "meetingSupportNotes"
    INNER JOIN "meetingPriorityType" AS "meetingSupportNotesPriorityType" ON "meetingSupportNotes"."meetingPriorityId" = "meetingSupportNotesPriorityType"."id"
    WHERE "meetingSupportNotes"."meetingId" = '${meetingId}'`;
    if (userId) {
      query = `${query}   AND "meetingSupportNotes"."lastModifiedBy" = '${userId}'`;
    }
    query = `${query} GROUP BY "meetingSupportNotesPriorityType"."code"`;
    return query;
  },
  getMeetingSupportNotes(): string {
    const query = `
    SELECT
	  "meeting"."id" AS "meetingId",
	  "meeting"."meetingDate",
    "meeting"."meetingStartTime",
    "meeting"."meetingEndTime",
    "meetingSupportNotesPriorityType"."code" AS "meetingSupportNotesPriority",
	  "meetingSupportNotes"."notes"
	  FROM "meetingSupportNotes"
    INNER JOIN "meetingPriorityType" AS "meetingSupportNotesPriorityType" ON "meetingSupportNotes"."meetingPriorityId" = "meetingSupportNotesPriorityType"."id"
    INNER JOIN "meeting" ON "meeting"."id" = "meetingSupportNotes"."meetingId"`;
    return query;
  },
  getMeetingFilesById(meetingId: number, userId: number): string {
    let query = `
    SELECT
    "meetingFiles"."fileName",
    "meetingFiles"."fileType",
    "meetingFiles"."fileUrl"
    FROM "meetingFiles"
    WHERE "meetingFiles"."meetingId" = '${meetingId}'`;
    if (userId) {
      query = `${query} AND "meetingFiles"."lastModifiedBy" = '${userId}'`;
    }
    return query;
  },
  getOrgNamesById(meetingId: number) {
    const query = `
    SELECT
    "meetingOrgNames"."orgNameId",
    "organization"."name" AS "organizationName",
    "organizationType"."id" AS "organizationTypeId",
    "organizationType"."name" AS "organizationTypeName"
    FROM "meetingOrgNames"
    INNER JOIN "organization" ON "meetingOrgNames"."orgNameId" = "organization"."id"
    INNER JOIN "organizationType" ON "organization"."orgTypeId" = "organizationType"."id"
    WHERE "meetingOrgNames"."meetingId" = '${meetingId}'`;
    return query;
  },
  getOrgTypesById(meetingId: number) {
    const query = `
    SELECT
    "meetingOrgTypes"."orgTypeId",
    "organizationType"."name" AS "organizationName"
    FROM "meetingOrgTypes"
    INNER JOIN "organizationType" ON "meetingOrgTypes"."orgTypeId" = "organizationType"."id"
    WHERE "meetingOrgTypes"."meetingId" = '${meetingId}'`;
    return query;
  },
  filterOrgNamesByMeetingIds(
    meetingIds: Array<number>,
    filterObj: filterMeetingReq
  ) {
    const meetingsIds = meetingIds.join(',');
    const orgIds = filterObj.organizationIds.join(',');
    let query = `
    SELECT
    "meetingOrgNames"."meetingId"
    FROM "meetingOrgNames"
    INNER JOIN "organization" ON "meetingOrgNames"."orgNameId" = "organization"."id"
    WHERE "meetingOrgNames"."meetingId" in (${meetingsIds}) AND "meetingOrgNames"."orgNameId" in (${orgIds})`;
    if (filterObj.companyTypeIds.length > 0) {
      const compTypeIds = filterObj.companyTypeIds.join(',');
      query = `${query} AND "organization"."companyTypeId" in (${compTypeIds})`;
    }
    if (filterObj.publicCompTypeIds.length > 0) {
      const publicCompTypeIds = filterObj.publicCompTypeIds.join(',');
      query = `${query} AND "organization"."publicCompanyId" in (${publicCompTypeIds})`;
    }
    return query;
  },
  filterOrgTypesByMeetingIds(
    meetingIds: Array<number>,
    filterObj: filterMeetingReq
  ) {
    const meetingsIds = meetingIds.join(',');
    const orgTypeIds = filterObj.organizationTypeIds.join(',');
    const query = `
    SELECT
    "meetingOrgTypes"."meetingId"
    FROM "meetingOrgTypes"
    WHERE "meetingOrgTypes"."meetingId" in (${meetingsIds}) AND "meetingOrgTypes"."orgTypeId" in (${orgTypeIds})`;
    return query;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getStakeHoldersById(meetingId: number, userId: number | null): string {
    // eslint-disable-next-line prefer-const
    let query = `
    SELECT
    "stakeHolder"."id" AS "stakeHolderId",
    "stakeHolder"."fullName",
    "stakeHolder"."imageUrl",
    "stakeHolder"."priorityLevel",
    "stakeHolder"."designation",
    "stakeHolder"."email",
    "organization"."name" AS "organizationName",
    "organizationType"."name" AS "organizationTypeName"
    FROM "stakeHolderMeetings"
    INNER JOIN "stakeHolder" ON  "stakeHolderMeetings"."stakeHolderId" = "stakeHolder"."id"
    INNER JOIN "organization" ON "stakeHolder"."organizationId" = "organization"."id"
    INNER JOIN "organizationType" ON "organization"."orgTypeId" = "organizationType"."id"
    WHERE "stakeHolderMeetings"."meetingId" = '${meetingId}'`;
    // if (userId) {
    //   query = `${query} AND "stakeHolderMeetings"."lastModifiedBy" = '${userId}'`;
    // }
    return query;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getStakeHoldersByIdForExcelExport(): string {
    // eslint-disable-next-line prefer-const
    let query = `
    SELECT
    "stakeHolder"."id" AS "stakeHolderId",
    "stakeHolder"."fullName",
    "stakeHolder"."imageUrl",
    "stakeHolder"."priorityLevel",
    "stakeHolder"."designation",
    "stakeHolder"."email",
    "organization"."name" AS "organizationName",
    "organizationType"."name" AS "organizationTypeName",
	  "meeting"."id" AS "meetingId",
	  "meeting"."meetingDate",
    "meeting"."meetingStartTime",
    "meeting"."meetingEndTime",
	  "companyType"."name" AS "companyType",
	  "publicCompany"."name" AS "publicCompany"
    FROM "stakeHolderMeetings"
	  INNER JOIN "meeting" ON "meeting"."id" = "stakeHolderMeetings"."meetingId"
    INNER JOIN "stakeHolder" ON  "stakeHolderMeetings"."stakeHolderId" = "stakeHolder"."id"
    INNER JOIN "organization" ON "stakeHolder"."organizationId" = "organization"."id"
    INNER JOIN "organizationType" ON "stakeHolder"."organizationTypeId" = "organizationType"."id"
	  LEFT JOIN "companyType" ON "stakeHolder"."companyTypeId" = "companyType"."id"
    LEFT JOIN "publicCompany" ON "stakeHolder"."publicCompanyId" = "publicCompany"."id"`;
    // if (userId) {
    //   query = `${query} AND "stakeHolderMeetings"."lastModifiedBy" = '${userId}'`;
    // }
    return query;
  },
  getAttendeesById1(meetingId: number, userId: number | null): string {
    let query = `
    SELECT
    "attendee"."id" AS "attendeeId",
    "attendee"."fullName",
    "attendee"."designation"
    FROM attendee
    INNER JOIN "attendeeMeetings" ON  "attendeeMeetings"."attendeeId" = "attendee"."id"
    WHERE "attendeeMeetings"."meetingId" = '${meetingId}'`;
    if (userId) {
      query = `${query} AND "attendeeMeetings"."updatedBy" = '${userId}'`;
    }
    return query;
  },
  getStakeHoldersByIdForEmail(meetingId: number, userId: number): string {
    const query = `
    SELECT
    "stakeHolder"."id",
    "stakeHolder"."fullName",
    "stakeHolder"."imageUrl",
    "stakeHolder"."priorityLevel",
    "stakeHolder"."designation",
    "stakeHolder"."email",
    "organization"."name" AS "organizationName",
    "organizationType"."name" AS "organizationTypeName",
    "companyType"."name" AS "companyTypeName",
    "publicCompany"."name" AS "publicCompanyName"
    FROM "stakeHolderMeetings"
    INNER JOIN "stakeHolder" ON  "stakeHolderMeetings"."stakeHolderId" = "stakeHolder"."id"
    INNER JOIN "organization" ON "stakeHolder"."organizationId" = "organization"."id"
    INNER JOIN "organizationType" ON "stakeHolder"."organizationTypeId" = "organizationType"."id"
    LEFT JOIN "companyType" ON "stakeHolder"."companyTypeId" = "companyType"."id"
    LEFT JOIN "publicCompany" ON "stakeHolder"."publicCompanyId" = "publicCompany"."id"
    WHERE "stakeHolderMeetings"."meetingId" = '${meetingId}' AND "stakeHolderMeetings"."lastModifiedBy" = '${userId}'`;
    return query;
  },
  filterMeetingByDateAndTime(filterObj: filterMeetingReq): string {
    let query = meetingsProvider.getMeetingsByUserId();
    if (filterObj.userId) {
      query = `${query} WHERE "meeting"."lastModifiedBy" = '${filterObj.userId}' AND "meeting"."meetingDate" BETWEEN '${filterObj.meetingFrom}' AND '${filterObj.meetingTo}'`;
    } else if (!filterObj.userId) {
      query = `${query} WHERE "meeting"."meetingDate" BETWEEN '${filterObj.meetingFrom}' AND '${filterObj.meetingTo}'`;
    }

    if (filterObj.meetingStartTime && filterObj.meetingEndTime) {
      query = `${query} AND "meeting"."meetingStartTime" >= '${filterObj.meetingStartTime}' AND "meeting"."meetingEndTime" <= '${filterObj.meetingEndTime}' `;
    }
    return query;
  },
  filterMeetingByDate(filterObj: filterByDateObj): string {
    let query = meetingsProvider.getMeetingsForAdmin();
    query = `${query} AND "meeting"."meetingDate" BETWEEN '${filterObj.meetingFrom}' AND '${filterObj.meetingTo}'`;
    return query;
  },
  getLatestRecordForEachUser(): string {
    const query = `SELECT 
    DISTINCT ON ("lastModifiedBy") "lastModifiedBy", "createdAt", "id" 
    FROM "meeting" 
    ORDER BY "lastModifiedBy","createdAt" DESC`;
    return query;
  },
  //#region  getMeetingByUserEntityOrUserId
  getMeetingByUserEntityOrUserId(
    userIdArray: Array<number>,
    entityIdArray: Array<number>,
    meetingIdsArray: Array<number>
  ) {
    const userIds = userIdArray.join(',');
    const entityIds = entityIdArray.join(',');
    const meetingIds = meetingIdsArray.join(',');
    let query = `
    SELECT
    "meeting"."id",
    "meeting"."meetingDate",
    "meeting"."meetingStartTime",
    "meeting"."meetingEndTime",
    "meeting"."meetingAgenda",
    "meeting"."oppurtunities",
    "meeting"."observations",
    "meeting"."lastModifiedDate",
    "meeting"."lastModifiedBy",
    "meeting"."isDraft"
    FROM "meeting"
    INNER JOIN "user" ON "user"."id" = "meeting"."lastModifiedBy"
    INNER JOIN "entity" ON "entity"."id" = "user"."entityId"
    WHERE "meeting"."id" in (${meetingIds})`;
    if (userIdArray.length > 0) {
      query = `${query} AND "meeting"."lastModifiedBy" IN (${userIds})`;
    }
    if (entityIdArray.length > 0) {
      query = `${query}  AND "user"."entityId" IN (${entityIds})`;
    }
    return query;
  },
  //#endregion
};
