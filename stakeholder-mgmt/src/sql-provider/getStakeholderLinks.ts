export const stakeHolderLinksProvider = {
  getStakeholderLinkedInLink(linkedInId: number): string {
    const query = `
    SELECT
    "stakeHolder"."id" AS "stakeHolderId", 
    "stakeHolder"."fullName", 
    "stakeHolderLinks"."url"
    FROM "stakeHolder"
    INNER JOIN "stakeHolderLinks" ON "stakeHolder"."id" = "stakeHolderLinks"."stakeHolderId"
    WHERE "stakeHolderLinks"."linkTypeId"='${linkedInId}'`;
    return query;
  },
  getStakeholderLinks(stakeHolderId: number) {
    const query = `
    SELECT
    "stakeHolder"."id" AS "stakeHolderId", 
    "stakeHolder"."fullName", 
    "stakeHolderLinks"."url",
    "stakeHolderLinks"."linkTypeId",
    "stakeHolderLinksType"."name" AS "linkName"
    FROM "stakeHolder"
    INNER JOIN "stakeHolderLinks" ON "stakeHolder"."id" = "stakeHolderLinks"."stakeHolderId"
    INNER JOIN "stakeHolderLinksType" ON "stakeHolderLinks"."linkTypeId" = "stakeHolderLinksType"."id"
    WHERE "stakeHolderLinks"."stakeHolderId"='${stakeHolderId}'`;
    return query;
  },
};
