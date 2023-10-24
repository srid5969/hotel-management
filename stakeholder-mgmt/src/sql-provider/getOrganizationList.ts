export const organizationProvider = {
  getOrganizationsListDetails(): string {
    const query = `
        SELECT 
        organization.id AS organisationId,
        "organization"."name" AS "organizationName",
        "organization"."isActive" AS "isActive",
        "organization"."createdAt" AS "createdAt",
        "organization"."updatedAt" AS "updatedAt",
        "organizationType"."id" AS "organizationTypeId", 
        "organizationType"."name" AS "organizationTypeName",
        "companyType"."id" AS "companyTypeId",
        "companyType"."name" AS "companyTypeName",
        "publicCompany"."id" AS "publicCompanyId",
        "publicCompany"."name" AS "publicCompanyName",
        "user"."fullName" AS "updatedBy"
        FROM organization
        INNER JOIN "organizationType" ON "organizationType".id = organization."orgTypeId"
        LEFT JOIN "companyType" ON "companyType".id = organization."companyTypeId"
        LEFT JOIN "publicCompany" ON "publicCompany".id = organization."publicCompanyId"
        INNER JOIN "user" ON "user".id = organization."lastModifiedBy"`;
    return query;
  },
};
