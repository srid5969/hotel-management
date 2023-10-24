export const entitiesProvider = {
  getAllEntitiesList(): string {
    const query = `SELECT 
    "entity"."id" AS "id", 
    "entity"."name" AS "name", 
    "entity"."domain" AS "domain", 
    "entity"."lastModifiedDate" AS "lastModifiedDate", 
    "entity"."lastModifiedBy" AS "lastModifiedBy", 
    "entity"."createdAt" AS "createdAt", 
    "entity"."updatedAt" AS "updatedAt", 
    "entity"."isActive" AS "isActive",
    "user"."fullName" AS "updatedBy"
    FROM public."entity"
    LEFT JOIN "user" ON "user"."id" = "entity"."lastModifiedBy"
    ORDER BY "entity"."lastModifiedDate" DESC`;
    return query;
  },
  getAllEntitiesListById(entityId: number): string {
    const query = `SELECT 
    "entity"."id" AS "id", 
    "entity"."name" AS "name", 
    "entity"."domain" AS "domain", 
    "entity"."lastModifiedDate" AS "lastModifiedDate", 
    "entity"."lastModifiedBy" AS "lastModifiedBy", 
    "entity"."createdAt" AS "createdAt", 
    "entity"."updatedAt" AS "updatedAt", 
    "entity"."isActive" AS "isActive",
    "user"."fullName" AS "updatedBy"
    FROM public."entity"
    LEFT JOIN "user" ON "user"."id" = "entity"."lastModifiedBy"
    WHERE "entity"."id" = '${entityId}'
    ORDER BY "entity"."lastModifiedDate" DESC `;
    return query;
  },
};
