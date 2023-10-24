import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const stakeHolderMeetingsModel = sequelize.define(
  'stakeHolderMeetings',
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
    stakeHolderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'stakeHolder',
        key: 'id',
      },
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
