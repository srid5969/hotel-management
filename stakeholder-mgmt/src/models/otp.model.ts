import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const otpModel = sequelize.define(
  'otp',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    otpText: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    otpDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    otpMaximumRetries: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
