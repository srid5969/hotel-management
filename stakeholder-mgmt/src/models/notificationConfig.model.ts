import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const notificationConfigModel = sequelize.define(
  'notificationConfig',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    text: {
      type: DataTypes.STRING(4000),
      allowNull: false,
    },
    timeInHrs: {
      type: DataTypes.STRING(4000),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
