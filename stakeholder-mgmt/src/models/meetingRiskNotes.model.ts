import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const meetingRiskNotesModel = sequelize.define(
  'meetingRiskNotes',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    meetingId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'meeting',
        key: 'id',
      },
    },
    meetingPriorityId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'meetingPriorityType',
        key: 'id',
      },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastModifiedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lastModifiedBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
