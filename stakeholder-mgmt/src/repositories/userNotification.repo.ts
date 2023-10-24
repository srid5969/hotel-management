import {userNotificationModel} from '../models/userNotification.model';
import {
  getNotificationReq,
  markAsReadReq,
} from '../business_objects/userNotifcation';
import {userNotificationProvider} from '../sql-provider/getUserNotification';
import sequelize from '../config/sequelize';
import {QueryTypes} from 'sequelize';

export class userNotificationRepository {
  async createNotification(notificationObj: getNotificationReq) {
    const notification: any = await userNotificationModel.create({
      userId: notificationObj.userId,
      notificationId: notificationObj.notificationId,
      isActive: true,
    });
    return notification;
  }
  async getNotification(notificationObj: getNotificationReq) {
    const getNotificationQuery = userNotificationProvider.getUserNotifications(
      notificationObj
    );
    const getNotification = await sequelize.query(getNotificationQuery, {
      type: QueryTypes.SELECT,
    });
    return getNotification;
  }
  async markNotificationAsRead(notificationObj: markAsReadReq) {
    const notificationRead = await userNotificationModel.update(
      {isActive: false},
      {
        where: {
          id: notificationObj.notificationIds,
          userId: notificationObj.userId,
        },
      }
    );
    // notificationRead = await notificationRead.update({
    //   isActive: false,
    // });
    return notificationRead;
  }
}
