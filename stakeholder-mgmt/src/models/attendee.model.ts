import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const attendeeModel = sequelize.define(
  'attendee',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    fullName: {
      type: DataTypes.STRING(4000),
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING(4000),
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
