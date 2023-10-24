import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const attendeeMeetingsModel = sequelize.define(
  'attendeeMeetings',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    attendeeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    meetingId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
