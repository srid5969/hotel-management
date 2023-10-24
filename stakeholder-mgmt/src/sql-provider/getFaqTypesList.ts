export const faqTypesProvider = {
  getfaqTypesListDetails(faqTypeId: number): string {
    if (!faqTypeId) {
      const query = `
      SELECT
      "faqTypes".id AS id,
      "faqTypes"."name" AS "name",
      "faqTypes"."code" AS "code",
      "faqTypes"."sortNumber" AS "sortNumber",
      "faqTypes"."createdAt" AS "createdAt",
      "faqTypes"."updatedAt" AS "updatedAt",
      "faqTypes"."isActive" AS "isActive",
      "user"."fullName" AS "updatedBy"
      FROM "faqTypes"
      LEFT JOIN "user" ON "user".id = "faqTypes"."lastModifiedBy" 
      ORDER BY "faqTypes"."updatedAt" DESC`;
      return query;
    } else {
      const query = `
      SELECT
      "faqTypes".id AS id,
      "faqTypes"."name" AS "name",
      "faqTypes"."code" AS "code",
      "faqTypes"."sortNumber" AS "sortNumber",
      "faqTypes"."createdAt" AS "createdAt",
      "faqTypes"."updatedAt" AS "updatedAt",
      "faqTypes"."isActive" AS "isActive",
      "user"."fullName" AS "updatedBy"
      FROM "faqTypes"
      LEFT JOIN "user" ON "user".id = "faqTypes"."lastModifiedBy" 
      WHERE "faqTypes".id =${faqTypeId} ORDER BY "faqTypes"."updatedAt" DESC`;
      return query;
    }
  },
};
