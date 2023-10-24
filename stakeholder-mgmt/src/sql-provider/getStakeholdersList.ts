import {filteredStakeholderReq} from '../business_objects/stakeholder';
import {
  filterMeetingReq,
  getStakeholderForMeetingsCreationReq,
} from '../business_objects/meeting';
import {constants} from '../util/constants';
export const stakeHolderProvider = {
  getStakeHoldersListDetails(userId: number): string {
    // eslint-disable-next-line quotes
    const userRolesAllowed = constants.UserRoles.Allowed.join("','");
    const query = `
    SELECT 
  "stakeHolderApprovals"."id" AS "stakeHolderApprovalId", 
  "stakeHolder"."id" AS "stakeHolderId", 
  "stakeHolder"."fullName", 
  "organizationType"."id" AS "organizationTypeId", 
  "organizationType"."name" AS "organizationTypeName", 
  "stakeHolder"."companyTypeId", 
  "companyType"."name" AS "companyTypeName", 
  "stakeHolder"."publicCompanyId", 
  "publicCompany"."name" AS "publicCompanyName", 
  "stakeHolder"."organizationId",
  "organization"."name" AS "organizationName", 
  CASE WHEN "stakeHolder"."createdBy" = '${userId}' OR (select "userRole"."roleId" from "userRole" where  "userRole"."userId" = '${userId}' limit 1) IN ('${userRolesAllowed}') THEN "stakeHolder"."email" ELSE null END AS email, 
  CASE WHEN "stakeHolder"."createdBy" = '${userId}' OR (select "userRole"."roleId" from "userRole" where  "userRole"."userId" = '${userId}' limit 1) IN ('${userRolesAllowed}') THEN "stakeHolder"."mobile" ELSE null END AS mobile, 
  "stakeHolder"."designation",
  "stakeHolder"."description", 
  "stakeHolder"."cityId",
  "stakeHolder"."isActive", 
  "city"."name" AS "cityName", 
  "stakeHolder"."priorityLevel",
  "stakeHolder"."imageName",
  "stakeHolder"."imageType",
  "stakeHolder"."imageUrl",
  "stakeHolder"."acceptOrRejectComment", 
  "status"."type" AS "statusType", 
  "status"."id" AS "statusId", 
  "status"."name" AS "status", 
  "stakeHolder"."lastModifiedDate", 
  "stakeHolder"."lastModifiedBy", 
  "lastModifiedByUser"."fullName" AS "lastModifiedByName", 
  "stakeHolder"."createdAt", 
  "stakeHolder"."updatedAt", 
  "stakeHolderApprovals"."approverId", 
  "approverUser"."fullName" AS "approverName", 
  "stakeHolderApprovals"."approvedDate", 
  "stakeHolderApprovals"."requesterId", 
  "requesterUser"."fullName" AS "requesterName",
  "requesterUser"."emailId" AS "requesterEmailId",
  "entity"."name" AS "requesterEntity",
  "designation"."name" AS "requesterDesignation",
  "requesterUser"."priorityLevel" AS "requesterPriorityLevel",
  "requesterUser"."imageUrl" AS "requesterImageUrl",
  "stakeHolderApprovals"."requestedDate" 
FROM 
  "stakeHolder" 
  INNER JOIN "organizationType" ON "stakeHolder"."organizationTypeId" = "organizationType"."id" 
  LEFT JOIN "companyType" ON "stakeHolder"."companyTypeId" = "companyType"."id" 
  LEFT JOIN "publicCompany" ON "stakeHolder"."publicCompanyId" = "publicCompany"."id"
  INNER JOIN "organization" ON "stakeHolder"."organizationId" = "organization"."id" 
  INNER JOIN "city" ON "stakeHolder"."cityId" = "city"."id" 
  INNER JOIN "stakeHolderApprovals" ON "stakeHolder"."id" = "stakeHolderApprovals"."stakeHolderId" 
  INNER JOIN "status" ON "stakeHolderApprovals"."statusId" = "status"."id" 
  INNER JOIN "user" AS "lastModifiedByUser" ON "stakeHolder"."lastModifiedBy" = "lastModifiedByUser"."id" 
  INNER JOIN "user" AS "requesterUser" ON "stakeHolderApprovals"."requesterId" = "requesterUser"."id"
  INNER JOIN "designation" ON "requesterUser"."designationId" = "designation"."id"
  INNER JOIN "entity" ON "requesterUser"."entityId" = "entity"."id"
  LEFT JOIN "user" AS "approverUser" ON "stakeHolderApprovals"."approverId" = "approverUser"."id"
  INNER JOIN "userRole" ON "stakeHolderApprovals"."requesterId" = "userRole"."userId"`;
    return query;
  },
  stakeHolderFilters(
    filterObj: filteredStakeholderReq,
    userId: number
  ): string {
    let query = stakeHolderProvider.getStakeHoldersListDetails(userId);
    // Apply status filter
    if (filterObj?.statusIds.length > 0) {
      const status = filterObj.statusIds.join(',');
      if (query.search('WHERE') === -1) {
        query = `${query} WHERE "statusId" in (${status})`;
      } else {
        query = `${query} AND "statusId" in (${status})`;
      }
    }
    // Apply stakeholder Names filter
    if (filterObj?.stakeHolderIds.length > 0) {
      const stakeHolder = filterObj.stakeHolderIds.join(',');
      if (query.search('WHERE') === -1) {
        query = `${query} WHERE "stakeHolderId" in (${stakeHolder})`;
      } else {
        query = `${query} AND "stakeHolderId" in (${stakeHolder})`;
      }
    }
    // Apply city Names filter
    if (filterObj?.cityIds.length > 0) {
      const city = filterObj.cityIds.join(',');
      if (query.search('WHERE') === -1) {
        query = `${query} WHERE "stakeHolder"."cityId" in (${city})`;
      } else {
        query = `${query} AND "stakeHolder"."cityId" in (${city})`;
      }
    }
    // Apply organization filter
    if (filterObj?.organizationIds.length > 0) {
      const organization = filterObj.organizationIds.join(',');
      if (query.search('WHERE') === -1) {
        query = `${query} WHERE "stakeHolder"."organizationId" in (${organization})`;
      } else {
        query = `${query} AND "stakeHolder"."organizationId" in (${organization})`;
      }
    }

    // Apply organization Type filter
    if (filterObj?.organizationTypeIds.length > 0) {
      const organizationType = filterObj.organizationTypeIds.join(',');
      if (query.search('WHERE') === -1) {
        query = `${query} WHERE "stakeHolder"."organizationTypeId" in (${organizationType})`;
      } else {
        query = `${query} AND "stakeHolder"."organizationTypeId" in (${organizationType})`;
      }
    }

    //Apply Priority Levels Filter
    if (filterObj?.priorityLevels.length > 0) {
      // eslint-disable-next-line quotes
      const priorityType = `'${filterObj.priorityLevels.join("','")}'`;
      if (query.search('WHERE') === -1) {
        query = `${query} WHERE "stakeHolder"."priorityLevel" in (${priorityType})`;
      } else {
        query = `${query} AND "stakeHolder"."priorityLevel" in (${priorityType})`;
      }
    }
    // Apply Created By Filter
    if (filterObj?.createdByIds.length > 0) {
      const createdByIds = filterObj.createdByIds.join(',');
      if (query.search('WHERE') === -1) {
        query = `${query} WHERE "stakeHolder"."createdBy" in (${createdByIds})`;
      } else {
        query = `${query} AND "stakeHolder"."createdBy" in (${createdByIds})`;
      }
    }
    if (filterObj?.roleIds.length > 0) {
      const roleIds = filterObj.roleIds.join(',');
      if (query.search('WHERE') === -1) {
        query = `${query} WHERE "userRole"."roleId" in (${roleIds})`;
      } else {
        query = `${query} AND "userRole"."roleId" in (${roleIds})`;
      }
    }
    return query;
  },
  getStakeholdersForMeetingsCreation(
    filterObj: getStakeholderForMeetingsCreationReq
  ): string {
    let query = stakeHolderProvider.getStakeHoldersListDetails(
      filterObj.userId
    );
    // Apply organization filter
    if (filterObj?.organizationIds.length > 0) {
      const organization = filterObj.organizationIds.join(',');
      if (query.search('WHERE') === -1) {
        query = `${query} WHERE "stakeHolder"."organizationId" in (${organization})`;
      } else {
        query = `${query} AND "stakeHolder"."organizationId" in (${organization})`;
      }
    }
    // Apply organization Type filter
    if (filterObj?.organizationTypeIds.length > 0) {
      const organizationType = filterObj.organizationTypeIds.join(',');
      if (query.search('WHERE') === -1) {
        query = `${query} WHERE "stakeHolder"."organizationTypeId" in (${organizationType})`;
      } else {
        query = `${query} AND "stakeHolder"."organizationTypeId" in (${organizationType})`;
      }
    }
    // Apply priority level filters
    if (
      filterObj?.priorityLevel &&
      constants.restrictiionType.IS_PRIORITY_BASED
    ) {
      // eslint-disable-next-line quotes
      const priorityType = `'${filterObj.priorityLevel.join("','")}'`;
      if (query.search('WHERE') === -1) {
        query = `${query} WHERE "stakeHolder"."priorityLevel" in (${priorityType})`;
      } else {
        query = `${query} AND "stakeHolder"."priorityLevel" in (${priorityType})`;
      }
    }
    // Apply status ID filters
    if (filterObj?.statusId) {
      if (query.search('WHERE') === -1) {
        query = `${query} WHERE "status"."id" = ${filterObj.statusId}`;
      } else {
        query = `${query} AND "status"."id" = ${filterObj.statusId}`;
      }
    }
    return query;
  },
  getStakeholdersByPriority(
    stakeHolderIds: Array<number>,
    filterObj: filterMeetingReq
  ): string {
    // eslint-disable-next-line quotes
    const priorityType = `'${filterObj.priorityLevels.join("','")}'`;
    const ids = stakeHolderIds.join(',');
    const query = `SELECT
    "stakeHolder"."id" AS "stakeHolderId"
    FROM "stakeHolder"
    WHERE "stakeHolder"."id" in (${ids}) AND "stakeHolder"."priorityLevel" in (${priorityType})`;
    return query;
  },
};
