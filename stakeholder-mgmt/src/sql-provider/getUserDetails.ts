import {filterUsersReq} from '../business_objects/user';
/**
 * gets the role details
 */
export const userProvider = {
  getUserInfoByAzureId(azureId: string): string {
    const query = ` 
    SELECT "user"."id" AS "userId",
    "user"."emailId",
    "user"."azureId",
    "user"."fullName",
    "user"."isActive",
    "user"."mobile",
    "user"."imageUrl",
    "user"."priorityLevel",
    "user"."entityId",
    "user"."description",
    "user"."sessionId",
    "entity"."name" AS "entityName",
    "designation"."name" AS "designation",
    "user"."isActive",
    "user"."isPasswordSet"
    FROM "user"  
    INNER JOIN "entity" ON "entity"."id" = "user"."entityId"
    INNER JOIN "designation" ON "designation"."id" = "user"."designationId"
    WHERE "user"."azureId" = '${azureId}'`;
    return query;
  },

  getUserInfoByUserId(userId: number): string {
    const query = ` 
    SELECT "user"."id" AS "userId",
    "user"."emailId",
    "user"."azureId",
    "user"."fullName",
    "user"."isActive",
    "user"."mobile",
    "user"."imageUrl",
    "user"."imageName",
    "user"."imageType",
    "user"."priorityLevel",
    "user"."entityId",
    "user"."description",
    "entity"."name" AS "entityName",
    "designation"."id" AS "designationId",
    "designation"."name" AS "designation",
    "userRole"."roleId",
    "role"."name" AS "role",
    "user"."isActive",
    "user"."isPasswordSet"
    FROM "user"  
    INNER JOIN "entity" ON "entity"."id" = "user"."entityId"
    INNER JOIN "designation" ON "designation"."id" = "user"."designationId"
    INNER JOIN "userRole" ON "userRole"."userId" = "user"."id"
    INNER JOIN "role" ON "role"."id" =  "userRole"."roleId"
    WHERE "user"."id" = '${userId}'`;
    return query;
  },

  getUserInfoByUserEmailId(emailId: string): string {
    const query = ` 
    SELECT "user"."id" AS "userId",
    "user"."emailId",
    "user"."azureId",
    "user"."fullName",
    "user"."isActive",
    "user"."mobile",
    "user"."imageUrl",
    "user"."imageName",
    "user"."imageType",
    "user"."priorityLevel",
    "user"."entityId",
    "user"."description",
    "entity"."name" AS "entityName",
    "designation"."id" AS "designationId",
    "designation"."name" AS "designation",
    "userRole"."roleId",
    "role"."name" AS "role",
    "user"."isActive",
    "user"."isPasswordSet"
    FROM "user"  
    INNER JOIN "entity" ON "entity"."id" = "user"."entityId"
    INNER JOIN "designation" ON "designation"."id" = "user"."designationId"
    INNER JOIN "userRole" ON "userRole"."userId" = "user"."id"
    INNER JOIN "role" ON "role"."id" =  "userRole"."roleId"
    WHERE "user"."emailId" = '${emailId}'`;
    return query;
  },

  getUserRoleInfo(userId: number): string {
    const query = `
    SELECT
    "userRole"."userId",
    "userRole"."roleId",
    "role"."name" AS "role"
    FROM "userRole"
    INNER JOIN "role" ON "userRole"."roleId" = "role"."id"
    WHERE "userRole"."userId" = ${userId}`;
    return query;
  },

  findUserRoleInfo(userId: number, roleId: number): string {
    const query = `
    SELECT
    "userRole"."userId",
    "userRole"."roleId",
    "role"."name" AS "role"
    FROM "userRole"
    INNER JOIN "role" ON "userRole"."roleId" = "role"."id"
    WHERE "userRole"."userId" = ${userId} AND "userRole"."roleId" = ${roleId}`;
    return query;
  },

  checkUserForEscalation(userId: string): string {
    const query = ` 
    SELECT "user"."id" AS "userId",
    "user"."emailId",
    "user"."fullName",
    "user"."isActive",
    "user"."priorityLevel",
    "user"."createdAt",
    "entity"."name" AS "entityName",
    "designation"."name" AS "designation"
    FROM "user"  
    INNER JOIN "entity" ON "entity"."id" = "user"."entityId"
    INNER JOIN "designation" ON "designation"."id" = "user"."designationId"
    WHERE "user"."id" = '${userId}'`;
    return query;
  },

  getUsersList(): string {
    const query = ` 
    SELECT "user"."id" AS "userId",
    "user"."emailId",
    "user"."fullName",
    "user"."isActive",
    "user"."mobile",
    "user"."imageUrl",
    "user"."priorityLevel",
    "user"."entityId",
    "user"."description",
    "user"."createdAt",
    "user"."isActive",
    "user"."isPasswordSet",
    "entity"."name" AS "entityName",
    "designation"."name" AS "designation",
    "userRole"."roleId",
    "role"."name" AS "role"
    FROM "user"  
    INNER JOIN "entity" ON "entity"."id" = "user"."entityId"
    INNER JOIN "designation" ON "designation"."id" = "user"."designationId"
    INNER JOIN "userRole" ON "userRole"."userId" = "user"."id"
    INNER JOIN "role" ON "role"."id" =  "userRole"."roleId"`;
    return query;
  },

  filterUsersList(filterObj: filterUsersReq): string {
    let query = userProvider.getUsersList();
    if (filterObj.isPasswordSet !== null && filterObj.isActive !== null) {
      if (query.search('WHERE') === -1) {
        query = `${query} WHERE "user"."isActive" = ${filterObj.isActive} AND "user"."isPasswordSet" = ${filterObj.isPasswordSet}`;
      } else {
        query = `${query} AND "user"."isPasswordSet" = ${filterObj.isPasswordSet} AND "user"."isActive" = ${filterObj.isActive}`;
      }
    }
    if (filterObj.emailIds.length > 0) {
      // eslint-disable-next-line quotes
      const emailIds = `'${filterObj.emailIds.join("','")}'`;
      if (query.search('WHERE') === -1) {
        query = `${query} WHERE "user"."emailId" in (${emailIds})`;
      } else {
        query = `${query} AND "user"."emailId" in (${emailIds})`;
      }
    }
    if (filterObj?.priorityIds.length > 0) {
      // eslint-disable-next-line quotes
      const priorityType = `'${filterObj.priorityIds.join("','")}'`;
      if (query.search('WHERE') === -1) {
        query = `${query} WHERE "user"."priorityLevel" in (${priorityType})`;
      } else {
        query = `${query} AND "user"."priorityLevel" in (${priorityType})`;
      }
    }
    if (filterObj.entityIds.length > 0) {
      const entityIds = filterObj.entityIds.join(',');
      if (query.search('WHERE') === -1) {
        query = `${query} WHERE "user"."entityId" in (${entityIds})`;
      } else {
        query = `${query} AND "user"."entityId" in (${entityIds})`;
      }
    }
    if (filterObj.designationIds.length > 0) {
      const designationIds = filterObj.designationIds.join(',');
      if (query.search('WHERE') === -1) {
        query = `${query} WHERE "user"."designationId" in (${designationIds})`;
      } else {
        query = `${query} AND "user"."designationId" in (${designationIds})`;
      }
    }
    if (filterObj.roleIds.length > 0) {
      const roleIds = filterObj.roleIds.join(',');
      if (query.search('WHERE') === -1) {
        query = `${query} WHERE "userRole"."roleId" in (${roleIds})`;
      } else {
        query = `${query} AND "userRole"."roleId" in (${roleIds})`;
      }
    }
    return query;
  },
};
