import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const userNotificationModel = sequelize.define(
  'userNotification',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    userId: {
      allowNull: false,
      type: DataTypes.BIGINT,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    notificationId: {
      allowNull: false,
      type: DataTypes.BIGINT,
      references: {
        model: 'notificationConfig',
        key: 'id',
      },
    },
    isActive: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
  }
);
