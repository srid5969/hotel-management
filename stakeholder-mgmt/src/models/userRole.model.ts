import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const userRoleModel = sequelize.define(
  'userRole',
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
    roleId: {
      type: DataTypes.BIGINT,
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
