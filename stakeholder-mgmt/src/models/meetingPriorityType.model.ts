import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const meetingPriorityTypeModel = sequelize.define(
  'meetingPriorityType',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
