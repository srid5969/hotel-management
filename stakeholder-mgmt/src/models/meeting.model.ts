import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const meetingModel = sequelize.define(
  'meeting',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    meetingDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    meetingStartTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    meetingEndTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    meetingAgenda: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    opportunities: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    lastModifiedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lastModifiedBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    isDraft: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
  }
);
