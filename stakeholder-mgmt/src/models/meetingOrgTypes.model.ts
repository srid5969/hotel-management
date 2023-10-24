import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const meetingOrgTypesModel = sequelize.define(
  'meetingOrgTypes',
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
    orgTypeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'organizationType',
        key: 'id',
      },
    },
  },
  {
    freezeTableName: true,
  }
);
