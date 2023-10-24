import Joi from 'joi';

const getNotification = Joi.object({
  userId: Joi.string().label('userId').required(),
});

const markNotificationAsRead = Joi.object({
  notificationIds: Joi.array()
    .items(Joi.number().required())
    .required()
    .label('notificationIds'),
});
export const userNotificationValidator = {
  getNotification,
  markNotificationAsRead,
};
