export const faqsProvider = {
  getfaqsListDetails(faqId: number): string {
    if (!faqId) {
      const query = `
    SELECT
    "faqs".id AS id,
    "faqs"."sortNumber" AS "sortNumber",
    "faqs"."question" AS "question",
    "faqs"."answer" AS "answer",
    "faqs"."faqTypeId" AS "faqTypeId",
    "faqs"."isActive" AS "isActive",
    "faqs"."lastModifiedDate" AS "lastModifiedDate",
    "faqs"."createdAt" AS "createdAt",
    "faqs"."updatedAt" AS "updatedAt",
    "faqTypes".name AS "faqTypeName",
    "user"."fullName" AS "updatedBy"
    FROM faqs
    LEFT JOIN "faqTypes" ON "faqTypes".id = faqs."faqTypeId"
    LEFT JOIN "user" ON "user".id = faqs."lastModifiedBy" 
    ORDER BY "faqs"."lastModifiedDate" DESC`;
      return query;
    } else {
      const query = `
    SELECT
    "faqs".id AS id,
    "faqs"."sortNumber" AS "sortNumber",
    "faqs"."question" AS "question",
    "faqs"."answer" AS "answer",
    "faqs"."faqTypeId" AS "faqTypeId",
    "faqs"."isActive" AS "isActive",
    "faqs"."lastModifiedDate" AS "lastModifiedDate",
    "faqs"."createdAt" AS "createdAt",
    "faqs"."updatedAt" AS "updatedAt",
    "faqTypes".name AS "faqTypeName",
    "user"."fullName" AS "updatedBy"
    FROM faqs
    LEFT JOIN "faqTypes" ON "faqTypes".id = faqs."faqTypeId"
    LEFT JOIN "user" ON "user".id = faqs."lastModifiedBy" 
    WHERE "faqs".id =${faqId} ORDER BY "faqs"."lastModifiedDate" DESC`;
      return query;
    }
  },
};
