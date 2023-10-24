import {notificationConfigModel} from '../models/notificationConfig.model';

export class notificationConfigRepository {
  async getNotificationConfigByType(notificationType: string) {
    const notification: any = await notificationConfigModel.findOne({
      where: {type: notificationType},
    });
    return notification;
  }
}
