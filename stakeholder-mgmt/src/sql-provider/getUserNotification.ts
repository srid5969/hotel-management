import {getNotificationReq} from '../business_objects/userNotifcation';

export const userNotificationProvider = {
  getUserNotifications(notificationObj: getNotificationReq): string {
    const query = `
    SELECT
    "userNotification"."id" AS "userNotificationId",
    "userNotification"."notificationId",
    "notificationConfig"."title" AS "notificationTitle",
    "notificationConfig"."text" AS "notificationMessage",
    "userNotification"."userId",
    "user"."fullName",
    "userNotification"."createdAt",
    "userNotification"."isActive"
    FROM "userNotification"
    INNER JOIN "user" ON "userNotification"."userId" = "user"."id"
    INNER JOIN "notificationConfig" ON "userNotification"."notificationId" = "notificationConfig"."id"
    WHERE "userNotification"."userId" = '${notificationObj.userId}' ORDER BY "userNotification"."createdAt" DESC`;
    return query;
  },
};
