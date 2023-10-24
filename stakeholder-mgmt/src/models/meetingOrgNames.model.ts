import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const meetingOrgNamesModel = sequelize.define(
  'meetingOrgNames',
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
    orgNameId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'organization',
        key: 'id',
      },
    },
  },
  {
    freezeTableName: true,
  }
);
